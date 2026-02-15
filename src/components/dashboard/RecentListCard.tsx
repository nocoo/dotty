import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

const transactions = [
  { name: "Netflix Subscription", amount: -15.99, date: "Today", type: "expense" },
  { name: "Salary Deposit", amount: 5200.0, date: "Yesterday", type: "income" },
  { name: "Grocery Store", amount: -82.4, date: "Yesterday", type: "expense" },
  { name: "Freelance Payment", amount: 1200.0, date: "Feb 8", type: "income" },
  { name: "Electric Bill", amount: -145.0, date: "Feb 7", type: "expense" },
];

export function RecentListCard() {
  return (
    <div className="h-full rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Recent Transactions
          </p>
        </div>
        <span className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">View All</span>
      </div>
      <div className="rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex flex-col gap-3">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-[var(--radius-widget)] ${
                  tx.type === "income" ? "bg-success/10" : "bg-muted"
                }`}
              >
                {tx.type === "income" ? (
                  <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <span
                className={`text-sm font-medium font-mono-num ${
                  tx.amount > 0 ? "text-success" : "text-foreground"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
