import { describe, it, expect } from "vitest";
import {
  computeProgressSummary,
  computeProgressPercent,
} from "@/models/progress-tracking";
import type { Budget } from "@/models/types";

describe("progress-tracking model", () => {
  describe("computeProgressSummary", () => {
    const budgets: Budget[] = [
      { category: "Food", spent: 420, limit: 600 },
      { category: "Transport", spent: 180, limit: 300 },
      { category: "Entertainment", spent: 95, limit: 150 },
    ];

    it("computes total spent, limit, and remaining", () => {
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

    it("handles overspending (negative remaining)", () => {
      const overBudget: Budget[] = [
        { category: "Shopping", spent: 500, limit: 400 },
      ];
      const result = computeProgressSummary(overBudget);
      expect(result.remaining).toBe(-100);
    });
  });

  describe("computeProgressPercent", () => {
    it("computes correct percentage", () => {
      expect(computeProgressPercent(50, 100)).toBe(50);
      expect(computeProgressPercent(75, 100)).toBe(75);
      expect(computeProgressPercent(100, 100)).toBe(100);
    });

    it("returns 0 when target is 0", () => {
      expect(computeProgressPercent(50, 0)).toBe(0);
    });

    it("handles values over 100%", () => {
      expect(computeProgressPercent(150, 100)).toBe(150);
    });

    it("handles decimal percentages", () => {
      expect(computeProgressPercent(33, 100)).toBe(33);
      expect(computeProgressPercent(1, 3)).toBeCloseTo(33.33, 1);
    });
  });
});
