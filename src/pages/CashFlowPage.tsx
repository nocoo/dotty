import { DashboardLayout } from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyFlow = [
  { month: "Jul", inflow: 6200, outflow: 4800 }, { month: "Aug", inflow: 5800, outflow: 5200 },
  { month: "Sep", inflow: 7100, outflow: 4900 }, { month: "Oct", inflow: 6500, outflow: 5500 },
  { month: "Nov", inflow: 8200, outflow: 6100 }, { month: "Dec", inflow: 7400, outflow: 5800 },
  { month: "Jan", inflow: 6800, outflow: 5300 }, { month: "Feb", inflow: 7900, outflow: 5100 },
];

const netFlow = monthlyFlow.map((m) => ({ ...m, net: m.inflow - m.outflow }));

export default function CashFlowPage() {
  const totalIn = monthlyFlow.reduce((a, b) => a + b.inflow, 0);
  const totalOut = monthlyFlow.reduce((a, b) => a + b.outflow, 0);

  return (
    <DashboardLayout title="Cash Flow" currentPath="/cash-flow">
      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Inflow</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success">${totalIn.toLocaleString()}</h2>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Outflow</p>
          <h2 className="text-xl md:text-2xl font-semibold text-destructive">${totalOut.toLocaleString()}</h2>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Net Cash Flow</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">${(totalIn - totalOut).toLocaleString()}</h2>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">Cash Flow Over Time</p>
        <div className="h-[200px] md:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyFlow}>
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <defs>
                <linearGradient id="inflowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(142,71%,45%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(142,71%,45%)" stopOpacity={0} /></linearGradient>
                <linearGradient id="outflowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(0,72%,51%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(0,72%,51%)" stopOpacity={0} /></linearGradient>
              </defs>
              <Area type="monotone" dataKey="inflow" stroke="hsl(142,71%,45%)" strokeWidth={2} fill="url(#inflowG)" />
              <Area type="monotone" dataKey="outflow" stroke="hsl(0,72%,51%)" strokeWidth={2} fill="url(#outflowG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">Net Cash Flow by Month</p>
        <div className="h-[160px] md:h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={netFlow}>
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <Bar dataKey="net" fill="hsl(200,90%,55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
