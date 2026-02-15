import {
  PieChart as RechartsPieChart,
  Pie,
  Sector,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { PieSectorShapeProps } from "recharts";
import { cn } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/palette";

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartWidgetProps {
  data: PieChartDataPoint[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showLabels?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
}

const createPieSectorShape = (chartData: Array<{ fill: string }>) => {
  const PieSectorShape = (props: PieSectorShapeProps) => {
    const fill = chartData[props.index]?.fill ?? CHART_COLORS[props.index % CHART_COLORS.length];
    return <Sector {...props} fill={fill} />;
  };
  PieSectorShape.displayName = "PieSectorShape";
  return PieSectorShape;
};

export function PieChartWidget({
  data,
  height = 200,
  innerRadius = 0,
  outerRadius = 80,
  showLegend = false,
  showLabels = false,
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: PieChartWidgetProps) {
  const chartData = data.map((d, i) => ({
    name: d.label,
    value: d.value,
    fill: d.color || CHART_COLORS[i % CHART_COLORS.length],
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const sectorShape = createPieSectorShape(chartData);

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            shape={sectorShape}
            label={showLabels ? ({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)` : false}
            labelLine={showLabels}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0];
              const percent = total > 0 ? ((item.value as number) / total) * 100 : 0;
              return (
                <div className="rounded-[var(--radius-widget)] border border-border bg-card p-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.payload.fill }} />
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono-num">
                    {valueFormatter(item.value as number)} ({percent.toFixed(1)}%)
                  </div>
                </div>
              );
            }}
          />
          {showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutChartWidget(props: Omit<PieChartWidgetProps, "innerRadius">) {
  return <PieChartWidget {...props} innerRadius={60} />;
}
