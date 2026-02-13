import { cn } from "@/lib/utils";

interface PageIntroProps {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: React.ElementType;
  actions?: React.ReactNode;
}

export function PageIntro({ title, description, eyebrow, icon: Icon, actions }: PageIntroProps) {
  return (
    <div className="rounded-card bg-secondary p-5 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          {eyebrow && (
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</span>
            </div>
          )}
          <h2 className={cn("text-2xl md:text-3xl font-semibold text-foreground font-display tracking-tight", !eyebrow && "mt-1")}>
            {title}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
