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
  if (s >= 580) return { label: "Fair", color: "text-muted-foreground" };
  return { label: "Poor", color: "text-muted-foreground" };
}

const { label, color } = getScoreLabel(score);

export function GaugeCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border border-border bg-card shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Credit Score
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 flex-col items-center min-h-0">
          <div className="flex-1 min-h-0 w-full flex items-center justify-center" role="img" aria-label={`Credit score gauge showing ${score} out of ${max}, rated ${label}`}>
            <div className="relative aspect-square h-full max-h-[220px] min-h-[100px]">
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
                <span className="text-xl font-semibold text-foreground font-mono-num tracking-tight">{score}</span>
                <span className={`text-[10px] font-medium ${color}`}>{label}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-x-4 gap-y-3">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium text-foreground font-mono-num">{score}</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium text-foreground font-mono-num">{max}</span>
              <span className="text-xs text-muted-foreground">Max</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className={`text-sm font-medium font-display ${color}`}>{label}</span>
              <span className="text-xs text-muted-foreground">Rating</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
