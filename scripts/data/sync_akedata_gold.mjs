import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const DATA_FILE = path.join(ROOT, "client", "src", "lib", "data.ts");
const SUPPLEMENTAL_DATA_FILE = path.join(__dirname, "gold_supplements.json");

const HEADERS = {
  "User-Agent": "Mozilla/5.0",
};

const TABLE_ROOT = "https://www.akedata.wiki/public/TableCfg";

const PART_TYPE_MAP = {
  0: "Armor",
  1: "Glove",
  2: "Accessory",
};

const ATTRIBUTE_TYPE_MAP = {
  1: "HP",
  3: "Defense",
  9: "CritRate",
  17: "NormalDmg",
  28: "UltDmg",
  29: "HealEffect",
  32: "SkillDmg",
  33: "ComboDmg",
  39: "Strength",
  40: "Agility",
  41: "Intellect",
  42: "Willpower",
  44: "UltRecharge",
  50: "PhysDmg",
  61: "BreakDmg",
  87: "ArtsPower",
};

const COMPOSITE_STAT_TYPE_MAP = {
  AllDamageTakenScalar: "DmgReduc",
  AllSkillDamageIncrease: "AllSkillDmg",
  CrystAndPulseDamageIncrease: "IceElecDmg",
  FireAndNaturalDamageIncrease: "FireNatDmg",
  Main: "MainStat",
  SpellDamageIncrease: "ArtsDmg",
  Sub: "SubStat",
};

const STANDALONE_SET_MAP = {
  wuling: "武陵",
};

function round1(value) {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function normalizeStatValue(statType, value) {
  if (statType === "DmgReduc") {
    return round1((1 - value) * 100);
  }

  if (Math.abs(value) < 1) {
    return round1(value * 100);
  }

  return round1(value);
}

function resolveText(reference, i18n) {
  if (typeof reference === "string") {
    return reference;
  }

  return reference?.text || i18n[String(reference?.id)] || "";
}

function inferSetName(suitName, itemId) {
  if (suitName) {
    return suitName;
  }

  const matchedEntry = Object.entries(STANDALONE_SET_MAP).find(([key]) =>
    itemId.includes(key)
  );

  if (!matchedEntry) {
    throw new Error(`Unknown standalone set for ${itemId}`);
  }

  return matchedEntry[1];
}

function inferEquipmentType(partType, name) {
  const type = PART_TYPE_MAP[partType];
  if (!type) {
    throw new Error(`Unknown part type for ${name}: ${partType}`);
  }

  return type;
}

function inferStatType(modifier, name) {
  const statType =
    COMPOSITE_STAT_TYPE_MAP[modifier.compositeAttr] ||
    ATTRIBUTE_TYPE_MAP[modifier.attrType];

  if (!statType) {
    throw new Error(
      `Unknown stat for ${name}: ${modifier.attrType}/${modifier.compositeAttr}`
    );
  }

  return statType;
}

function inferDispatchCost(itemId, reverse, formulas, chains) {
  const formula = formulas[reverse[itemId]];
  const defaultChain = chains[formula?.level]?.chainList?.find(
    chain => chain.isDefault
  );

  if (!defaultChain) {
    throw new Error(`Missing dispatch cost for ${itemId}`);
  }

  return defaultChain.costGoldNum;
}

async function fetchTable(name) {
  const url = `${TABLE_ROOT}/${name}.json`;
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }

  const text = await response.text();
  return JSON.parse(
    text.replace(/("id"\s*:\s*)(-?\d{16,})(?=\s*[,}])/g, '$1"$2"')
  );
}

async function loadRemoteGoldEquipments() {
  const [equipments, items, suits, i18n, reverse, formulas, chains] =
    await Promise.all([
      fetchTable("EquipTable"),
      fetchTable("ItemTable"),
      fetchTable("EquipSuitTable"),
      fetchTable("I18nTextTable_CN"),
      fetchTable("EquipFormulaReverseTable"),
      fetchTable("EquipFormulaTable"),
      fetchTable("EquipFormulaChainTable"),
    ]);

  const suitNames = new Map(
    Object.entries(suits).map(([suitId, suit]) => [
      suitId,
      resolveText(suit.list?.[0]?.suitName, i18n).trim(),
    ])
  );

  const result = [];

  for (const [itemId, equipment] of Object.entries(equipments)) {
    const item = items[itemId];
    if (!itemId.startsWith("item_equip_t4_") || item?.rarity !== 5) {
      continue;
    }

    const name = resolveText(item.name, i18n).trim();
    if (!name) {
      throw new Error(`Missing equipment name for ${itemId}`);
    }

    const mainStatType = inferStatType(
      equipment.displayBaseAttrModifier,
      name
    );
    const subStats = [...(equipment.displayAttrModifiers ?? [])]
      .sort((a, b) => a.attrIndex - b.attrIndex)
      .map(modifier => {
        const statType = inferStatType(modifier, name);
        return {
          type: statType,
          value: normalizeStatValue(statType, modifier.attrValue),
        };
      });

    result.push({
      id: name,
      name,
      type: inferEquipmentType(equipment.partType, name),
      set: inferSetName(suitNames.get(equipment.suitID), itemId),
      dispatchCost: inferDispatchCost(itemId, reverse, formulas, chains),
      mainStat: {
        type: mainStatType,
        value: round1(equipment.displayBaseAttrModifier.attrValue),
      },
      subStats,
    });
  }

  return result;
}

