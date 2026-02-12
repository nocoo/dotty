import { cn } from "@/lib/utils";

export interface TimelineEvent {
  /** Unique identifier */
  id: string;
  /** Time string in HH:mm format */
  time: string;
  /** Event title */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Optional Tailwind background color class (e.g. "bg-blue-500") */
  color?: string;
}

export interface TimelineProps {
  /** Events to display on the timeline */
  events: TimelineEvent[];
  /** Additional class name */
  className?: string;
}

/** Get hour from HH:mm time string */
const getHour = (time: string): number => parseInt(time.split(":")[0], 10);

/** 24-hour slot array */
const hours = Array.from({ length: 24 }, (_, i) => i);

/**
 * A 24-hour vertical timeline that groups events by hour.
 *
 * Each hour slot has a dot marker and optional event badges.
 * Hours with events use the primary accent color on the left border.
 */
export function TimelineWidget({ events, className }: TimelineProps) {
  // Group events by hour
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
            {/* Hour label */}
            <div className="absolute left-0 -translate-x-full pr-2 w-12 text-right text-xs text-muted-foreground">
              {hour.toString().padStart(2, "0")}:00
            </div>

            {/* Hour marker dot */}
            <div
              className={cn(
                "absolute -left-[5px] top-2 h-2 w-2 rounded-full",
                hasEvents ? "bg-primary" : "bg-border",
              )}
            />

            {/* Events for this hour */}
            <div className="flex min-h-[24px] w-full flex-col gap-1">
              {hourEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1 text-xs",
                    event.color ? `${event.color} text-white` : "bg-muted text-foreground",
                  )}
                >
                  <span className="font-medium">{event.time}</span>
                  <span className="truncate">{event.title}</span>
                  {event.subtitle && (
                    <span
                      className={cn(
                        "truncate",
                        event.color ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      {event.subtitle}
                    </span>
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
