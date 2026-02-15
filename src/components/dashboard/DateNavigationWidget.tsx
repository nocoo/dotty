import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateNavigationProps {
  selectedDate: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onToggleCalendar?: () => void;
  todayLabel?: string;
  formatDate?: (date: Date) => string;
  className?: string;
}

const defaultFormatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function DateNavigationWidget({
  selectedDate,
  onPrevDay,
  onNextDay,
  onToday,
  onToggleCalendar,
  todayLabel = "Today",
  formatDate = defaultFormatDate,
  className,
}: DateNavigationProps) {
  const isToday = isSameDay(selectedDate, new Date());

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={onToday}
        disabled={isToday}
        className={cn(
          "mr-2 rounded-[var(--radius-widget)] px-3 py-1.5 text-sm font-medium transition-colors",
          isToday
            ? "cursor-not-allowed text-muted-foreground opacity-50"
            : "bg-muted border border-border text-foreground hover:bg-accent",
        )}
      >
        {todayLabel}
      </button>

      <button
        onClick={onPrevDay}
        aria-label="Previous day"
        className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-widget)] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <button
        onClick={onToggleCalendar}
        className={cn(
          "flex items-center gap-2 rounded-[var(--radius-widget)] px-3 py-1.5 text-lg font-medium transition-colors",
          onToggleCalendar ? "cursor-pointer hover:bg-accent" : "cursor-default",
        )}
      >
        <span>{formatDate(selectedDate)}</span>
        {onToggleCalendar && <CalendarIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
      </button>

      <button
        onClick={onNextDay}
        aria-label="Next day"
        className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-widget)] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
