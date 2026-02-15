import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { PiggyBank } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { chart, chartAxis } from "@/lib/palette";

const data = [
  { name: "Jan", value: 12000 }, { name: "Feb", value: 15000 },
  { name: "Mar", value: 11000 }, { name: "Apr", value: 18000 },
  { name: "May", value: 14000 }, { name: "Jun", value: 20000 },
  { name: "Jul", value: 16000 }, { name: "Aug", value: 22000 },
  { name: "Sep", value: 13000 }, { name: "Oct", value: 17000 },
  { name: "Nov", value: 25000 }, { name: "Dec", value: 19000 },
];

export function BarChartCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Usage Category
          </CardTitle>
        </div>
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">
            <span className="font-mono-num">$15,200</span>
          </h2>
          <span className="text-sm text-muted-foreground">total transactions</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-1 min-h-[200px]" role="img" aria-label="Monthly transaction amounts from January to December, bar chart totaling $15,200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="25%">
              <XAxis dataKey="name" tick={{ fill: chartAxis, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v: number) => `${v / 1000}k`} tick={{ fill: chartAxis, fontSize: 12 }} axisLine={false} tickLine={false} width={35} domain={[0, 30000]} ticks={[10000, 15000, 20000, 25000, 30000]} />
              <Bar dataKey="value" fill={chart.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
