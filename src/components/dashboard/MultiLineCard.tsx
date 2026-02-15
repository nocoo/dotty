import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS, chartAxis } from "@/lib/palette";

const data = [
  { name: "Week 1", retention: 78, activation: 62, conversion: 34 },
  { name: "Week 2", retention: 82, activation: 66, conversion: 36 },
  { name: "Week 3", retention: 84, activation: 70, conversion: 38 },
  { name: "Week 4", retention: 88, activation: 74, conversion: 40 },
];

export function MultiLineCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Multi-series trend
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius-widget)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  boxShadow: "none",
                }}
              />
              <Line type="monotone" dataKey="retention" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="activation" stroke={CHART_COLORS[2]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="conversion" stroke={CHART_COLORS[4]} strokeWidth={2} dot={false} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
