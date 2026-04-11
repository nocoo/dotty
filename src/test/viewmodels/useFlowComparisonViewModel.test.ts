import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFlowComparisonViewModel } from "@/viewmodels/useFlowComparisonViewModel";

describe("useFlowComparisonViewModel", () => {
  it("returns summary with totalInflow, totalOutflow, and netFlow", () => {
    const { result } = renderHook(() => useFlowComparisonViewModel());
    const { summary } = result.current;
    expect(summary).toHaveProperty("totalInflow");
    expect(summary).toHaveProperty("totalOutflow");
    expect(summary).toHaveProperty("netFlow");
    expect(summary.netFlow).toBe(summary.totalInflow - summary.totalOutflow);
  });

  it("returns flowData array", () => {
    const { result } = renderHook(() => useFlowComparisonViewModel());
    expect(result.current.flowData.length).toBeGreaterThan(0);
    for (const entry of result.current.flowData) {
      expect(entry).toHaveProperty("month");
      expect(entry).toHaveProperty("inflow");
      expect(entry).toHaveProperty("outflow");
    }
  });

  it("returns netFlowData with net property", () => {
    const { result } = renderHook(() => useFlowComparisonViewModel());
    expect(result.current.netFlowData.length).toBeGreaterThan(0);
    for (const entry of result.current.netFlowData) {
      expect(entry).toHaveProperty("net");
      expect(entry.net).toBe(entry.inflow - entry.outflow);
    }
  });
});
