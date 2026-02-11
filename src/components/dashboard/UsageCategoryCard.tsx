import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 18000 },
  { name: "Feb", value: 22000 },
  { name: "Mar", value: 15000 },
  { name: "Apr", value: 28000 },
  { name: "May", value: 20000 },
  { name: "Jun", value: 25000 },
  { name: "Jul", value: 19000 },
  { name: "Aug", value: 23000 },
  { name: "Sep", value: 17000 },
  { name: "Oct", value: 21000 },
  { name: "Nov", value: 26000 },
  { name: "Dec", value: 24000 },
];

const formatYAxis = (value: number) => {
  if (value >= 1000) return `${value / 1000}k`;
  return value.toString();
};

export function UsageCategoryCard() {
  return (
    <div className="flex flex-col rounded-2xl bg-card p-6">
      <div>
        <p className="text-sm text-muted-foreground font-normal">Usage Category</p>
        <div className="mt-1 flex items-baseline gap-3">
          <h2 className="text-3xl font-semibold text-foreground">$15,200</h2>
          <span className="text-sm text-muted-foreground font-normal">
            total transactions
          </span>
        </div>
      </div>
      <div className="mt-6 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(240, 4%, 16%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(240, 5%, 45%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: "hsl(240, 5%, 45%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Bar
              dataKey="value"
              fill="hsl(240, 4%, 25%)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
