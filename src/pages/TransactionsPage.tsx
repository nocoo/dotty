import { DashboardLayout } from "@/components/DashboardLayout";
import { ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";

const transactions = [
  { id: 1, name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "Feb 11, 2026", status: "Completed" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 5200.00, date: "Feb 10, 2026", status: "Completed" },
  { id: 3, name: "Grocery Store", category: "Food", amount: -82.40, date: "Feb 10, 2026", status: "Completed" },
  { id: 4, name: "Freelance Payment", category: "Income", amount: 1200.00, date: "Feb 8, 2026", status: "Completed" },
  { id: 5, name: "Electric Bill", category: "Utilities", amount: -145.00, date: "Feb 7, 2026", status: "Completed" },
  { id: 6, name: "Restaurant", category: "Food", amount: -56.80, date: "Feb 6, 2026", status: "Completed" },
  { id: 7, name: "Gas Station", category: "Transport", amount: -42.00, date: "Feb 5, 2026", status: "Pending" },
  { id: 8, name: "Online Transfer", category: "Transfer", amount: -300.00, date: "Feb 4, 2026", status: "Completed" },
  { id: 9, name: "Gym Membership", category: "Health", amount: -49.99, date: "Feb 3, 2026", status: "Completed" },
  { id: 10, name: "Dividend Income", category: "Income", amount: 85.50, date: "Feb 2, 2026", status: "Completed" },
];

export default function TransactionsPage() {
  return (
    <DashboardLayout title="Transactions" currentPath="/transactions">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{transactions.length} transactions</span>
        <button className="flex items-center gap-2 rounded-[10px] bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" strokeWidth={1.5} /> Filter
        </button>
      </div>

      {/* Desktop table */}
      <div className="rounded-[14px] bg-secondary overflow-hidden hidden md:block">
        <div className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-2 px-5 py-3 text-xs text-muted-foreground border-b border-border">
          <span>Transaction</span><span>Category</span><span>Date</span><span className="text-right">Amount</span><span className="text-right">Status</span>
        </div>
        {transactions.map((tx) => (
          <div key={tx.id} className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-2 px-5 py-3 items-center hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`flex h-7 w-7 items-center justify-center rounded-md ${tx.amount > 0 ? "bg-success/10" : "bg-destructive/10"}`}>
                {tx.amount > 0 ? <ArrowDownLeft className="h-3 w-3 text-success" strokeWidth={1.5} /> : <ArrowUpRight className="h-3 w-3 text-destructive" strokeWidth={1.5} />}
              </div>
              <span className="text-sm text-foreground">{tx.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{tx.category}</span>
            <span className="text-xs text-muted-foreground">{tx.date}</span>
            <span className={`text-sm font-medium text-right ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
              {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
            </span>
            <div className="flex justify-end">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tx.status === "Completed" ? "bg-success/10 text-success" : "bg-yellow-500/10 text-yellow-500"}`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile list */}
      <div className="flex flex-col gap-2 md:hidden">
        {transactions.map((tx) => (
          <div key={tx.id} className="rounded-[14px] bg-secondary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${tx.amount > 0 ? "bg-success/10" : "bg-destructive/10"}`}>
                {tx.amount > 0 ? <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> : <ArrowUpRight className="h-3.5 w-3.5 text-destructive" strokeWidth={1.5} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-medium ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
                <span className={`text-[10px] ${tx.status === "Completed" ? "text-success" : "text-yellow-500"}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
