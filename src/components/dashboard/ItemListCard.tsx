import { Wallet } from "lucide-react";

const accountItems = [
  { name: "Checking", balance: 12450.8, change: "+2.4%" },
  { name: "Savings", balance: 8200.0, change: "+5.1%" },
  { name: "Investment", balance: 23100.5, change: "+8.7%" },
];

export function ItemListCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Wallet className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Accounts
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="flex flex-col gap-3">
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
      </div>
    </div>
  );
}
