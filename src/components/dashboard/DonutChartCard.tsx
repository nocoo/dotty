import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CHART_COLORS } from "@/lib/palette";

const data = [
  { name: "Food", value: 35 },
  { name: "Transport", value: 20 },
  { name: "Shopping", value: 25 },
  { name: "Bills", value: 20 },
].map((d, i) => ({ ...d, fill: CHART_COLORS[i] }));

export function DonutChartCard() {
  return (
    <Card className="h-full rounded-card border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Expense Breakdown</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 flex-col items-center min-h-0">
          <div className="flex-1 min-h-0 w-full flex items-center justify-center" role="img" aria-label="Expense breakdown donut chart: Food 35%, Shopping 25%, Transport 20%, Bills 20%">
            <div className="aspect-square h-full max-h-[180px] min-h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius="50%" outerRadius="80%" dataKey="value" strokeWidth={0} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-x-4 gap-y-3">
            {data.map((item, i) => (
              <div key={item.name} className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-medium text-foreground font-display">{item.value}%</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
