import { describe, it, expect } from "vitest";
import {
  computeFlowSummary,
  deriveNetFlow,
} from "@/models/flow-comparison";
import type { FlowEntry } from "@/models/flow-comparison";

describe("flow-comparison model", () => {
  const data: FlowEntry[] = [
    { month: "Jul", inflow: 6200, outflow: 4800 },
    { month: "Aug", inflow: 5800, outflow: 5200 },
    { month: "Sep", inflow: 7100, outflow: 4900 },
  ];

  describe("computeFlowSummary", () => {
    it("sums inflow, outflow, and computes net", () => {
      const result = computeFlowSummary(data);
      expect(result.totalInflow).toBe(19100);
      expect(result.totalOutflow).toBe(14900);
      expect(result.netFlow).toBe(4200);
    });

    it("handles empty array", () => {
      const result = computeFlowSummary([]);
      expect(result.totalInflow).toBe(0);
      expect(result.totalOutflow).toBe(0);
      expect(result.netFlow).toBe(0);
    });
  });

  describe("deriveNetFlow", () => {
    it("adds net field to each entry", () => {
      const result = deriveNetFlow(data);
      expect(result).toHaveLength(3);
      expect(result[0].net).toBe(1400);
      expect(result[1].net).toBe(600);
      expect(result[2].net).toBe(2200);
    });

    it("preserves original fields", () => {
      const result = deriveNetFlow(data);
      expect(result[0].month).toBe("Jul");
      expect(result[0].inflow).toBe(6200);
      expect(result[0].outflow).toBe(4800);
    });
  });
});
