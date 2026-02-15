import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";
import { chartPrimary, chartAxis } from "@/lib/palette";

const data = [
  { name: "Mon", value: 2400 }, { name: "Tue", value: 1398 },
  { name: "Wed", value: 5800 }, { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 }, { name: "Sat", value: 3200 },
  { name: "Sun", value: 4300 },
];

export function TrendLineCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Spending Trend
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="text-3xl font-semibold text-foreground font-display tracking-tight">
            <span className="font-mono-num">$3,420</span>
          </h2>
          <span className="text-xs font-medium text-muted-foreground font-mono-num">-1.8%</span>
        </div>
        <div className="h-[120px]" role="img" aria-label="Spending trend line chart from Monday to Sunday, current total $3,420">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Line type="monotone" dataKey="value" stroke={chartPrimary} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
