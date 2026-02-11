import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Goal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { chart } from "@/lib/palette";

const goal = 10000;
const saved = 6800;
const pct = Math.round((saved / goal) * 100);

const data = [
  { name: "bg", value: 100, fill: chart.gray },
  { name: "saved", value: pct, fill: chart.teal },
];

export function SavingsGoalCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Goal className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Savings Goal</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 items-center gap-5">
          <div className="relative h-[120px] w-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                data={data}
                barSize={10}
              >
                <RadialBar dataKey="value" cornerRadius={5} background={false} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-semibold text-foreground font-display tracking-tight">{pct}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Saved</p>
              <p className="text-sm font-medium text-foreground font-display">${saved.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="text-sm font-medium text-foreground font-display">${goal.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-sm font-medium text-foreground font-display">${(goal - saved).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
