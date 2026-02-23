import { useTranslation } from "react-i18next";
import { Activity, Heart, Moon, Flame, Droplet, Footprints, Sparkles, Brain, ShieldCheck, Zap, MessageSquare, CheckCircle2, AlertTriangle } from "lucide-react";
import { StatCardWidget, StatGrid } from "@/components/dashboard/StatCardWidget";
import { DateNavigationWidget } from "@/components/dashboard/DateNavigationWidget";
import { SlotBarChart } from "@/components/dashboard/SlotBarChart";
import { BarChartWidget } from "@/components/dashboard/BarChartWidget";
import { LineChartWidget } from "@/components/dashboard/LineChartWidget";
import { DonutChartWidget } from "@/components/dashboard/PieChartWidget";
import { HeatmapCalendar, heatmapColorScales } from "@/components/dashboard/HeatmapCalendar";
import { TimelineWidget } from "@/components/dashboard/TimelineWidget";
import { chart } from "@/lib/palette";

const statCardKeys = [
  { tKey: "steps", subtitleKey: "dailyTarget12k", value: "9,840", icon: Footprints, trendValue: 6.2, trendKey: "vsLastWeek" },
  { tKey: "calories", subtitleKey: "burnedToday", value: "2,130", icon: Flame, trendValue: -1.4, trendKey: "vsYesterday" },
  { tKey: "hydration", subtitleKey: "goal3L", value: "2.4L", icon: Droplet, trendValue: 8.3, trendKey: "vsLastWeek" },
  { tKey: "sleep", subtitleKey: "consistency82", value: "7h 24m", icon: Moon, trendValue: 2.1, trendKey: "vsLastWeek" },
];

const weeklySteps = [
  { label: "Mon", value: 7800 },
  { label: "Tue", value: 8200 },
  { label: "Wed", value: 9600 },
  { label: "Thu", value: 10120 },
  { label: "Fri", value: 8900 },
  { label: "Sat", value: 11200 },
  { label: "Sun", value: 9840 },
];

const monthlySleep = [
  { label: "Week 1", value: 6.8 },
  { label: "Week 2", value: 7.1 },
  { label: "Week 3", value: 7.4 },
  { label: "Week 4", value: 7.2 },
];

const activityBreakdown = [
  { label: "Walking", value: 42 },
  { label: "Workout", value: 28 },
  { label: "Yoga", value: 16 },
  { label: "Recovery", value: 14 },
];

const sleepSlots = Array.from({ length: 24 }).map((_, i) => ({
  color: i < 6 ? "bg-foreground/60" : i < 10 ? "bg-foreground/40" : i < 16 ? "bg-foreground/20" : "bg-foreground/10",
  label: `Hour ${i}`,
}));

const heartRateSlots = Array.from({ length: 24 }).map((_, i) => ({
  color: i < 8 ? "bg-foreground/20" : i < 16 ? "bg-foreground/35" : i < 20 ? "bg-foreground/50" : "bg-foreground/70",
  label: `Hour ${i}`,
}));

const timelineEventKeys = [
  { id: "t1", time: "06:30", titleKey: "wakeUp", subtitleKey: "rested" },
  { id: "t2", time: "07:10", titleKey: "hydration", subtitle: "400ml" },
  { id: "t3", time: "12:20", titleKey: "walk", subtitle: "3.2km" },
  { id: "t4", time: "18:10", titleKey: "workout", subtitleKey: "strength45m" },
  { id: "t5", time: "21:40", titleKey: "windDown", subtitleKey: "stretching" },
];

const heatmapData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date(2026, 0, 1 + i);
  const noise = Math.sin(i * 17.13 + 3.1) * 100000;
  const random = noise - Math.floor(noise);
  const value = Math.max(1, Math.round(2 + random * 9));
  return { date: date.toISOString().slice(0, 10), value };
});

// ── Life.ai data ──

const aiStatCardKeys = [
  { tKey: "insightScore", subtitleKey: "qualityTierA", value: "92", icon: Brain, trendValue: 4.2, trendKey: "vsLastWeek" },
  { tKey: "riskAlerts", subtitleKey: "resolved2", value: "3", icon: AlertTriangle, trendValue: -1.5, trendKey: "vsLastWeek" },
  { tKey: "automation", subtitleKey: "tasksHandled", value: "68%", icon: Zap, trendValue: 6.8, trendKey: "vsLastMonth" },
];

const readinessTrend = [
  { label: "Mon", value: 78 },
  { label: "Tue", value: 82 },
  { label: "Wed", value: 84 },
  { label: "Thu", value: 88 },
  { label: "Fri", value: 86 },
  { label: "Sat", value: 90 },
  { label: "Sun", value: 92 },
];

const recommendationImpact = [
  { label: "Sleep", value: 22 },
  { label: "Nutrition", value: 18 },
  { label: "Movement", value: 28 },
  { label: "Recovery", value: 14 },
  { label: "Focus", value: 20 },
];

const insightTimelineKeys = [
  { id: "i1", time: "07:30", titleKey: "sleepDebtDetected", subtitleKey: "recommendEarlyWindDown" },
  { id: "i2", time: "09:10", titleKey: "hydrationDip", subtitleKey: "add400mlBeforeNoon" },
  { id: "i3", time: "13:20", titleKey: "focusWindow", subtitleKey: "scheduleDeepWorkBlock" },
  { id: "i4", time: "17:40", titleKey: "recoveryNeeded", subtitleKey: "lightMovementRecommended" },
];

