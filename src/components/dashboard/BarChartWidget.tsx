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
  // Compute sensible gridRows from height + default blockSize
  const blockSize = 10;
  const blockGap = 2;
  const gridRows = Math.max(4, Math.floor(height / (blockSize + blockGap)) - 1);

  return (
    <div className={cn("w-full", className)}>
      <PixelBarChart
        data={data}
        seriesLabels={["Value"]}
        blockSize={blockSize}
        blockGap={blockGap}
        gridRows={gridRows}
        formatYLabel={valueFormatter}
        tooltipYearSuffix=""
      />
    </div>
  );
}
