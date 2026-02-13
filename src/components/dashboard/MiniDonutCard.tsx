import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChartWidget } from "@/components/dashboard/PieChartWidget";

const data = [
  { label: "Active", value: 62 },
  { label: "Idle", value: 28 },
  { label: "Churn", value: 10 },
];

export function MiniDonutCard() {
  return (
    <Card className="rounded-card border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Mini donut</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="h-24 w-24">
          <DonutChartWidget data={data} height={96} />
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-6">
            <span>Active</span>
            <span className="text-foreground">62%</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span>Idle</span>
            <span className="text-foreground">28%</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span>Churn</span>
            <span className="text-foreground">10%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
