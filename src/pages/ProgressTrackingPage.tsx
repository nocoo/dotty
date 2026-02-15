import { LayoutGrid, BarChart3, TrendingUp } from "lucide-react";
import { useProgressTrackingViewModel } from "@/viewmodels/useProgressTrackingViewModel";
import { PixelBarChart } from "@/components/PixelBarChart";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function ProgressTrackingPage() {
  const { summary, categories, comparisonData } = useProgressTrackingViewModel();

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Progress</p>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">Budget tracking and spending progress</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Category budgets, spending progress bars, and budget-vs-actual comparison chart.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Budget</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">${summary.totalLimit.toLocaleString()}</h2>
        </div>
        <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Spent So Far</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">${summary.totalSpent.toLocaleString()}</h2>
        </div>
        <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Remaining</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success font-display tracking-tight font-mono-num">${summary.remaining.toLocaleString()}</h2>
        </div>
      </div>

      <Section title="Category Budgets" icon={LayoutGrid}>
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-foreground">{cat.category}</span>
                  <span className="text-xs text-muted-foreground font-mono-num">${cat.spent} / ${cat.limit}</span>
                </div>
                <div
                  className="h-2 rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={cat.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.category} budget: ${cat.progress}% spent`}
                >
                  <div className="h-full rounded-full transition-all" style={{ width: `${cat.progress}%`, background: cat.color }} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Budget vs Actual" icon={BarChart3}>
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <div role="img" aria-label="Budget vs actual spending grouped bar chart by month">
            <PixelBarChart
              data={comparisonData.map((d) => ({ label: d.month, series: [d.budget, d.actual] }))}
              seriesLabels={["Budget", "Actual"]}
              height={200}
              blockGap={2}
              gridRows={6}
              formatYLabel={(v) => `${Math.round(v / 1000)}k`}
              tooltipYearSuffix=""
            />
          </div>
          <div className="mt-3 flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 bg-foreground" />
              <span className="text-xs text-muted-foreground">Budget</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 bg-muted-foreground" />
              <span className="text-xs text-muted-foreground">Actual</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
