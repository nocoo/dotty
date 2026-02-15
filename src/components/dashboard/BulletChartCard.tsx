import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ── Data ──

const data = [
  { name: "Revenue", value: 68, target: 80 },
  { name: "Retention", value: 72, target: 85 },
  { name: "Adoption", value: 58, target: 70 },
];

// ── Constants ──

const BLOCK_SIZE = 6;
const BLOCK_GAP = 2;
const MAX_BLOCKS = 12; // max blocks per row (represents 100%)
const MAX_VALUE = 100;
const VALUE_PER_BLOCK = MAX_VALUE / MAX_BLOCKS;

// ── Component ──

export function BulletChartCard() {
  return (
    <Card className="rounded-[var(--radius-card)] border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Bullet KPIs
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 bg-foreground" />
              <span className="text-[10px] text-muted-foreground">Value</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-6 border border-dashed border-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {data.map((d) => {
          const valueBlocks = Math.max(1, Math.round(d.value / VALUE_PER_BLOCK));
          const targetBlocks = Math.round(d.target / VALUE_PER_BLOCK);

          return (
            <div key={d.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground">{d.name}</span>
                <span className="text-xs text-muted-foreground font-mono-num">
                  {d.value} / {d.target}
                </span>
              </div>
              <div className="relative">
                {/* Block row */}
                <div className="flex gap-[2px]">
                  {Array.from({ length: MAX_BLOCKS }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "transition-colors duration-100",
                        i < valueBlocks ? "bg-foreground" : "bg-muted/50",
                      )}
                      style={{ width: BLOCK_SIZE * 2, height: BLOCK_SIZE }}
                    />
                  ))}
                </div>
                {/* Target marker */}
                <div
                  className="absolute top-[-2px] h-[calc(100%+4px)] border-l-2 border-dashed border-muted-foreground"
                  style={{
                    left: targetBlocks * (BLOCK_SIZE * 2 + BLOCK_GAP) - BLOCK_GAP / 2,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
