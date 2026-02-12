import { describe, it, expect } from "vitest";
import {
  computeProgressSummary,
  computeProgressPercent,
} from "@/models/progress-tracking";
import type { Budget } from "@/models/types";

describe("progress-tracking model", () => {
  const budgets: Budget[] = [
    { category: "Food", spent: 420, limit: 600 },
    { category: "Transport", spent: 180, limit: 300 },
    { category: "Entertainment", spent: 95, limit: 150 },
  ];

  describe("computeProgressSummary", () => {
    it("sums spent, limit, and remaining correctly", () => {
      const result = computeProgressSummary(budgets);
      expect(result.totalSpent).toBe(695);
      expect(result.totalLimit).toBe(1050);
      expect(result.remaining).toBe(355);
    });

    it("handles empty array", () => {
      const result = computeProgressSummary([]);
      expect(result.totalSpent).toBe(0);
      expect(result.totalLimit).toBe(0);
      expect(result.remaining).toBe(0);
    });
  });

  describe("computeProgressPercent", () => {
    it("computes correct percentage", () => {
      expect(computeProgressPercent(420, 600)).toBeCloseTo(70);
    });

    it("returns 0 when target is 0", () => {
      expect(computeProgressPercent(100, 0)).toBe(0);
    });

    it("returns 100 when current equals target", () => {
      expect(computeProgressPercent(600, 600)).toBe(100);
    });
  });
});
