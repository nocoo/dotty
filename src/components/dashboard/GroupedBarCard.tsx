import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PixelBarChart } from "@/components/PixelBarChart";

const data = [
  { label: "Jul", series: [4200, 3100] },
  { label: "Aug", series: [4800, 3600] },
  { label: "Sep", series: [4500, 3900] },
  { label: "Oct", series: [5100, 3400] },
  { label: "Nov", series: [4700, 4100] },
  { label: "Dec", series: [5500, 3800] },
];

export function GroupedBarCard() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("dashboard.incomeVsExpense")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 bg-foreground" />
            <span className="text-xs text-muted-foreground">{t("dashboard.income")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">{t("dashboard.expense")}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div
          role="img"
          aria-label={t("dashboard.incomeVsExpenseAria")}
        >
          <PixelBarChart
            data={data}
            seriesLabels={["Income", "Expense"]}
            height={200}
            blockGap={2}
            gridRows={7}
            formatYLabel={(v) => `${Math.round(v / 1000)}k`}
            tooltipYearSuffix=""
          />
        </div>
      </div>
    </div>
  );
}
