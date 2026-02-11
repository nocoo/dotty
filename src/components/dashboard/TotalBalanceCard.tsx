import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import { Globe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = Array.from({ length: 24 }, (_, i) => ({ value: 3000 + Math.random() * 5000 }));

export function TotalBalanceCard() {
  return (
    <Card className="rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Total Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-[10px] bg-card p-4">
          <h2 className="text-3xl font-semibold text-foreground">$8,800</h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-success">+3.1%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
          <div className="mt-4 h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={1} barCategoryGap={1}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={8}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={i < 12 ? `hsl(200, 90%, ${55 + (i % 3) * 5}%)` : `hsl(0, 0%, ${30 - (i - 12) * 1}%)`} />
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
