import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CHART_COLORS } from "@/lib/palette";

const data = [
  { name: "Food", value: 35 },
  { name: "Transport", value: 20 },
  { name: "Shopping", value: 25 },
  { name: "Bills", value: 20 },
].map((d, i) => ({ ...d, fill: CHART_COLORS[i] }));

export function DonutChartCard() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Target className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("dashboard.expenseBreakdown")}
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex flex-col items-center">
          <div
            className="w-full flex items-center justify-center"
            role="img"
            aria-label={t("dashboard.expenseBreakdownAria")}
          >
            <div className="aspect-square h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius="50%" outerRadius="80%" dataKey="value" strokeWidth={0} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-x-4 gap-y-3">
            {data.map((item, i) => (
              <div key={item.name} className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-medium text-foreground font-mono-num">{item.value}%</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
