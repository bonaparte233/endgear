import { Equipment, GOLD_EQUIPMENTS, parseStatValue, ATTRIBUTE_MAP } from './data';

export type MatchType = 'Better' | 'Standard' | 'Incompatible';

export interface AttributeMatch {
  attributeName: string; // 属性名（如 "意志"）
  attributeKey: string; // 属性键（如 "subStat1"）
  targetValue: number;
  materials: MaterialMatch[];
}

export interface MaterialMatch {
  equipment: Equipment;
  value: number;
  matchType: MatchType;
  diff: number; // 差值
}

export function findForgeMaterials(targetEquipment: Equipment): AttributeMatch[] {
  // 1. 筛选同类型装备 (必须是同部位)
  const sameTypeEquipments = GOLD_EQUIPMENTS.filter(
    e => e.type === targetEquipment.type && e.id !== targetEquipment.id
  );

  const results: AttributeMatch[] = [];

  // 处理副属性1
  results.push(processAttribute(
    targetEquipment, 
    'subStat1', 
    sameTypeEquipments
  ));

  // 处理副属性2
  results.push(processAttribute(
    targetEquipment, 
    'subStat2', 
    sameTypeEquipments
  ));

  // 处理副属性3
  results.push(processAttribute(
    targetEquipment, 
    'subStat3', 
    sameTypeEquipments
  ));

  return results;
}

function processAttribute(
  target: Equipment, 
  statKey: 'subStat1' | 'subStat2' | 'subStat3', 
  candidates: Equipment[]
): AttributeMatch {
  const targetStat = target[statKey];
  const targetValue = parseStatValue(targetStat.value.toString());
  const attrName = statKey === 'subStat3' ? targetStat.name : ATTRIBUTE_MAP[targetStat.name as keyof typeof ATTRIBUTE_MAP];

  const materials: MaterialMatch[] = [];

  candidates.forEach(cand => {
    // 只有当材料也有这个属性时才能用于精锻该属性
    // 注意：副属性1和2通常是固定的几种属性，副属性3种类很多
    // 简化逻辑：只要材料的对应位置属性名相同，或者我们在所有副属性中查找同名属性？
    // 根据游戏机制，通常是拿"同类型装备"做材料。
    // 如果材料的对应属性名不同，显然无法比较数值。
    // 所以我们需要在材料的三个副属性中找到同名属性。
    
    let foundStat = null;
    let foundValue = 0;

    // 在材料的三个副属性中寻找同名属性
    if (getStatName(cand.subStat1) === getStatName(targetStat)) {
      foundStat = cand.subStat1;
    } else if (getStatName(cand.subStat2) === getStatName(targetStat)) {
      foundStat = cand.subStat2;
    } else if (getStatName(cand.subStat3) === getStatName(targetStat)) {
      foundStat = cand.subStat3;
    }

    if (foundStat) {
      foundValue = parseStatValue(foundStat.value.toString());
      
      let matchType: MatchType = 'Incompatible';
      if (foundValue > targetValue) {
        matchType = 'Better';
      } else if (foundValue === targetValue) {
        matchType = 'Standard';
      }

      if (matchType !== 'Incompatible') {
        materials.push({
          equipment: cand,
          value: foundValue,
          matchType,
          diff: foundValue - targetValue
        });
      }
    }
  });

  // 排序：Better 优先，然后按数值降序（虽然Better肯定比Standard大，但同为Better可能有更大）
  materials.sort((a, b) => {
    if (a.matchType === 'Better' && b.matchType !== 'Better') return -1;
    if (b.matchType === 'Better' && a.matchType !== 'Better') return 1;
    return b.value - a.value;
  });

  return {
    attributeName: attrName,
    attributeKey: statKey,
    targetValue,
    materials
  };
}

function getStatName(stat: { name: string }): string {
  return ATTRIBUTE_MAP[stat.name as keyof typeof ATTRIBUTE_MAP] || stat.name;
}
