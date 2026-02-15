import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const accountItems = [
  { name: "Checking", balance: 12450.8, change: "+2.4%" },
  { name: "Savings", balance: 8200.0, change: "+5.1%" },
  { name: "Investment", balance: 23100.5, change: "+8.7%" },
];

export function ItemListCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Accounts
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 flex-col gap-3">
          {accountItems.map((acc) => (
            <div key={acc.name} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{acc.name}</span>
              <div className="text-right">
                <span className="text-sm font-medium font-mono-num text-foreground">
                  ${acc.balance.toLocaleString()}
                </span>
                <span className="ml-2 text-xs font-mono-num text-success">{acc.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
