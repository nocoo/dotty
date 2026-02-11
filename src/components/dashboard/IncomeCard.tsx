import { BarChart, Bar, ResponsiveContainer } from "recharts";

const data = [
  { value: 3000 },
  { value: 5500 },
  { value: 4200 },
  { value: 7800 },
  { value: 6000 },
  { value: 9200 },
  { value: 7500 },
  { value: 8000 },
];

export function IncomeCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-card p-6 min-h-[220px]">
      <div>
        <p className="text-sm text-muted-foreground font-normal">Income</p>
        <div className="mt-1 flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold text-foreground">$12,400</h2>
          <span className="text-xs font-medium text-success">+5.2% vs last month</span>
        </div>
      </div>
      <div className="mt-4 h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={3}>
            <Bar
              dataKey="value"
              fill="hsl(270, 70%, 60%)"
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
