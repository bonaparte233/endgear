import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

export const translations = {
  zh: {
    app: {
      title: '装备精锻辅助终端',
      version: 'V1.2.0',
      reset: '重置',
      selectTarget: '选择目标装备',
      unitsDetected: '个单位已检测',
      analysisProtocol: '精锻分析协议',
      systemOnline: '系统在线',
      optimizationReady: '优化就绪',
      target: '目标',
      upgradeTarget: '提升目标',
      noMaterials: '未找到适配材料',
      noMaterialsDesc: '请尝试选择其他装备或检查库存数据',
      awaitingInput: '等待指令',
      awaitingInputDesc: '请从左侧面板选择一件装备以启动精锻分析。系统将分别计算三个副属性的最优方案。',
      dataSync: '数据同步',
      forgeReady: '精锻就绪',
      secure: '安全连接',
      better: '更优',
      standard: '标准',
      noCompatible: '该属性无适配材料'
    },
    equipment: {
      Accessory: '配件',
      Glove: '护手',
      Armor: '护甲'
    }
  },
  en: {
    app: {
      title: 'FORGE ASSIST TERMINAL',
      version: 'V1.2.0',
      reset: 'RESET',
      selectTarget: 'SELECT TARGET EQUIPMENT',
      unitsDetected: 'UNITS DETECTED',
      analysisProtocol: 'ANALYSIS PROTOCOL',
      systemOnline: 'SYSTEM ONLINE',
      optimizationReady: 'OPTIMIZATION READY',
      target: 'TARGET',
      upgradeTarget: 'UPGRADE TARGET',
      noMaterials: 'NO COMPATIBLE MATERIALS FOUND',
      noMaterialsDesc: 'Try selecting a different equipment or check your inventory data.',
      awaitingInput: 'AWAITING INPUT',
      awaitingInputDesc: 'Select an equipment to begin forge optimization. System will analyze all three sub-attributes independently.',
      dataSync: 'DATA SYNC',
      forgeReady: 'FORGE READY',
      secure: 'SECURE',
      better: 'BETTER',
      standard: 'STANDARD',
      noCompatible: 'NO COMPATIBLE MATERIALS FOUND FOR THIS ATTRIBUTE'
    },
    equipment: {
      Accessory: 'ACCESSORY',
      Glove: 'GLOVE',
      Armor: 'ARMOR'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (path: string) => {
    const keys = path.split('.');
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
