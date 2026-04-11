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
      expect(computeGoalPercent(5000, 10000)).toBe(50);
      expect(computeGoalPercent(10000, 10000)).toBe(100);
    });

    it("returns 0 when target is 0", () => {
      expect(computeGoalPercent(5000, 0)).toBe(0);
    });

    it("rounds to nearest integer", () => {
      expect(computeGoalPercent(333, 1000)).toBe(33);
      expect(computeGoalPercent(336, 1000)).toBe(34);
    });
  });

  describe("computeMonthlyTarget", () => {
    it("computes correct monthly target", () => {
      expect(computeMonthlyTarget(7500, 10000, 5)).toBe(500);
      expect(computeMonthlyTarget(0, 12000, 12)).toBe(1000);
    });

    it("returns 0 when months is 0 or negative", () => {
      expect(computeMonthlyTarget(5000, 10000, 0)).toBe(0);
      expect(computeMonthlyTarget(5000, 10000, -1)).toBe(0);
    });

    it("rounds to nearest integer", () => {
      expect(computeMonthlyTarget(0, 1000, 3)).toBe(333);
    });

    it("handles already achieved goals", () => {
      expect(computeMonthlyTarget(10000, 10000, 6)).toBe(0);
    });
  });

  describe("isOnTrack", () => {
    it("returns true when progress >= threshold", () => {
      expect(isOnTrack(7500, 10000)).toBe(true);
      expect(isOnTrack(7500, 10000, 0.75)).toBe(true);
      expect(isOnTrack(8000, 10000, 0.75)).toBe(true);
    });

    it("returns false when progress < threshold", () => {
      expect(isOnTrack(7000, 10000)).toBe(false);
      expect(isOnTrack(5000, 10000, 0.75)).toBe(false);
    });

    it("returns false when target is 0", () => {
      expect(isOnTrack(5000, 0)).toBe(false);
    });

    it("uses custom threshold", () => {
      expect(isOnTrack(5000, 10000, 0.5)).toBe(true);
      expect(isOnTrack(4000, 10000, 0.5)).toBe(false);
    });
  });

  describe("enrichGoal", () => {
    const goal: Goal = {
      name: "Emergency Fund",
      target: 10000,
      saved: 7500,
      icon: "shield",
    };

    it("adds percent, monthlyTarget, and onTrack", () => {
      const result = enrichGoal(goal);
      expect(result.percent).toBe(75);
      expect(result.monthlyTarget).toBe(417);
      expect(result.onTrack).toBe(true);
    });

    it("preserves original goal properties", () => {
      const result = enrichGoal(goal);
      expect(result.name).toBe("Emergency Fund");
      expect(result.target).toBe(10000);
      expect(result.saved).toBe(7500);
      expect(result.icon).toBe("shield");
    });

    it("uses custom remainingMonths", () => {
      const result = enrichGoal(goal, 10);
      expect(result.monthlyTarget).toBe(250);
    });

    it("handles goal with 0 saved", () => {
      const newGoal: Goal = { name: "New Goal", target: 1000, saved: 0, icon: "star" };
      const result = enrichGoal(newGoal);
      expect(result.percent).toBe(0);
      expect(result.onTrack).toBe(false);
    });
  });
});
