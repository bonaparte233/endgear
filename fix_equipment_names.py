import re
import json

# Wiki 数据映射表，Key 为去除了文件后缀的图片名（即装备名），Value 为包含完整属性的字典
wiki_data = {
    "长息蓄电核": {"name": "长息蓄电核", "type": "Accessory", "set": "长息", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 21}, {"name": "智识", "value": 32}, {"name": "终结技充能效率", "value": "24.60%"}]},
    "M.I.警用工具组": {"name": "M.I.警用工具组", "type": "Accessory", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 32}, {"name": "敏捷", "value": 21}, {"name": "暴击率", "value": "10.40%"}]},
    "拓荒通信器·壹型": {"name": "拓荒通信器·壹型", "type": "Accessory", "set": "拓荒", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "智识", "value": 21}, {"name": "寒冷和电磁伤害", "value": "23%"}]},
    "轻超域分析环": {"name": "轻超域分析环", "type": "Accessory", "set": "轻超域", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "意志", "value": 21}, {"name": "物理伤害加成", "value": "23.00%"}]},
    "生物辅助重甲": {"name": "生物辅助重甲", "type": "Armor", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "力量", "value": 87}, {"name": "意志", "value": 58}, {"name": "治疗效率加成", "value": "10.40%"}]},
    "50式应龙护手·壹型": {"name": "50式应龙护手·壹型", "type": "Glove", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "意志", "value": 65}, {"name": "敏捷", "value": 43}, {"name": "连携技伤害加成", "value": "34.50%"}]},
    "动火用储能匣": {"name": "动火用储能匣", "type": "Accessory", "set": "动火用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "敏捷", "value": 21}, {"name": "源石技艺强度", "value": 41}]},
    "纾难印章·壹型": {"name": "纾难印章·壹型", "type": "Accessory", "set": "武陵", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 43}, {"name": "暴击率", "value": "10.80%"}]},
    "碾骨面具": {"name": "碾骨面具", "type": "Accessory", "set": "碾骨", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 32}, {"name": "力量", "value": 21}, {"name": "对失衡目标伤害加成", "value": "59.10%"}]},
    "潮涌手甲": {"name": "潮涌手甲", "type": "Glove", "set": "潮涌", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "力量", "value": 65}, {"name": "意志", "value": 43}, {"name": "寒冷和电磁伤害", "value": "19.20%"}]},
    "M.I.警用罩衣·贰型": {"name": "M.I.警用罩衣·贰型", "type": "Armor", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "意志", "value": 87}, {"name": "敏捷", "value": 58}, {"name": "战技伤害加成", "value": "20.70%"}]},
    "脉冲式手套": {"name": "脉冲式手套", "type": "Glove", "set": "脉冲式", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "意志", "value": 65}, {"name": "智识", "value": 43}, {"name": "寒冷和电磁伤害", "value": "19.20%"}]},
    "生物辅助接驳器": {"name": "生物辅助接驳器", "type": "Accessory", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "意志", "value": 21}, {"name": "全伤害减免", "value": "17.20%"}]},
    "长息护手·壹型": {"name": "长息护手·壹型", "type": "Glove", "set": "长息", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "意志", "value": 43}, {"name": "智识", "value": 65}, {"name": "终结技充能效率", "value": "20.50%"}]},
    "M.I.警用瞄具": {"name": "M.I.警用瞄具", "type": "Accessory", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 32}, {"name": "力量", "value": 21}, {"name": "战技伤害加成", "value": "41.40%"}]},
    "拓荒耐蚀手套": {"name": "拓荒耐蚀手套", "type": "Glove", "set": "拓荒", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "敏捷", "value": 65}, {"name": "智识", "value": 43}, {"name": "战技伤害加成", "value": "34.50%"}]},
    "轻超域护手": {"name": "轻超域护手", "type": "Glove", "set": "轻超域", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "力量", "value": 65}, {"name": "意志", "value": 43}, {"name": "源石技艺强度", "value": 34}]},
    "点剑火石": {"name": "点剑火石", "type": "Accessory", "set": "点剑", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 32}, {"name": "力量", "value": 21}, {"name": "物理伤害加成", "value": "23.00%"}]},
    "50式应龙护手": {"name": "50式应龙护手", "type": "Glove", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "敏捷", "value": 65}, {"name": "智识", "value": 43}, {"name": "连携技伤害加成", "value": "34.50%"}]},
    "动火用手甲·壹型": {"name": "动火用手甲·壹型", "type": "Glove", "set": "动火用", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "意志", "value": 65}, {"name": "智识", "value": 43}, {"name": "灼热和自然伤害", "value": "19.20%"}]},
    "纾难印章": {"name": "纾难印章", "type": "Accessory", "set": "武陵", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 43}, {"name": "终结技充能效率", "value": "25.70%"}]},
    "碾骨披巾·壹型": {"name": "碾骨披巾·壹型", "type": "Armor", "set": "碾骨", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "意志", "value": 87}, {"name": "敏捷", "value": 58}, {"name": "终结技充能效率", "value": "12.30%"}]},
    "落潮轻甲": {"name": "落潮轻甲", "type": "Armor", "set": "潮涌", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "智识", "value": 87}, {"name": "力量", "value": 58}, {"name": "终结技充能效率", "value": "12.30%"}]},
    "M.I.警用罩衣": {"name": "M.I.警用罩衣", "type": "Armor", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "智识", "value": 87}, {"name": "敏捷", "value": 58}, {"name": "普通攻击伤害加成", "value": "13.80%"}]},
    "脉冲式干扰服": {"name": "脉冲式干扰服", "type": "Armor", "set": "脉冲式", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "智识", "value": 87}, {"name": "意志", "value": 58}, {"name": "源石技艺强度", "value": 20}]},
    "生物辅助手甲": {"name": "生物辅助手甲", "type": "Glove", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "意志", "value": 65}, {"name": "力量", "value": 43}, {"name": "治疗效率加成", "value": "17.30%"}]},
    "长息护手": {"name": "长息护手", "type": "Glove", "set": "长息", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "力量", "value": 43}, {"name": "智识", "value": 65}, {"name": "终结技充能效率", "value": "20.50%"}]},
    "M.I.警用臂环": {"name": "M.I.警用臂环", "type": "Accessory", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "意志", "value": 21}, {"name": "寒冷和电磁伤害", "value": "23%"}]},
    "拓荒护甲·叁型": {"name": "拓荒护甲·叁型", "type": "Armor", "set": "拓荒", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "敏捷", "value": 87}, {"name": "智识", "value": 58}, {"name": "副能力", "value": "10.40%"}]},
    "轻超域护板": {"name": "轻超域护板", "type": "Armor", "set": "轻超域", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "力量", "value": 87}, {"name": "意志", "value": 58}, {"name": "对失衡目标伤害加成", "value": "29.60%"}]},
    "点剑战术手甲": {"name": "点剑战术手甲", "type": "Glove", "set": "点剑", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "敏捷", "value": 65}, {"name": "力量", "value": 43}, {"name": "终结技伤害加成", "value": "43.10%"}]},
    "50式应龙轻甲": {"name": "50式应龙轻甲", "type": "Armor", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "意志", "value": 87}, {"name": "力量", "value": 58}, {"name": "所有技能伤害", "value": "13.80%"}]},
    "动火用手甲": {"name": "动火用手甲", "type": "Glove", "set": "动火用", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "智识", "value": 65}, {"name": "力量", "value": 43}, {"name": "灼热和自然伤害", "value": "19.20%"}]},
    "纾难识别牌·壹型": {"name": "纾难识别牌·壹型", "type": "Accessory", "set": "武陵", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 43}, {"name": "连携技伤害加成", "value": "43.20%"}]},
    "碾骨披巾": {"name": "碾骨披巾", "type": "Armor", "set": "碾骨", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "意志", "value": 87}, {"name": "力量", "value": 58}, {"name": "连携技伤害加成", "value": "20.70%"}]},
    "50式应龙短刃·壹型": {"name": "50式应龙短刃·壹型", "type": "Accessory", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 32}, {"name": "力量", "value": 21}, {"name": "所有技能伤害", "value": "27.60%"}]},
    "M.I.警用护甲": {"name": "M.I.警用护甲", "type": "Armor", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "敏捷", "value": 87}, {"name": "力量", "value": 58}, {"name": "源石技艺强度", "value": 20}]},
    "碾骨小雕像·壹型": {"name": "碾骨小雕像·壹型", "type": "Accessory", "set": "碾骨", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 32}, {"name": "智识", "value": 21}, {"name": "连携技伤害加成", "value": "41.40%"}]},
    "轻超域稳定盘": {"name": "轻超域稳定盘", "type": "Accessory", "set": "轻超域", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 32}, {"name": "力量", "value": 21}, {"name": "源石技艺强度", "value": 41}]},
    "长息装甲": {"name": "长息装甲", "type": "Armor", "set": "长息", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "意志", "value": 87}, {"name": "智识", "value": 58}, {"name": "源石技艺强度", "value": 20}]},
    "M.I.警用手环·壹型": {"name": "M.I.警用手环·壹型", "type": "Glove", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "智识", "value": 65}, {"name": "意志", "value": 43}, {"name": "暴击率", "value": "8.60%"}]},
    "拓荒护甲·贰型": {"name": "拓荒护甲·贰型", "type": "Armor", "set": "拓荒", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "敏捷", "value": 87}, {"name": "智识", "value": 58}, {"name": "战技伤害加成", "value": "20.70%"}]},
    "拓荒护甲·壹型": {"name": "拓荒护甲·壹型", "type": "Armor", "set": "拓荒", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "力量", "value": 87}, {"name": "敏捷", "value": 58}, {"name": "战技伤害加成", "value": "20.70%"}]},
    "生物辅助护盾针": {"name": "生物辅助护盾针", "type": "Accessory", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 41}, {"name": "治疗效率加成", "value": "20.70%"}]},
    "长息辅助臂": {"name": "长息辅助臂", "type": "Accessory", "set": "长息", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "意志", "value": 32}, {"name": "智识", "value": 21}, {"name": "终结技充能效率", "value": "24.60%"}]},
    "点剑战术手套": {"name": "点剑战术手套", "type": "Glove", "set": "点剑", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "力量", "value": 65}, {"name": "意志", "value": 43}, {"name": "物理伤害加成", "value": "19.20%"}]},
    "50式应龙重甲": {"name": "50式应龙重甲", "type": "Armor", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "力量", "value": 87}, {"name": "意志", "value": 58}, {"name": "物理伤害加成", "value": "11.50%"}]},
    "动火用外骨骼": {"name": "动火用外骨骼", "type": "Armor", "set": "动火用", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "力量", "value": 87}, {"name": "敏捷", "value": 58}, {"name": "灼热和自然伤害", "value": "11.50%"}]},
    "纾难识别牌": {"name": "纾难识别牌", "type": "Accessory", "set": "武陵", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 43}, {"name": "全伤害减免", "value": "17.80%"}]},
    "碾骨重护甲·壹型": {"name": "碾骨重护甲·壹型", "type": "Armor", "set": "碾骨", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "敏捷", "value": 87}, {"name": "力量", "value": 58}, {"name": "连携技伤害加成", "value": "20.70%"}]},
    "生物辅助臂甲": {"name": "生物辅助臂甲", "type": "Glove", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "力量", "value": 65}, {"name": "意志", "value": 43}, {"name": "终结技充能效率", "value": "20.50%"}]},
    "50式应龙短刃": {"name": "50式应龙短刃", "type": "Accessory", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 32}, {"name": "敏捷", "value": 21}, {"name": "连携技伤害加成", "value": "41.40%"}]},
    "动火用电力匣": {"name": "动火用电力匣", "type": "Accessory", "set": "动火用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 32}, {"name": "智识", "value": 21}, {"name": "源石技艺强度", "value": 41}]},
    "碾骨小雕像": {"name": "碾骨小雕像", "type": "Accessory", "set": "碾骨", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 32}, {"name": "敏捷", "value": 21}, {"name": "战技伤害加成", "value": "41.40%"}]},
    "浊流切割炬": {"name": "浊流切割炬", "type": "Accessory", "set": "潮涌", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 21}, {"name": "智识", "value": 32}, {"name": "普通攻击伤害加成", "value": "27.60%"}]},
    "M.I.警用手环": {"name": "M.I.警用手环", "type": "Glove", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "智识", "value": 65}, {"name": "敏捷", "value": 43}, {"name": "普通攻击伤害加成", "value": "23%"}]},
    "拓荒护甲": {"name": "拓荒护甲", "type": "Armor", "set": "拓荒", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "力量", "value": 87}, {"name": "智识", "value": 58}, {"name": "终结技伤害加成", "value": "25.90%"}]},
    "生物辅助护板": {"name": "生物辅助护板", "type": "Accessory", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 32}, {"name": "智识", "value": 21}, {"name": "主能力", "value": "20.70%"}]},
    "长息蓄电核·壹型": {"name": "长息蓄电核·壹型", "type": "Accessory", "set": "长息", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 21}, {"name": "智识", "value": 32}, {"name": "治疗效率加成", "value": "20.70%"}]},
    "点剑重装甲": {"name": "点剑重装甲", "type": "Armor", "set": "点剑", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "敏捷", "value": 87}, {"name": "力量", "value": 58}, {"name": "源石技艺强度", "value": 20}]},
    "M.I.警用刺刃·壹型": {"name": "M.I.警用刺刃·壹型", "type": "Accessory", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 32}, {"name": "敏捷", "value": 21}, {"name": "战技伤害加成", "value": "41.40%"}]},
    "拓荒增量供氧栓": {"name": "拓荒增量供氧栓", "type": "Accessory", "set": "拓荒", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 32}, {"name": "智识", "value": 21}, {"name": "副能力", "value": "20.70%"}]},
    "碾骨重护甲": {"name": "碾骨重护甲", "type": "Armor", "set": "碾骨", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "敏捷", "value": 87}, {"name": "智识", "value": 58}, {"name": "终结技充能效率", "value": "12.30%"}]},
    "生物辅助胸甲": {"name": "生物辅助胸甲", "type": "Armor", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 56}, "subStats": [{"name": "意志", "value": 87}, {"name": "智识", "value": 58}, {"name": "治疗效率加成", "value": "10.40%"}]},
    "50式应龙雷达": {"name": "50式应龙雷达", "type": "Accessory", "set": "50式应龙", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "意志", "value": 21}, {"name": "物理伤害加成", "value": "23%"}]},
    "动火用测温镜": {"name": "动火用测温镜", "type": "Accessory", "set": "动火用", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 41}, {"name": "战技伤害加成", "value": "41.40%"}]},
    "碾骨面具·壹型": {"name": "碾骨面具·壹型", "type": "Accessory", "set": "碾骨", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 32}, {"name": "力量", "value": 21}, {"name": "暴击率", "value": "10.40%"}]},
    "悬河供氧栓": {"name": "悬河供氧栓", "type": "Accessory", "set": "潮涌", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "意志", "value": 21}, {"name": "寒冷和电磁伤害", "value": "23%"}]},
    "M.I.警用手套": {"name": "M.I.警用手套", "type": "Glove", "set": "M.I.警用", "mainStat": {"name": "防御力", "value": 42}, "subStats": [{"name": "敏捷", "value": 65}, {"name": "力量", "value": 43}, {"name": "战技伤害加成", "value": "34.50%"}]},
    "脉冲式校准器": {"name": "脉冲式校准器", "type": "Accessory", "set": "脉冲式", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 41}, {"name": "源石技艺强度", "value": 41}]},
    "生物辅助接驳器·壹型": {"name": "生物辅助接驳器·壹型", "type": "Accessory", "set": "生物辅助", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 32}, {"name": "意志", "value": 21}, {"name": "生命值", "value": "41.40%"}]},
    "蚀电屏蔽扳手": {"name": "蚀电屏蔽扳手", "type": "Accessory", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "智识", "value": 21}, {"name": "攻击力", "value": "10.50%"}]},
    "巡行信使夹克": {"name": "巡行信使夹克", "type": "Armor", "set": "巡行信使", "mainStat": {"name": "防御力", "value": 28}, "subStats": [{"name": "智识", "value": 44}, {"name": "敏捷", "value": 29}, {"name": "攻击力", "value": 16}]},
    "矿场压缩核": {"name": "矿场压缩核", "type": "Accessory", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "智识", "value": 22}, {"name": "暴击率", "value": "5.70%"}]},
    "蚀电防护扳手": {"name": "蚀电防护扳手", "type": "Accessory", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "意志", "value": 21}]},
    "蚀电屏蔽手套": {"name": "蚀电屏蔽手套", "type": "Glove", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 33}, {"name": "意志", "value": 22}, {"name": "法术伤害", "value": "9.20%"}]},
    "重装信使陀螺": {"name": "重装信使陀螺", "type": "Accessory", "set": "重装信使", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "力量", "value": 21}, {"name": "攻击力", "value": "10.50%"}]},
    "矿场传动轮": {"name": "矿场传动轮", "type": "Accessory", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "敏捷", "value": 22}, {"name": "暴击率", "value": "5.70%"}]},
    "蚀电防护手套": {"name": "蚀电防护手套", "type": "Glove", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "意志", "value": 33}, {"name": "智识", "value": 21}, {"name": "治疗效率加成", "value": "8.80%"}]},
    "蚀电屏蔽背心": {"name": "蚀电屏蔽背心", "type": "Armor", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 28}, "subStats": [{"name": "智识", "value": 44}, {"name": "力量", "value": 29}, {"name": "攻击力", "value": 16}]},
    "重装信使手电": {"name": "重装信使手电", "type": "Accessory", "set": "重装信使", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "力量", "value": 21}, {"name": "生命值", "value": "21.00%"}]},
    "矿场增压轮": {"name": "矿场增压轮", "type": "Accessory", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "力量", "value": 22}, {"name": "连携技伤害加成", "value": "22.80%"}]},
    "蚀电防护背心": {"name": "蚀电防护背心", "type": "Armor", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 28}, "subStats": [{"name": "意志", "value": 44}, {"name": "敏捷", "value": 29}, {"name": "生命值", "value": "10.50%"}]},
    "巡行信使陀螺": {"name": "巡行信使陀螺", "type": "Accessory", "set": "巡行信使", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "敏捷", "value": 21}, {"name": "攻击力", "value": "10.50%"}]},
    "重装信使手套": {"name": "重装信使手套", "type": "Glove", "set": "重装信使", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 33}, {"name": "意志", "value": 22}, {"name": "全伤害减免", "value": "8.00%"}]},
    "蚀电屏蔽电池": {"name": "蚀电屏蔽电池", "type": "Accessory", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "智识", "value": 21}, {"name": "暴击率", "value": "5.30%"}]},
    "矿场手套·壹型": {"name": "矿场手套·壹型", "type": "Glove", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "智识", "value": 36}, {"name": "敏捷", "value": 24}, {"name": "生命值", "value": "19.00%"}]},
    "巡行信使手电": {"name": "巡行信使手电", "type": "Accessory", "set": "巡行信使", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "敏捷", "value": 21}, {"name": "连携技伤害加成", "value": "21.00%"}]},
    "重装信使夹克": {"name": "重装信使夹克", "type": "Armor", "set": "重装信使", "mainStat": {"name": "防御力", "value": 28}, "subStats": [{"name": "力量", "value": 44}, {"name": "敏捷", "value": 29}, {"name": "生命值", "value": "10.50%"}]},
    "蚀电屏蔽扳手·壹型": {"name": "蚀电屏蔽扳手·壹型", "type": "Accessory", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "智识", "value": 21}, {"name": "寒冷和电磁伤害", "value": "11.70%"}]},
    "矿场手甲·壹型": {"name": "矿场手甲·壹型", "type": "Glove", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "力量", "value": 36}, {"name": "智识", "value": 24}, {"name": "攻击力", "value": "9.50%"}]},
    "巡行信使手套": {"name": "巡行信使手套", "type": "Glove", "set": "巡行信使", "mainStat": {"name": "防御力", "value": 21}, "subStats": [{"name": "敏捷", "value": 33}, {"name": "力量", "value": 22}, {"name": "物理伤害加成", "value": "9.70%"}]},
    "矿场联络仪": {"name": "矿场联络仪", "type": "Accessory", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "意志", "value": 22}, {"name": "生命值", "value": "22.80%"}]},
    "蚀电防护电池": {"name": "蚀电防护电池", "type": "Accessory", "set": "蚀电防护", "mainStat": {"name": "防御力", "value": 10}, "subStats": [{"name": "意志", "value": 21}]},
    "测试型重甲": {"name": "测试型重甲", "type": "Armor", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 22}, "subStats": [{"name": "力量", "value": 37}, {"name": "智识", "value": 25}, {"name": "攻击力", "value": 11}]},
    "集成化手甲": {"name": "集成化手甲", "type": "Glove", "set": "集成重型", "mainStat": {"name": "防御力", "value": 16}, "subStats": [{"name": "力量", "value": 23}, {"name": "意志", "value": 23}, {"name": "全伤害减免", "value": "6.30%"}]},
    "矿场护手": {"name": "矿场护手", "type": "Glove", "set": "四号谷地", "mainStat": {"name": "防御力", "value": 16}, "subStats": [{"name": "意志", "value": 28}, {"name": "智识", "value": 18}, {"name": "生命值", "value": "15.00%"}]}
}

