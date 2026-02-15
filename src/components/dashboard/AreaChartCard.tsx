import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { BarChart3 } from "lucide-react";
import { chart, chartAxis } from "@/lib/palette";

const data = [
  { day: "Mon", income: 420, expense: 320 },
  { day: "Tue", income: 380, expense: 450 },
  { day: "Wed", income: 510, expense: 280 },
  { day: "Thu", income: 620, expense: 390 },
  { day: "Fri", income: 480, expense: 520 },
  { day: "Sat", income: 350, expense: 180 },
  { day: "Sun", income: 290, expense: 150 },
];

export function AreaChartCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Weekly Activity
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ background: chart.primary }} />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ background: chart.purple }} />
            <span className="text-xs text-muted-foreground">Expense</span>
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="h-[200px]" role="img" aria-label="Weekly activity area chart comparing income and expense from Monday to Sunday">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="dottyIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chart.primary} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chart.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dottyExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chart.purple} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chart.purple} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartAxis} strokeOpacity={0.15} vertical={false} />
              <XAxis dataKey="day" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Area type="monotone" dataKey="income" stroke={chart.primary} strokeWidth={2} fill="url(#dottyIncomeGrad)" />
              <Area type="monotone" dataKey="expense" stroke={chart.purple} strokeWidth={2} fill="url(#dottyExpenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
