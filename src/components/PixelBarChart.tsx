import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Types ──

/** Multi-series data point (original shape) */
interface MultiSeriesData {
  label: string;
  series: number[];
}

/** Single-series data point (convenience shape) */
interface SingleSeriesData {
  label: string;
  value: number;
}

/** Accepts either shape — auto-detected at runtime */
export type PixelBarDataPoint = MultiSeriesData | SingleSeriesData;

function isSingleSeries(d: PixelBarDataPoint): d is SingleSeriesData {
  return "value" in d;
}

/** Normalize any input row to the multi-series shape */
function normalize(d: PixelBarDataPoint): MultiSeriesData {
  return isSingleSeries(d) ? { label: d.label, series: [d.value] } : d;
}

interface PixelBarChartProps {
  data: PixelBarDataPoint[];
  seriesLabels?: string[];
  /** Size in px of each pixel block */
  blockSize?: number;
  /** Gap between blocks in px */
  blockGap?: number;
  /** Maximum Y value — auto-calculated if omitted */
  maxValue?: number;
  /** Number of Y-axis grid rows to display */
  gridRows?: number;
  /** Format function for Y-axis labels */
  formatYLabel?: (value: number) => string;
  /** Highlight month by index */
  highlightIndex?: number;
  /** Hide the tooltip label year suffix (default appends " 2025") */
  tooltipYearSuffix?: string;
}

// ── Constants ──

const SERIES_FILLS = [
  "bg-foreground",         // black (light) / white (dark) — primary
  "bg-muted-foreground",   // gray — secondary
] as const;

// ── Tooltip ──

interface TooltipState {
  monthIdx: number;
  x: number;
  y: number;
}

// ── Component ──

export function PixelBarChart({
  data: rawData,
  seriesLabels,
  blockSize = 12,
  blockGap = 2,
  maxValue,
  gridRows = 7,
  formatYLabel = (v) => {
    if (v >= 1000) return `${Math.round(v / 1000)}k`;
    return String(v);
  },
  highlightIndex,
  tooltipYearSuffix = " 2025",
}: PixelBarChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activeMonth, setActiveMonth] = useState<number | null>(highlightIndex ?? null);

  // Normalize all data to multi-series shape
  const data = rawData.map(normalize);

  const seriesCount = data[0]?.series.length ?? 1;

  // Default series labels based on count
  const labels = seriesLabels ?? (seriesCount === 1 ? ["Value"] : ["Series A", "Series B"]);

  // Calculate max from data if not given
  const totalPerMonth = data.map((m) => m.series.reduce((a, b) => a + b, 0));
  const computedMax = maxValue ?? Math.max(...totalPerMonth);

  // How many blocks fit in the max?
  const maxBlocks = gridRows;
  const valuePerBlock = computedMax / maxBlocks;

  // Y-axis labels
  const yLabels = Array.from({ length: maxBlocks + 1 }, (_, i) => i * valuePerBlock);

  // Each month column: seriesCount bars side by side, each bar is blockSize wide
  const barWidth = blockSize;
  const monthWidth = seriesCount * barWidth + (seriesCount - 1) * blockGap;

  return (
    <div className="w-full">
      {/* Chart area */}
      <div className="flex">
        {/* Y-axis labels */}
        <div
          className="flex flex-col-reverse justify-between pr-3 text-right"
          style={{ height: maxBlocks * (blockSize + blockGap) }}
        >
          {yLabels.map((val, i) => (
            <span
              key={i}
              className="text-[10px] text-muted-foreground leading-none"
              style={{ height: blockSize }}
            >
              {formatYLabel(val)}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div
            className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none"
            style={{ height: maxBlocks * (blockSize + blockGap) }}
          >
            {yLabels.map((_, i) => (
              <div
                key={i}
                className="w-full border-t border-dashed border-border"
                style={{ height: 0 }}
              />
            ))}
          </div>

          {/* Bar columns */}
          <div
            className="relative flex items-end justify-between"
            style={{ height: maxBlocks * (blockSize + blockGap) }}
          >
            {data.map((month, mIdx) => {
              const isHovered = activeMonth === mIdx;
              return (
                <div
                  key={mIdx}
                  className="flex items-end gap-px cursor-pointer relative"
                  style={{ gap: blockGap }}
                  onMouseEnter={(e) => {
                    setActiveMonth(mIdx);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      monthIdx: mIdx,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => {
                    setActiveMonth(highlightIndex ?? null);
                    setTooltip(null);
                  }}
                >
                  {month.series.map((val, sIdx) => {
                    const numBlocks = Math.round(val / valuePerBlock);
                    return (
                      <div
                        key={sIdx}
                        className="flex flex-col-reverse"
                        style={{ gap: blockGap, width: barWidth }}
                      >
                        {Array.from({ length: numBlocks }, (_, bIdx) => (
                          <div
                            key={bIdx}
                            className={cn(
                              "transition-colors duration-100",
                              SERIES_FILLS[sIdx % SERIES_FILLS.length],
                              !isHovered && activeMonth !== null && "opacity-40",
                              isHovered && "opacity-100"
                            )}
                            style={{
                              width: barWidth,
                              height: blockSize,
                            }}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-3">
            {data.map((month, mIdx) => (
              <span
                key={mIdx}
                className={cn(
                  "text-[10px] uppercase tracking-wider",
                  activeMonth === mIdx
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
                style={{ width: monthWidth, textAlign: "center" }}
              >
                {month.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip !== null && (
        <div
          className="fixed z-50 border border-border bg-card px-4 py-3 shadow-sm pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="text-xs font-medium text-foreground mb-1.5">
            {data[tooltip.monthIdx].label}{tooltipYearSuffix}
          </p>
          {data[tooltip.monthIdx].series.map((val, sIdx) => (
            <div key={sIdx} className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  "inline-block w-2 h-2",
                  SERIES_FILLS[sIdx % SERIES_FILLS.length]
                )}
              />
              <span className="text-muted-foreground">{labels[sIdx]}</span>
              <span className="font-medium text-foreground ml-auto pl-3">
                {formatYLabel(val)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
