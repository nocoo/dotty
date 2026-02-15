import { PiggyBank } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PixelBarChart } from "@/components/PixelBarChart";

const data = [
  { label: "Jan", value: 12000 }, { label: "Feb", value: 15000 },
  { label: "Mar", value: 11000 }, { label: "Apr", value: 18000 },
  { label: "May", value: 14000 }, { label: "Jun", value: 20000 },
  { label: "Jul", value: 16000 }, { label: "Aug", value: 22000 },
  { label: "Sep", value: 13000 }, { label: "Oct", value: 17000 },
  { label: "Nov", value: 25000 }, { label: "Dec", value: 19000 },
];

export function BarChartCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border border-border bg-card shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Usage Category
          </CardTitle>
        </div>
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">
            <span className="font-mono-num">$15,200</span>
          </h2>
          <span className="text-sm text-muted-foreground">total transactions</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div
          className="flex-1 min-h-[200px]"
          role="img"
          aria-label="Monthly transaction amounts from January to December, bar chart totaling $15,200"
        >
          <PixelBarChart
            data={data}
            seriesLabels={["Amount"]}
            blockSize={8}
            blockGap={2}
            gridRows={7}
            maxValue={30000}
            formatYLabel={(v) => `${Math.round(v / 1000)}k`}
            tooltipYearSuffix=""
          />
        </div>
      </CardContent>
    </Card>
  );
}
