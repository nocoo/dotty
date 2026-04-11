import { describe, it, expect } from "vitest";
import { computeActivitySummary } from "@/models/accounts";
import type { ActivityItem } from "@/models/types";

describe("accounts model", () => {
  describe("computeActivitySummary", () => {
    const items: ActivityItem[] = [
      { desc: "Transfer", amount: -500, date: "Today" },
      { desc: "Received", amount: 250, date: "Yesterday" },
      { desc: "Withdrawal", amount: -200, date: "Feb 9" },
      { desc: "Refund", amount: 45.99, date: "Feb 8" },
    ];

    it("computes totalIn, totalOut, and net correctly", () => {
      const result = computeActivitySummary(items);
      expect(result.totalIn).toBeCloseTo(295.99);
      expect(result.totalOut).toBe(700);
      expect(result.net).toBeCloseTo(-404.01);
    });

    it("handles empty array", () => {
      const result = computeActivitySummary([]);
      expect(result.totalIn).toBe(0);
      expect(result.totalOut).toBe(0);
      expect(result.net).toBe(0);
    });

    it("handles all positive amounts", () => {
      const allPositive: ActivityItem[] = [
        { desc: "Income 1", amount: 100, date: "Today" },
        { desc: "Income 2", amount: 200, date: "Yesterday" },
      ];
      const result = computeActivitySummary(allPositive);
      expect(result.totalIn).toBe(300);
      expect(result.totalOut).toBe(0);
      expect(result.net).toBe(300);
    });

    it("handles all negative amounts", () => {
      const allNegative: ActivityItem[] = [
        { desc: "Expense 1", amount: -100, date: "Today" },
        { desc: "Expense 2", amount: -200, date: "Yesterday" },
      ];
      const result = computeActivitySummary(allNegative);
      expect(result.totalIn).toBe(0);
      expect(result.totalOut).toBe(300);
      expect(result.net).toBe(-300);
    });
  });
});
