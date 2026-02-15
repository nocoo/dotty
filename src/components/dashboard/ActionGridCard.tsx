import { ArrowUpRight, ArrowDownLeft, CreditCard, PiggyBank, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/* Dotty monochrome: all actions use bg-muted text-foreground instead of colored backgrounds */
const actions = [
  { icon: ArrowUpRight, label: "Send Money" },
  { icon: ArrowDownLeft, label: "Receive" },
  { icon: CreditCard, label: "Pay Bill" },
  { icon: PiggyBank, label: "Save" },
];

export function ActionGridCard() {
  return (
    <Card className="h-full rounded-[var(--radius-card)] border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Quick Actions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-1 grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-widget)] bg-card border border-border p-3 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-widget)] bg-muted">
                <action.icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
