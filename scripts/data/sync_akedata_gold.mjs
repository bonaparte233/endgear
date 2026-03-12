import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const DATA_FILE = path.join(ROOT, "client", "src", "lib", "data.ts");

const HEADERS = {
  "User-Agent": "Mozilla/5.0",
};

const SLOT_TYPE_MAP = {
  护手: "Glove",
  护甲: "Armor",
  配件: "Accessory",
};

const STAT_TYPE_MAP = {
  力量: "Strength",
  智识: "Intellect",
  敏捷: "Agility",
  意志: "Willpower",
  防御力: "Defense",
  生命值: "HP",
  攻击力: "Attack",
  暴击率: "CritRate",
  连携技伤害加成: "ComboDmg",
  战技伤害加成: "SkillDmg",
  终结技充能效率: "UltRecharge",
  终结技伤害加成: "UltDmg",
  源石技艺强度: "ArtsPower",
  物理伤害加成: "PhysDmg",
  治疗效果加成: "HealEffect",
  寒冷和电磁伤害提升: "IceElecDmg",
  灼热和自然伤害提升: "FireNatDmg",
  全伤害减免: "DmgReduc",
  对失衡目标伤害加成: "BreakDmg",
  普通攻击伤害加成: "NormalDmg",
  所有技能伤害提升: "AllSkillDmg",
  Main: "MainStat",
  Sub: "SubStat",
  法术伤害: "ArtsDmg",
};

const STANDALONE_SET_MAP = {
  wuling: "武陵",
};

function round1(value) {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function normalizeStatValue(desc, value) {
  if (desc === "全伤害减免") {
    return round1((1 - value) * 100);
  }

  if (Math.abs(value) < 1) {
    return round1(value * 100);
  }

  return round1(value);
}

function inferSetName(suit, itemId) {
  if (suit.suitID !== "suit_none") {
    return suit.name;
  }

  const matchedEntry = Object.entries(STANDALONE_SET_MAP).find(([key]) =>
    itemId.includes(key)
  );

  return matchedEntry ? matchedEntry[1] : suit.name;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }

  return response.json();
}

async function loadRemoteGoldEquipments() {
  const manifest = await fetchJson(
    "http://akedata.top/public/CH/equip/manifest.json"
  );

  const suits = manifest
    .filter(item => item.rarity === 5 && !item.hidden)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const equipments = [];

  for (const suit of suits) {
    const data = await fetchJson(`http://akedata.top${suit.contentFile}`);

    for (const item of Object.values(data.equip ?? {})) {
      if (item.rarity !== 5) {
        continue;
      }

      const name = item.name.trim();
      const type = SLOT_TYPE_MAP[item["部位"]];
      const mainStatType = STAT_TYPE_MAP[item["主词条"].desc];

      if (!type) {
        throw new Error(`Unknown slot type for ${name}: ${item["部位"]}`);
      }

      if (!mainStatType) {
        throw new Error(
          `Unknown main stat for ${name}: ${item["主词条"].desc}`
        );
      }

      const subStats = Object.values(item["副词条"] ?? {}).map(stat => {
        const statType = STAT_TYPE_MAP[stat.desc];
        if (!statType) {
          throw new Error(`Unknown sub stat for ${name}: ${stat.desc}`);
        }

        return {
          type: statType,
          value: normalizeStatValue(stat.desc, stat.value[0]),
        };
      });

      equipments.push({
        id: name,
        name,
        type,
        set: inferSetName(suit, item.itemId),
        mainStat: {
          type: mainStatType,
          value: round1(item["主词条"].value),
        },
        subStats,
      });
    }
  }

  return equipments;
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
  const [local, remote] = await Promise.all([
    loadLocalEquipments(),
    loadRemoteGoldEquipments(),
  ]);

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
