import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { chart } from "@/lib/palette";

const score = 742;
const max = 850;
const pct = Math.round((score / max) * 100);

const data = [{ value: pct }];

function getScoreLabel(s: number) {
  if (s >= 740) return { label: "excellent", color: "text-success" };
  if (s >= 670) return { label: "good", color: "text-foreground" };
  if (s >= 580) return { label: "fair", color: "text-muted-foreground" };
  return { label: "poor", color: "text-muted-foreground" };
}

const { label, color } = getScoreLabel(score);

export function GaugeCard() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("dashboard.creditScore")}
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex flex-col items-center">
          <div
            className="w-full flex items-center justify-center"
            role="img"
            aria-label={t("dashboard.creditScoreAria", { score, max, rating: t(`dashboard.${label}`) })}
          >
            <div className="relative aspect-square h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="75%"
                  outerRadius="95%"
                  startAngle={90}
                  endAngle={-270}
                  data={data}
                  barSize={12}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={6}
                    fill={chart.green}
                    background={{ fill: chart.gray }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold text-foreground font-mono-num tracking-tight">{score}</span>
                <span className={`text-[10px] font-medium ${color}`}>{t(`dashboard.${label}`)}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-x-4 gap-y-3">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium text-foreground font-mono-num">{score}</span>
              <span className="text-xs text-muted-foreground">{t("dashboard.score")}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-medium text-foreground font-mono-num">{max}</span>
              <span className="text-xs text-muted-foreground">{t("dashboard.max")}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className={`text-sm font-medium font-display ${color}`}>{t(`dashboard.${label}`)}</span>
              <span className="text-xs text-muted-foreground">{t("dashboard.rating")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
