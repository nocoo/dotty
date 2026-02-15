import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, BarChart3, ArrowLeftRight } from "lucide-react";
import { useFlowComparisonViewModel } from "@/viewmodels/useFlowComparisonViewModel";
import { chartPositive, chartNegative, chartPrimary, chartAxis } from "@/lib/palette";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function FlowComparisonPage() {
  const { summary, flowData, netFlowData } = useFlowComparisonViewModel();

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
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
        <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Inflow</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success font-display tracking-tight font-mono-num">${summary.totalInflow.toLocaleString()}</h2>
        </div>
        <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Outflow</p>
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground font-display tracking-tight font-mono-num">${summary.totalOutflow.toLocaleString()}</h2>
        </div>
        <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Net Cash Flow</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">${summary.netFlow.toLocaleString()}</h2>
        </div>
      </div>

      <Section title="Cash Flow Over Time" icon={Activity}>
        <div className="h-[200px] md:h-[240px]" role="img" aria-label="Cash flow over time area chart showing inflow and outflow">
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
      </Section>

      <Section title="Net Cash Flow by Month" icon={BarChart3}>
        <div className="h-[160px] md:h-[180px]" role="img" aria-label="Net cash flow by month bar chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={netFlowData}>
              <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <Bar dataKey="net" fill={chartPrimary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </div>
  );
}