const recommendationKeys = [
  { titleKey: "shiftBedtime", statusKey: "new" },
  { titleKey: "addWalk", statusKey: "active" },
  { titleKey: "reduceCaffeine", statusKey: "active" },
  { titleKey: "planProteinLunch", statusKey: "queued" },
];

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

export default function HealthPage() {
  const { t } = useTranslation();

  const trendLabelMap: Record<string, string> = {
    vsLastWeek: t("common.vsLastWeek"),
    vsYesterday: t("common.vsYesterday"),
    vsLastMonth: t("common.vsLastMonth"),
  };

  const statCards = statCardKeys.map((s) => ({
    title: t(`pages.health.${s.tKey}`),
    value: s.value,
    subtitle: t(`pages.health.${s.subtitleKey}`),
    icon: s.icon,
    trend: { value: s.trendValue, label: trendLabelMap[s.trendKey] },
  }));

  const aiStatCards = aiStatCardKeys.map((s) => ({
    title: t(`pages.health.${s.tKey}`),
    value: s.value,
    subtitle: t(`pages.health.${s.subtitleKey}`),
    icon: s.icon,
    trend: { value: s.trendValue, label: trendLabelMap[s.trendKey] },
  }));

  const timelineEvents = timelineEventKeys.map((e) => ({
    id: e.id,
    time: e.time,
    title: t(`pages.health.${e.titleKey}`),
    subtitle: "subtitleKey" in e && e.subtitleKey ? t(`pages.health.${e.subtitleKey}`) : ("subtitle" in e ? (e as { subtitle: string }).subtitle : undefined),
  }));

  const insightTimeline = insightTimelineKeys.map((e) => ({
    id: e.id,
    time: e.time,
    title: t(`pages.health.${e.titleKey}`),
    subtitle: t(`pages.health.${e.subtitleKey}`),
  }));

  const recommendations = recommendationKeys.map((r) => ({
    title: t(`pages.health.${r.titleKey}`),
    status: t(`pages.health.${r.statusKey}`),
  }));

  const chipKeys = ["summarizeWeek", "improveSleep", "boostFocus", "planRecovery"] as const;

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("pages.health.eyebrow")}</p>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">{t("pages.health.title")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("pages.health.description")}
        </p>
      </div>

      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.today")}</p>
          </div>
          <DateNavigationWidget
            selectedDate={new Date(2026, 1, 13)}
            onPrevDay={() => {}}
            onNextDay={() => {}}
            onToday={() => {}}
          />
        </div>
      </div>

      <StatGrid columns={4}>
        {statCards.map((stat) => (
          <StatCardWidget
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </StatGrid>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Moon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.sleepStages")}</p>
            <span className="ml-auto text-sm font-semibold text-foreground font-mono-num">7h 24m</span>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <SlotBarChart items={sleepSlots} />
          </div>
        </div>
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.heartRateZones")}</p>
            <span className="ml-auto text-sm font-semibold text-foreground font-mono-num">72 bpm</span>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <SlotBarChart items={heartRateSlots} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title={t("pages.health.weeklySteps")} icon={Footprints}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <BarChartWidget data={weeklySteps} height={200} color={chart.green} />
          </div>
        </Section>
        <Section title={t("pages.health.monthlySleepTrend")} icon={Sparkles}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <LineChartWidget data={monthlySleep} height={200} color={chart.indigo} valueFormatter={(v) => `${v}h`} />
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title={t("pages.health.activityBreakdown")} icon={Activity}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <DonutChartWidget data={activityBreakdown} height={220} showLegend />
          </div>
        </Section>
        <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5 lg:col-span-2 max-h-[400px] overflow-y-auto">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.dailyTimeline")}</p>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <TimelineWidget events={timelineEvents} />
          </div>
        </div>
      </div>

      <Section title={t("pages.health.activityHeatmap2026")} icon={Activity}>
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <HeatmapCalendar
            data={heatmapData}
            year={2026}
            colorScale={heatmapColorScales.green}
            metricLabel={t("pages.health.activities")}
          />
        </div>
      </Section>

      {/* Life.ai insights */}
      <div className="flex items-center gap-2 pt-2">
        <Sparkles className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm font-medium text-muted-foreground">{t("pages.health.lifeAiInsights")}</p>
      </div>

      <StatGrid columns={3}>
        {aiStatCards.map((stat) => (
          <StatCardWidget
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </StatGrid>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title={t("pages.health.aiReadinessTrend")} icon={ShieldCheck}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <LineChartWidget data={readinessTrend} height={200} color={chart.primary} />
          </div>
        </Section>
        <Section title={t("pages.health.recommendationImpact")} icon={Zap}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <BarChartWidget data={recommendationImpact} height={200} color={chart.teal} />
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.promptStudio")}</p>
          </div>
          <textarea
            rows={5}
            placeholder={t("pages.health.promptPlaceholder")}
            className="w-full rounded-[var(--radius-widget)] border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {chipKeys.map((key) => (
              <button key={key} className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground">
                {t(`pages.health.${key}`)}
              </button>
            ))}
          </div>
          <button className="mt-4 w-full rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            {t("pages.health.generateInsight")}
          </button>
        </div>

        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.recommendedActions")}</p>
          </div>
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div key={item.title} className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
                <p className="text-sm text-foreground">{item.title}</p>
                <span className="text-xs text-muted-foreground">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.health.insightTimeline")}</p>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <TimelineWidget events={insightTimeline} />
          </div>
        </div>
      </div>
    </div>
  );
}
