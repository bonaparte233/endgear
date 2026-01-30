import { useState, useMemo } from 'react';
import { Equipment, GOLD_EQUIPMENTS } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { findForgeMaterials, AttributeMatch } from '@/lib/forge-logic';
import { EquipmentCard } from '@/components/EquipmentCard';
import { Button } from '@/components/ui/button';

import { ArrowRight, RefreshCw, Zap, ArrowUpCircle, MinusCircle, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

export default function Home() {
  const [selectedTarget, setSelectedTarget] = useState<Equipment | null>(null);
  const [attributeMatches, setAttributeMatches] = useState<AttributeMatch[]>([]);
  const { language, setLanguage, t } = useLanguage();

  // 按套装分组装备
  const groupedEquipments = useMemo(() => {
    const groups: Record<string, Equipment[]> = {};
    GOLD_EQUIPMENTS.forEach(eq => {
      if (!groups[eq.set]) {
        groups[eq.set] = [];
      }
      groups[eq.set].push(eq);
    });
    return groups;
  }, []);

  const handleSelectTarget = (equipment: Equipment) => {
    setSelectedTarget(equipment);
    const matches = findForgeMaterials(equipment);
    setAttributeMatches(matches);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden font-sans selection:bg-primary/30">
      {/* 顶部导航栏 */}
      <header className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-6 shrink-0 backdrop-blur-sm relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 flex items-center justify-center border border-primary/50">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display tracking-wider text-foreground">
              ENDGEAR
            </h1>
            <div className="h-0.5 w-full bg-primary/50 mt-0.5" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-xs font-mono text-muted-foreground/60">
            {t('app.subtitle')} // V1.2.0
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="font-mono text-xs border border-border/50 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Languages className="w-3 h-3 mr-2" />
            {language === 'zh' ? 'EN' : '中文'}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border border-primary/20 rounded-full" />
          <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-primary/5 rounded-full" />
        </div>

        {/* 左侧：装备选择面板 */}
        <div className="w-80 md:w-96 border-r border-border bg-card/30 flex flex-col z-10 backdrop-blur-sm">
          <div className="p-4 border-b border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                {t('app.selectTarget')}
              </h2>
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">
                {GOLD_EQUIPMENTS.length} {t('app.unitsDetected')}
              </span>
            </div>
            {/* 搜索框预留位 */}
            <div className="h-1 w-8 bg-primary/50 mb-1" />
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <Accordion type="multiple" className="w-full">
              {Object.entries(groupedEquipments).map(([setName, items], idx) => (
                <AccordionItem key={setName} value={setName} className="border-b border-border/50">
                  <AccordionTrigger className="px-4 py-3 hover:bg-primary/5 hover:no-underline group transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary/50 group-hover:bg-primary transition-colors" />
                      <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">
                        {setName}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground ml-2">
                        [{items.length}]
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background/30">
                    <div className="py-1">
                      {items.map(eq => (
                        <div 
                          key={eq.id}
                          onClick={() => handleSelectTarget(eq)}
                          className={cn(
                            "px-4 py-2 cursor-pointer border-l-2 transition-all hover:bg-primary/10 flex items-center justify-between group",
                            selectedTarget?.id === eq.id 
                              ? "border-l-primary bg-primary/5" 
                              : "border-l-transparent hover:border-l-primary/30"
                          )}
                        >
                          <span className={cn(
                            "text-sm transition-colors",
                            selectedTarget?.id === eq.id ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                          )}>
                            {eq.name}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase">
                            {t(`types.${eq.type}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* 右侧：分析结果面板 */}
        {selectedTarget ? (
          <div className="flex-1 flex flex-col min-w-0 bg-background/50 z-10">
            {/* 目标装备概览 */}
            <div className="h-24 border-b border-border bg-card/20 flex items-center px-6 shrink-0">
              <div className="flex items-center gap-6 w-full">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black border border-border flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  {/* 装备图标占位 */}
                  <div className="w-8 h-8 bg-primary/20 rotate-45" />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-primary/40 text-[8px] flex items-center justify-center text-black font-bold">
                    IV
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-primary border border-primary/30 px-1 py-px">
                      TARGET
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      ID: {selectedTarget.id.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground">{selectedTarget.name}</h3>
                    <div className="flex gap-3 mt-1 text-sm font-mono text-muted-foreground">
                      <span>{selectedTarget.set}</span>
                      <span>/</span>
                      <span>{t(`types.${selectedTarget.type}`)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 按属性分组的推荐列表 */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <div className="p-6">
                <Accordion type="multiple" defaultValue={attributeMatches.map((_, i) => `item-${i}`)} className="space-y-4">
                  {attributeMatches.map((match, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 bg-card/20 px-2">
                      <AccordionTrigger className="hover:no-underline py-3 group">
                        <div className="flex items-center gap-3 w-full pr-4">
                          <div className="bg-muted px-3 py-1 rounded-sm border border-border/50 flex items-center group-hover:border-primary/30 transition-colors">
                            <span className="text-sm font-mono text-muted-foreground">{t('app.upgradeTarget')}:</span>
                            <span className="ml-2 font-bold text-foreground">{match.attributeName}</span>
                            <span className="ml-2 text-xs text-muted-foreground">({match.targetValue})</span>
                          </div>
                          <div className="h-px flex-1 bg-border/30 group-hover:bg-primary/20 transition-colors" />
                          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary/70 transition-colors">
                            {match.materials.length} {t('app.candidates')}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-4">
                          {match.materials.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                              {match.materials.map((mat, mIdx) => (
                                <div key={mIdx} className="relative group/card">
                                  <EquipmentCard
                                    equipment={mat.equipment}
                                    className={cn(
                                      "border-l-4 transition-all hover:translate-x-1",
                                      mat.matchType === 'Better' 
                                        ? "border-l-green-500 bg-green-500/5 hover:bg-green-500/10" 
                                        : "border-l-yellow-500 bg-yellow-500/5 hover:bg-yellow-500/10"
                                    )}
                                  />
                                  {/* 比较结果标签 */}
                                  <div className={cn(
                                    "absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold font-mono rounded-sm flex items-center gap-1 shadow-sm",
                                    mat.matchType === 'Better' 
                                      ? "bg-green-500 text-black" 
                                      : "bg-yellow-500 text-black"
                                  )}>
                                    {mat.matchType === 'Better' ? (
                                      <>
                                        <ArrowUpCircle className="w-3 h-3" />
                                        <span>{t('app.better')} (+{mat.diff.toFixed(1)})</span>
                                      </>
                                    ) : (
                                      <>
                                        <MinusCircle className="w-3 h-3" />
                                        <span>{t('app.standard')}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs font-mono text-muted-foreground/50 italic pl-2 border-l-2 border-border/30 py-2">
                              {t('app.noCompatible')}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        ) : (
          /* 空状态引导 */
          <div className="h-full flex flex-col items-center justify-center p-8 text-center relative z-10 w-full">
            <div className="w-32 h-32 mb-8 relative">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-primary/40 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowRight className="w-12 h-12 text-primary/60 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4 tracking-wide">
              {t('app.awaitingInput')}
            </h2>
            <p className="text-muted-foreground font-mono max-w-md leading-relaxed">
              {t('app.awaitingInputDesc')}
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-8 text-xs font-mono text-muted-foreground/60">
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <span>{t('app.dataSync')}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <span>{t('app.forgeReady')}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <span>{t('app.secure')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
