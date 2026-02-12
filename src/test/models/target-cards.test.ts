import { describe, it, expect } from "vitest";
import {
  computeGoalPercent,
  computeMonthlyTarget,
  isOnTrack,
  enrichGoal,
} from "@/models/target-cards";
import type { Goal } from "@/models/types";

describe("target-cards model", () => {
  describe("computeGoalPercent", () => {
    it("computes correct percentage", () => {
      expect(computeGoalPercent(7500, 10000)).toBe(75);
    });

    it("returns 0 when target is 0", () => {
      expect(computeGoalPercent(100, 0)).toBe(0);
    });

    it("rounds to nearest integer", () => {
      expect(computeGoalPercent(2200, 5000)).toBe(44);
    });
  });

  describe("computeMonthlyTarget", () => {
    it("computes remaining amount divided by months", () => {
      expect(computeMonthlyTarget(7500, 10000, 6)).toBe(417);
    });

    it("returns 0 when months is 0", () => {
      expect(computeMonthlyTarget(7500, 10000, 0)).toBe(0);
    });
  });

  describe("isOnTrack", () => {
    it("returns true when saved >= 75% of target", () => {
      expect(isOnTrack(7500, 10000)).toBe(true);
    });

    it("returns false when saved < 75% of target", () => {
      expect(isOnTrack(2200, 5000)).toBe(false);
    });

    it("supports custom threshold", () => {
      expect(isOnTrack(5000, 10000, 0.5)).toBe(true);
      expect(isOnTrack(4999, 10000, 0.5)).toBe(false);
    });

    it("returns false when target is 0", () => {
      expect(isOnTrack(100, 0)).toBe(false);
    });
  });

  describe("enrichGoal", () => {
    const goal: Goal = { name: "Emergency Fund", target: 10000, saved: 7500, icon: "shield" };

    it("enriches with percent, monthlyTarget, and onTrack", () => {
      const result = enrichGoal(goal);
      expect(result.percent).toBe(75);
      expect(result.monthlyTarget).toBe(417);
      expect(result.onTrack).toBe(true);
    });

    it("respects custom remaining months", () => {
      const result = enrichGoal(goal, 12);
      expect(result.monthlyTarget).toBe(208);
    });
  });
});
