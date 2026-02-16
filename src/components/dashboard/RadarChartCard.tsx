import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const radarData = [
  { subject: "Speed", value: 80 },
  { subject: "Quality", value: 92 },
  { subject: "Coverage", value: 76 },
  { subject: "Reliability", value: 88 },
  { subject: "Support", value: 70 },
];

export function RadarChartCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Capability radar
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="h-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius={80}>
              <PolarGrid stroke={chartAxis} strokeOpacity={0.2} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: chartAxis, fontSize: 11 }} />
              <Radar dataKey="value" fill={CHART_COLORS[3]} fillOpacity={0.3} stroke={CHART_COLORS[3]} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
