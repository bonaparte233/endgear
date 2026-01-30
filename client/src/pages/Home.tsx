import { useState } from 'react';
import { Equipment, GOLD_EQUIPMENTS } from '@/lib/data';
import { findForgeMaterials, ComparisonResult, getComparisonDetails } from '@/lib/forge-logic';
import { EquipmentCard } from '@/components/EquipmentCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [selectedTarget, setSelectedTarget] = useState<Equipment | null>(null);
  const [recommendations, setRecommendations] = useState<ComparisonResult[]>([]);

  const handleTargetSelect = (equipment: Equipment) => {
    setSelectedTarget(equipment);
    const result = findForgeMaterials(equipment);
    
    // 将结果转换为详细的比较结果
    const detailedResults = [
      ...result.recommended.map(m => getComparisonDetails(equipment, m)),
      ...result.normal.map(m => getComparisonDetails(equipment, m))
    ];
    
    setRecommendations(detailedResults);
  };

  const resetSelection = () => {
    setSelectedTarget(null);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      {/* 左侧面板：装备选择 */}
      <div className="w-full md:w-1/2 lg:w-5/12 border-r border-border/30 flex flex-col h-screen relative z-10 bg-background/95 backdrop-blur-sm">
        <div className="p-6 border-b border-border/30 bg-muted/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary/20 flex items-center justify-center rounded-sm border border-primary/50">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-wider text-primary">ENDGEAR</h1>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            装备精锻辅助终端 // V1.0.0
          </p>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 bg-muted/10 border-b border-border/20 flex justify-between items-center">
            <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest">
              Select Target Equipment
            </span>
            <span className="text-xs font-mono text-primary/70">
              {GOLD_EQUIPMENTS.length} UNITS DETECTED
            </span>
          </div>
          
          <ScrollArea className="flex-1 p-4">
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
          </ScrollArea>
        </div>
      </div>

      {/* 右侧面板：精锻分析结果 */}
      <div className="w-full md:w-1/2 lg:w-7/12 bg-muted/5 relative flex flex-col h-screen">
        {/* 背景装饰网格 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {selectedTarget ? (
          <div className="flex flex-col h-full relative z-10">
            {/* 顶部状态栏 */}
            <div className="p-6 border-b border-border/30 bg-background/80 backdrop-blur-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  ANALYSIS PROTOCOL
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetSelection}
                className="font-mono text-xs border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                RESET
              </Button>
            </div>

            {/* 目标装备展示 */}
            <div className="p-6 border-b border-border/30 bg-primary/5">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded-sm">TARGET</span>
                <div className="h-px flex-1 bg-primary/20" />
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-24 h-24 bg-background border border-border flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* 这里应该显示装备图片，暂时用首字母代替 */}
                  <span className="text-4xl font-display font-bold text-muted-foreground/30">
                    {selectedTarget.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-foreground">{selectedTarget.name}</h3>
                  <div className="flex gap-3 mt-2 text-sm font-mono text-muted-foreground">
                    <span>{selectedTarget.set}</span>
                    <span>/</span>
                    <span>{selectedTarget.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 推荐材料列表 */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="p-4 flex justify-between items-center border-b border-border/20">
                <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest">
                  Compatible Materials
                </span>
                <span className="text-xs font-mono text-primary">
                  {recommendations.length} MATCHES FOUND
                </span>
              </div>

              <ScrollArea className="flex-1 p-6">
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {recommendations.map((result, idx) => (
                      <div key={idx} className="relative">
                        {/* 连接线装饰 */}
                        <div className="absolute -left-3 top-1/2 w-3 h-px bg-border/50 hidden lg:block" />
                        
                        <EquipmentCard
                          equipment={result.equipment}
                          comparisonResult={{
                            betterStats: result.betterStats,
                            equalStats: result.equalStats
                          }}
                          className={cn(
                            "border-l-4",
                            result.isRecommended 
                              ? "border-l-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                              : "border-l-yellow-500 opacity-80"
                          )}
                        />
                        
                        {/* 推荐标签 */}
                        {result.isRecommended && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 transform rotate-3 shadow-sm z-10">
                            OPTIMAL
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 p-8 text-center border-2 border-dashed border-border/30 rounded-lg">
                    <div className="w-16 h-16 mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="font-mono text-sm">NO COMPATIBLE MATERIALS FOUND</p>
                    <p className="text-xs mt-2 max-w-xs">
                      Try selecting a different equipment or check your inventory data.
                    </p>
                  </div>
                )}
              </ScrollArea>
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
              AWAITING INPUT
            </h2>
            <p className="text-muted-foreground font-mono max-w-md leading-relaxed">
              Select an equipment from the left panel to initiate forge analysis. System will automatically calculate optimal material combinations.
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-8 text-xs font-mono text-muted-foreground/60">
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <span>DATA SYNC</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <span>FORGE READY</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <span>SECURE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
