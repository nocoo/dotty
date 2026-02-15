import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ── Data ──

const stackedData = [
  { name: "Mon", series: [120, 80, 60] },
  { name: "Tue", series: [140, 90, 70] },
  { name: "Wed", series: [160, 110, 80] },
  { name: "Thu", series: [150, 95, 75] },
  { name: "Fri", series: [170, 120, 90] },
];

const SERIES_LABELS = ["Views", "Clicks", "Shares"];

const SERIES_FILLS = [
  "bg-foreground",
  "bg-muted-foreground",
  "bg-muted-foreground/50",
] as const;

// ── Component ──

const BLOCK_SIZE = 8;
const BLOCK_GAP = 2;
const GRID_ROWS = 7;

export function StackedBarCard() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const totals = stackedData.map((d) => d.series.reduce((a, b) => a + b, 0));
  const maxTotal = Math.max(...totals);
  const valuePerBlock = maxTotal / GRID_ROWS;

  return (
    <Card className="rounded-[var(--radius-card)] border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Stacked engagement
          </CardTitle>
          <div className="flex items-center gap-3">
            {SERIES_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={cn("h-2 w-2", SERIES_FILLS[i])} />
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between" style={{ height: GRID_ROWS * (BLOCK_SIZE + BLOCK_GAP) }}>
          {stackedData.map((d, mIdx) => {
            const isHovered = activeIdx === mIdx;
            // Compute blocks per series (stacked bottom to top: a, b, c)
            const seriesBlocks = d.series.map((v) => Math.max(1, Math.round(v / valuePerBlock)));

            return (
              <div
                key={mIdx}
                className="flex flex-col-reverse items-center cursor-pointer"
                style={{ gap: 0 }}
                onMouseEnter={() => setActiveIdx(mIdx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Stack blocks: series[0] at bottom, then series[1], series[2] on top */}
                {d.series.map((_, sIdx) => (
                  <div key={sIdx} className="flex flex-col-reverse" style={{ gap: BLOCK_GAP }}>
                    {Array.from({ length: seriesBlocks[sIdx] }, (__, bIdx) => (
                      <div
                        key={bIdx}
                        className={cn(
                          "transition-opacity duration-100",
                          SERIES_FILLS[sIdx % SERIES_FILLS.length],
                          !isHovered && activeIdx !== null && "opacity-40",
                          isHovered && "opacity-100",
                        )}
                        style={{ width: BLOCK_SIZE * 2.5, height: BLOCK_SIZE }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-3">
          {stackedData.map((d, mIdx) => (
            <span
              key={mIdx}
              className={cn(
                "text-[10px] uppercase tracking-wider text-center",
                activeIdx === mIdx ? "text-foreground font-medium" : "text-muted-foreground",
              )}
              style={{ width: BLOCK_SIZE * 2.5 }}
            >
              {d.name}
            </span>
          ))}
        </div>

        {/* Tooltip */}
        {activeIdx !== null && (
          <div className="mt-3 border-t border-border pt-2">
            <p className="text-xs font-medium text-foreground mb-1">{stackedData[activeIdx].name}</p>
            <div className="flex gap-4">
              {stackedData[activeIdx].series.map((v, sIdx) => (
                <div key={sIdx} className="flex items-center gap-1.5">
                  <div className={cn("h-2 w-2", SERIES_FILLS[sIdx])} />
                  <span className="text-[10px] text-muted-foreground">{SERIES_LABELS[sIdx]}</span>
                  <span className="text-[10px] font-medium text-foreground font-mono-num">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
