import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CHART_COLORS } from "@/lib/palette";

const data = [
  { name: "Food", value: 35 },
  { name: "Transport", value: 20 },
  { name: "Shopping", value: 25 },
  { name: "Bills", value: 20 },
];

export function ExpenseBreakdownCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Expense Breakdown</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 items-center gap-6">
          <div className="h-[130px] w-[130px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                  {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2.5">
            {data.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
                <span className="text-xs font-medium text-foreground ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
