import { Activity, Heart, Moon, Flame, Droplet, Footprints, Sparkles } from "lucide-react";
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
    </div>
  );
}
