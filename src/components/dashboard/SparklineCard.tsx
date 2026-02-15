import { LineChart as RechartsLineChart, Line, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "@/lib/palette";

const sparkData = [
  { value: 18 },
  { value: 24 },
  { value: 20 },
  { value: 28 },
  { value: 26 },
  { value: 32 },
  { value: 30 },
];

export function SparklineCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Weekly active
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-3">
        <div className="text-2xl font-semibold text-foreground font-mono-num">24.8k</div>
        <div className="h-14">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={CHART_COLORS[1]}
                strokeWidth={2}
                dot={false}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground">+6.1% vs last week</p>
      </div>
    </div>
  );
}
