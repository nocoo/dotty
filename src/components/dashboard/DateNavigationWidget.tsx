import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export interface DateNavigationProps {
  selectedDate: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onToggleCalendar?: () => void;
  todayLabel?: string;
  formatDate?: (date: Date, locale: string) => string;
  className?: string;
}

const defaultFormatDate = (date: Date, locale: string): string =>
  date.toLocaleDateString(locale, { weekday: "short", year: "numeric", month: "short", day: "numeric" });

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function DateNavigationWidget({
  selectedDate,
  onPrevDay,
  onNextDay,
  onToday,
  onToggleCalendar,
  todayLabel,
  formatDate = defaultFormatDate,
  className,
}: DateNavigationProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "zh" ? "zh-CN" : "en-US";
  const resolvedTodayLabel = todayLabel ?? t("common.today");
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
        {resolvedTodayLabel}
      </button>

      <button
        onClick={onPrevDay}
        aria-label={t("common.previousDay")}
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
        <span>{formatDate(selectedDate, locale)}</span>
        {onToggleCalendar && <CalendarIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
      </button>

      <button
        onClick={onNextDay}
        aria-label={t("common.nextDay")}
        className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-widget)] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
