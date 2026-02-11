import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { budgets, monthlyBudgetData } from "@/data/mock";

export default function BudgetPage() {
  const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);
  const totalLimit = budgets.reduce((a, b) => a + b.limit, 0);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-3">
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Budget</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">${totalLimit.toLocaleString()}</h2>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Spent So Far</p>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">${totalSpent.toLocaleString()}</h2>
        </div>
        <div className="rounded-[14px] bg-secondary p-4 md:p-5">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Remaining</p>
          <h2 className="text-xl md:text-2xl font-semibold text-success">${(totalLimit - totalSpent).toLocaleString()}</h2>
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">Category Budgets</p>
        <div className="flex flex-col gap-4">
          {budgets.map((b) => (
            <div key={b.category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground">{b.category}</span>
                <span className="text-xs text-muted-foreground">${b.spent} / ${b.limit}</span>
              </div>
              <div className="h-2 rounded-full bg-card">
                <div className="h-full rounded-full transition-all" style={{ width: `${(b.spent / b.limit) * 100}%`, background: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-4">Budget vs Actual</p>
        <div className="h-[180px] md:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyBudgetData} barGap={4}>
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Bar dataKey="budget" fill="hsl(0,0%,25%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="hsl(200,90%,55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
