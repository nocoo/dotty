import { describe, it, expect } from "vitest";
import {
  computeFlowSummary,
  deriveNetFlow,
} from "@/models/flow-comparison";
import type { FlowEntry } from "@/models/flow-comparison";

describe("flow-comparison model", () => {
  const testData: FlowEntry[] = [
    { month: "Jan", inflow: 1000, outflow: 800 },
    { month: "Feb", inflow: 1500, outflow: 1200 },
    { month: "Mar", inflow: 2000, outflow: 1800 },
  ];

  describe("computeFlowSummary", () => {
    it("computes total inflow, outflow, and net flow", () => {
      const result = computeFlowSummary(testData);
      expect(result.totalInflow).toBe(4500);
      expect(result.totalOutflow).toBe(3800);
      expect(result.netFlow).toBe(700);
    });

    it("handles empty array", () => {
      const result = computeFlowSummary([]);
      expect(result.totalInflow).toBe(0);
      expect(result.totalOutflow).toBe(0);
      expect(result.netFlow).toBe(0);
    });

    it("handles negative net flow", () => {
      const negativeData: FlowEntry[] = [
        { month: "Jan", inflow: 500, outflow: 1000 },
      ];
      const result = computeFlowSummary(negativeData);
      expect(result.netFlow).toBe(-500);
    });
  });

  describe("deriveNetFlow", () => {
    it("adds net property to each entry", () => {
      const result = deriveNetFlow(testData);
      expect(result).toHaveLength(3);
      expect(result[0].net).toBe(200);
      expect(result[1].net).toBe(300);
      expect(result[2].net).toBe(200);
    });

    it("preserves original properties", () => {
      const result = deriveNetFlow(testData);
      expect(result[0].month).toBe("Jan");
      expect(result[0].inflow).toBe(1000);
      expect(result[0].outflow).toBe(800);
    });

    it("handles empty array", () => {
      const result = deriveNetFlow([]);
      expect(result).toEqual([]);
    });

    it("handles negative net values", () => {
      const negativeData: FlowEntry[] = [
        { month: "Jan", inflow: 500, outflow: 1000 },
      ];
      const result = deriveNetFlow(negativeData);
      expect(result[0].net).toBe(-500);
    });
  });
});