# 辅助函数：将 Wiki 属性值转换为系统格式
def parse_value(v):
    if isinstance(v, str) and "%" in v:
        return float(v.replace("%", ""))
    return float(v)

# 生成 TypeScript 代码
ts_code = """import { Equipment, StatType, EquipmentType } from '../types';

export const EQUIPMENT_DATABASE: Equipment[] = [
"""

for name, data in wiki_data.items():
    # 转换属性名为英文枚举 Key
    stat_map = {
        "力量": "Strength",
        "智识": "Intellect",
        "敏捷": "Agility",
        "意志": "Willpower",
        "防御力": "Defense",
        "生命值": "HP",
        "攻击力": "Attack",
        "暴击率": "CritRate",
        "连携技伤害加成": "ComboDmg",
        "战技伤害加成": "SkillDmg",
        "终结技充能效率": "UltRecharge",
        "终结技伤害加成": "UltDmg",
        "源石技艺强度": "ArtsPower",
        "物理伤害加成": "PhysDmg",
        "治疗效率加成": "HealEffect",
        "寒冷和电磁伤害": "IceElecDmg",
        "灼热和自然伤害": "FireNatDmg",
        "全伤害减免": "DmgReduc",
        "对失衡目标伤害加成": "BreakDmg",
        "普通攻击伤害加成": "NormalDmg",
        "所有技能伤害": "AllSkillDmg",
        "主能力": "MainStat",
        "副能力": "SubStat",
        "法术伤害": "ArtsDmg"
    }

    # 构造主属性
    main_stat_type = stat_map.get(data["mainStat"]["name"], "Defense")
    main_stat_val = parse_value(data["mainStat"]["value"])

    # 构造副属性
    sub_stats = []
    for sub in data["subStats"]:
        if not sub.get("name"): continue # 跳过空属性
        s_type = stat_map.get(sub["name"])
        if not s_type: continue
        s_val = parse_value(sub["value"])
        sub_stats.append(f"      {{ type: '{s_type}', value: {s_val} }}")

    sub_stats_str = ",\n".join(sub_stats)

    ts_code += f"""  {{
    id: '{name}',
    name: '{name}',
    type: '{data['type']}',
    set: '{data['set']}',
    mainStat: {{ type: '{main_stat_type}', value: {main_stat_val} }},
    subStats: [
{sub_stats_str}
    ]
  }},
"""

ts_code += "];\n"

# 写入文件
with open('/home/ubuntu/endgear/client/src/lib/data.ts', 'w') as f:
    f.write(ts_code)

print("Successfully generated data.ts with corrected names and stats.")
