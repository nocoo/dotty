import { useTranslation } from "react-i18next";
import { Router, Wifi, Server, AlertTriangle, Clock } from "lucide-react";
import { StatCardWidget, StatGrid } from "@/components/dashboard/StatCardWidget";
import { LineChartWidget } from "@/components/dashboard/LineChartWidget";
import { StackedAreaCard } from "@/components/dashboard/StackedAreaCard";
import { StackedBarCard } from "@/components/dashboard/StackedBarCard";
import { SankeyCard } from "@/components/dashboard/SankeyCard";
import { RadarChartCard } from "@/components/dashboard/RadarChartCard";
import { HeatmapCard } from "@/components/dashboard/HeatmapCard";
import { TimelineWidget } from "@/components/dashboard/TimelineWidget";
import { chart } from "@/lib/palette";

// ── View Model ──

const useStatCards = (t: (key: string) => string) => [
  { title: t("pages.networkOps.uptime"), value: "99.98%", subtitle: t("pages.networkOps.days30"), icon: Server, trend: { value: 0.02, label: "vs last month" } },
  { title: t("pages.networkOps.latency"), value: "18 ms", subtitle: t("pages.networkOps.avgRtt"), icon: Wifi, trend: { value: -4.2, label: "vs last week" } },
  { title: t("pages.networkOps.packetLoss"), value: "0.12%", subtitle: t("pages.networkOps.regionAvg"), icon: AlertTriangle, trend: { value: -0.04, label: "vs last week" } },
  { title: t("pages.networkOps.throughput"), value: "4.8 Gbps", subtitle: t("pages.networkOps.peakToday"), icon: Router, trend: { value: 6.4, label: "vs last week" } },
];

const latencyTrend = [
  { label: "00", value: 18 },
  { label: "04", value: 16 },
  { label: "08", value: 21 },
  { label: "12", value: 19 },
  { label: "16", value: 23 },
  { label: "20", value: 17 },
];

const incidents = [
  { id: "i1", time: "02:10", title: "Edge router spike", subtitle: "latency +12ms" },
  { id: "i2", time: "08:45", title: "Packet loss", subtitle: "0.6% in us-east" },
  { id: "i3", time: "15:30", title: "BGP reconverge", subtitle: "reroute complete" },
];

// ── Section helper ──

function Section({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5 `}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

// ── View ──

export default function NetworkOpsDashboardPage() {
  const { t } = useTranslation();
  const statCards = useStatCards(t);

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("pages.networkOps.eyebrow")}</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="rounded-[var(--radius-widget)] bg-card border border-border p-2 text-muted-foreground">
            <Router className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-lg font-semibold font-display text-foreground">{t("pages.networkOps.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("pages.networkOps.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <StatGrid columns={4}>
        {statCards.map((stat) => (
          <StatCardWidget key={stat.title} {...stat} />
        ))}
      </StatGrid>

      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section icon={Wifi} title={t("pages.networkOps.latencyTrend")}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <LineChartWidget data={latencyTrend} height={220} color={chart.steel} valueFormatter={(v) => `${v}ms`} />
          </div>
        </Section>
        <StackedAreaCard />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StackedBarCard />
        <SankeyCard />
        <RadarChartCard />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <HeatmapCard />
        <Section icon={Clock} title={t("pages.networkOps.incidentTimeline")} className="lg:col-span-2 max-h-[420px] overflow-y-auto">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <TimelineWidget events={incidents} />
          </div>
        </Section>
      </div>
    </div>
  );
}
