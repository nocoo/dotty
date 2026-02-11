import { DashboardLayout } from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const weeklyData = [
  { day: "Mon", income: 1200, expense: 800 }, { day: "Tue", income: 900, expense: 1100 },
  { day: "Wed", income: 1500, expense: 700 }, { day: "Thu", income: 800, expense: 900 },
  { day: "Fri", income: 2000, expense: 1200 }, { day: "Sat", income: 600, expense: 1500 },
  { day: "Sun", income: 400, expense: 500 },
];

const categoryData = [
  { name: "Food", value: 35 }, { name: "Bills", value: 25 },
  { name: "Shopping", value: 20 }, { name: "Transport", value: 12 },
  { name: "Other", value: 8 },
];
const COLORS = ["hsl(200,90%,55%)", "hsl(270,70%,60%)", "hsl(142,71%,45%)", "hsl(340,82%,55%)", "hsl(0,0%,35%)"];

const trendData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: 5000 + Math.sin(i / 3) * 2000 + Math.random() * 1000 }));

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" currentPath="/analytics">
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {[{ label: "Avg. Daily Spend", value: "$142", change: "-3.2%" },
          { label: "Transactions/Day", value: "8.4", change: "+1.5%" },
          { label: "Savings Rate", value: "24%", change: "+2.1%" },
          { label: "Top Category", value: "Food", change: "35%" }].map((s) => (
          <div key={s.label} className="rounded-[14px] bg-secondary p-4 md:p-5">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{s.label}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">{s.value}</h3>
            <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-success" : s.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>{s.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-4">Income vs Expenses</p>
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={4}>
                <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Bar dataKey="income" fill="hsl(200,90%,55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="hsl(0,0%,25%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-4">Spending by Category</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="h-[150px] w-[150px] md:h-[180px] md:w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-2.5 justify-center">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">30-Day Balance Trend</p>
        <div className="h-[180px] md:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(200,90%,55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(200,90%,55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="hsl(200,90%,55%)" strokeWidth={2} fill="url(#blueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
