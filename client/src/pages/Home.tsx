import { useState } from 'react';
import { Equipment, GOLD_EQUIPMENTS } from '@/lib/data';
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

  const handleTargetSelect = (equipment: Equipment) => {
    setSelectedTarget(equipment);
    const results = findForgeMaterials(equipment);
    setAttributeMatches(results);
  };

  const resetSelection = () => {
    setSelectedTarget(null);
    setAttributeMatches([]);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      {/* 左侧面板：装备选择 */}
      <div className="w-full md:w-1/2 lg:w-5/12 border-r border-border/30 flex flex-col h-screen max-h-screen relative z-10 bg-background/95 backdrop-blur-sm">
        <div className="p-6 border-b border-border/30 bg-muted/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 flex items-center justify-center rounded-sm border border-primary/50">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl font-display font-bold tracking-wider text-primary">ENDGEAR</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs font-mono border border-border/50 hover:bg-primary/10"
            >
              <Languages className="w-3 h-3 mr-2" />
              {language === 'zh' ? 'EN' : '中文'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            {t('app.title')} // {t('app.version')}
          </p>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <div className="p-4 bg-muted/10 border-b border-border/20 flex justify-between items-center">
            <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest">
              {t('app.selectTarget')}
            </span>
            <span className="text-xs font-mono text-primary/70">
              {GOLD_EQUIPMENTS.length} {t('app.unitsDetected')}
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
              {GOLD_EQUIPMENTS.map(eq => (
                <EquipmentCard
                  key={eq.id}
                  equipment={eq}
                  isSelected={selectedTarget?.id === eq.id}
                  onClick={() => handleTargetSelect(eq)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右侧面板：精锻分析结果 */}
      <div className="w-full md:w-1/2 lg:w-7/12 bg-muted/5 relative flex flex-col h-screen max-h-screen">
        {/* 背景装饰网格 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {selectedTarget ? (
          <div className="flex flex-col h-full relative z-10">
            {/* 顶部状态栏 */}
            <div className="p-6 border-b border-border/30 bg-background/80 backdrop-blur-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  {t('app.analysisProtocol')}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-green-500">{t('app.optimizationReady')}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetSelection}
                className="font-mono text-xs border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                {t('app.reset')}
              </Button>
            </div>

            {/* 目标装备展示 */}
            <div className="p-6 border-b border-border/30 bg-primary/5">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded-sm">{t('app.target')}</span>
                <div className="h-px flex-1 bg-primary/20" />
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-20 h-20 bg-background border border-border flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl font-display font-bold text-muted-foreground/30">
                    {selectedTarget.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground">{selectedTarget.name}</h3>
                  <div className="flex gap-3 mt-1 text-sm font-mono text-muted-foreground">
                    <span>{selectedTarget.set}</span>
                    <span>/</span>
                    <span>{selectedTarget.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 按属性分组的推荐列表 */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <div className="p-6 space-y-8">
                {attributeMatches.map((match, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted px-3 py-1 rounded-sm border border-border/50">
                        <span className="text-sm font-mono text-muted-foreground">{t('app.upgradeTarget')}:</span>
                        <span className="ml-2 font-bold text-foreground">{match.attributeName}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({match.targetValue})</span>
                      </div>
                      <div className="h-px flex-1 bg-border/30" />
                    </div>

                    {match.materials.length > 0 ? (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {match.materials.map((mat, mIdx) => (
                          <div key={mIdx} className="relative group">
                            <EquipmentCard
                              equipment={mat.equipment}
                              className={cn(
                                "border-l-4 transition-all hover:translate-x-1",
                                mat.matchType === 'Better' 
                                  ? "border-l-green-500 bg-green-500/5" 
                                  : "border-l-yellow-500 bg-yellow-500/5"
                              )}
                            />
                            {/* 比较结果标签 */}
                            <div className={cn(
                              "absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold font-mono rounded-sm flex items-center gap-1",
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
                      <div className="text-xs font-mono text-muted-foreground/50 italic pl-2 border-l-2 border-border/30">
                        {t('app.noCompatible')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 空状态引导 */
          <div className="h-full flex flex-col items-center justify-center p-8 text-center relative z-10">
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
