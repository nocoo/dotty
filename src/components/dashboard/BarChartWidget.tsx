import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import type { BarShapeProps } from "recharts";
import { cn } from "@/lib/utils";
import { chart, chartAxis } from "@/lib/palette";

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartWidgetProps {
  data: BarChartDataPoint[];
  height?: number;
  color?: string;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  horizontal?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
}

const defaultColor = chart.primary;

const createBarShape = (chartData: Array<{ fill: string }>) => {
  const BarShape = (props: BarShapeProps) => {
    const fill = chartData[props.index]?.fill ?? defaultColor;
    return <Rectangle {...props} fill={fill} radius={[4, 4, 0, 0]} />;
  };
  BarShape.displayName = "BarShape";
  return BarShape;
};

export function BarChartWidget({
  data,
  height = 200,
  color = defaultColor,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  horizontal = false,
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: BarChartWidgetProps) {
  const chartData = data.map((d) => ({
    name: d.label,
    value: d.value,
    fill: d.color || color,
  }));

  const barShape = createBarShape(chartData);

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={chartAxis} strokeOpacity={0.15} vertical={!horizontal} horizontal={horizontal} />
          )}
          {horizontal ? (
            <>
              {showYAxis && (
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} width={80} />
              )}
              {showXAxis && (
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} tickFormatter={valueFormatter} />
              )}
            </>
          ) : (
            <>
              {showXAxis && (
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
              )}
              {showYAxis && (
                <YAxis axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} tickFormatter={valueFormatter} width={35} />
              )}
            </>
          )}
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0];
              return (
                <div className="rounded-[var(--radius-widget)] border border-border bg-card p-2 shadow-sm">
                  <div className="text-sm font-medium text-foreground">{item.payload.name}</div>
                  <div className="text-sm text-muted-foreground font-mono-num">{valueFormatter(item.value as number)}</div>
                </div>
              );
            }}
          />
          <Bar dataKey="value" shape={barShape} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
