import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeatmapCalendar, heatmapColorScales } from "@/components/dashboard/HeatmapCalendar";

const heatmapData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date(2026, 0, 1 + i);
  const noise = Math.sin(i * 12.9898) * 43758.5453;
  const random = noise - Math.floor(noise);
  const value = Math.max(1, Math.round(3 + random * 9));
  return {
    date: date.toISOString().slice(0, 10),
    value,
  };
});

export function HeatmapCard() {
  return (
    <Card className="rounded-card border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Engagement heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <HeatmapCalendar data={heatmapData} year={2026} colorScale={heatmapColorScales.blue} metricLabel="Sessions" />
      </CardContent>
    </Card>
  );
}
