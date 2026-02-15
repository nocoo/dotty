import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  color?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const getHour = (time: string): number => parseInt(time.split(":")[0], 10);
const hours = Array.from({ length: 24 }, (_, i) => i);

export function TimelineWidget({ events, className }: TimelineProps) {
  const eventsByHour = new Map<number, TimelineEvent[]>();
  events.forEach((event) => {
    const hour = getHour(event.time);
    const existing = eventsByHour.get(hour) || [];
    eventsByHour.set(hour, [...existing, event]);
  });

  return (
    <div className={cn("flex flex-col pl-14", className)}>
      {hours.map((hour) => {
        const hourEvents = eventsByHour.get(hour) || [];
        const hasEvents = hourEvents.length > 0;

        return (
          <div
            key={hour}
            className={cn(
              "relative flex items-start border-l-2 py-2 pl-4",
              hasEvents ? "border-primary" : "border-border",
            )}
          >
            <div className="absolute left-0 -translate-x-full pr-2 w-12 text-right text-xs text-muted-foreground font-mono-num">
              {hour.toString().padStart(2, "0")}:00
            </div>

            <div className={cn("absolute -left-[5px] top-2 h-2 w-2 rounded-full", hasEvents ? "bg-primary" : "bg-border")} />

            <div className="flex min-h-[24px] w-full flex-col gap-1">
              {hourEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-2 rounded-[var(--radius-widget)] bg-muted px-2 py-1 text-xs text-foreground"
                >
                  <span className="font-medium font-mono-num">{event.time}</span>
                  <span className="truncate">{event.title}</span>
                  {event.subtitle && (
                    <span className="truncate text-muted-foreground">{event.subtitle}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
