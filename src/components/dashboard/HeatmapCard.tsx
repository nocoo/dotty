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
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Engagement heatmap
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <HeatmapCalendar data={heatmapData} year={2026} colorScale={heatmapColorScales.blue} metricLabel="Sessions" />
      </div>
    </div>
  );
}
