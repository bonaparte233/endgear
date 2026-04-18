import { Equipment } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

interface EquipmentCardProps {
  equipment: Equipment;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  comparisonBadge?: {
    label: string;
    tone: "better" | "standard";
    deltaText?: string;
  };
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
  comparisonBadge,
  comparisonResult,
}: EquipmentCardProps) {
  const { language, t } = useLanguage();
  const formattedDispatchCost = equipment.dispatchCost.toLocaleString(
    language === "zh" ? "zh-CN" : "en-US"
  );
  const showIdReadout = equipment.id !== equipment.name;
  const badgeToneClass =
    comparisonBadge?.tone === "better"
      ? "border-emerald-400/45 bg-emerald-400/12 text-emerald-300"
      : "border-primary/30 bg-primary/10 text-primary";

  return (
    <div
      onClick={onClick}
      className={cn(
        "hud-panel relative h-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/55",
        isSelected && "border-primary ring-1 ring-primary/40",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.75_0.18_55_/_0.06),transparent_35%,transparent_70%,oklch(0.34_0.03_250_/_0.14))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col gap-2.5 p-2.5 sm:gap-3 sm:p-3.5">
        <div className="flex items-start justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            {showIdReadout ? (
              <div className="hud-kicker truncate">{equipment.id}</div>
            ) : null}
            <h3
              className={cn(
                "font-display text-base font-bold leading-tight tracking-[0.06em] text-foreground transition-colors group-hover:text-primary sm:text-[1.05rem]",
                showIdReadout && "mt-1.5"
              )}
            >
              {equipment.name}
            </h3>
            <div className="mt-1.5 flex flex-wrap gap-1 text-[8px] font-mono uppercase tracking-[0.12em] sm:mt-2 sm:gap-1.5 sm:text-[9px] sm:tracking-[0.14em]">
              <span className="hud-chip-muted">
                {t(`types.${equipment.type}`)}
              </span>
              <span className="hud-chip-muted">{equipment.set}</span>
            </div>
          </div>
          {comparisonBadge ? (
            <div
              className={cn(
                "flex shrink-0 flex-col items-end gap-0.5 border px-1.5 py-1 text-right font-mono text-[8px] uppercase tracking-[0.1em] sm:gap-1 sm:px-2 sm:text-[9px] sm:tracking-[0.12em]",
                badgeToneClass
              )}
            >
              <span>{comparisonBadge.label}</span>
              {comparisonBadge.deltaText ? (
                <span className="text-[9px] font-semibold tracking-[0.05em] sm:text-[10px] sm:tracking-[0.06em]">
                  {comparisonBadge.deltaText}
                </span>
              ) : null}
            </div>
          ) : (
            <div className="mt-1 h-3 w-3 shrink-0 border border-primary/35 bg-primary/20 shadow-[0_0_14px_oklch(0.75_0.18_55_/_0.18)]" />
          )}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_98px] gap-2 sm:gap-2.5 xl:grid-cols-[minmax(0,1fr)_118px]">
          <div className="hud-panel-soft p-2 sm:p-2.5">
            <div className="hud-kicker">{t("app.mainStat")}</div>
            <div className="mt-1.5 flex items-end justify-between gap-2 sm:mt-2 sm:gap-2.5">
              <span className="text-[11px] text-muted-foreground sm:text-xs">
                {t(`stats.${equipment.mainStat.type}`)}
              </span>
              <span className="font-display text-xl leading-none text-foreground sm:text-[1.65rem]">
                {equipment.mainStat.value}
              </span>
            </div>
          </div>
          <div className="hud-panel-soft p-2 sm:p-2.5">
            <div className="hud-kicker">{t("app.dispatchCost")}</div>
            <div className="mt-1.5 font-display text-xl leading-none text-primary sm:mt-2 sm:text-[1.65rem]">
              {formattedDispatchCost}
            </div>
          </div>
        </div>

        <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
          {equipment.subStats.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "hud-panel-soft flex items-center justify-between gap-2 px-2 py-1.5 text-[10px] font-mono sm:gap-2.5 sm:px-2.5 sm:text-[11px]",
                comparisonResult?.betterStats.includes(stat.type) &&
                  "border-emerald-400/30 text-emerald-300",
                comparisonResult?.equalStats.includes(stat.type) &&
                  "border-primary/30 text-primary"
              )}
            >
              <span className="truncate text-muted-foreground">
                {t(`stats.${stat.type}`)}
              </span>
              <span className="text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {isSelected && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/12 via-primary/4 to-transparent animate-scan" />
      )}
    </div>
  );
}
