import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Stacked activity
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartAxis, fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius-widget)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  boxShadow: "none",
                }}
              />
              <Area type="monotone" dataKey="core" stackId="1" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.2} />
              <Area type="monotone" dataKey="growth" stackId="1" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.2} />
              <Area type="monotone" dataKey="churn" stackId="1" stroke={CHART_COLORS[4]} fill={CHART_COLORS[4]} fillOpacity={0.2} />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
