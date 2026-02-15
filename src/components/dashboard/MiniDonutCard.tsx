import { DonutChartWidget } from "@/components/dashboard/PieChartWidget";

const data = [
  { label: "Active", value: 62 },
  { label: "Idle", value: 28 },
  { label: "Churn", value: 10 },
];

export function MiniDonutCard() {
  return (
    <div className="rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Mini donut
        </p>
      </div>
      <div className="rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24">
            <DonutChartWidget data={data} height={96} />
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-6">
              <span>Active</span>
              <span className="font-mono-num text-foreground">62%</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span>Idle</span>
              <span className="font-mono-num text-foreground">28%</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span>Churn</span>
              <span className="font-mono-num text-foreground">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
