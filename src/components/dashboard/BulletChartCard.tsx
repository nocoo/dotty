import { BarChart as RechartsBarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const data = [
  { name: "Revenue", value: 68, target: 80 },
  { name: "Retention", value: 72, target: 85 },
  { name: "Adoption", value: 58, target: 70 },
];

export function BulletChartCard() {
  return (
    <Card className="rounded-[var(--radius-card)] border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Bullet KPIs
        </CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} layout="vertical" margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "var(--radius-widget)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                boxShadow: "none",
              }}
            />
            <Bar dataKey="target" fill={CHART_COLORS[6]} radius={[6, 6, 6, 6]} barSize={10} />
            <Bar dataKey="value" fill={CHART_COLORS[1]} radius={[6, 6, 6, 6]} barSize={6} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
