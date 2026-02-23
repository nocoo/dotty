import { useTranslation } from "react-i18next";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Activity, BarChart3, ArrowLeftRight } from "lucide-react";
import { useFlowComparisonViewModel } from "@/viewmodels/useFlowComparisonViewModel";
import { chartPositive, chartNegative, chartAxis } from "@/lib/palette";
import { PixelBarChart } from "@/components/PixelBarChart";

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

export default function FlowComparisonPage() {
  const { t } = useTranslation();
  const { summary, flowData, netFlowData } = useFlowComparisonViewModel();

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Cash Flow</p>
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">Cash flow comparison and net analysis</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Inflow vs outflow trends over time with net cash flow breakdown by month.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("pages.flowComparison.totalInflow")}</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success font-display tracking-tight font-mono-num">${summary.totalInflow.toLocaleString()}</h2>
        </div>
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("pages.flowComparison.totalOutflow")}</p>
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground font-display tracking-tight font-mono-num">${summary.totalOutflow.toLocaleString()}</h2>
        </div>
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("pages.flowComparison.netCashFlow")}</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">${summary.netFlow.toLocaleString()}</h2>
        </div>
      </div>

      <Section title={t("pages.flowComparison.cashFlowOverTime")} icon={Activity}>
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <div className="h-[200px] md:h-[240px]" role="img" aria-label={t("pages.flowComparison.cashFlowOverTimeAria")}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowData}>
                <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                <defs>
                  <linearGradient id="inflowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={chartPositive} stopOpacity={0.3} /><stop offset="100%" stopColor={chartPositive} stopOpacity={0} /></linearGradient>
                  <linearGradient id="outflowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={chartNegative} stopOpacity={0.3} /><stop offset="100%" stopColor={chartNegative} stopOpacity={0} /></linearGradient>
                </defs>
                <Area type="monotone" dataKey="inflow" stroke={chartPositive} strokeWidth={2} fill="url(#inflowG)" />
                <Area type="monotone" dataKey="outflow" stroke={chartNegative} strokeWidth={2} fill="url(#outflowG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <Section title={t("pages.flowComparison.netCashFlowByMonth")} icon={BarChart3}>
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <div role="img" aria-label={t("pages.flowComparison.netCashFlowByMonthAria")}>
            <PixelBarChart
              data={netFlowData.map((d) => ({ label: d.month, value: d.net }))}
              seriesLabels={["Net Flow"]}
              height={180}
              blockGap={2}
              gridRows={6}
              formatYLabel={(v) => `${Math.round(v / 1000)}k`}
              tooltipYearSuffix=""
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
