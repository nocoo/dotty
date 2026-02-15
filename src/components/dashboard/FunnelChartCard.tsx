import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS } from "@/lib/palette";

const data = [
  { name: "Visits", value: 2400 },
  { name: "Signup", value: 820 },
  { name: "Activate", value: 420 },
  { name: "Upgrade", value: 180 },
];

export function FunnelChartCard() {
  return (
    <Card className="rounded-[var(--radius-card)] border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Funnel conversion
        </CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel data={data} dataKey="value" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]}>
              <LabelList position="right" fill="hsl(var(--muted-foreground))" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
