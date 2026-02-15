import { cn } from "@/lib/utils";
import { PixelBarChart } from "@/components/PixelBarChart";
import { Info, MoreHorizontal } from "lucide-react";

// ── Mock data ──

const STAT_CARDS = [
  {
    label: "TOTAL REVENUE",
    value: "$20,320",
    sub: "",
    change: "+0.94",
    changeSuffix: "last year",
    spark: [2, 4, 3, 5, 4, 6],
  },
  {
    label: "TOTAL ORDERS",
    value: "10,320",
    sub: "Orders",
    change: "+0.91",
    changeSuffix: "last year",
    spark: [3, 5, 4, 6, 5, 7],
  },
  {
    label: "NEW CUSTOMERS",
    value: "4,305",
    sub: "New Users",
    change: "+0.94",
    changeSuffix: "last year",
    spark: [1, 3, 2, 4, 3, 5],
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

// ── Mini spark bar component ──

function SparkBars({ values, className }: { values: readonly number[]; className?: string }) {
  const max = Math.max(...values);
  return (
    <div className={cn("flex items-end gap-[2px]", className)}>
      {values.map((v, i) => {
        const blocks = Math.max(1, Math.round((v / max) * 5));
        return (
          <div key={i} className="flex flex-col-reverse gap-[1px]">
            {Array.from({ length: blocks }, (_, b) => (
              <div
                key={b}
                className="w-[3px] h-[3px] bg-foreground"
              />
            ))}
          </div>
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
      <div>
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          Welcome back, Salung
        </h2>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="border border-border bg-secondary p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {card.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-foreground tracking-tight">
                    {card.value}
                  </span>
                  {card.sub && (
                    <span className="text-sm text-muted-foreground">{card.sub}</span>
                  )}
                </div>
              </div>
              <SparkBars values={card.spark} className="mt-2" />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Info className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-xs text-success font-medium">{card.change}</span>
              <span className="text-xs text-muted-foreground">{card.changeSuffix}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trend chart */}
      <div className="border border-border bg-secondary p-5 space-y-5">
        {/* Chart header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
              Sales Trend
            </h3>
            <Info className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
            <button className="ml-auto md:hidden">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Total */}
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground">Total Revenue :</span>
              <span className="text-2xl font-semibold text-foreground">$20,320</span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">New User</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Existing User</span>
              </div>
            </div>

            {/* Time tabs */}
            <div className="flex border border-border">
              {TIME_TABS.map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "px-3 py-1 text-xs transition-colors",
                    tab === "Monthly"
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button className="hidden md:block">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </button>
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
  );
}
