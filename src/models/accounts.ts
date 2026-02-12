// Pure business logic for the Accounts page.
// No React dependency — fully testable with plain unit tests.

import type { ActivityItem } from "@/models/types";

export type AmountDirection = "positive" | "negative";

export function classifyDirection(amount: number): AmountDirection {
  return amount > 0 ? "positive" : "negative";
}

export function formatSignedAmount(amount: number): string {
  const prefix = amount > 0 ? "+" : "";
  return `${prefix}$${Math.abs(amount).toFixed(2)}`;
}

export function computeActivitySummary(items: ActivityItem[]) {
  const totalIn = items.filter((i) => i.amount > 0).reduce((s, i) => s + i.amount, 0);
  const totalOut = items.filter((i) => i.amount < 0).reduce((s, i) => s + Math.abs(i.amount), 0);
  return { totalIn, totalOut, net: totalIn - totalOut };
}
