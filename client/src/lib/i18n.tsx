import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Language = "zh" | "en";

const LANGUAGE_STORAGE_KEY = "endgear-language";
const DEFAULT_LANGUAGE: Language = "zh";
const BROWSER_FALLBACK_LANGUAGE: Language = "en";

function isSupportedLanguage(value: string | null): value is Language {
  return value === "zh" || value === "en";
}

function matchSupportedLanguage(locale: string): Language | undefined {
  const normalizedLocale = locale.toLowerCase();

  if (normalizedLocale.startsWith("zh")) {
    return "zh";
  }

  if (normalizedLocale.startsWith("en")) {
    return "en";
  }

  return undefined;
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const candidates = [...(navigator.languages ?? []), navigator.language];
  for (const candidate of candidates) {
    if (typeof candidate !== "string" || candidate.length === 0) {
      continue;
    }

    const matchedLanguage = matchSupportedLanguage(candidate);
    if (matchedLanguage) {
      return matchedLanguage;
    }
  }

  return BROWSER_FALLBACK_LANGUAGE;
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isSupportedLanguage(storedLanguage)) {
      return storedLanguage;
    }
  } catch {
    // Ignore storage access failures and fall back to browser detection.
  }

  return detectBrowserLanguage();
}

export const translations = {
  zh: {
    app: {
      title: "装备精锻辅助终端",
      version: "V1.2.0",
      versionHint: "适配终末地 1.2 版本",
      versionHintCompact: "适配 1.2",
      subtitle: "终末地工业 · 装备精锻",
      reset: "重置",
      selectTarget: "选择目标装备",
      unitsDetected: "已检测单位",
      unitsDetectedInline: "个单位已检测",
      analysisProtocol: "精锻分析协议",
      systemOnline: "系统在线",
      optimizationReady: "优化就绪",
      target: "目标",
      upgradeTarget: "提升目标",
      noMaterials: "未找到适配材料",
      noMaterialsDesc: "请尝试选择其他装备或检查库存数据",
      awaitingInput: "等待指令",
      awaitingInputDesc:
        "请从左侧面板选择一件装备以启动精锻分析。系统将分别计算三个副属性的最优方案。",
      dataSync: "数据同步",
      forgeReady: "精锻就绪",
      secure: "安全连接",
      better: "更优",
      standard: "标准",
      dispatchCost: "券耗",
      noCompatible: "该属性无适配材料",
      candidates: "候选方案",
      searchPlaceholder: "检索装备 / 套组 / 部位",
      searchHint: "输入装备名、套组名或部位",
      searchResults: "个结果匹配",
      searchActive: "检索中",
      clearSearch: "清空检索",
      searchEmpty: "未找到匹配目标",
      searchEmptyDesc: "请尝试更换关键词，支持装备名、套组名和部位。",
      analysisDeckDesc:
        "锁定目标后，终端会按副属性逐项展开材料匹配，并优先压低券耗与筛选更优词条。",
      setClusters: "套组簇",
      targetBrief: "目标简报",
      matchOverview: "匹配概览",
      materialFeed: "材料流",
      forgeVectors: "精锻向量",
      betterMatches: "更优命中",
      setInventory: "同套库存",
      mainStat: "主属性",
      terminalState: "终端状态",
      dispatchBand: "券耗",
      targetLock: "目标锁定",
    },
    types: {
      Accessory: "配件",
      Glove: "护手",
      Armor: "护甲",
    },
    stats: {
      Strength: "力量",
      Intellect: "智识",
      Agility: "敏捷",
      Willpower: "意志",
      Defense: "防御力",
      HP: "生命值",
      Attack: "攻击力",
      CritRate: "暴击率",
      ComboDmg: "连携技伤害加成",
      SkillDmg: "战技伤害加成",
      UltRecharge: "终结技充能效率",
      UltDmg: "终结技伤害加成",
      ArtsPower: "源石技艺强度",
      PhysDmg: "物理伤害加成",
      HealEffect: "治疗效率加成",
      IceElecDmg: "寒冷和电磁伤害",
      FireNatDmg: "灼热和自然伤害",
      DmgReduc: "全伤害减免",
      BreakDmg: "对失衡目标伤害加成",
      NormalDmg: "普通攻击伤害加成",
      AllSkillDmg: "所有技能伤害",
      MainStat: "主能力",
      SubStat: "副能力",
      ArtsDmg: "法术伤害",
    },
    equipment: {
      Accessory: "配件",
      Glove: "护手",
      Armor: "护甲",
    },
  },
  en: {
    app: {
      title: "FORGE ASSIST TERMINAL",
      version: "V1.2.0",
      versionHint: "Compatible with Endfield 1.2",
      versionHintCompact: "1.2 READY",
      subtitle: "ENDGEAR INDUSTRIES · FORGE",
      reset: "RESET",
      selectTarget: "SELECT TARGET EQUIPMENT",
      unitsDetected: "DETECTED UNITS",
      unitsDetectedInline: "UNITS DETECTED",
      analysisProtocol: "ANALYSIS PROTOCOL",
      systemOnline: "SYSTEM ONLINE",
      optimizationReady: "OPTIMIZATION READY",
      target: "TARGET",
      upgradeTarget: "UPGRADE TARGET",
      noMaterials: "NO COMPATIBLE MATERIALS FOUND",
      noMaterialsDesc:
        "Try selecting a different equipment or check your inventory data.",
      awaitingInput: "AWAITING INPUT",
      awaitingInputDesc:
        "Select an equipment to begin forge optimization. System will analyze all three sub-attributes independently.",
      dataSync: "DATA SYNC",
      forgeReady: "FORGE READY",
      secure: "SECURE",
      better: "BETTER",
      standard: "STANDARD",
      dispatchCost: "Cost",
      noCompatible: "NO COMPATIBLE MATERIALS FOUND FOR THIS ATTRIBUTE",
      candidates: "CANDIDATES",
      searchPlaceholder: "SEARCH EQUIPMENT / SET / SLOT",
      searchHint: "Query by item name, set, or slot",
      searchResults: "MATCHES",
      searchActive: "SEARCHING",
      clearSearch: "Clear search",
      searchEmpty: "NO MATCHING TARGETS",
      searchEmptyDesc:
        "Try a different keyword. Search supports equipment names, set names, and slot labels.",
      analysisDeckDesc:
        "Lock a target on the left and the terminal will evaluate each sub-stat separately, prioritizing stronger matches with lower dispatch cost.",
      setClusters: "SET CLUSTERS",
      targetBrief: "TARGET BRIEF",
      matchOverview: "MATCH OVERVIEW",
      materialFeed: "MATERIAL FEED",
      forgeVectors: "FORGE VECTORS",
      betterMatches: "BETTER HITS",
      setInventory: "SET STOCK",
      mainStat: "MAIN STAT",
      terminalState: "TERMINAL STATE",
      dispatchBand: "DISPATCH COST",
      targetLock: "TARGET LOCK",
    },
    types: {
      Accessory: "ACCESSORY",
      Glove: "GLOVE",
      Armor: "ARMOR",
    },
    stats: {
      Strength: "Strength",
      Intellect: "Intellect",
      Agility: "Agility",
      Willpower: "Willpower",
      Defense: "Defense",
      HP: "HP",
      Attack: "Attack",
      CritRate: "Crit Rate",
      ComboDmg: "Combo Dmg",
      SkillDmg: "Skill Dmg",
      UltRecharge: "Ult Recharge",
      UltDmg: "Ult Dmg",
      ArtsPower: "Arts Power",
      PhysDmg: "Phys Dmg",
      HealEffect: "Heal Effect",
      IceElecDmg: "Ice/Elec Dmg",
      FireNatDmg: "Fire/Nat Dmg",
      DmgReduc: "Dmg Reduction",
      BreakDmg: "Break Dmg",
      NormalDmg: "Normal Dmg",
      AllSkillDmg: "All Skill Dmg",
      MainStat: "Main Stat",
      SubStat: "Sub Stat",
      ArtsDmg: "Arts Dmg",
    },
    equipment: {
      Accessory: "ACCESSORY",
      Glove: "GLOVE",
      Armor: "ARMOR",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch {
        // Ignore storage write failures and keep runtime state only.
      }
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    }
  }, [language]);

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = translations[language];

    for (const key of keys) {
      if (current[key] === undefined) {
        return path;
      }
      current = current[key];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
