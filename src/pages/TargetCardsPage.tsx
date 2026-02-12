import { Check, Shield, Plane, Car, Home } from "lucide-react";
import { useTargetCardsViewModel } from "@/viewmodels/useTargetCardsViewModel";

const GOAL_ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  plane: Plane,
  car: Car,
  home: Home,
};

export default function TargetCardsPage() {
  const { goals } = useTargetCardsViewModel();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {goals.map((goal) => {
        const Icon = GOAL_ICONS[goal.icon] ?? Shield;
        return (
          <div key={goal.name} className="rounded-[14px] bg-secondary p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{goal.name}</p>
                <p className="text-xs text-muted-foreground">${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">{goal.percent}%</span>
            </div>
            <div className="h-2 rounded-full bg-card">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${goal.percent}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Monthly target: ${goal.monthlyTarget.toLocaleString()}</span>
              {goal.onTrack && <span className="flex items-center gap-1 text-xs text-success"><Check className="h-3 w-3" strokeWidth={2} /> On Track</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
