import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

export interface LineChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartSeries {
  data: LineChartDataPoint[];
  color?: string;
  name?: string;
}

export interface LineChartProps {
  data?: LineChartDataPoint[];
  series?: LineChartSeries[];
  height?: number;
  color?: string;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showDots?: boolean;
  curved?: boolean;
  showArea?: boolean;
  referenceLine?: number;
  referenceLineLabel?: string;
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function LineChartWidget({
  data,
  series,
  height = 200,
  color = CHART_COLORS[0],
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showDots = false,
  curved = true,
  showArea = false,
  referenceLine,
  referenceLineLabel,
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: LineChartProps) {
  const normalizedSeries: LineChartSeries[] = series
    ? series
    : data
      ? [{ data, color, name: "value" }]
      : [];

  if (normalizedSeries.length === 0) return null;

  const labels = normalizedSeries[0].data.map((d) => d.label);
  const chartData = labels.map((label, i) => {
    const point: Record<string, string | number> = { name: label };
    normalizedSeries.forEach((s, si) => {
      const key = s.name || `series${si}`;
      point[key] = s.data[i]?.value ?? 0;
    });
    return point;
  });

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={chartAxis} strokeOpacity={0.15} vertical={false} />
          )}
          {showXAxis && (
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
          )}
          {showYAxis && (
            <YAxis axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} tickFormatter={valueFormatter} width={35} />
          )}
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-[var(--radius-widget)] border border-border bg-card p-2 shadow-sm">
                  <div className="text-sm font-medium text-foreground">{label}</div>
                  {payload.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-mono-num">{valueFormatter(item.value as number)}</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          {referenceLine !== undefined && (
            <ReferenceLine
              y={referenceLine}
              stroke={chartAxis}
              strokeDasharray="3 3"
              label={referenceLineLabel ? { value: referenceLineLabel, position: "insideTopRight", fill: chartAxis, fontSize: 11 } : undefined}
            />
          )}
          {normalizedSeries.map((s, i) => {
            const key = s.name || `series${i}`;
            const lineColor = s.color || CHART_COLORS[i % CHART_COLORS.length];
            return (
              <Line
                key={key}
                type={curved ? "monotone" : "linear"}
                dataKey={key}
                stroke={lineColor}
                fill={showArea ? lineColor : "none"}
                fillOpacity={showArea ? 0.1 : 0}
                strokeWidth={2}
                dot={showDots}
                activeDot={{ r: 4 }}
              />
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
