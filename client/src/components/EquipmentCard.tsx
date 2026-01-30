import { Equipment, ATTRIBUTE_MAP, TYPE_MAP } from "@/lib/data";
import { cn } from "@/lib/utils";

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
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "bg-card border border-border/40 hover:border-primary/60",
        "clip-corners overflow-hidden",
        isSelected && "border-primary ring-1 ring-primary/50 bg-primary/5",
        className
      )}
    >
      {/* 装饰性角标 */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />
      
      {/* 内容区域 */}
      <div className="p-4 flex flex-col gap-3">
        {/* 头部信息 */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-lg leading-tight tracking-wide text-foreground group-hover:text-primary transition-colors">
              {equipment.name}
            </h3>
            <div className="flex gap-2 mt-1 text-xs text-muted-foreground font-mono uppercase">
              <span className="bg-muted px-1.5 py-0.5 rounded-sm">{TYPE_MAP[equipment.type]}</span>
              <span className="border border-border px-1.5 py-0.5 rounded-sm">{equipment.set}</span>
            </div>
          </div>
          {/* 稀有度指示器 */}
          <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
        </div>

        {/* 属性列表 */}
        <div className="space-y-1.5 mt-2">
          {/* 主属性 */}
          <div className="flex justify-between items-center text-sm font-mono border-b border-border/30 pb-1">
            <span className="text-muted-foreground">{equipment.mainStat.name}</span>
            <span className="text-foreground font-bold">{equipment.mainStat.value}</span>
          </div>

          {/* 副属性 1 */}
          <div className={cn(
            "flex justify-between items-center text-xs font-mono",
            comparisonResult?.betterStats.includes(ATTRIBUTE_MAP[equipment.subStat1.name]) && "text-green-500 font-bold",
            comparisonResult?.equalStats.includes(ATTRIBUTE_MAP[equipment.subStat1.name]) && "text-yellow-500"
          )}>
            <span>{ATTRIBUTE_MAP[equipment.subStat1.name]}</span>
            <span>{equipment.subStat1.value}</span>
          </div>

          {/* 副属性 2 */}
          <div className={cn(
            "flex justify-between items-center text-xs font-mono",
            comparisonResult?.betterStats.includes(ATTRIBUTE_MAP[equipment.subStat2.name]) && "text-green-500 font-bold",
            comparisonResult?.equalStats.includes(ATTRIBUTE_MAP[equipment.subStat2.name]) && "text-yellow-500"
          )}>
            <span>{ATTRIBUTE_MAP[equipment.subStat2.name]}</span>
            <span>{equipment.subStat2.value}</span>
          </div>

          {/* 副属性 3 */}
          <div className={cn(
            "flex justify-between items-center text-xs font-mono",
            comparisonResult?.betterStats.includes(equipment.subStat3.name) && "text-green-500 font-bold",
            comparisonResult?.equalStats.includes(equipment.subStat3.name) && "text-yellow-500"
          )}>
            <span className="truncate max-w-[70%]">{equipment.subStat3.name}</span>
            <span>{equipment.subStat3.value}</span>
          </div>
        </div>
      </div>

      {/* 选中状态下的扫描线效果 */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none animate-scan" />
      )}
    </div>
  );
}
