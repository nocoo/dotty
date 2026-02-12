// Pure business logic for the Record List page.
// No React dependency — fully testable with plain unit tests.

import type { Transaction } from "@/models/types";

export type AmountDirection = "positive" | "negative";

export function classifyDirection(amount: number): AmountDirection {
  return amount > 0 ? "positive" : "negative";
}

export function formatSignedAmount(amount: number): string {
  const prefix = amount > 0 ? "+" : "";
  return `${prefix}$${Math.abs(amount).toFixed(2)}`;
}

export type StatusVariant = "success" | "warning";

export function classifyStatus(status: Transaction["status"]): StatusVariant {
  return status === "Completed" ? "success" : "warning";
}
