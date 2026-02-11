import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { chart } from "@/lib/palette";

const score = 742;
const max = 850;
const pct = Math.round((score / max) * 100);

const data = [{ value: pct }];

function getScoreLabel(s: number) {
  if (s >= 740) return { label: "Excellent", color: "text-success" };
  if (s >= 670) return { label: "Good", color: "text-foreground" };
  if (s >= 580) return { label: "Fair", color: "text-amber-500" };
  return { label: "Poor", color: "text-destructive" };
}

const { label, color } = getScoreLabel(score);

export function CreditScoreCard() {
  return (
    <Card className="rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Credit Score</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative h-[140px] w-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="95%"
                startAngle={90}
                endAngle={-270}
                data={data}
                barSize={12}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={6}
                  fill={chart.green}
                  background={{ fill: chart.gray }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-foreground font-display tracking-tight">{score}</span>
              <span className={`text-xs font-medium ${color}`}>{label}</span>
            </div>
          </div>
          <div className="mt-3 flex w-full justify-between text-xs text-muted-foreground px-2">
            <span>300</span>
            <span>{max}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
