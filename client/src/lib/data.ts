// 装备数据类型定义
export type Rarity = 'Gold' | 'Purple' | 'Blue' | 'Green' | 'White';
export type EquipmentType = 'Accessory' | 'Glove' | 'Armor';
export type AttributeType = 'Agility' | 'Intelligence' | 'Strength' | 'Willpower';

export interface Equipment {
  id: string;
  name: string;
  rarity: Rarity;
  type: EquipmentType;
  set: string;
  mainStat: { name: string; value: number };
  subStat1: { name: AttributeType | string; value: number };
  subStat2: { name: AttributeType | string; value: number };
  subStat3: { name: string; value: string | number };
  image: string;
}

// 属性名称映射
export const ATTRIBUTE_MAP: Record<string, string> = {
  'Agility': '敏捷',
  'Intelligence': '智识',
  'Strength': '力量',
  'Willpower': '意志'
};

export const TYPE_MAP: Record<EquipmentType, string> = {
  'Accessory': '配件',
  'Glove': '护手',
  'Armor': '护甲'
};

// 全量金色装备数据 (70件)
export const GOLD_EQUIPMENTS: Equipment[] = [
  {
    "id": "e_1",
    "name": "长息蓄电核",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 32.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "24.60%"
    },
    "image": "/images/equipments/changxi_core.png"
  },
  {
    "id": "e_2",
    "name": "M.I.警用工具组",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 32.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 21.0
    },
    "subStat3": {
      "name": "暴击率",
      "value": "10.40%"
    },
    "image": "/images/equipments/mi_tool.png"
  },
  {
    "id": "e_3",
    "name": "拓荒通信器·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 21.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "23%"
    },
    "image": "/images/equipments/tuohuang_comm.png"
  },
  {
    "id": "e_4",
    "name": "轻超域分析环",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "轻超域",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/qingchaoyu_ring.png"
  },
  {
    "id": "e_5",
    "name": "生物辅助重甲",
    "rarity": "Gold",
    "type": "Armor",
    "set": "生物辅助",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 87.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 58.0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "10.40%"
    },
    "image": "/images/equipments/bio_armor.png"
  },
  {
    "id": "e_6",
    "name": "50式应龙护手·壹型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "50式应龙",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 43.0
    },
    "subStat3": {
      "name": "连携技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/yinglong_glove.png"
  },
  {
    "id": "e_7",
    "name": "动火用储能匣",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 21.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 41.0
    },
    "image": "/images/equipments/donghuo_box.png"
  },
  {
    "id": "e_8",
    "name": "纾难印章·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "武陵",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat2": {
      "name": "",
      "value": 0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "21.60%"
    },
    "image": "/images/equipments/shunan_seal.png"
  },
  {
    "id": "e_9",
    "name": "碾骨面具",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "碾骨",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "对失衡目标伤害加成",
      "value": "59.10%"
    },
    "image": "/images/equipments/niangu_mask.png"
  },
  {
    "id": "e_10",
    "name": "潮涌手甲",
    "rarity": "Gold",
    "type": "Glove",
    "set": "潮涌",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 65.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/chaoyong_glove.png"
  },
  {
    "id": "e_11",
    "name": "M.I.警用罩衣·贰型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 58.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "20.70%"
    },
    "image": "/images/equipments/mi_armor.png"
  },
  {
    "id": "e_12",
    "name": "脉冲式手套",
    "rarity": "Gold",
    "type": "Glove",
    "set": "脉冲式",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/pulse_glove.png"
  },
  {
    "id": "e_13",
    "name": "生物辅助接驳器",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "生物辅助",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 21.0
    },
    "subStat3": {
      "name": "全伤害减免",
      "value": "17.20%"
    },
    "image": "/images/equipments/bio_connector.png"
  },
  {
    "id": "e_14",
    "name": "长息护手·壹型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 65.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "20.50%"
    },
    "image": "/images/equipments/changxi_glove.png"
  },
  {
    "id": "e_15",
    "name": "M.I.警用瞄具",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "41.40%"
    },
    "image": "/images/equipments/mi_sight.png"
  },
  {
    "id": "e_16",
    "name": "拓荒耐蚀手套",
    "rarity": "Gold",
    "type": "Glove",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/tuohuang_glove.png"
  },
  {
    "id": "e_17",
    "name": "轻超域护手",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "轻超域",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 34.0
    },
    "image": "/images/equipments/qingchaoyu_glove.png"
  },
  {
    "id": "e_18",
    "name": "点剑火石",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "点剑",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/dianjian_stone.png"
  },
  {
    "id": "e_19",
    "name": "50式应龙护手",
    "rarity": "Gold",
    "type": "Glove",
    "set": "50式应龙",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "连携技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/yinglong_glove.png"
  },
  {
    "id": "e_20",
    "name": "动火用手甲·壹型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "灼热和自然伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/donghuo_glove.png"
  },
  {
    "id": "e_21",
    "name": "纾难印章",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "武陵",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat2": {
      "name": "",
      "value": 0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "21.60%"
    },
    "image": "/images/equipments/shunan_seal.png"
  },
  {
    "id": "e_22",
    "name": "碾骨披巾·壹型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "碾骨",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 58.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "12.30%"
    },
    "image": "/images/equipments/niangu_cape.png"
  },
  {
    "id": "e_23",
    "name": "落潮轻甲",
    "rarity": "Gold",
    "type": "Armor",
    "set": "潮涌",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 87.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 58.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "12.30%"
    },
    "image": "/images/equipments/luochao_armor.png"
  },
  {
    "id": "e_24",
    "name": "M.I.警用罩衣",
    "rarity": "Gold",
    "type": "Armor",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 58.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "20.70%"
    },
    "image": "/images/equipments/mi_armor.png"
  },
  {
    "id": "e_25",
    "name": "脉冲式手套·壹型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "脉冲式",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/pulse_glove.png"
  },
  {
    "id": "e_26",
    "name": "生物辅助接驳器·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "生物辅助",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 21.0
    },
    "subStat3": {
      "name": "全伤害减免",
      "value": "17.20%"
    },
    "image": "/images/equipments/bio_connector.png"
  },
  {
    "id": "e_27",
    "name": "长息护手",
    "rarity": "Gold",
    "type": "Glove",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 65.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "20.50%"
    },
    "image": "/images/equipments/changxi_glove.png"
  },
  {
    "id": "e_28",
    "name": "M.I.警用瞄具·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "41.40%"
    },
    "image": "/images/equipments/mi_sight.png"
  },
  {
    "id": "e_29",
    "name": "拓荒耐蚀手套·壹型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/tuohuang_glove.png"
  },
  {
    "id": "e_30",
    "name": "轻超域护手·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "轻超域",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 34.0
    },
    "image": "/images/equipments/qingchaoyu_glove.png"
  },
  {
    "id": "e_31",
    "name": "点剑火石·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "点剑",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/dianjian_stone.png"
  },
  {
    "id": "e_32",
    "name": "长息蓄电核·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 32.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "24.60%"
    },
    "image": "/images/equipments/changxi_core.png"
  },
  {
    "id": "e_33",
    "name": "M.I.警用工具组·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 32.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 21.0
    },
    "subStat3": {
      "name": "暴击率",
      "value": "10.40%"
    },
    "image": "/images/equipments/mi_tool.png"
  },
  {
    "id": "e_34",
    "name": "拓荒通信器",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 21.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "23%"
    },
    "image": "/images/equipments/tuohuang_comm.png"
  },
  {
    "id": "e_35",
    "name": "轻超域分析环·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "轻超域",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/qingchaoyu_ring.png"
  },
  {
    "id": "e_36",
    "name": "生物辅助重甲·壹型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "生物辅助",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 87.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 58.0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "10.40%"
    },
    "image": "/images/equipments/bio_armor.png"
  },
  {
    "id": "e_37",
    "name": "动火用储能匣·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 21.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 41.0
    },
    "image": "/images/equipments/donghuo_box.png"
  },
  {
    "id": "e_38",
    "name": "碾骨面具·壹型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "碾骨",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "对失衡目标伤害加成",
      "value": "59.10%"
    },
    "image": "/images/equipments/niangu_mask.png"
  },
  {
    "id": "e_39",
    "name": "潮涌手甲·壹型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "潮涌",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 65.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/chaoyong_glove.png"
  },
  {
    "id": "e_40",
    "name": "长息防护服",
    "rarity": "Gold",
    "type": "Armor",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 87.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 58.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "12.30%"
    },
    "image": "/images/equipments/changxi_armor.png"
  },
  {
    "id": "e_41",
    "name": "M.I.警用工具组·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 32.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 21.0
    },
    "subStat3": {
      "name": "暴击率",
      "value": "10.40%"
    },
    "image": "/images/equipments/mi_tool.png"
  },
  {
    "id": "e_42",
    "name": "拓荒通信器·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 21.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "23%"
    },
    "image": "/images/equipments/tuohuang_comm.png"
  },
  {
    "id": "e_43",
    "name": "轻超域分析环·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "轻超域",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/qingchaoyu_ring.png"
  },
  {
    "id": "e_44",
    "name": "生物辅助重甲·贰型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "生物辅助",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 87.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 58.0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "10.40%"
    },
    "image": "/images/equipments/bio_armor.png"
  },
  {
    "id": "e_45",
    "name": "50式应龙护手·贰型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "50式应龙",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 43.0
    },
    "subStat3": {
      "name": "连携技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/yinglong_glove.png"
  },
  {
    "id": "e_46",
    "name": "动火用储能匣·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 21.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 41.0
    },
    "image": "/images/equipments/donghuo_box.png"
  },
  {
    "id": "e_47",
    "name": "纾难印章·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "武陵",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat2": {
      "name": "",
      "value": 0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "21.60%"
    },
    "image": "/images/equipments/shunan_seal.png"
  },
  {
    "id": "e_48",
    "name": "碾骨面具·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "碾骨",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "对失衡目标伤害加成",
      "value": "59.10%"
    },
    "image": "/images/equipments/niangu_mask.png"
  },
  {
    "id": "e_49",
    "name": "潮涌手甲·贰型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "潮涌",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 65.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/chaoyong_glove.png"
  },
  {
    "id": "e_50",
    "name": "M.I.警用罩衣·壹型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 58.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "20.70%"
    },
    "image": "/images/equipments/mi_armor.png"
  },
  {
    "id": "e_51",
    "name": "脉冲式手套·贰型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "脉冲式",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/pulse_glove.png"
  },
  {
    "id": "e_52",
    "name": "生物辅助接驳器·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "生物辅助",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Willpower",
      "value": 21.0
    },
    "subStat3": {
      "name": "全伤害减免",
      "value": "17.20%"
    },
    "image": "/images/equipments/bio_connector.png"
  },
  {
    "id": "e_53",
    "name": "长息护手·贰型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 65.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "20.50%"
    },
    "image": "/images/equipments/changxi_glove.png"
  },
  {
    "id": "e_54",
    "name": "M.I.警用瞄具·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "M.I.警用",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "41.40%"
    },
    "image": "/images/equipments/mi_sight.png"
  },
  {
    "id": "e_55",
    "name": "拓荒耐蚀手套·贰型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "战技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/tuohuang_glove.png"
  },
  {
    "id": "e_56",
    "name": "轻超域护手·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "轻超域",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 34.0
    },
    "image": "/images/equipments/qingchaoyu_glove.png"
  },
  {
    "id": "e_57",
    "name": "点剑火石·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "点剑",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/dianjian_stone.png"
  },
  {
    "id": "e_58",
    "name": "长息蓄电核·贰型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 32.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "24.60%"
    },
    "image": "/images/equipments/changxi_core.png"
  },
  {
    "id": "e_59",
    "name": "50式应龙护手·三型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "50式应龙",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 43.0
    },
    "subStat3": {
      "name": "连携技伤害加成",
      "value": "34.50%"
    },
    "image": "/images/equipments/yinglong_glove.png"
  },
  {
    "id": "e_60",
    "name": "动火用手甲·贰型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "灼热和自然伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/donghuo_glove.png"
  },
  {
    "id": "e_61",
    "name": "纾难印章·三型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "武陵",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 43.0
    },
    "subStat2": {
      "name": "",
      "value": 0
    },
    "subStat3": {
      "name": "治疗效率加成",
      "value": "21.60%"
    },
    "image": "/images/equipments/shunan_seal.png"
  },
  {
    "id": "e_62",
    "name": "碾骨披巾·贰型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "碾骨",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Agility",
      "value": 58.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "12.30%"
    },
    "image": "/images/equipments/niangu_cape.png"
  },
  {
    "id": "e_63",
    "name": "落潮轻甲·壹型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "潮涌",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 87.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 58.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "12.30%"
    },
    "image": "/images/equipments/luochao_armor.png"
  },
  {
    "id": "e_64",
    "name": "长息防护服·壹型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "长息",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Intelligence",
      "value": 87.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 58.0
    },
    "subStat3": {
      "name": "终结技充能效率",
      "value": "12.30%"
    },
    "image": "/images/equipments/changxi_armor.png"
  },
  {
    "id": "e_65",
    "name": "动火用外骨骼",
    "rarity": "Gold",
    "type": "Armor",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 58.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 24.6
    },
    "image": "/images/equipments/donghuo_armor.png"
  },
  {
    "id": "e_66",
    "name": "动火用外骨骼·壹型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 58.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 24.6
    },
    "image": "/images/equipments/donghuo_armor.png"
  },
  {
    "id": "e_67",
    "name": "动火用外骨骼·贰型",
    "rarity": "Gold",
    "type": "Armor",
    "set": "动火用",
    "mainStat": {
      "name": "防御力",
      "value": 56.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 87.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 58.0
    },
    "subStat3": {
      "name": "源石技艺强度",
      "value": 24.6
    },
    "image": "/images/equipments/donghuo_armor.png"
  },
  {
    "id": "e_68",
    "name": "点剑火石·三型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "点剑",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Agility",
      "value": 32.0
    },
    "subStat2": {
      "name": "Strength",
      "value": 21.0
    },
    "subStat3": {
      "name": "物理伤害加成",
      "value": "23.00%"
    },
    "image": "/images/equipments/dianjian_stone.png"
  },
  {
    "id": "e_69",
    "name": "脉冲式手套·三型",
    "rarity": "Gold",
    "type": "Glove",
    "set": "脉冲式",
    "mainStat": {
      "name": "防御力",
      "value": 42.0
    },
    "subStat1": {
      "name": "Willpower",
      "value": 65.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 43.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "19.20%"
    },
    "image": "/images/equipments/pulse_glove.png"
  },
  {
    "id": "e_70",
    "name": "拓荒通信器·三型",
    "rarity": "Gold",
    "type": "Accessory",
    "set": "拓荒",
    "mainStat": {
      "name": "防御力",
      "value": 21.0
    },
    "subStat1": {
      "name": "Strength",
      "value": 32.0
    },
    "subStat2": {
      "name": "Intelligence",
      "value": 21.0
    },
    "subStat3": {
      "name": "寒冷和电磁伤害",
      "value": "23%"
    },
    "image": "/images/equipments/tuohuang_comm.png"
  }
];

export function parseStatValue(valueStr: string): number {
  if (!valueStr) return 0;
  // 移除百分号
  const cleanStr = valueStr.replace('%', '');
  return parseFloat(cleanStr);
}
