import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

// Deterministic pseudo-random sparkline data (24 bars)
const sparkValues = Array.from({ length: 24 }, (_, i) => {
  const noise = Math.sin(i * 7.31 + 2.4) * 10000;
  return 3000 + (noise - Math.floor(noise)) * 5000;
});

const maxVal = Math.max(...sparkValues);

export function SummaryMetricCard() {
  return (
    <div className="h-full rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Globe className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Total Balance
        </p>
      </div>
      <div className="rounded-[var(--radius-card)] bg-card border border-border p-5">
        <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">
          <span className="font-mono-num">$8,800</span>
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium text-success font-mono-num">+3.1%</span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
        <div
          className="mt-3 flex items-end gap-[2px] min-h-[60px]"
          role="img"
          aria-label="Total balance trend over 24 periods, bar chart"
        >
          {sparkValues.map((v, i) => {
            const blocks = Math.max(1, Math.round((v / maxVal) * 8));
            return (
              <div key={i} className="flex flex-col-reverse gap-[1px] flex-1">
                {Array.from({ length: blocks }, (_, b) => (
                  <div
                    key={b}
                    className={cn(
                      "w-full h-[7px]",
                      i < 12 ? "bg-foreground" : "bg-muted-foreground"
                    )}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
