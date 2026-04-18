import { useDeferredValue, useMemo, useState } from "react";
import { GOLD_EQUIPMENTS } from "@/lib/data";
import { Equipment, EquipmentType } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { findForgeMaterials, AttributeMatch } from "@/lib/forge-logic";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages, Search, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const SEARCH_TOKEN_MAP: Record<EquipmentType, string[]> = {
  Accessory: ["Accessory", "配件"],
  Glove: ["Glove", "护手"],
  Armor: ["Armor", "护甲"],
};

const TOTAL_SET_COUNT = new Set(GOLD_EQUIPMENTS.map(equipment => equipment.set))
  .size;
const SET_SIZE_MAP = GOLD_EQUIPMENTS.reduce<Record<string, number>>(
  (accumulator, equipment) => {
    accumulator[equipment.set] = (accumulator[equipment.set] ?? 0) + 1;
    return accumulator;
  },
  {}
);

export default function Home() {
  const [selectedTarget, setSelectedTarget] = useState<Equipment | null>(null);
  const [attributeMatches, setAttributeMatches] = useState<AttributeMatch[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [openSets, setOpenSets] = useState<string[]>([]);
  const { language, setLanguage, t } = useLanguage();
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US"),
    [language]
  );

  const filteredEquipments = useMemo(() => {
    if (!normalizedSearchTerm) {
      return GOLD_EQUIPMENTS;
    }

    return GOLD_EQUIPMENTS.filter(equipment => {
      const searchableFields = [
        equipment.name,
        equipment.id,
        equipment.set,
        ...SEARCH_TOKEN_MAP[equipment.type],
      ];

      return searchableFields.some(field =>
        field.toLowerCase().includes(normalizedSearchTerm)
      );
    });
  }, [normalizedSearchTerm]);

  const groupedEquipments = useMemo(() => {
    const groups: Record<string, Equipment[]> = {};

    filteredEquipments.forEach(equipment => {
      if (!groups[equipment.set]) {
        groups[equipment.set] = [];
      }
      groups[equipment.set].push(equipment);
    });

    return groups;
  }, [filteredEquipments]);

  const groupEntries = useMemo(
    () => Object.entries(groupedEquipments),
    [groupedEquipments]
  );

  const matchSummary = useMemo(
    () =>
      attributeMatches.reduce(
        (summary, match) => {
          summary.total += match.materials.length;
          summary.better += match.materials.filter(
            material => material.matchType === "Better"
          ).length;
          return summary;
        },
        { total: 0, better: 0 }
      ),
    [attributeMatches]
  );

  const targetVectorLabels = useMemo(
    () =>
      attributeMatches.map(
        match => `${t(`stats.${match.attributeName}`)} · ${match.targetValue}`
      ),
    [attributeMatches, t]
  );

  const visibleAccordionItems = normalizedSearchTerm
    ? groupEntries.map(([setName]) => setName)
    : openSets;

  const selectedTargetSetInventory = selectedTarget
    ? (SET_SIZE_MAP[selectedTarget.set] ?? 0)
    : 0;

  const handleSelectTarget = (equipment: Equipment) => {
    setSelectedTarget(equipment);
    setAttributeMatches(findForgeMaterials(equipment));
  };

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  const formatCount = (value: number) => numberFormatter.format(value);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <div className="hud-shell relative flex h-screen flex-col overflow-hidden">
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="hud-scanlines pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,oklch(0.75_0.18_55_/_0.12),transparent_62%)]" />
        <div className="pointer-events-none absolute left-[18%] top-[16%] h-72 w-72 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute bottom-[-8rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full border border-primary/10" />

        <header className="relative z-20 border-b border-primary/12 bg-background/80 backdrop-blur-xl">
          <div className="px-2.5 py-2 sm:px-5 sm:py-2 lg:px-6">
            <div className="hud-panel-soft flex min-w-0 items-center gap-2 overflow-hidden px-2 py-1.5 sm:px-3 sm:py-1.5">
              <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary shadow-[0_0_18px_oklch(0.75_0.18_55_/_0.12)] sm:h-10 sm:w-10">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-1.5 sm:hidden">
                    <h1 className="truncate font-display text-[13px] font-bold tracking-[0.18em] text-foreground">
                      ENDGEAR
                    </h1>
                    <span className="inline-flex shrink-0 border border-primary/25 bg-primary/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-primary">
                      {t("app.versionHintCompact")}
                    </span>
                  </div>
                  <div className="hidden min-w-0 items-center gap-3 sm:flex">
                    <h1 className="shrink-0 font-display text-lg font-bold tracking-[0.18em] text-foreground lg:text-xl lg:tracking-[0.2em]">
                      ENDGEAR
                    </h1>
                    <div className="h-4 w-px bg-primary/15" />
                    <div className="min-w-0 flex-1 truncate whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 lg:text-[11px]">
                      {t("app.subtitle")}
                    </div>
                    <span className="inline-flex shrink-0 border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-primary lg:text-[9px]">
                      {t("app.versionHint")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center self-stretch border-l border-primary/10 pl-2 sm:pl-3">
                <div className="hidden items-center gap-2 pr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/72 lg:flex">
                  <span className="h-2 w-2 bg-primary shadow-[0_0_10px_oklch(0.75_0.18_55_/_0.45)]" />
                  <span>{t("app.analysisProtocol")}</span>
                </div>

                <div className="flex items-center gap-1.5 border-l border-primary/10 pl-2 sm:gap-2 sm:pl-3">
                  {selectedTarget ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTarget(null)}
                      className="h-8 border-0 bg-transparent px-1.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground hover:bg-primary/8 hover:text-primary md:hidden"
                    >
                      <ArrowRight className="mr-1 h-3 w-3 rotate-180" />
                      {t("app.reset")}
                    </Button>
                  ) : null}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="h-8 shrink-0 border-0 bg-transparent px-1.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground hover:bg-primary/8 hover:text-primary sm:h-9 sm:px-2.5 sm:text-[11px] sm:tracking-[0.16em]"
                  >
                    <Languages className="mr-1 hidden h-3.5 w-3.5 sm:block" />
                    {language === "zh" ? "EN" : "中文"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="relative flex flex-1 overflow-hidden">
          <aside
            className={cn(
              "absolute inset-0 z-20 flex w-full flex-col border-r border-primary/10 bg-background/82 backdrop-blur-xl transition-all duration-300 md:relative md:w-[22.5rem] lg:w-[23.5rem]",
              selectedTarget ? "hidden md:flex" : "flex"
            )}
          >
            <div className="border-b border-primary/10 p-2.5 sm:p-4">
              <div className="hud-panel p-2.5 sm:p-3.5">
                <div className="flex items-start justify-between gap-2.5">
                  <div>
                    <div className="hud-kicker text-[8px] sm:text-[9px]">
                      {t("app.analysisProtocol")}
                    </div>
                    <h2 className="mt-1 text-[15px] font-display font-bold tracking-[0.04em] text-foreground sm:mt-1.5 sm:text-lg sm:tracking-[0.06em]">
                      {t("app.selectTarget")}
                    </h2>
                  </div>
                  <div className="border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-right font-mono text-[8px] uppercase tracking-[0.1em] text-primary sm:px-1.5 sm:py-1 sm:text-[9px] sm:tracking-[0.12em]">
                    <div className="text-[15px] font-semibold leading-none sm:text-base">
                      {formatCount(GOLD_EQUIPMENTS.length)}
                    </div>
                    <div className="mt-0.5 text-[8px] text-primary/70">
                      {t("app.unitsDetected")}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-3">
                  <div className="hud-panel-soft px-2 py-2 sm:px-2.5 sm:py-2.5">
                    <div className="hud-kicker text-[8px] sm:text-[9px]">
                      {t("app.setClusters")}
                    </div>
                    <div className="mt-1 font-display text-[1.15rem] leading-none text-foreground sm:mt-1.5 sm:text-[1.35rem]">
                      {formatCount(
                        normalizedSearchTerm
                          ? groupEntries.length
                          : TOTAL_SET_COUNT
                      )}
                    </div>
                  </div>
                  <div className="hud-panel-soft px-2 py-2 sm:px-2.5 sm:py-2.5">
                    <div className="hud-kicker text-[8px] sm:text-[9px]">
                      {t("app.terminalState")}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary sm:mt-1.5 sm:text-[11px] sm:tracking-[0.12em]">
                      {normalizedSearchTerm
                        ? t("app.searchActive")
                        : t("app.forgeReady")}
                    </div>
                  </div>
                </div>

                <div className="clip-corners relative mt-2.5 overflow-hidden border border-primary/12 bg-background/55 sm:mt-3">
                  <div className="absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-primary/12 bg-primary/6 sm:w-11">
                    <Search className="h-3.5 w-3.5 text-primary/85 sm:h-4 sm:w-4" />
                  </div>
                  <input
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder={t("app.searchPlaceholder")}
                    className="w-full bg-transparent py-2 pl-11 pr-10 text-[12px] font-mono text-foreground placeholder:text-muted-foreground/45 focus:outline-none sm:py-2.5 sm:pl-12 sm:pr-12 sm:text-[13px]"
                  />
                  {searchTerm ? (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      aria-label={t("app.clearSearch")}
                      className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground/65 transition-colors hover:bg-primary/8 hover:text-primary sm:w-10"
                    >
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  ) : (
                    <div className="absolute inset-y-0 right-0 flex w-9 items-center justify-center sm:w-10">
                      <div className="h-1.5 w-1.5 animate-pulse bg-primary/60 shadow-[0_0_10px_oklch(0.75_0.18_55_/_0.45)] sm:h-2 sm:w-2" />
                    </div>
                  )}
                </div>

                <div className="mt-2 hidden items-center justify-between gap-2 text-[9px] font-mono uppercase tracking-[0.14em] sm:flex">
                  <span className="text-muted-foreground/70">
                    {normalizedSearchTerm
                      ? `${formatCount(filteredEquipments.length)} ${t("app.searchResults")}`
                      : t("app.searchHint")}
                  </span>
                  <span
                    className={cn(
                      "border px-2 py-1 text-right",
                      normalizedSearchTerm
                        ? "border-primary/35 bg-primary/10 text-primary"
                        : "border-primary/10 bg-card/60 text-muted-foreground/70"
                    )}
                  >
                    {normalizedSearchTerm
                      ? t("app.searchActive")
                      : t("app.analysisProtocol")}
                  </span>
                </div>
                {normalizedSearchTerm ? (
                  <div className="mt-2 flex items-center justify-between gap-2 text-[8px] font-mono uppercase tracking-[0.1em] text-muted-foreground/70 sm:hidden">
                    <span>
                      {formatCount(filteredEquipments.length)}{" "}
                      {t("app.searchResults")}
                    </span>
                    <span className="border border-primary/20 bg-primary/8 px-1.5 py-0.5 text-primary">
                      {t("app.searchActive")}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-2.5 sm:px-3 sm:pb-3">
              {groupEntries.length > 0 ? (
                <Accordion
                  type="multiple"
                  className="space-y-1 pt-1.5 sm:space-y-1.5 sm:pt-2"
                  value={visibleAccordionItems}
                  onValueChange={setOpenSets}
                >
                  {groupEntries.map(([setName, items]) => (
                    <AccordionItem
                      key={setName}
                      value={setName}
                      className="hud-panel-soft overflow-hidden border-primary/10"
                    >
                      <AccordionTrigger className="px-2.5 py-2 hover:bg-primary/5 sm:px-3 sm:py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-1.5 w-1.5 border border-primary/30 bg-primary/20 sm:h-2 sm:w-2" />
                          <div className="flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-[12px] font-semibold tracking-[0.02em] text-foreground/92 sm:text-[13px] sm:tracking-[0.03em]">
                              {setName}
                            </span>
                            <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-muted-foreground/60 sm:text-[9px] sm:tracking-[0.12em]">
                              [{formatCount(items.length)}]
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-primary/10 bg-background/15">
                        <div className="grid gap-px bg-primary/8">
                          {items.map(equipment => (
                            <button
                              key={equipment.id}
                              type="button"
                              onClick={() => handleSelectTarget(equipment)}
                              className={cn(
                                "group flex w-full items-center justify-between gap-2.5 bg-background/20 px-2.5 py-2 text-left transition-colors sm:gap-3 sm:px-3 sm:py-2.5",
                                selectedTarget?.id === equipment.id
                                  ? "bg-primary/12 text-primary"
                                  : "hover:bg-primary/6"
                              )}
                            >
                              <div className="min-w-0">
                                <div
                                  className={cn(
                                    "truncate text-[12px] tracking-[0.01em] transition-colors sm:text-[13px] sm:tracking-[0.02em]",
                                    selectedTarget?.id === equipment.id
                                      ? "font-semibold text-primary"
                                      : "text-foreground/88 group-hover:text-foreground"
                                  )}
                                >
                                  {equipment.name}
                                </div>
                                <div className="mt-0.5 text-[8px] font-mono uppercase tracking-[0.1em] text-muted-foreground/55 sm:text-[9px] sm:tracking-[0.12em]">
                                  {t(`types.${equipment.type}`)} ·{" "}
                                  {formatCount(equipment.dispatchCost)}
                                </div>
                              </div>
                              <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/65 sm:block">
                                {t(`types.${equipment.type}`)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="px-1 pt-4">
                  <div className="hud-panel p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Search className="h-4 w-4" />
                      <span className="hud-kicker text-primary">
                        {t("app.searchEmpty")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {t("app.searchEmptyDesc")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {selectedTarget ? (
            <div className="absolute inset-0 z-10 flex min-w-0 flex-1 flex-col bg-transparent md:relative md:inset-auto md:overflow-hidden">
              <div className="border-b border-primary/10 px-2 py-1.5 sm:px-4 sm:py-2.5 lg:px-5">
                <div className="grid gap-2 sm:gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.85fr)]">
                  <section className="hud-panel animate-rise-in p-2 sm:p-3.5">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="hud-panel-soft relative flex h-11 w-11 shrink-0 items-center justify-center sm:h-[3.75rem] sm:w-[3.75rem]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(0.75_0.18_55_/_0.12),transparent_62%)]" />
                        <div className="relative h-4.5 w-4.5 rotate-45 border border-primary/30 bg-primary/12 sm:h-6 sm:w-6" />
                        <div className="absolute right-1 top-1 border border-primary/30 bg-primary/15 px-1 font-mono text-[7px] uppercase tracking-[0.08em] text-primary sm:right-2 sm:top-2 sm:text-[9px] sm:tracking-[0.12em]">
                          IV
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <span className="hud-chip">
                            {t("app.targetBrief")}
                          </span>
                          {selectedTarget.id !== selectedTarget.name ? (
                            <span className="hud-chip-muted">
                              ID {selectedTarget.id}
                            </span>
                          ) : null}
                          <span className="hud-chip-muted">
                            {selectedTarget.set} /{" "}
                            {t(`types.${selectedTarget.type}`)}
                          </span>
                          <span className="hud-chip-muted sm:hidden">
                            {t("app.setInventory")}{" "}
                            {formatCount(selectedTargetSetInventory)}
                          </span>
                        </div>

                        <h3 className="mt-1 text-[1.45rem] font-display font-bold tracking-[0.04em] text-foreground sm:mt-2 sm:text-[1.8rem] sm:tracking-[0.06em] lg:text-[1.95rem]">
                          {selectedTarget.name}
                        </h3>

                        <div className="mt-1.5 grid grid-cols-2 gap-1 sm:mt-2.5 sm:grid-cols-3 sm:gap-2">
                          <div className="hud-panel-soft px-1.5 py-1.5 sm:px-2.5 sm:py-2">
                            <div className="hud-kicker">
                              {t("app.mainStat")}
                            </div>
                            <div className="mt-0.5 text-[9px] text-muted-foreground sm:mt-1 sm:text-[12px]">
                              {t(`stats.${selectedTarget.mainStat.type}`)}
                            </div>
                            <div className="mt-0.5 font-display text-[1.05rem] leading-none text-foreground sm:mt-1 sm:text-[1.65rem]">
                              {selectedTarget.mainStat.value}
                            </div>
                          </div>
                          <div className="hidden hud-panel-soft px-2 py-2 sm:block sm:px-2.5 sm:py-2">
                            <div className="hud-kicker">
                              {t("app.setInventory")}
                            </div>
                            <div className="mt-1 font-display text-xl leading-none text-foreground sm:text-[1.65rem]">
                              {formatCount(selectedTargetSetInventory)}
                            </div>
                          </div>
                          <div className="hud-panel-soft px-1.5 py-1.5 sm:px-2.5 sm:py-2">
                            <div className="hud-kicker">
                              {t("app.dispatchBand")}
                            </div>
                            <div className="mt-0.5 font-display text-[1.05rem] leading-none text-primary sm:mt-1 sm:text-[1.65rem]">
                              {formatCount(selectedTarget.dispatchCost)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="hud-panel animate-rise-in overflow-hidden">
                    <div className="grid h-full grid-cols-3 divide-x divide-primary/10">
                      <div className="px-1.5 py-1.5 sm:px-3 sm:py-2.5">
                        <div className="hud-kicker">{t("app.candidates")}</div>
                        <div className="mt-0.5 font-display text-[1rem] leading-none text-foreground sm:mt-1 sm:text-[1.5rem]">
                          {formatCount(matchSummary.total)}
                        </div>
                      </div>
                      <div className="px-1.5 py-1.5 sm:px-3 sm:py-2.5">
                        <div className="hud-kicker">
                          {t("app.betterMatches")}
                        </div>
                        <div className="mt-0.5 font-display text-[1rem] leading-none text-primary sm:mt-1 sm:text-[1.5rem]">
                          {formatCount(matchSummary.better)}
                        </div>
                      </div>
                      <div className="px-1.5 py-1.5 sm:px-3 sm:py-2.5">
                        <div className="hud-kicker">
                          {t("app.forgeVectors")}
                        </div>
                        <div className="mt-0.5 font-display text-[1rem] leading-none text-foreground sm:mt-1 sm:text-[1.5rem]">
                          {formatCount(attributeMatches.length)}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="mb-3 flex flex-col gap-2.5 sm:mb-4 sm:gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <div className="hud-kicker">{t("app.materialFeed")}</div>
                      <h4 className="mt-1.5 text-lg font-display font-bold tracking-[0.06em] text-foreground sm:text-xl">
                        {t("app.matchOverview")}
                      </h4>
                    </div>
                    <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                      {targetVectorLabels.map(label => (
                        <span
                          key={label}
                          className="hud-chip-muted whitespace-nowrap"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Accordion
                    type="multiple"
                    defaultValue={attributeMatches.map(
                      (_, index) => `item-${index}`
                    )}
                    className="space-y-2 sm:space-y-3"
                  >
                    {attributeMatches.map((match, index) => {
                      const betterCount = match.materials.filter(
                        material => material.matchType === "Better"
                      ).length;
                      const leadingDispatch =
                        match.materials[0]?.equipment.dispatchCost;

                      return (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="hud-panel overflow-hidden border-primary/10"
                        >
                          <AccordionTrigger className="px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-primary/[0.04]">
                            <div className="flex w-full flex-col gap-2.5 pr-4 lg:flex-row lg:items-center lg:justify-between">
                              <div className="flex items-start gap-2.5">
                                <span className="hud-chip">
                                  {t("app.upgradeTarget")}
                                </span>
                                <div>
                                  <div className="text-[15px] font-semibold tracking-[0.03em] text-foreground sm:text-base">
                                    {t(`stats.${match.attributeName}`)}
                                  </div>
                                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/65">
                                    {t("app.targetLock")} · {match.targetValue}
                                  </div>
                                </div>
                              </div>

                              <div className="hud-panel-soft grid grid-cols-3 overflow-hidden text-left lg:min-w-[320px]">
                                <div className="px-2 py-2 sm:px-3 sm:py-2">
                                  <div className="hud-kicker">
                                    {t("app.candidates")}
                                  </div>
                                  <div className="mt-1 font-display text-[1.05rem] leading-none text-foreground sm:text-[1.2rem]">
                                    {formatCount(match.materials.length)}
                                  </div>
                                </div>
                                <div className="border-x border-primary/10 px-2 py-2 sm:px-3 sm:py-2">
                                  <div className="hud-kicker">
                                    {t("app.betterMatches")}
                                  </div>
                                  <div className="mt-1 font-display text-[1.05rem] leading-none text-primary sm:text-[1.2rem]">
                                    {formatCount(betterCount)}
                                  </div>
                                </div>
                                <div className="px-2 py-2 sm:px-3 sm:py-2">
                                  <div className="hud-kicker">
                                    {t("app.dispatchBand")}
                                  </div>
                                  <div className="mt-1 font-display text-[1rem] leading-none text-foreground sm:text-[1.15rem]">
                                    {leadingDispatch
                                      ? formatCount(leadingDispatch)
                                      : "--"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="border-t border-primary/10 bg-background/15">
                            <div className="px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
                              {match.materials.length > 0 ? (
                                <div className="grid grid-cols-1 gap-2.5 sm:gap-3 xl:grid-cols-2">
                                  {match.materials.map(
                                    (material, materialIndex) => (
                                      <EquipmentCard
                                        key={`${match.attributeName}-${material.equipment.id}-${materialIndex}`}
                                        equipment={material.equipment}
                                        comparisonBadge={{
                                          label:
                                            material.matchType === "Better"
                                              ? t("app.better")
                                              : t("app.standard"),
                                          tone:
                                            material.matchType === "Better"
                                              ? "better"
                                              : "standard",
                                          deltaText:
                                            material.matchType === "Better"
                                              ? `+${material.diff.toFixed(1)}`
                                              : undefined,
                                        }}
                                        className={cn(
                                          "h-full",
                                          material.matchType === "Better"
                                            ? "border-emerald-400/20"
                                            : "border-primary/15"
                                        )}
                                      />
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="hud-panel-soft flex items-center gap-3 px-4 py-4 text-sm text-muted-foreground">
                                  <div className="h-2 w-2 border border-primary/30 bg-primary/20" />
                                  <span>{t("app.noCompatible")}</span>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden flex-1 flex-col overflow-hidden md:flex">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">
                  <section className="hud-panel animate-rise-in min-h-[460px] p-6 lg:p-8">
                    <div className="hud-kicker">
                      {t("app.analysisProtocol")}
                    </div>

                    <div className="mt-8 grid items-center gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                      <div className="hud-orbit mx-auto w-full max-w-[220px]">
                        <div className="absolute inset-[26%] rounded-full border border-primary/25" />
                        <div className="absolute inset-[39%] rounded-full border border-primary/35 bg-primary/6" />
                        <ArrowRight className="relative z-10 h-14 w-14 text-primary" />
                      </div>

                      <div>
                        <span className="hud-chip">{t("app.targetLock")}</span>
                        <h2 className="mt-5 text-5xl font-display font-bold leading-[0.9] tracking-[0.08em] text-foreground">
                          {t("app.awaitingInput")}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                          {t("app.analysisDeckDesc")}
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                          {[
                            t("app.dataSync"),
                            t("app.forgeReady"),
                            t("app.secure"),
                          ].map(label => (
                            <div
                              key={label}
                              className="hud-panel-soft px-4 py-4"
                            >
                              <div className="hud-kicker">{label}</div>
                              <div className="mt-3 h-px bg-primary/20" />
                              <div className="mt-3 h-2 w-2 bg-primary shadow-[0_0_12px_oklch(0.75_0.18_55_/_0.45)]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-4">
                    <div className="hud-panel animate-rise-in p-4">
                      <div className="hud-kicker">{t("app.matchOverview")}</div>
                      <div className="mt-4 grid gap-3">
                        <div className="hud-panel-soft px-4 py-4">
                          <div className="hud-kicker">
                            {t("app.unitsDetected")}
                          </div>
                          <div className="mt-3 font-display text-4xl leading-none text-foreground">
                            {formatCount(GOLD_EQUIPMENTS.length)}
                          </div>
                        </div>
                        <div className="hud-panel-soft px-4 py-4">
                          <div className="hud-kicker">
                            {t("app.setClusters")}
                          </div>
                          <div className="mt-3 font-display text-4xl leading-none text-foreground">
                            {formatCount(TOTAL_SET_COUNT)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hud-panel animate-rise-in p-4">
                      <div className="hud-kicker">{t("app.forgeVectors")}</div>
                      <div className="mt-4 space-y-3">
                        {[
                          t("app.searchHint"),
                          t("app.selectTarget"),
                          t("app.forgeReady"),
                        ].map(label => (
                          <div
                            key={label}
                            className="flex items-center gap-3 border border-primary/10 bg-card/35 px-3 py-3"
                          >
                            <div className="h-2 w-2 shrink-0 border border-primary/35 bg-primary/20" />
                            <span className="text-sm tracking-[0.03em] text-foreground/86">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
