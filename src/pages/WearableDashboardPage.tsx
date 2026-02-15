import { Activity, Heart, Moon, Flame, Footprints, Sparkles, Clock } from "lucide-react";
import { StatCardWidget, StatGrid } from "@/components/dashboard/StatCardWidget";
import { DateNavigationWidget } from "@/components/dashboard/DateNavigationWidget";
import { SlotBarChart } from "@/components/dashboard/SlotBarChart";
import { LineChartWidget } from "@/components/dashboard/LineChartWidget";
import { BarChartWidget } from "@/components/dashboard/BarChartWidget";
import { DonutChartWidget } from "@/components/dashboard/PieChartWidget";
import { HeatmapCalendar, heatmapColorScales } from "@/components/dashboard/HeatmapCalendar";
import { TimelineWidget } from "@/components/dashboard/TimelineWidget";
import { chart, CHART_COLORS, withAlpha } from "@/lib/palette";

// ── View Model ──

const statCards = [
  { title: "Steps", value: "12,480", subtitle: "Goal 14k", icon: Footprints, trend: { value: 5.2, label: "vs last week" } },
  { title: "Calories", value: "2,460", subtitle: "Active burn", icon: Flame, trend: { value: 3.1, label: "vs last week" } },
  { title: "Heart Rate", value: "68 bpm", subtitle: "Resting avg", icon: Heart, trend: { value: -1.4, label: "vs last week" } },
  { title: "Sleep", value: "7h 42m", subtitle: "Consistency 84%", icon: Moon, trend: { value: 2.6, label: "vs last week" } },
];

const weeklySteps = [
  { label: "Mon", value: 9800 },
  { label: "Tue", value: 11200 },
  { label: "Wed", value: 12480 },
  { label: "Thu", value: 10600 },
  { label: "Fri", value: 13240 },
  { label: "Sat", value: 14800 },
  { label: "Sun", value: 12120 },
];

const recoveryTrend = [
  { label: "Week 1", value: 72 },
  { label: "Week 2", value: 78 },
  { label: "Week 3", value: 82 },
  { label: "Week 4", value: 86 },
];

const activityBreakdown = [
  { label: "Walking", value: 42 },
  { label: "Training", value: 28 },
  { label: "Yoga", value: 18 },
  { label: "Recovery", value: 12 },
];

// Sleep stages: deep → light → awake → REM (monochrome gradient)
const sleepSlots = Array.from({ length: 24 }).map((_, i) => ({
  color: i < 6 ? CHART_COLORS[0] : i < 10 ? CHART_COLORS[2] : i < 16 ? CHART_COLORS[4] : CHART_COLORS[6],
  label: `Hour ${i}`,
}));

// Heart rate zones: rest → moderate → active → peak (monochrome gradient)
const heartRateSlots = Array.from({ length: 24 }).map((_, i) => ({
  color: i < 8 ? CHART_COLORS[4] : i < 16 ? CHART_COLORS[2] : i < 20 ? CHART_COLORS[0] : CHART_COLORS[8],
  label: `Hour ${i}`,
}));

const timeline = [
  { id: "t1", time: "06:10", title: "Wake up", subtitle: "Recovery score 86" },
  { id: "t2", time: "07:30", title: "Morning walk", subtitle: "3.2 km" },
  { id: "t3", time: "12:40", title: "Hydration", subtitle: "600 ml" },
  { id: "t4", time: "18:10", title: "Training", subtitle: "Strength 45m" },
  { id: "t5", time: "21:30", title: "Wind down", subtitle: "Stretch & breath" },
];

const heatmapData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date(2026, 0, 1 + i);
  const noise = Math.sin(i * 91.337) * 10000;
  const random = noise - Math.floor(noise);
  const value = Math.max(1, Math.round(2 + random * 10));
  return { date: date.toISOString().slice(0, 10), value };
});

// ── Section helper ──

function Section({
  icon: Icon,
  title,
  trailing,
  children,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[var(--radius-card)] bg-secondary p-4 md:p-5 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
        {trailing && <span className="ml-auto">{trailing}</span>}
      </div>
      {children}
    </div>
  );
}

// ── View ──

export default function WearableDashboardPage() {
  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Wearable Health</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="rounded-[var(--radius-widget)] bg-card border border-border p-2 text-muted-foreground">
            <Activity className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-lg font-semibold font-display text-foreground">Wearable performance dashboard</h1>
            <p className="text-sm text-muted-foreground">
              A professional wearable view with recovery, sleep, activity mix, and daily timeline insights.
            </p>
          </div>
        </div>
      </div>

      {/* Date navigation */}
      <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Today summary</p>
          </div>
          <DateNavigationWidget
            selectedDate={new Date(2026, 1, 13)}
            onPrevDay={() => {}}
            onNextDay={() => {}}
            onToday={() => {}}
          />
        </div>
      </div>

      {/* Stat cards */}
      <StatGrid columns={4}>
        {statCards.map((stat) => (
          <StatCardWidget key={stat.title} {...stat} />
        ))}
      </StatGrid>

      {/* Slot bars */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section
          icon={Moon}
          title="Sleep stages"
          trailing={<span className="text-sm font-semibold font-mono-num text-foreground">7h 42m</span>}
        >
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <SlotBarChart items={sleepSlots} />
          </div>
        </Section>
        <Section
          icon={Heart}
          title="Heart rate zones"
          trailing={<span className="text-sm font-semibold font-mono-num text-foreground">68 bpm</span>}
        >
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <SlotBarChart items={heartRateSlots} />
          </div>
        </Section>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section icon={Footprints} title="Weekly steps">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <BarChartWidget data={weeklySteps} height={200} color={chart.primary} />
          </div>
        </Section>
        <Section icon={Sparkles} title="Recovery trend">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <LineChartWidget data={recoveryTrend} height={200} color={chart.steel} valueFormatter={(v) => `${v}%`} />
          </div>
        </Section>
      </div>

      {/* Activity mix + timeline */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section icon={Activity} title="Activity mix">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <DonutChartWidget data={activityBreakdown} height={220} showLegend />
          </div>
        </Section>
        <Section icon={Clock} title="Daily timeline" className="lg:col-span-2 max-h-[420px] overflow-y-auto">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <TimelineWidget events={timeline} />
          </div>
        </Section>
      </div>

      {/* Heatmap */}
      <Section icon={Activity} title="Workout consistency — 2026">
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <HeatmapCalendar data={heatmapData} year={2026} colorScale={heatmapColorScales.green} metricLabel="Workouts" />
        </div>
      </Section>
    </div>
  );
}
