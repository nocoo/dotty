import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Goal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CHART_COLORS, chart } from "@/lib/palette";

const goal = 10000;
const saved = 6800;
const pct = Math.round((saved / goal) * 100);

const data = [
  { name: "bg", value: 100, fill: chart.gray },
  { name: "saved", value: pct, fill: CHART_COLORS[2] },
];

export function RadialProgressCard() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Goal className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("dashboard.savingsGoal")}
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex flex-col items-center">
          <div
            className="w-full flex items-center justify-center"
            role="img"
            aria-label={t("dashboard.savingsGoalAria", { percent: pct, saved: saved.toLocaleString(), target: goal.toLocaleString() })}
          >
            <div className="relative aspect-square h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  startAngle={90}
                  endAngle={-270}
                  data={data}
                  barSize={10}
                >
                  <RadialBar dataKey="value" cornerRadius={5} background={false} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold font-mono-num tracking-tight text-foreground">{pct}%</span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-x-4 gap-y-3">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium font-mono-num text-foreground">${saved.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{t("dashboard.saved")}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium font-mono-num text-foreground">${goal.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{t("dashboard.target")}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium font-mono-num text-foreground">${(goal - saved).toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{t("dashboard.remaining")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
