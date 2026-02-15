import { cn } from "@/lib/utils";
import { PixelBarChart } from "@/components/PixelBarChart";
import { ArrowUp, Info, MoreHorizontal } from "lucide-react";

// ── Mock data ──

const STAT_CARDS = [
  {
    label: "TOTAL REVENUE",
    value: "$20,320",
    sub: "",
    change: "+0,94",
    changeSuffix: "last year",
    spark: [2, 5, 3, 6, 4, 7],
  },
  {
    label: "TOTAL ORDERS",
    value: "10,320",
    sub: "Orders",
    change: "+0,91",
    changeSuffix: "last year",
    spark: [3, 5, 4, 6, 5, 7],
  },
  {
    label: "NEW CUSTOMERS",
    value: "4,305",
    sub: "New Users",
    change: "+0,94",
    changeSuffix: "last year",
    spark: [1, 4, 2, 5, 3, 6],
  },
] as const;

const CHART_DATA = [
  { label: "JAN", series: [5000, 3000] },
  { label: "FEB", series: [8000, 4000] },
  { label: "MAR", series: [6000, 5000] },
  { label: "APR", series: [12000, 6000] },
  { label: "MAY", series: [15000, 8000] },
  { label: "JUN", series: [38000, 18000] },
  { label: "JUL", series: [22000, 10000] },
  { label: "AUG", series: [18000, 12000] },
  { label: "SEP", series: [14000, 9000] },
  { label: "OCT", series: [10000, 7000] },
  { label: "NOV", series: [8000, 5000] },
  { label: "DEC", series: [6000, 4000] },
];

const TIME_TABS = ["Weekly", "Monthly", "Yearly"] as const;

// ── Mini spark bars — pixel-style vertical bars ──

function SparkBars({ values, className }: { values: readonly number[]; className?: string }) {
  const max = Math.max(...values);
  return (
    <div className={cn("flex items-end gap-[3px]", className)}>
      {values.map((v, i) => {
        const h = Math.max(6, Math.round((v / max) * 32));
        return (
          <div
            key={i}
            className="w-[4px] bg-foreground"
            style={{ height: h }}
          />
        );
      })}
    </div>
  );
}

// ── Main page ──

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <h2 className="text-2xl font-semibold text-foreground tracking-tight">
        Welcome back, Salung
      </h2>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-[var(--radius-card)] bg-muted"
          >
            {/* Inner white card — content zone */}
            <div className="rounded-[var(--radius-card)] bg-card border border-border p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2.5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {card.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono-num text-3xl text-foreground tracking-tight">
                      {card.value}
                    </span>
                    {card.sub && (
                      <span className="text-sm text-muted-foreground">{card.sub}</span>
                    )}
                  </div>
                </div>
                <SparkBars values={card.spark} className="mt-4" />
              </div>
            </div>

            {/* Footer — sits on the gray base layer */}
            <div className="flex items-center justify-between px-5 py-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border">
                <ArrowUp className="h-3 w-3 text-muted-foreground" strokeWidth={2} />
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-success font-medium">{card.change}</span>
                <span className="text-xs text-muted-foreground">{card.changeSuffix}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trend — 2-layer: gray base + white inner card */}
      <div className="rounded-[var(--radius-card)] bg-muted">
        {/* Header — sits on gray base */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
            Sales Trend
          </h3>
          <Info className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <div className="ml-auto">
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>

        {/* Inner white card — chart content */}
        <div className="rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-5">
          {/* Chart controls row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Total Revenue :</span>
              <span className="font-mono-num text-3xl text-foreground">$20,320</span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              {/* Legend */}
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-chart-muted" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">New User</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Existing User</span>
              </div>

              {/* Time tabs */}
              <div className="flex rounded-[var(--radius-widget)] border border-border overflow-hidden">
                {TIME_TABS.map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      "px-3.5 py-1.5 text-xs transition-colors",
                      tab === "Monthly"
                        ? "bg-foreground text-background font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pixel bar chart */}
          <PixelBarChart
            data={CHART_DATA}
            seriesLabels={["New User", "Existing User"]}
            blockSize={10}
            blockGap={2}
            maxValue={60000}
            gridRows={7}
            formatYLabel={(v) => {
              if (v >= 1000) return `${Math.round(v / 1000)}k`;
              return String(v);
            }}
            highlightIndex={5}
          />
        </div>
      </div>
    </div>
  );
}
