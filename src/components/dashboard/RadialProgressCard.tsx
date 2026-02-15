import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Goal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CHART_COLORS, chart } from "@/lib/palette";

const goal = 10000;
const saved = 6800;
const pct = Math.round((saved / goal) * 100);

const data = [
  { name: "bg", value: 100, fill: chart.gray },
  { name: "saved", value: pct, fill: CHART_COLORS[2] },
];

export function RadialProgressCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Goal className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Savings Goal
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex min-h-0 flex-1 flex-col items-center">
          <div
            className="flex min-h-0 w-full max-h-[180px] min-h-[100px] flex-1 items-center justify-center"
            role="img"
            aria-label={`Savings goal radial progress: ${pct}% complete, $${saved.toLocaleString()} saved of $${goal.toLocaleString()} target`}
          >
            <div className="relative aspect-square h-full max-h-[180px] min-h-[100px]">
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
                <span className="text-xl font-semibold font-mono-num tracking-tight text-foreground">{pct}%</span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-x-4 gap-y-3">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium font-mono-num text-foreground">${saved.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">Saved</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium font-mono-num text-foreground">${goal.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">Target</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium font-mono-num text-foreground">${(goal - saved).toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">Remaining</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
