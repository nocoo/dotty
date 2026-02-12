import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const transactions = [
  { name: "Netflix Subscription", amount: -15.99, date: "Today", type: "expense" },
  { name: "Salary Deposit", amount: 5200.00, date: "Yesterday", type: "income" },
  { name: "Grocery Store", amount: -82.40, date: "Yesterday", type: "expense" },
  { name: "Freelance Payment", amount: 1200.00, date: "Feb 8", type: "income" },
  { name: "Electric Bill", amount: -145.00, date: "Feb 7", type: "expense" },
];

export function RecentListCard() {
  return (
    <Card className="h-full rounded-card border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">Recent Transactions</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">View All</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 flex-col gap-3">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tx.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                {tx.type === "income"
                  ? <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />
                  : <ArrowUpRight className="h-3.5 w-3.5 text-destructive" strokeWidth={1.5} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <span className={`text-sm font-medium ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
