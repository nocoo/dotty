import { cn } from "@/lib/utils";
import { PixelBarChart } from "@/components/PixelBarChart";

export interface BarChartDataPoint {
  label: string;
  value: number;
}

export interface BarChartWidgetProps {
  data: BarChartDataPoint[];
  height?: number;
  /** @deprecated color is ignored — PixelBarChart uses monochrome fills */
  color?: string;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  horizontal?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChartWidget({
  data,
  height = 200,
  valueFormatter,
  className,
}: BarChartWidgetProps) {
  return (
    <div className={cn("w-full", className)}>
      <PixelBarChart
        data={data}
        seriesLabels={["Value"]}
        height={height}
        blockGap={2}
        gridRows={7}
        formatYLabel={valueFormatter}
        tooltipYearSuffix=""
      />
    </div>
  );
}
