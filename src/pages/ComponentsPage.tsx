import { useTranslation } from "react-i18next";
import { RectangleEllipsis, Sparkles, BarChart3, ListChecks, Activity, Check, Shield, Plane, Car, Home, Target } from "lucide-react";
import { SummaryMetricCard } from "@/components/dashboard/SummaryMetricCard";
import { SecondaryMetricCard } from "@/components/dashboard/SecondaryMetricCard";
import { GaugeCard } from "@/components/dashboard/GaugeCard";
import { RadialProgressCard } from "@/components/dashboard/RadialProgressCard";
import { BarChartCard } from "@/components/dashboard/BarChartCard";
import { AreaChartCard } from "@/components/dashboard/AreaChartCard";
import { GroupedBarCard } from "@/components/dashboard/GroupedBarCard";
import { DonutChartCard } from "@/components/dashboard/DonutChartCard";
import { TrendLineCard } from "@/components/dashboard/TrendLineCard";
import { ActionGridCard } from "@/components/dashboard/ActionGridCard";
import { RecentListCard } from "@/components/dashboard/RecentListCard";
import { ItemListCard } from "@/components/dashboard/ItemListCard";
import { SparklineCard } from "@/components/dashboard/SparklineCard";
import { StackedBarCard } from "@/components/dashboard/StackedBarCard";
import { RadarChartCard } from "@/components/dashboard/RadarChartCard";
import { HeatmapCard } from "@/components/dashboard/HeatmapCard";
import { StackedAreaCard } from "@/components/dashboard/StackedAreaCard";
import { MultiLineCard } from "@/components/dashboard/MultiLineCard";
import { BulletChartCard } from "@/components/dashboard/BulletChartCard";
import { MiniDonutCard } from "@/components/dashboard/MiniDonutCard";
import { SankeyCard } from "@/components/dashboard/SankeyCard";
import { FunnelChartCard } from "@/components/dashboard/FunnelChartCard";
import { useTargetCardsViewModel } from "@/viewmodels/useTargetCardsViewModel";

const GOAL_ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  plane: Plane,
  car: Car,
  home: Home,
};

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  const { t } = useTranslation();
  const { goals } = useTargetCardsViewModel();

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("pages.components.eyebrow")}</p>
        <div className="flex items-center gap-2 mb-1">
          <RectangleEllipsis className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">{t("pages.components.title")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("pages.components.description")}
        </p>
      </div>

      <Section title={t("pages.components.metricCards")} icon={Sparkles}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryMetricCard />
          <SecondaryMetricCard />
          <GaugeCard />
          <RadialProgressCard />
        </div>
      </Section>

      <Section title={t("pages.components.charts")} icon={BarChart3}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BarChartCard />
          <AreaChartCard />
          <GroupedBarCard />
          <DonutChartCard />
          <TrendLineCard />
          <StackedBarCard />
          <RadarChartCard />
          <SparklineCard />
          <StackedAreaCard />
          <MultiLineCard />
          <BulletChartCard />
          <MiniDonutCard />
          <SankeyCard />
          <FunnelChartCard />
        </div>
      </Section>

      <Section title={t("pages.components.heatmaps")} icon={BarChart3}>
        <div className="grid grid-cols-1 gap-4">
          <HeatmapCard />
        </div>
      </Section>

      <Section title={t("pages.components.listsActions")} icon={ListChecks}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ActionGridCard />
          <ItemListCard />
          <RecentListCard />
        </div>
      </Section>

      <Section title={t("pages.components.highlights")} icon={Activity}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">{t("pages.components.aiReadiness")}</p>
            <p className="text-xs text-muted-foreground">{t("pages.components.aiReadinessDesc")}</p>
            <button className="mt-3 rounded-[var(--radius-widget)] bg-secondary px-3 py-2 text-xs text-foreground">{t("common.viewModule")}</button>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">{t("pages.components.retentionModule")}</p>
            <p className="text-xs text-muted-foreground">{t("pages.components.retentionModuleDesc")}</p>
            <button className="mt-3 rounded-[var(--radius-widget)] bg-secondary px-3 py-2 text-xs text-foreground">{t("common.viewModule")}</button>
          </div>
        </div>
      </Section>

      <Section title={t("pages.components.targets")} icon={Target}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {goals.map((goal) => {
            const Icon = GOAL_ICONS[goal.icon] ?? Shield;
            return (
              <div key={goal.name} className="rounded-[var(--radius-widget)] border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-widget)] bg-muted">
                    <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{goal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-mono-num">${goal.saved.toLocaleString()}</span> of <span className="font-mono-num">${goal.target.toLocaleString()}</span>
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-foreground font-mono-num">{goal.percent}%</span>
                </div>
                <div
                  className="h-2 rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={goal.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${goal.name}: ${goal.percent}% of $${goal.target.toLocaleString()} saved`}
                >
                  <div className="h-full rounded-full bg-foreground/60 transition-all" style={{ width: `${goal.percent}%` }} aria-hidden="true" />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{t("pages.components.monthlyTarget")} <span className="font-mono-num">${goal.monthlyTarget.toLocaleString()}</span></span>
                  {goal.onTrack && <span className="flex items-center gap-1 text-xs text-success"><Check className="h-3 w-3" strokeWidth={2} /> {t("pages.components.onTrack")}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
