import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const accountItems = [
  { name: "Checking", balance: 12450.8, change: "+2.4%" },
  { name: "Savings", balance: 8200.0, change: "+5.1%" },
  { name: "Investment", balance: 23100.5, change: "+8.7%" },
];

export function AccountOverviewCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Accounts</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-1 flex-col gap-3">
          {accountItems.map((acc) => (
            <div key={acc.name} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{acc.name}</span>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground font-display">
                  ${acc.balance.toLocaleString()}
                </span>
                <span className="text-xs text-success ml-2">{acc.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
