import { RectangleEllipsis, Sparkles, BarChart3, Activity, ListChecks } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
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

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-card bg-secondary p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Composable blocks and visual modules"
        description="These are example modules built from controls: metric cards, charts, lists, and action grids that can be reused across templates."
        eyebrow="Examples"
        icon={RectangleEllipsis}
      />
      <Section title="Metric Cards" icon={Sparkles}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryMetricCard />
          <SecondaryMetricCard />
          <GaugeCard />
          <RadialProgressCard />
        </div>
      </Section>

      <Section title="Charts" icon={BarChart3}>
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

      <Section title="Heatmaps" icon={BarChart3}>
        <div className="grid grid-cols-1 gap-4">
          <HeatmapCard />
        </div>
      </Section>

      <Section title="Lists & Actions" icon={ListChecks}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ActionGridCard />
          <ItemListCard />
          <RecentListCard />
        </div>
      </Section>

      <Section title="Highlights" icon={Activity}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-widget border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">AI readiness module</p>
            <p className="text-xs text-muted-foreground">Compact card pattern for AI insights.</p>
            <button className="mt-3 rounded-widget bg-secondary px-3 py-2 text-xs text-foreground">View module</button>
          </div>
          <div className="rounded-widget border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">Retention module</p>
            <p className="text-xs text-muted-foreground">Stackable list + KPI combination.</p>
            <button className="mt-3 rounded-widget bg-secondary px-3 py-2 text-xs text-foreground">View module</button>
          </div>
        </div>
      </Section>
    </div>
  );
}
