import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { PiggyBank } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { name: "Jan", value: 12000 }, { name: "Feb", value: 15000 },
  { name: "Mar", value: 11000 }, { name: "Apr", value: 18000 },
  { name: "May", value: 14000 }, { name: "Jun", value: 20000 },
  { name: "Jul", value: 16000 }, { name: "Aug", value: 22000 },
  { name: "Sep", value: 13000 }, { name: "Oct", value: 17000 },
  { name: "Nov", value: 25000 }, { name: "Dec", value: 19000 },
];

export function UsageCategoryCard() {
  return (
    <Card className="rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Usage Category</CardTitle>
        </div>
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold text-foreground">$15,200</h2>
          <span className="text-sm text-muted-foreground">total transactions</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="25%">
              <XAxis dataKey="name" tick={{ fill: "hsl(0,0%,40%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v: number) => `${v / 1000}k`} tick={{ fill: "hsl(0,0%,40%)", fontSize: 12 }} axisLine={false} tickLine={false} width={35} domain={[0, 30000]} ticks={[10000, 15000, 20000, 25000, 30000]} />
              <Bar dataKey="value" fill="hsl(0,0%,20%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
