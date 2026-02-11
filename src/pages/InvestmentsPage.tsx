import { DashboardLayout } from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const portfolio = [
  { name: "Stocks", value: 45000, allocation: 45, change: "+12.4%", up: true },
  { name: "Bonds", value: 20000, allocation: 20, change: "+3.2%", up: true },
  { name: "Real Estate", value: 15000, allocation: 15, change: "+7.8%", up: true },
  { name: "Crypto", value: 10000, allocation: 10, change: "-5.1%", up: false },
  { name: "Cash", value: 10000, allocation: 10, change: "+0.5%", up: true },
];
const COLORS = ["hsl(200,90%,55%)", "hsl(270,70%,60%)", "hsl(142,71%,45%)", "hsl(340,82%,55%)", "hsl(0,0%,40%)"];

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  value: 80000 + Math.sin(i / 2) * 10000 + i * 2000 + Math.random() * 3000,
}));

export default function InvestmentsPage() {
  const totalValue = portfolio.reduce((a, b) => a + b.value, 0);

  return (
    <DashboardLayout title="Investments" currentPath="/investments">
      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Portfolio Value</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">${totalValue.toLocaleString()}</h2>
          <span className="text-xs font-medium text-success">+8.6% all time</span>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Today's Change</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success">+$342.50</h2>
          <span className="text-xs font-medium text-success">+0.34%</span>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Return</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">$8,600</h2>
          <span className="text-xs font-medium text-success">+8.6%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-4">Portfolio Performance</p>
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={40} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`} />
                <Line type="monotone" dataKey="value" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-4">Asset Allocation</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="h-[150px] w-[150px] md:h-[180px] md:w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={portfolio} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="allocation" strokeWidth={0}>
                    {portfolio.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-2.5 justify-center">
              {portfolio.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium text-foreground">{item.allocation}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">Holdings</p>
        <div className="flex flex-col gap-3">
          {portfolio.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between rounded-[10px] bg-card p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${COLORS[i]}20` }}>
                  {item.up ? <TrendingUp className="h-3.5 w-3.5" style={{ color: COLORS[i] }} strokeWidth={1.5} /> : <TrendingDown className="h-3.5 w-3.5" style={{ color: COLORS[i] }} strokeWidth={1.5} />}
                </div>
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">${item.value.toLocaleString()}</p>
                <p className={`text-xs ${item.up ? "text-success" : "text-destructive"}`}>{item.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
