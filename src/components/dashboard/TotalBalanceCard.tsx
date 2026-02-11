import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import { Globe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { chartPrimary, chart } from "@/lib/palette";

const data = Array.from({ length: 24 }, (_, i) => ({ value: 3000 + Math.random() * 5000 }));

export function TotalBalanceCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Total Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-col flex-1 rounded-[10px] border border-border p-4">
          <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">$8,800</h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-success font-display">+3.1%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
          <div className="mt-3 flex-1 min-h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={1} barCategoryGap={1}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={8}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={i < 12 ? chartPrimary : chart.gray} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
