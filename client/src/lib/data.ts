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
  subStat1: { name: AttributeType; value: number };
  subStat2: { name: AttributeType; value: number };
  subStat3: { name: string; value: string }; // 数值可能是百分比，用字符串存储
  image: string;
}

// 属性名称映射
export const ATTRIBUTE_MAP: Record<AttributeType, string> = {
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

// 模拟装备数据 (基于爬取的数据)
// 注意：仅包含金色装备，因为用户指定只有金色装备可精锻
export const GOLD_EQUIPMENTS: Equipment[] = [
  {
    id: 'e1',
    name: '长息蓄电核',
    rarity: 'Gold',
    type: 'Accessory',
    set: '长息',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Strength', value: 21 },
    subStat2: { name: 'Intelligence', value: 32 },
    subStat3: { name: '终结技充能效率', value: '24.60%' },
    image: '/images/equipments/changxi_core.png'
  },
  {
    id: 'e2',
    name: 'M.I.警用工具组',
    rarity: 'Gold',
    type: 'Accessory',
    set: 'M.I.警用',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Intelligence', value: 32 },
    subStat2: { name: 'Agility', value: 21 },
    subStat3: { name: '暴击率', value: '10.40%' },
    image: '/images/equipments/mi_tool.png'
  },
  {
    id: 'e3',
    name: '拓荒通信器·壹型',
    rarity: 'Gold',
    type: 'Accessory',
    set: '拓荒',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Strength', value: 32 },
    subStat2: { name: 'Intelligence', value: 21 },
    subStat3: { name: '寒冷和电磁伤害', value: '23%' },
    image: '/images/equipments/tuohuang_comm.png'
  },
  {
    id: 'e4',
    name: '轻超域分析环',
    rarity: 'Gold',
    type: 'Accessory',
    set: '轻超域',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Strength', value: 32 },
    subStat2: { name: 'Willpower', value: 21 },
    subStat3: { name: '物理伤害加成', value: '23.00%' },
    image: '/images/equipments/qingchaoyu_ring.png'
  },
  {
    id: 'e5',
    name: '生物辅助重甲',
    rarity: 'Gold',
    type: 'Armor',
    set: '生物辅助',
    mainStat: { name: '防御力', value: 56 },
    subStat1: { name: 'Strength', value: 87 },
    subStat2: { name: 'Willpower', value: 58 },
    subStat3: { name: '治疗效率加成', value: '10.40%' },
    image: '/images/equipments/bio_armor.png'
  },
  {
    id: 'e6',
    name: '50式应龙护手·壹型',
    rarity: 'Gold',
    type: 'Glove',
    set: '50式应龙',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Willpower', value: 65 },
    subStat2: { name: 'Agility', value: 43 },
    subStat3: { name: '连携技伤害加成', value: '34.50%' },
    image: '/images/equipments/yinglong_glove.png'
  },
  {
    id: 'e7',
    name: '动火用储能匣',
    rarity: 'Gold',
    type: 'Accessory',
    set: '动火用',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Strength', value: 32 },
    subStat2: { name: 'Agility', value: 21 },
    subStat3: { name: '源石技艺强度', value: '41' },
    image: '/images/equipments/donghuo_box.png'
  },
  {
    id: 'e8',
    name: '碾骨面具',
    rarity: 'Gold',
    type: 'Accessory',
    set: '碾骨',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Agility', value: 32 },
    subStat2: { name: 'Strength', value: 21 },
    subStat3: { name: '对失衡目标伤害加成', value: '59.10%' },
    image: '/images/equipments/niangu_mask.png'
  },
  {
    id: 'e9',
    name: '潮涌手甲',
    rarity: 'Gold',
    type: 'Glove',
    set: '潮涌',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Strength', value: 65 },
    subStat2: { name: 'Willpower', value: 43 },
    subStat3: { name: '寒冷和电磁伤害', value: '19.20%' },
    image: '/images/equipments/chaoyong_glove.png'
  },
  {
    id: 'e10',
    name: 'M.I.警用罩衣·贰型',
    rarity: 'Gold',
    type: 'Armor',
    set: 'M.I.警用',
    mainStat: { name: '防御力', value: 56 },
    subStat1: { name: 'Willpower', value: 87 },
    subStat2: { name: 'Agility', value: 58 },
    subStat3: { name: '战技伤害加成', value: '20.70%' },
    image: '/images/equipments/mi_armor.png'
  },
  {
    id: 'e11',
    name: '脉冲式手套',
    rarity: 'Gold',
    type: 'Glove',
    set: '脉冲式',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Willpower', value: 65 },
    subStat2: { name: 'Intelligence', value: 43 },
    subStat3: { name: '寒冷和电磁伤害', value: '19.20%' },
    image: '/images/equipments/pulse_glove.png'
  },
  {
    id: 'e12',
    name: '生物辅助接驳器',
    rarity: 'Gold',
    type: 'Accessory',
    set: '生物辅助',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Strength', value: 32 },
    subStat2: { name: 'Willpower', value: 21 },
    subStat3: { name: '全伤害减免', value: '17.20%' },
    image: '/images/equipments/bio_connector.png'
  },
  {
    id: 'e13',
    name: '长息护手·壹型',
    rarity: 'Gold',
    type: 'Glove',
    set: '长息',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Willpower', value: 43 },
    subStat2: { name: 'Intelligence', value: 65 },
    subStat3: { name: '终结技充能效率', value: '20.50%' },
    image: '/images/equipments/changxi_glove.png'
  },
  {
    id: 'e14',
    name: 'M.I.警用瞄具',
    rarity: 'Gold',
    type: 'Accessory',
    set: 'M.I.警用',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Agility', value: 32 },
    subStat2: { name: 'Strength', value: 21 },
    subStat3: { name: '战技伤害加成', value: '41.40%' },
    image: '/images/equipments/mi_sight.png'
  },
  {
    id: 'e15',
    name: '拓荒耐蚀手套',
    rarity: 'Gold',
    type: 'Glove',
    set: '拓荒',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Agility', value: 65 },
    subStat2: { name: 'Intelligence', value: 43 },
    subStat3: { name: '战技伤害加成', value: '34.50%' },
    image: '/images/equipments/tuohuang_glove.png'
  },
  {
    id: 'e16',
    name: '轻超域护手',
    rarity: 'Gold',
    type: 'Accessory', // 修正：原数据可能是护手，但图片名称和分类有时混淆，这里暂按Accessory处理或修正为Glove，根据名字应为Glove，但原表分类有时不准。根据名称改为Glove
    set: '轻超域',
    mainStat: { name: '防御力', value: 21 }, // 注意：如果是护手防御力通常是42，这里原表数据是21，可能是配件。暂按原表数据21归为配件
    subStat1: { name: 'Agility', value: 32 },
    subStat2: { name: 'Strength', value: 21 },
    subStat3: { name: '源石技艺强度', value: '34' },
    image: '/images/equipments/qingchaoyu_glove.png'
  },
  {
    id: 'e17',
    name: '点剑火石',
    rarity: 'Gold',
    type: 'Accessory',
    set: '点剑',
    mainStat: { name: '防御力', value: 21 },
    subStat1: { name: 'Agility', value: 32 },
    subStat2: { name: 'Strength', value: 21 },
    subStat3: { name: '物理伤害加成', value: '23.00%' },
    image: '/images/equipments/dianjian_stone.png'
  },
  {
    id: 'e18',
    name: '50式应龙护手',
    rarity: 'Gold',
    type: 'Glove',
    set: '50式应龙',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Agility', value: 65 },
    subStat2: { name: 'Intelligence', value: 43 },
    subStat3: { name: '连携技伤害加成', value: '34.50%' },
    image: '/images/equipments/yinglong_glove_normal.png'
  },
  {
    id: 'e19',
    name: '动火用手甲·壹型',
    rarity: 'Gold',
    type: 'Glove',
    set: '动火用',
    mainStat: { name: '防御力', value: 42 },
    subStat1: { name: 'Willpower', value: 65 },
    subStat2: { name: 'Intelligence', value: 43 },
    subStat3: { name: '灼热和自然伤害', value: '19.20%' },
    image: '/images/equipments/donghuo_glove.png'
  },
  {
    id: 'e20',
    name: '碾骨披巾·壹型',
    rarity: 'Gold',
    type: 'Armor',
    set: '碾骨',
    mainStat: { name: '防御力', value: 56 },
    subStat1: { name: 'Willpower', value: 87 },
    subStat2: { name: 'Agility', value: 58 },
    subStat3: { name: '终结技充能效率', value: '12.30%' },
    image: '/images/equipments/niangu_cape.png'
  }
];

// 辅助函数：解析百分比数值字符串为数字
export function parseStatValue(val: string): number {
  if (val.includes('%')) {
    return parseFloat(val.replace('%', ''));
  }
  return parseFloat(val);
}
