import { BarChart as RechartsBarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const stackedData = [
  { name: "Mon", a: 120, b: 80, c: 60 },
  { name: "Tue", a: 140, b: 90, c: 70 },
  { name: "Wed", a: 160, b: 110, c: 80 },
  { name: "Thu", a: 150, b: 95, c: 75 },
  { name: "Fri", a: 170, b: 120, c: 90 },
];

export function StackedBarCard() {
  return (
    <Card className="rounded-[var(--radius-card)] border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Stacked engagement
        </CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={stackedData} margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "var(--radius-widget)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                boxShadow: "none",
              }}
            />
            <Bar dataKey="a" stackId="stack" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="b" stackId="stack" fill={CHART_COLORS[2]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="c" stackId="stack" fill={CHART_COLORS[4]} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
