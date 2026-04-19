import { Equipment } from "@/types";

export type DisplayLanguage = "zh" | "en";

const SET_NAME_EN_BY_ZH: Record<string, string> = {
  "50式应龙": "Type 50 Yinglung",
  "M.I.警用": "MI Security",
  动火用: "Hot Work",
  壤流: "Xiranflow",
  拓荒: "Frontiers",
  武陵: "Wuling Stock Redistribution",
  清波: "Qingbo",
  潮涌: "Tide Surge",
  点剑: "Swordmancer",
  生物辅助: "LYNX",
  碾骨: "Bonekrusha",
  脉冲式: "Pulser Labs",
  轻超域: "Æthertech",
  长息: "Eternal Xiranite",
};

const EQUIPMENT_NAME_EN_BY_ZH: Record<string, string> = {
  纾难护甲: "Redeemer Armor",
  纾难印章: "Redeemer Seal",
  "纾难印章·壹型": "Redeemer Seal T1",
  纾难护手: "Redeemer Gloves",
  纾难重甲: "Redeemer Plates",
  纾难识别牌: "Redeemer Tag",
  "纾难识别牌·壹型": "Redeemer Tag T1",
  纾难手套: "Redeemer Hands",
  拓荒护甲: "Frontiers Armor",
  "拓荒护甲·壹型": "Frontiers Armor T1",
  "拓荒护甲·贰型": "Frontiers Armor T2",
  "拓荒护甲·叁型": "Frontiers Armor T3",
  拓荒护服: "Frontiers Protection Suit",
  拓荒耐蚀手套: "Frontiers Blight RES Gloves",
  拓荒纤维手套: "Frontiers Fiber Gloves",
  拓荒通信器: "Frontiers Comm",
  "拓荒通信器·壹型": "Frontiers Comm T1",
  拓荒分析仪: "Frontiers Analyzer",
  拓荒增量供氧栓: "Frontiers Extra O2 Tube",
  拓荒供氧栓: "Frontiers O2 Tube",
  "50式应龙重甲": "Type 50 Yinglung Heavy Armor",
  "50式应龙重甲·壹型": "Type 50 Yinglung Heavy Armor T1",
  "50式应龙重甲·贰型": "Type 50 Yinglung Heavy Armor T2",
  "50式应龙轻甲": "Type 50 Yinglung Light Armor",
  "50式应龙护手": "Type 50 Yinglung Gloves",
  "50式应龙护手·壹型": "Type 50 Yinglung Gloves T1",
  "50式应龙雷达": "Type 50 Yinglung Radar",
  "50式应龙雷达·壹型": "Type 50 Yinglung Radar T1",
  "50式应龙雷达·贰型": "Type 50 Yinglung Radar T2",
  "50式应龙短刃": "Type 50 Yinglung Knife",
  "50式应龙短刃·壹型": "Type 50 Yinglung Knife T1",
  "M.I.警用护甲": "MI Security Armor",
  "M.I.警用罩衣": "MI Security Overalls",
  "M.I.警用罩衣·壹型": "MI Security Overalls T1",
  "M.I.警用罩衣·贰型": "MI Security Overalls T2",
  "M.I.警用手套": "MI Security Gloves",
  "M.I.警用手环": "MI Security Hands PPE",
  "M.I.警用手环·壹型": "MI Security Hands PPE T1",
  "M.I.警用臂环": "MI Security Armband",
  "M.I.警用瞄具": "MI Security Scope",
  "M.I.警用工具组": "MI Security Toolkit",
  "M.I.警用刺刃": "MI Security Push Knife",
  "M.I.警用刺刃·壹型": "MI Security Push Knife T1",
  "M.I.警用护甲·壹型": "MI Security Armor T1",
  "M.I.警用手套·壹型": "MI Security Gloves T1",
  "M.I.警用瞄具·壹型": "MI Security Scope T1",
  碾骨重护甲: "Bonekrusha Heavy Armor",
  "碾骨重护甲·壹型": "Bonekrusha Heavy Armor T1",
  碾骨披巾: "Bonekrusha Poncho",
  "碾骨披巾·壹型": "Bonekrusha Poncho T1",
  碾骨腕带: "Bonekrusha Wristband",
  "碾骨腕带·壹型": "Bonekrusha Wristband T1",
  碾骨小雕像: "Bonekrusha Figurine",
  碾骨面具: "Bonekrusha Mask",
  "碾骨面具·壹型": "Bonekrusha Mask T1",
  "碾骨小雕像·壹型": "Bonekrusha Figurine T1",
  "碾骨面具·贰型": "Bonekrusha Mask T2",
  "碾骨重护甲·贰型": "Bonekrusha Heavy Armor T2",
  落潮轻甲: "Tide Fall Light Armor",
  潮涌手甲: "Tide Surge Gauntlets",
  悬河供氧栓: "Hanging River O2 Tube",
  浊流切割炬: "Turbid Cutting Torch",
  脉冲式干扰服: "Pulser Labs Disruptor Suit",
  脉冲式手套: "Pulser Labs Gloves",
  脉冲式探针: "Pulser Labs Probe",
  脉冲式校准器: "Pulser Labs Calibrator",
  脉冲式侵入核: "Pulser Labs Invasion Core",
  动火用外骨骼: "Hot Work Exoskeleton",
  动火用辅助骨骼: "Hot Work Exo-Rig",
  动火用手套: "Hot Work Gloves",
  动火用手甲: "Hot Work Gauntlets",
  "动火用手甲·壹型": "Hot Work Gauntlets T1",
  动火用储能匣: "Hot Work Power Bank",
  动火用测温镜: "Hot Work Pyrometer",
  动火用电力匣: "Hot Work Power Cartridge",
  生物辅助重甲: "LYNX Heavy Armor",
  生物辅助胸甲: "LYNX Cuirass",
  生物辅助臂甲: "LYNX Gloves",
  生物辅助手甲: "LYNX Gauntlets",
  生物辅助接驳器: "LYNX Connector",
  "生物辅助接驳器·贰型": "LYNX Connector T2",
  生物辅助护板: "LYNX Slab",
  生物辅助护盾针: "LYNX Aegis Injector",
  "生物辅助接驳器·壹型": "LYNX Connector T1",
  点剑轻装甲: "Swordmancer Light Armor",
  点剑重装甲: "Swordmancer Heavy Armor",
  点剑战术手套: "Swordmancer TAC Gloves",
  点剑战术手甲: "Swordmancer TAC Gauntlets",
  点剑定位信标: "Swordmancer NAV Beacon",
  点剑微型滤芯: "Swordmancer Micro Filter",
  点剑火石: "Swordmancer Flint",
  长息装甲: "Eternal Xiranite Armor",
  长息护手: "Eternal Xiranite Gloves",
  "长息护手·壹型": "Eternal Xiranite Gloves T1",
  长息蓄电核: "Eternal Xiranite Power Core",
  "长息蓄电核·壹型": "Eternal Xiranite Power Core T1",
  长息辅助臂: "Eternal Xiranite Auxiliary Arm",
  轻超域护板: "Æthertech Plating",
  轻超域护手: "Æthertech Gloves",
  轻超域轻护手: "Æthertech Light Gloves",
  轻超域分析环: "Æthertech Analysis Band",
  轻超域稳定盘: "Æthertech Stabilizer",
  "轻超域稳定盘·壹型": "Æthertech Stabilizer T1",
  轻超域腕表: "Æthertech Watch",
  清波重甲: "Qingbo Heavy Armor",
  清波轻甲: "Qingbo Light Armor",
  清波手甲: "Qingbo Gauntlets",
  清波护手: "Qingbo Gloves",
  清波定位仪: "Qingbo Positioning Kit",
  清波竹刃: "Qingbo Bamboo Cutter",
  清波水罐: "Qingbo Cask",
  壤流轻甲: "Xiranflow Light Armor",
  壤流护手: "Xiranflow Gloves",
  壤流短棍: "Xiranflow Baton",
  "拓荒纤维手套·壹型": "Frontiers Fiber Gloves T1",
  "拓荒增量供氧栓·壹型": "Frontiers Extra O2 Tube T1",
  碾骨手套: "Bonekrusha Gloves",
  "碾骨小雕像·贰型": "Bonekrusha Figurine T2",
  "点剑重装甲·壹型": "Swordmancer Heavy Armor T1",
  "点剑战术手甲·壹型": "Swordmancer TAC Gauntlets T1",
  点剑短刃: "Swordmancer Dagger",
};

export function getEquipmentDisplayName(
  equipment: Equipment,
  language: DisplayLanguage
): string {
  if (language === "en") {
    return EQUIPMENT_NAME_EN_BY_ZH[equipment.name] ?? equipment.name;
  }

  return equipment.name;
}

export function getSetDisplayName(
  setName: string,
  language: DisplayLanguage
): string {
  if (language === "en") {
    return SET_NAME_EN_BY_ZH[setName] ?? setName;
  }

  return setName;
}

export function getEquipmentSearchTerms(equipment: Equipment): string[] {
  const translatedName = EQUIPMENT_NAME_EN_BY_ZH[equipment.name];
  const translatedSet = SET_NAME_EN_BY_ZH[equipment.set];

  return [
    equipment.name,
    equipment.id,
    equipment.set,
    translatedName,
    translatedSet,
  ].filter(Boolean) as string[];
}

export function getEquipmentSortLabel(equipment: Equipment): string {
  return EQUIPMENT_NAME_EN_BY_ZH[equipment.name] ?? equipment.name;
}
