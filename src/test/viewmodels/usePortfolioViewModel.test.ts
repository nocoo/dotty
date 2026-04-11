import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePortfolioViewModel } from "@/viewmodels/usePortfolioViewModel";

describe("usePortfolioViewModel", () => {
  it("returns totalValue as sum of holdings", () => {
    const { result } = renderHook(() => usePortfolioViewModel());
    const calculatedTotal = result.current.holdings.reduce(
      (sum, item) => sum + item.value,
      0
    );
    expect(result.current.totalValue).toBe(calculatedTotal);
  });

  it("returns non-empty holdings array", () => {
    const { result } = renderHook(() => usePortfolioViewModel());
    expect(result.current.holdings.length).toBeGreaterThan(0);
    for (const item of result.current.holdings) {
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("value");
      expect(item).toHaveProperty("allocation");
    }
  });

  it("returns performanceData array", () => {
    const { result } = renderHook(() => usePortfolioViewModel());
    expect(result.current.performanceData.length).toBeGreaterThan(0);
    for (const item of result.current.performanceData) {
      expect(item).toHaveProperty("month");
      expect(item).toHaveProperty("value");
    }
  });
});
