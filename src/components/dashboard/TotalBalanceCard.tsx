import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

const data = [
  { value: 4000 },
  { value: 6000 },
  { value: 5000 },
  { value: 8000 },
  { value: 7000 },
  { value: 8800 },
  { value: 6500 },
  { value: 5500 },
  { value: 4500 },
  { value: 3500 },
  { value: 3000 },
  { value: 2500 },
];

export function TotalBalanceCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-card p-6 min-h-[220px]">
      <div>
        <p className="text-sm text-muted-foreground font-normal">Total Balance</p>
        <div className="mt-1 flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold text-foreground">$8,800</h2>
          <span className="text-xs font-medium text-success">+3.1% vs last month</span>
        </div>
      </div>
      <div className="mt-4 h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={3}>
            <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={14}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    i < 6
                      ? `hsl(217, 91%, ${60 - i * 3}%)`
                      : `hsl(240, 4%, ${20 + (i - 6) * 3}%)`
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
