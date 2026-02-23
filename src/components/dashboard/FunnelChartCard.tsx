import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import { CHART_COLORS } from "@/lib/palette";

const data = [
  { name: "Visits", value: 2400 },
  { name: "Signup", value: 820 },
  { name: "Activate", value: 420 },
  { name: "Upgrade", value: 180 },
];

export function FunnelChartCard() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("dashboard.funnelConversion")}
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="h-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel data={data} dataKey="value" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]}>
                <LabelList position="right" fill="hsl(var(--muted-foreground))" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
