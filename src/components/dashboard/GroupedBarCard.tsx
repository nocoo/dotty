import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowUpDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const data = [
  { month: "Jul", income: 4200, expense: 3100 },
  { month: "Aug", income: 4800, expense: 3600 },
  { month: "Sep", income: 4500, expense: 3900 },
  { month: "Oct", income: 5100, expense: 3400 },
  { month: "Nov", income: 4700, expense: 4100 },
  { month: "Dec", income: 5500, expense: 3800 },
];

export function GroupedBarCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border border-border bg-card shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Income vs Expense
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[0] }} />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[4] }} />
              <span className="text-xs text-muted-foreground">Expense</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div
          className="min-h-[200px] flex-1"
          role="img"
          aria-label="Grouped bar chart comparing monthly income and expense from July to December"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke={chartAxis} strokeOpacity={0.15} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: chartAxis, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={35}
                tickFormatter={(v: number) => `${v / 1000}k`}
              />
              <Bar dataKey="income" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill={CHART_COLORS[4]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
