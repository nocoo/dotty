import { describe, it, expect } from "vitest";
import {
  classifyDirection,
  formatSignedAmount,
  computeActivitySummary,
} from "@/models/accounts";
import type { ActivityItem } from "@/models/types";

describe("accounts model", () => {
  describe("classifyDirection", () => {
    it("returns positive for positive amount", () => {
      expect(classifyDirection(250)).toBe("positive");
    });

    it("returns negative for negative amount", () => {
      expect(classifyDirection(-100)).toBe("negative");
    });

    it("returns negative for zero", () => {
      expect(classifyDirection(0)).toBe("negative");
    });
  });

  describe("formatSignedAmount", () => {
    it("formats positive amount with + prefix", () => {
      expect(formatSignedAmount(250)).toBe("+$250.00");
    });

    it("formats negative amount without sign prefix", () => {
      expect(formatSignedAmount(-100.5)).toBe("$100.50");
    });

    it("formats zero", () => {
      expect(formatSignedAmount(0)).toBe("$0.00");
    });
  });

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
