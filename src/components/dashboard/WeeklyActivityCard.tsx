import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

export function WeeklyActivityCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">Weekly Activity</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: chart.blue }} />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: chart.purple }} />
              <span className="text-xs text-muted-foreground">Expense</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chart.blue} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chart.blue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chart.purple} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chart.purple} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartAxis} strokeOpacity={0.15} vertical={false} />
              <XAxis dataKey="day" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Area type="monotone" dataKey="income" stroke={chart.blue} strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expense" stroke={chart.purple} strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
