import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { analyticsWeekly, analyticsCategories, analyticsTrend, analyticsStats } from "@/data/mock";
import { CHART_COLORS, chart, chartPrimary, chartAxis } from "@/lib/palette";

export default function AnalyticsPage() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {analyticsStats.map((s) => (
          <div key={s.label} className="rounded-[14px] bg-secondary p-4 md:p-5">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{s.label}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">{s.value}</h3>
            <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-success" : s.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>{s.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-4">Income vs Expenses</p>
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsWeekly} barGap={4}>
                <XAxis dataKey="day" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Bar dataKey="income" fill={chartPrimary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill={chart.gray} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-4">Spending by Category</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="h-[150px] w-[150px] md:h-[180px] md:w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analyticsCategories} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {analyticsCategories.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-2.5 justify-center">
              {analyticsCategories.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">30-Day Balance Trend</p>
        <div className="h-[180px] md:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsTrend}>
              <XAxis dataKey="day" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartPrimary} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartPrimary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke={chartPrimary} strokeWidth={2} fill="url(#blueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