async function loadSupplementalEquipments() {
  const text = await fs.readFile(SUPPLEMENTAL_DATA_FILE, "utf8");
  const equipments = JSON.parse(text);

  if (!Array.isArray(equipments)) {
    throw new Error("Supplemental gold equipments must be an array");
  }

  return equipments;
}

function mergeSupplementalEquipments(baseEquipments, supplementalEquipments) {
  const merged = [...baseEquipments];
  const existingNames = new Set(baseEquipments.map(item => item.name));

  for (const equipment of supplementalEquipments) {
    if (existingNames.has(equipment.name)) {
      continue;
    }

    merged.push(equipment);
    existingNames.add(equipment.name);
  }

  return merged;
}

async function loadLocalEquipments() {
  const text = await fs.readFile(DATA_FILE, "utf8");
  const executable = text
    .replace(/^import .*?;\s*/m, "")
    .replace(
      /export const GOLD_EQUIPMENTS: Equipment\[\] =/,
      "const GOLD_EQUIPMENTS ="
    );

  const context = {};
  vm.createContext(context);
  vm.runInContext(`${executable}\nthis.result = GOLD_EQUIPMENTS;`, context);
  return context.result;
}

function buildDiffSummary(local, remote) {
  const localMap = new Map(local.map(item => [item.name, item]));
  const remoteMap = new Map(remote.map(item => [item.name, item]));

  const missing = remote
    .filter(item => !localMap.has(item.name))
    .map(item => item.name);
  const changed = [];

  for (const remoteItem of remote) {
    const localItem = localMap.get(remoteItem.name);
    if (!localItem) {
      continue;
    }

    const isSame =
      JSON.stringify(localItem.type) === JSON.stringify(remoteItem.type) &&
      JSON.stringify(localItem.set) === JSON.stringify(remoteItem.set) &&
      JSON.stringify(localItem.dispatchCost) ===
        JSON.stringify(remoteItem.dispatchCost) &&
      JSON.stringify(localItem.mainStat) ===
        JSON.stringify(remoteItem.mainStat) &&
      JSON.stringify(localItem.subStats) ===
        JSON.stringify(remoteItem.subStats);

    if (!isSame) {
      changed.push(remoteItem.name);
    }
  }

  const extra = local
    .filter(item => !remoteMap.has(item.name))
    .map(item => item.name);

  return { missing, changed, extra };
}

function renderTypeScript(equipments) {
  const lines = [
    'import { Equipment } from "../types";',
    "",
    "export const GOLD_EQUIPMENTS: Equipment[] = [",
  ];

  for (const equipment of equipments) {
    lines.push("  {");
    lines.push(`    id: ${JSON.stringify(equipment.id)},`);
    lines.push(`    name: ${JSON.stringify(equipment.name)},`);
    lines.push(`    type: ${JSON.stringify(equipment.type)},`);
    lines.push(`    set: ${JSON.stringify(equipment.set)},`);
    lines.push(`    dispatchCost: ${equipment.dispatchCost},`);
    lines.push(
      `    mainStat: { type: ${JSON.stringify(equipment.mainStat.type)}, value: ${equipment.mainStat.value} },`
    );
    lines.push("    subStats: [");

    for (const stat of equipment.subStats) {
      lines.push(
        `      { type: ${JSON.stringify(stat.type)}, value: ${stat.value} },`
      );
    }

    lines.push("    ],");
    lines.push("  },");
  }

  lines.push("];", "");
  return lines.join("\n");
}

async function main() {
  const [local, remoteBase, supplemental] = await Promise.all([
    loadLocalEquipments(),
    loadRemoteGoldEquipments(),
    loadSupplementalEquipments(),
  ]);
  const remote = mergeSupplementalEquipments(remoteBase, supplemental);
  const localOrder = new Map(local.map((item, index) => [item.name, index]));
  remote.sort(
    (a, b) =>
      (localOrder.get(a.name) ?? local.length) -
      (localOrder.get(b.name) ?? local.length)
  );

  const diff = buildDiffSummary(local, remote);
  const output = renderTypeScript(remote);
  await fs.writeFile(DATA_FILE, output, "utf8");

  console.log(`Local gold equipments: ${local.length}`);
  console.log(`Remote gold equipments: ${remote.length}`);
  console.log(`Missing locally: ${diff.missing.length}`);
  console.log(`Changed locally: ${diff.changed.length}`);
  console.log(`Extra locally: ${diff.extra.length}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
