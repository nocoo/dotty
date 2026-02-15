import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SlotBarItem {
  color: string;
  height?: number;
  label?: string;
}

export interface SlotBarChartProps {
  items: SlotBarItem[];
  heightClass?: string;
  gapClass?: string;
  emptyClass?: string;
  className?: string;
}

export function SlotBarChart({
  items,
  heightClass = "h-6",
  gapClass = "gap-px",
  emptyClass = "bg-muted",
  className,
}: SlotBarChartProps) {
  if (items.length === 0) return null;

  const hasTooltips = items.some((item) => item.label);

  function renderBar(item: SlotBarItem) {
    const heightRatio = item.height ?? 1;
    const isEmpty = heightRatio <= 0;
    const isTailwindColor = item.color.startsWith("bg-");
    const heightPercent = isEmpty ? 100 : Math.max(heightRatio * 100, 10);

    return (
      <div
        className={cn(
          "flex-1 rounded-sm",
          isEmpty ? emptyClass : isTailwindColor ? item.color : undefined
        )}
        style={{
          height: `${heightPercent}%`,
          ...(isEmpty || isTailwindColor ? {} : { backgroundColor: item.color }),
        }}
        data-testid="slot-bar"
      />
    );
  }

  const content = items.map((item, i) => {
    if (hasTooltips && item.label) {
      return (
        <Tooltip key={i}>
          <TooltipTrigger asChild>{renderBar(item)}</TooltipTrigger>
          <TooltipContent side="top"><p>{item.label}</p></TooltipContent>
        </Tooltip>
      );
    }
    return <div key={i}>{renderBar(item)}</div>;
  });

  const container = (
    <div className={cn("flex w-full items-end", heightClass, gapClass, className)}>
      {content}
    </div>
  );

  if (hasTooltips) {
    return <TooltipProvider delayDuration={0}>{container}</TooltipProvider>;
  }

  return container;
}
