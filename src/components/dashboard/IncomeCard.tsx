import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = Array.from({ length: 20 }, (_, i) => ({ value: 2000 + Math.random() * 6000 }));

export function IncomeCard() {
  return (
    <Card className="rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Income</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-[10px] bg-card p-4">
          <h2 className="text-3xl font-semibold text-foreground">$4,500</h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-success">+2.4%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
          <div className="mt-4 h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={1} barCategoryGap={1}>
                <Bar dataKey="value" fill="hsl(270, 70%, 60%)" radius={[2, 2, 0, 0]} maxBarSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
