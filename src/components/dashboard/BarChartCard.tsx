import { PiggyBank } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <PiggyBank className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("dashboard.usageCategory")}
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">
            <span className="font-mono-num">$15,200</span>
          </h2>
          <span className="text-sm text-muted-foreground">{t("dashboard.totalTransactions")}</span>
        </div>
        <div
          role="img"
          aria-label={t("dashboard.usageCategoryAria")}
        >
          <PixelBarChart
            data={data}
            seriesLabels={["Amount"]}
            height={200}
            blockGap={2}
            gridRows={7}
            maxValue={30000}
            formatYLabel={(v) => `${Math.round(v / 1000)}k`}
            tooltipYearSuffix=""
          />
        </div>
      </div>
    </div>
  );
}
