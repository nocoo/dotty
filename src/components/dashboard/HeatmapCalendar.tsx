import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface HeatmapDataPoint {
  date: string;
  value: number;
}

export interface HeatmapCalendarProps {
  data: HeatmapDataPoint[];
  year: number;
  colorScale?: readonly string[];
  valueFormatter?: (value: number, date: string) => string;
  metricLabel?: string;
  cellSize?: number;
  cellGap?: number;
  className?: string;
}

export const heatmapColorScales = {
  green: [
    "hsl(var(--muted))",
    "hsl(var(--heatmap-green-1))",
    "hsl(var(--heatmap-green-2))",
    "hsl(var(--heatmap-green-3))",
    "hsl(var(--heatmap-green-4))",
  ],
  red: [
    "hsl(var(--muted))",
    "hsl(var(--heatmap-red-1))",
    "hsl(var(--heatmap-red-2))",
    "hsl(var(--heatmap-red-3))",
    "hsl(var(--heatmap-red-4))",
  ],
  blue: [
    "hsl(var(--muted))",
    "hsl(var(--heatmap-blue-1))",
    "hsl(var(--heatmap-blue-2))",
    "hsl(var(--heatmap-blue-3))",
    "hsl(var(--heatmap-blue-4))",
  ],
  orange: [
    "hsl(var(--muted))",
    "hsl(var(--heatmap-orange-1))",
    "hsl(var(--heatmap-orange-2))",
    "hsl(var(--heatmap-orange-3))",
    "hsl(var(--heatmap-orange-4))",
  ],
} as const;

const defaultColorScale = heatmapColorScales.green;

const WEEKDAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
const MONTH_KEYS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"] as const;

function getYearWeeks(year: number): Date[][] {
  const weeks: Date[][] = [];
  const endDate = new Date(year, 11, 31);
  const firstDay = new Date(year, 0, 1);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());

  let currentDate = new Date(firstDay);
  let currentWeek: Date[] = [];

  while (currentDate <= endDate || currentWeek.length > 0) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    if (currentDate > endDate) break;
    currentWeek.push(new Date(currentDate));
    currentDate = new Date(currentDate.getTime() + 86400000);
  }

  if (currentWeek.length > 0) weeks.push(currentWeek);
  return weeks;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getColorIndex(value: number, maxValue: number, colorScale: readonly string[]): number {
  if (value === 0) return 0;
  const levels = colorScale.length - 1;
  return Math.ceil(Math.min(value / maxValue, 1) * levels);
}

export function HeatmapCalendar({
  data,
  year,
  colorScale = defaultColorScale,
  valueFormatter = (v) => v.toLocaleString(),
  metricLabel = "Value",
  cellSize = 12,
  cellGap = 2,
  className,
}: HeatmapCalendarProps) {
  const { t } = useTranslation();
  const WEEKDAYS = WEEKDAY_KEYS.map((key) => t(`dashboard.weekdays.${key}`));
  const MONTHS = MONTH_KEYS.map((key) => t(`dashboard.months.${key}`));

  const { weeks, dataMap, maxValue, monthLabels } = useMemo(() => {
    const weeks = getYearWeeks(year);
    const dataMap = new Map<string, number>();
    let maxValue = 0;
    data.forEach((d) => {
      dataMap.set(d.date, d.value);
      if (d.value > maxValue) maxValue = d.value;
    });

    const monthLabels: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week.find((d) => d.getFullYear() === year);
      if (firstDayOfWeek) {
        const month = firstDayOfWeek.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ month: MONTHS[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return { weeks, dataMap, maxValue, monthLabels };
  }, [data, year, MONTHS]);

  const labelWidth = 30;

  return (
    <div className={cn("overflow-x-auto", className)}>
      <TooltipProvider>
        <div className="inline-block">
          <div className="relative h-4 text-xs text-muted-foreground mb-1" style={{ marginLeft: labelWidth }}>
            {monthLabels.map((label, i) => (
              <div key={i} className="absolute" style={{ left: label.weekIndex * (cellSize + cellGap) }}>
                {label.month}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col text-xs text-muted-foreground mr-1" style={{ width: labelWidth }}>
              {WEEKDAYS.map((day, i) => (
                <div key={day} style={{ height: cellSize + cellGap, lineHeight: `${cellSize + cellGap}px`, visibility: i % 2 === 1 ? "visible" : "hidden" }}>
                  {day}
                </div>
              ))}
            </div>

            <div className="flex" style={{ gap: cellGap }}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col" style={{ gap: cellGap }}>
                  {week.map((date, dayIndex) => {
                    const dateStr = formatDate(date);
                    const value = dataMap.get(dateStr) ?? 0;
                    const isCurrentYear = date.getFullYear() === year;
                    const colorIndex = getColorIndex(value, maxValue, colorScale);

                    if (!isCurrentYear) {
                      return <div key={dayIndex} style={{ width: cellSize, height: cellSize, visibility: "hidden" }} />;
                    }

                    return (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className="rounded-sm cursor-pointer transition-colors hover:ring-1 hover:ring-foreground"
                            style={{ width: cellSize, height: cellSize, backgroundColor: colorScale[colorIndex] }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div className="font-medium">{dateStr}</div>
                            <div className="text-muted-foreground">{metricLabel}: {valueFormatter(value, dateStr)}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-1 mt-2 text-xs text-muted-foreground">
            <span>{t("common.less")}</span>
            {colorScale.map((color, i) => (
              <div key={i} className="rounded-sm" style={{ width: cellSize, height: cellSize, backgroundColor: color }} />
            ))}
            <span>{t("common.more")}</span>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
