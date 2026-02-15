// Pure business logic for the Stats Overview page.
// No React dependency — fully testable with plain unit tests.

type ChangeDirection = "positive" | "negative" | "neutral";

export function classifyChange(change: string): ChangeDirection {
  if (change.startsWith("+")) return "positive";
  if (change.startsWith("-")) return "negative";
  return "neutral";
}

/** Dotty monochrome: positive = text-success, negative/neutral = text-muted-foreground */
export function changeToColorClass(direction: ChangeDirection): string {
  switch (direction) {
    case "positive":
      return "text-success";
    case "negative":
      return "text-muted-foreground";
    default:
      return "text-muted-foreground";
  }
}
