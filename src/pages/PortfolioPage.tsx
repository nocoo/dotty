import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie } from "recharts";
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, Briefcase } from "lucide-react";
import { usePortfolioViewModel } from "@/viewmodels/usePortfolioViewModel";
import { CHART_COLORS, CHART_TOKENS, chartPositive, chartAxis, withAlpha } from "@/lib/palette";

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

export default function PortfolioPage() {
  const { totalValue, holdings, performanceData } = usePortfolioViewModel();
  const holdingsWithFill = holdings.map((h, i) => ({ ...h, fill: CHART_COLORS[i] }));

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Portfolio</p>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">Investment portfolio overview</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Portfolio performance, asset allocation donut, and individual holdings with trend indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Portfolio Value</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">${totalValue.toLocaleString()}</h2>
          <span className="text-xs font-medium text-success">+8.6% all time</span>
        </div>
        <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Today's Change</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success font-display tracking-tight font-mono-num">+$342.50</h2>
          <span className="text-xs font-medium text-success">+0.34%</span>
        </div>
        <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Return</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">$8,600</h2>
          <span className="text-xs font-medium text-success">+8.6%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Portfolio Performance" icon={TrendingUp}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <div className="h-[180px] md:h-[200px]" role="img" aria-label="Portfolio performance line chart over time">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={40} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <Line type="monotone" dataKey="value" stroke={chartPositive} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Section>

        <Section title="Asset Allocation" icon={PieChartIcon}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <div className="flex flex-col items-center">
              <div className="h-[160px] w-[160px] md:h-[180px] md:w-[180px]" role="img" aria-label="Asset allocation donut chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={holdingsWithFill} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="allocation" strokeWidth={0} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid w-full grid-cols-3 gap-x-4 gap-y-3">
                {holdings.map((item, i) => (
                  <div key={item.name} className="flex flex-col items-center gap-0.5">
                    <span className="text-sm font-medium text-foreground font-display font-mono-num">{item.allocation}%</span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section title="Holdings" icon={Briefcase}>
        <table className="w-full">
          <thead className="sr-only">
            <tr>
              <th scope="col">Asset</th>
              <th scope="col">Value</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-3">
            {holdings.map((item, i) => (
              <tr key={item.name} className="flex items-center justify-between rounded-[var(--radius-widget)] border border-border bg-card p-3">
                <td className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: withAlpha(CHART_TOKENS[i], 0.12) }}>
                    {item.up ? <TrendingUp className="h-3.5 w-3.5" style={{ color: CHART_COLORS[i] }} strokeWidth={1.5} aria-hidden="true" /> : <TrendingDown className="h-3.5 w-3.5" style={{ color: CHART_COLORS[i] }} strokeWidth={1.5} aria-hidden="true" />}
                  </div>
                  <span className="text-sm text-foreground">{item.name}</span>
                </td>
                <td className="text-right">
                  <p className="text-sm font-medium text-foreground font-mono-num">${item.value.toLocaleString()}</p>
                  <p className={`text-xs ${item.up ? "text-success" : "text-muted-foreground"}`}>{item.change}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
