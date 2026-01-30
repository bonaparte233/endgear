import { Equipment, GOLD_EQUIPMENTS, parseStatValue } from './data';

export interface ForgeResult {
  recommended: Equipment[];
  normal: Equipment[];
  incompatible: Equipment[];
}

export interface ComparisonResult {
  equipment: Equipment;
  score: number;
  betterStats: string[];
  equalStats: string[];
  isRecommended: boolean;
}

export function findForgeMaterials(targetEquipment: Equipment): ForgeResult {
  // 1. 筛选同类型装备 (必须是同部位)
  const sameTypeEquipments = GOLD_EQUIPMENTS.filter(
    e => e.type === targetEquipment.type && e.id !== targetEquipment.id
  );

  const comparisons: ComparisonResult[] = sameTypeEquipments.map(material => {
    let score = 0;
    const betterStats: string[] = [];
    const equalStats: string[] = [];

    // 比较属性1
    if (material.subStat1.name === targetEquipment.subStat1.name) {
      if (material.subStat1.value > targetEquipment.subStat1.value) {
        score += 2;
        betterStats.push(`${material.subStat1.name} (+${material.subStat1.value - targetEquipment.subStat1.value})`);
      } else if (material.subStat1.value === targetEquipment.subStat1.value) {
        score += 1;
        equalStats.push(material.subStat1.name);
      }
    }

    // 比较属性2
    if (material.subStat2.name === targetEquipment.subStat2.name) {
      if (material.subStat2.value > targetEquipment.subStat2.value) {
        score += 2;
        betterStats.push(`${material.subStat2.name} (+${material.subStat2.value - targetEquipment.subStat2.value})`);
      } else if (material.subStat2.value === targetEquipment.subStat2.value) {
        score += 1;
        equalStats.push(material.subStat2.name);
      }
    }

    // 比较属性3 (需要解析数值)
    if (material.subStat3.name === targetEquipment.subStat3.name) {
      const matVal = parseStatValue(material.subStat3.value);
      const targetVal = parseStatValue(targetEquipment.subStat3.value);
      
      if (matVal > targetVal) {
        score += 3; // 关键属性权重更高
        betterStats.push(`${material.subStat3.name} (Better)`);
      } else if (matVal === targetVal) {
        score += 1;
        equalStats.push(material.subStat3.name);
      }
    }

    return {
      equipment: material,
      score,
      betterStats,
      equalStats,
      isRecommended: betterStats.length > 0 || score >= 2
    };
  });

  // 排序：分数高的在前
  comparisons.sort((a, b) => b.score - a.score);

  return {
    recommended: comparisons.filter(c => c.isRecommended).map(c => c.equipment),
    normal: comparisons.filter(c => !c.isRecommended && c.score > 0).map(c => c.equipment),
    incompatible: comparisons.filter(c => c.score === 0).map(c => c.equipment)
  };
}

export function getComparisonDetails(target: Equipment, material: Equipment): ComparisonResult {
  let score = 0;
  const betterStats: string[] = [];
  const equalStats: string[] = [];

  // 比较属性1
  if (material.subStat1.name === target.subStat1.name) {
    if (material.subStat1.value > target.subStat1.value) {
      score += 2;
      betterStats.push(target.subStat1.name);
    } else if (material.subStat1.value === target.subStat1.value) {
      score += 1;
      equalStats.push(target.subStat1.name);
    }
  }

  // 比较属性2
  if (material.subStat2.name === target.subStat2.name) {
    if (material.subStat2.value > target.subStat2.value) {
      score += 2;
      betterStats.push(target.subStat2.name);
    } else if (material.subStat2.value === target.subStat2.value) {
      score += 1;
      equalStats.push(target.subStat2.name);
    }
  }

  // 比较属性3
  if (material.subStat3.name === target.subStat3.name) {
    const matVal = parseStatValue(material.subStat3.value);
    const targetVal = parseStatValue(target.subStat3.value);
    
    if (matVal > targetVal) {
      score += 3;
      betterStats.push(target.subStat3.name);
    } else if (matVal === targetVal) {
      score += 1;
      equalStats.push(target.subStat3.name);
    }
  }

  return {
    equipment: material,
    score,
    betterStats,
    equalStats,
    isRecommended: betterStats.length > 0
  };
}
