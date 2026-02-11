import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowUpDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { chart, chartAxis } from "@/lib/palette";

const data = [
  { month: "Jul", income: 4200, expense: 3100 },
  { month: "Aug", income: 4800, expense: 3600 },
  { month: "Sep", income: 4500, expense: 3900 },
  { month: "Oct", income: 5100, expense: 3400 },
  { month: "Nov", income: 4700, expense: 4100 },
  { month: "Dec", income: 5500, expense: 3800 },
];

export function MonthlyComparisonCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">Income vs Expense</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: chart.green }} />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: chart.pink }} />
              <span className="text-xs text-muted-foreground">Expense</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke={chartAxis} strokeOpacity={0.15} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={35} tickFormatter={(v: number) => `${v / 1000}k`} />
              <Bar dataKey="income" fill={chart.green} radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill={chart.pink} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
