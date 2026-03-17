import { Equipment, Stat } from "../types";
import { GOLD_EQUIPMENTS } from "./data";

export type MatchType = "Better" | "Standard" | "Incompatible";

export interface AttributeMatch {
  attributeName: string; // 属性 Key (如 "Strength")
  targetValue: number;
  materials: MaterialMatch[];
}

export interface MaterialMatch {
  equipment: Equipment;
  value: number;
  matchType: MatchType;
  diff: number;
}

export function findForgeMaterials(
  targetEquipment: Equipment
): AttributeMatch[] {
  // 1. 筛选同类型装备 (必须是同部位)
  const sameTypeEquipments = GOLD_EQUIPMENTS.filter(
    e => e.type === targetEquipment.type
  );

  const results: AttributeMatch[] = [];

  // 遍历目标装备的所有副属性
  targetEquipment.subStats.forEach(targetStat => {
    results.push(processAttribute(targetStat, sameTypeEquipments));
  });

  return results;
}

function processAttribute(
  targetStat: Stat,
  candidates: Equipment[]
): AttributeMatch {
  const materials: MaterialMatch[] = [];

  candidates.forEach(cand => {
    // 在材料的所有副属性中寻找相同类型的属性
    const foundStat = cand.subStats.find(s => s.type === targetStat.type);

    if (foundStat) {
      const targetVal = targetStat.value;
      const foundVal = foundStat.value;

      let matchType: MatchType = "Incompatible";
      if (foundVal > targetVal) {
        matchType = "Better";
      } else if (foundVal === targetVal) {
        matchType = "Standard";
      }

      if (matchType !== "Incompatible") {
        materials.push({
          equipment: cand,
          value: foundVal,
          matchType,
          diff: parseFloat((foundVal - targetVal).toFixed(2)),
        });
      }
    }
  });

  // 排序：优先看匹配质量，再看调度券消耗，最后才按数值降序
  materials.sort((a, b) => {
    if (a.matchType === "Better" && b.matchType !== "Better") return -1;
    if (b.matchType === "Better" && a.matchType !== "Better") return 1;

    const dispatchCostDiff =
      a.equipment.dispatchCost - b.equipment.dispatchCost;
    if (dispatchCostDiff !== 0) return dispatchCostDiff;

    if (b.value !== a.value) {
      return b.value - a.value;
    }

    if (b.diff !== a.diff) {
      return b.diff - a.diff;
    }

    return a.equipment.name.localeCompare(b.equipment.name, "zh-Hans-CN");
  });

  return {
    attributeName: targetStat.type, // 这里存 Key，显示时再翻译
    targetValue: targetStat.value,
    materials,
  };
}
