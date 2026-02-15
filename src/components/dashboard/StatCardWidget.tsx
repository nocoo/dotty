import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Stat Card ──

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: number; label?: string };
  className?: string;
}

export function StatCardWidget({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  const isPositive = trend && trend.value > 0;
  const isNegative = trend && trend.value < 0;

  return (
    <div className={cn("rounded-[var(--radius-card)] bg-secondary p-4 md:p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
          <p className="text-xl md:text-2xl font-semibold text-foreground font-mono-num tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="rounded-[var(--radius-widget)] bg-card border border-border p-2 text-muted-foreground">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "font-medium font-mono-num",
              isPositive && "text-success",
              isNegative && "text-muted-foreground",
              !isPositive && !isNegative && "text-muted-foreground",
            )}
          >
            {isPositive && "+"}
            {trend.value}%
          </span>
          {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
        </div>
      )}
    </div>
  );
}

// ── Stat Grid ──

export interface StatGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ children, columns = 4, className }: StatGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-3 md:gap-4", gridCols[columns], className)}>
      {children}
    </div>
  );
}
