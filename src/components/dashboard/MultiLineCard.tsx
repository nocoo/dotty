import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const data = [
  { name: "Week 1", retention: 78, activation: 62, conversion: 34 },
  { name: "Week 2", retention: 82, activation: 66, conversion: 36 },
  { name: "Week 3", retention: 84, activation: 70, conversion: 38 },
  { name: "Week 4", retention: 88, activation: 74, conversion: 40 },
];

export function MultiLineCard() {
  return (
    <Card className="rounded-card border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Multi-series trend</CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 10 }} />
            <Line type="monotone" dataKey="retention" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="activation" stroke={CHART_COLORS[2]} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="conversion" stroke={CHART_COLORS[4]} strokeWidth={2} dot={false} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
