import { Equipment } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

interface EquipmentCardProps {
  equipment: Equipment;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  comparisonResult?: {
    betterStats: string[];
    equalStats: string[];
  };
}

export function EquipmentCard({ 
  equipment, 
  onClick, 
  isSelected, 
  className,
  comparisonResult 
}: EquipmentCardProps) {
  const { t } = useLanguage();
  
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "bg-card border border-border/40 hover:border-primary/60",
        isSelected && "border-primary ring-1 ring-primary/50 bg-primary/5",
        className
      )}
    >
      {/* 装饰性角标 */}
      <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors z-10" />
      <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors z-10" />
      
      {/* 内容区域 */}
      <div className="p-4 flex flex-col gap-3">
        {/* 头部信息 */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-lg leading-tight tracking-wide text-foreground group-hover:text-primary transition-colors">
              {equipment.name}
            </h3>
            <div className="flex gap-2 mt-1 text-xs text-muted-foreground font-mono uppercase">
              <span className="bg-muted px-1.5 py-0.5">{t(`types.${equipment.type}`)}</span>
              <span className="border border-border px-1.5 py-0.5">{equipment.set}</span>
            </div>
          </div>
          {/* 稀有度指示器 */}
          <div className="w-2 h-2 bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
        </div>

        {/* 属性列表 */}
        <div className="space-y-1.5 mt-2">
          {/* 主属性 */}
          <div className="flex justify-between items-center text-sm font-mono border-b border-border/30 pb-1">
            <span className="text-muted-foreground">{t(`stats.${equipment.mainStat.type}`)}</span>
            <span className="text-foreground font-bold">{equipment.mainStat.value}</span>
          </div>

          {/* 副属性列表 */}
          {equipment.subStats.map((stat, idx) => (
            <div key={idx} className={cn(
              "flex justify-between items-center text-xs font-mono",
              comparisonResult?.betterStats.includes(stat.type) && "text-green-500 font-bold",
              comparisonResult?.equalStats.includes(stat.type) && "text-yellow-500"
            )}>
              <span className="truncate max-w-[70%]">{t(`stats.${stat.type}`)}</span>
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 选中状态下的扫描线效果 */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none animate-scan" />
      )}
    </div>
  );
}
