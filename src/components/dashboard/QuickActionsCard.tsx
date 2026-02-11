import { ArrowUpRight, ArrowDownLeft, CreditCard, PiggyBank, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const actions = [
  { icon: ArrowUpRight, label: "Send Money", color: "bg-primary/10 text-primary" },
  { icon: ArrowDownLeft, label: "Receive", color: "bg-success/10 text-success" },
  { icon: CreditCard, label: "Pay Bill", color: "bg-destructive/10 text-destructive" },
  { icon: PiggyBank, label: "Save", color: "bg-purple-500/10 text-purple-500" },
];

export function QuickActionsCard() {
  return (
    <Card className="h-full rounded-[14px] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-1 grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 rounded-[10px] bg-card p-3 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.color}`}>
                <action.icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
