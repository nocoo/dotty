import { Activity, Heart, Moon, Flame, Droplet, Footprints, Sparkles, Brain, ShieldCheck, Zap, MessageSquare, CheckCircle2, AlertTriangle } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { StatCardWidget, StatGrid } from "@/components/dashboard/StatCardWidget";
import { DateNavigationWidget } from "@/components/dashboard/DateNavigationWidget";
import { SlotBarChart } from "@/components/dashboard/SlotBarChart";
import { BarChartWidget } from "@/components/dashboard/BarChartWidget";
import { LineChartWidget } from "@/components/dashboard/LineChartWidget";
import { DonutChartWidget } from "@/components/dashboard/PieChartWidget";
import { HeatmapCalendar, heatmapColorScales } from "@/components/dashboard/HeatmapCalendar";
import { TimelineWidget } from "@/components/dashboard/TimelineWidget";
import { chart } from "@/lib/palette";

const statCards = [
  { title: "Steps", value: "9,840", subtitle: "Daily target 12k", icon: Footprints, trend: { value: 6.2, label: "vs last week" } },
  { title: "Calories", value: "2,130", subtitle: "Burned today", icon: Flame, trend: { value: -1.4, label: "vs yesterday" } },
  { title: "Hydration", value: "2.4L", subtitle: "Goal 3.0L", icon: Droplet, trend: { value: 8.3, label: "vs last week" } },
  { title: "Sleep", value: "7h 24m", subtitle: "Consistency 82%", icon: Moon, trend: { value: 2.1, label: "vs last week" } },
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
  color: i < 6 ? "bg-indigo-800" : i < 10 ? "bg-indigo-500" : i < 16 ? "bg-green-600" : "bg-orange-500",
  label: `Hour ${i}`,
}));

const heartRateSlots = Array.from({ length: 24 }).map((_, i) => ({
  color: i < 8 ? "bg-green-600" : i < 16 ? "bg-yellow-600" : i < 20 ? "bg-orange-600" : "bg-red-600",
  label: `Hour ${i}`,
}));

const timelineEvents = [
  { id: "t1", time: "06:30", title: "Wake up", subtitle: "Rested", color: "bg-indigo-500" },
  { id: "t2", time: "07:10", title: "Hydration", subtitle: "400ml", color: "bg-blue-500" },
  { id: "t3", time: "12:20", title: "Walk", subtitle: "3.2km", color: "bg-green-600" },
  { id: "t4", time: "18:10", title: "Workout", subtitle: "Strength 45m", color: "bg-orange-500" },
  { id: "t5", time: "21:40", title: "Wind down", subtitle: "Stretching", color: "bg-indigo-400" },
];

const heatmapData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date(2026, 0, 1 + i);
  const noise = Math.sin(i * 17.13 + 3.1) * 100000;
  const random = noise - Math.floor(noise);
  const value = Math.max(1, Math.round(2 + random * 9));
  return {
    date: date.toISOString().slice(0, 10),
    value,
  };
});

// ── Life.ai data ──

const aiStatCards = [
  { title: "Insight Score", value: "92", subtitle: "Quality tier A", icon: Brain, trend: { value: 4.2, label: "vs last week" } },
  { title: "Risk Alerts", value: "3", subtitle: "2 resolved", icon: AlertTriangle, trend: { value: -1.5, label: "vs last week" } },
  { title: "Automation", value: "68%", subtitle: "Tasks handled", icon: Zap, trend: { value: 6.8, label: "vs last month" } },
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

const insightTimeline = [
  { id: "i1", time: "07:30", title: "Sleep debt detected", subtitle: "Recommend early wind down", color: "bg-indigo-500" },
  { id: "i2", time: "09:10", title: "Hydration dip", subtitle: "Add 400ml before noon", color: "bg-blue-500" },
  { id: "i3", time: "13:20", title: "Focus window", subtitle: "Schedule deep work block", color: "bg-green-600" },
  { id: "i4", time: "17:40", title: "Recovery needed", subtitle: "Light movement recommended", color: "bg-orange-500" },
];

const recommendations = [
  { title: "Shift bedtime by 30 minutes", status: "New" },
  { title: "Add a 20-minute walk", status: "Active" },
  { title: "Reduce caffeine after 3 PM", status: "Active" },
  { title: "Plan protein-forward lunch", status: "Queued" },
];

export default function HealthPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Health dashboard with real-world widgets"
        description="Sleep, heart rate, steps, and habit signals organized into a full health analytics view."
        eyebrow="Health"
        icon={Activity}
      />

      <div className="rounded-card bg-secondary p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Today</p>
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
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Moon className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Sleep stages</p>
            <span className="ml-auto text-sm font-semibold text-indigo-500">7h 24m</span>
          </div>
          <SlotBarChart items={sleepSlots} />
        </div>
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Heart rate zones</p>
            <span className="ml-auto text-sm font-semibold text-red-500">72 bpm</span>
          </div>
          <SlotBarChart items={heartRateSlots} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Footprints className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Weekly steps</p>
          </div>
          <BarChartWidget data={weeklySteps} height={200} color={chart.green} />
        </div>
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Monthly sleep trend</p>
          </div>
          <LineChartWidget data={monthlySleep} height={200} color={chart.indigo} valueFormatter={(v) => `${v}h`} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Activity breakdown</p>
          </div>
          <DonutChartWidget data={activityBreakdown} height={220} showLegend />
        </div>
        <div className="rounded-card bg-secondary p-4 md:p-5 lg:col-span-2 max-h-[400px] overflow-y-auto">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Daily timeline</p>
          </div>
          <TimelineWidget events={timelineEvents} />
        </div>
      </div>

      <div className="rounded-card bg-secondary p-4 md:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">Activity heatmap — 2026</p>
        </div>
        <HeatmapCalendar
          data={heatmapData}
          year={2026}
          colorScale={heatmapColorScales.green}
          metricLabel="Activities"
        />
      </div>

      {/* Life.ai insights */}
      <div className="flex items-center gap-2 pt-2">
        <Sparkles className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm font-medium text-muted-foreground">Life.ai Insights</p>
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
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">AI readiness trend</p>
          </div>
          <LineChartWidget data={readinessTrend} height={200} color={chart.primary} />
        </div>
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Recommendation impact</p>
          </div>
          <BarChartWidget data={recommendationImpact} height={200} color={chart.teal} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Prompt studio</p>
          </div>
          <textarea
            rows={5}
            placeholder="Ask Life.ai to summarize your week or set a focus goal..."
            className="w-full rounded-widget border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {["Summarize week", "Improve sleep", "Boost focus", "Plan recovery"].map((chip) => (
              <button key={chip} className="rounded-full bg-card px-3 py-1 text-xs text-muted-foreground">
                {chip}
              </button>
            ))}
          </div>
          <button className="mt-4 w-full rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Generate insight
          </button>
        </div>

        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Recommended actions</p>
          </div>
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div key={item.title} className="rounded-widget border border-border bg-card p-3">
                <p className="text-sm text-foreground">{item.title}</p>
                <span className="text-xs text-muted-foreground">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-secondary p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Insight timeline</p>
          </div>
          <TimelineWidget events={insightTimeline} />
        </div>
      </div>
    </div>
  );
}
