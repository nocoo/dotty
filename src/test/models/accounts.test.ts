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
  });
});
