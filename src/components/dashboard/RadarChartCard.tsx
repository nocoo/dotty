import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="rounded-[var(--radius-card)] border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Capability radar
        </CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius={80}>
            <PolarGrid stroke={chartAxis} strokeOpacity={0.2} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: chartAxis, fontSize: 11 }} />
            <Radar dataKey="value" fill={CHART_COLORS[3]} fillOpacity={0.3} stroke={CHART_COLORS[3]} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
