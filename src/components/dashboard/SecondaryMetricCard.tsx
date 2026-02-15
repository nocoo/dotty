import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Deterministic pseudo-random sparkline data (20 bars)
const sparkValues = Array.from({ length: 20 }, (_, i) => {
  const noise = Math.sin(i * 11.73 + 1.8) * 10000;
  return 2000 + (noise - Math.floor(noise)) * 6000;
});

const maxVal = Math.max(...sparkValues);

export function SecondaryMetricCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Income
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-col flex-1 rounded-[var(--radius-widget)] border border-border bg-card p-4">
          <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">
            <span className="font-mono-num">$4,500</span>
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-success font-mono-num">+2.4%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
          <div
            className="mt-3 flex items-end gap-[2px] flex-1 min-h-[50px]"
            role="img"
            aria-label="Income trend over 20 periods, bar chart"
          >
            {sparkValues.map((v, i) => {
              const blocks = Math.max(1, Math.round((v / maxVal) * 6));
              return (
                <div key={i} className="flex flex-col-reverse gap-[1px] flex-1">
                  {Array.from({ length: blocks }, (_, b) => (
                    <div key={b} className="w-full h-[6px] bg-muted-foreground" />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
