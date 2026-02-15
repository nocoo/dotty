import { SummaryMetricCard } from "@/components/dashboard/SummaryMetricCard";
import { SecondaryMetricCard } from "@/components/dashboard/SecondaryMetricCard";
import { BarChartCard } from "@/components/dashboard/BarChartCard";
import { TrendLineCard } from "@/components/dashboard/TrendLineCard";
import { DonutChartCard } from "@/components/dashboard/DonutChartCard";
import { RecentListCard } from "@/components/dashboard/RecentListCard";
import { ActionGridCard } from "@/components/dashboard/ActionGridCard";
import { ItemListCard } from "@/components/dashboard/ItemListCard";
import { RadialProgressCard } from "@/components/dashboard/RadialProgressCard";
import { AreaChartCard } from "@/components/dashboard/AreaChartCard";
import { GaugeCard } from "@/components/dashboard/GaugeCard";
import { GroupedBarCard } from "@/components/dashboard/GroupedBarCard";
import { useStatsOverviewViewModel } from "@/viewmodels/useStatsOverviewViewModel";

export default function DashboardPage() {
  const { stats } = useStatsOverviewViewModel();

  return (
    <>
      {/* Row 0: analytics stat cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted"
          >
            <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {s.label}
              </p>
              <h3 className="font-mono-num text-xl md:text-2xl text-foreground tracking-tight">
                {s.value}
              </h3>
            </div>
            <div className="px-5 py-3">
              <span className={`text-xs font-medium ${s.changeColorClass}`}>
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: 3 summary cards */}
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryMetricCard />
        <SecondaryMetricCard />
        <TrendLineCard />
      </div>

      {/* Row 2: wide bar chart + donut */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChartCard />
        </div>
        <DonutChartCard />
      </div>

      {/* Row 3: wide area chart + 2 radial cards */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AreaChartCard />
        </div>
        <div className="flex flex-col gap-4">
          <RadialProgressCard />
          <GaugeCard />
        </div>
      </div>

      {/* Row 4: wide grouped bar chart + transactions */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GroupedBarCard />
        </div>
        <RecentListCard />
      </div>

      {/* Row 5: quick actions + accounts */}
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <ActionGridCard />
        <ItemListCard />
      </div>
    </>
  );
}
