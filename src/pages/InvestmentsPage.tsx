import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, Briefcase } from "lucide-react";
import { portfolio, performanceData } from "@/data/mock";
import { CHART_COLORS, CHART_TOKENS, chartPositive, chartAxis, withAlpha } from "@/lib/palette";

export default function InvestmentsPage() {
  const totalValue = portfolio.reduce((a, b) => a + b.value, 0);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Portfolio Value</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight">${totalValue.toLocaleString()}</h2>
          <span className="text-xs font-medium text-success">+8.6% all time</span>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Today's Change</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success font-display tracking-tight">+$342.50</h2>
          <span className="text-xs font-medium text-success">+0.34%</span>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Return</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight">$8,600</h2>
          <span className="text-xs font-medium text-success">+8.6%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Portfolio Performance</p>
          </div>
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={40} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                <Line type="monotone" dataKey="value" stroke={chartPositive} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Asset Allocation</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-[160px] w-[160px] md:h-[180px] md:w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={portfolio} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="allocation" strokeWidth={0}>
                    {portfolio.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid w-full grid-cols-3 gap-x-4 gap-y-3">
              {portfolio.map((item, i) => (
                <div key={item.name} className="flex flex-col items-center gap-0.5">
                  <span className="text-sm font-medium text-foreground font-display">{item.allocation}%</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">Holdings</p>
        </div>
        <div className="flex flex-col gap-3">
          {portfolio.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between rounded-[10px] bg-card p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: withAlpha(CHART_TOKENS[i], 0.12) }}>
                  {item.up ? <TrendingUp className="h-3.5 w-3.5" style={{ color: CHART_COLORS[i] }} strokeWidth={1.5} /> : <TrendingDown className="h-3.5 w-3.5" style={{ color: CHART_COLORS[i] }} strokeWidth={1.5} />}
                </div>
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">${item.value.toLocaleString()}</p>
                <p className={`text-xs ${item.up ? "text-success" : "text-destructive"}`}>{item.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
