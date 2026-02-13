import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const data = [
  { name: "Mon", core: 120, growth: 80, churn: 30 },
  { name: "Tue", core: 140, growth: 92, churn: 28 },
  { name: "Wed", core: 150, growth: 96, churn: 26 },
  { name: "Thu", core: 160, growth: 110, churn: 22 },
  { name: "Fri", core: 170, growth: 120, churn: 18 },
];

export function StackedAreaCard() {
  return (
    <Card className="rounded-card border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Stacked activity</CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 10 }} />
            <Area type="monotone" dataKey="core" stackId="1" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.2} />
            <Area type="monotone" dataKey="growth" stackId="1" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.2} />
            <Area type="monotone" dataKey="churn" stackId="1" stroke={CHART_COLORS[4]} fill={CHART_COLORS[4]} fillOpacity={0.2} />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
