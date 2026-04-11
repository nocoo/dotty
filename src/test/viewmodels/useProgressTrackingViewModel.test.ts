import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProgressTrackingViewModel } from "@/viewmodels/useProgressTrackingViewModel";

describe("useProgressTrackingViewModel", () => {
  it("returns summary with totalSpent, totalLimit, and remaining", () => {
    const { result } = renderHook(() => useProgressTrackingViewModel());
    const { summary } = result.current;
    expect(summary).toHaveProperty("totalSpent");
    expect(summary).toHaveProperty("totalLimit");
    expect(summary).toHaveProperty("remaining");
    expect(summary.remaining).toBe(summary.totalLimit - summary.totalSpent);
  });

  it("returns categories with progress and color", () => {
    const { result } = renderHook(() => useProgressTrackingViewModel());
    expect(result.current.categories.length).toBeGreaterThan(0);
    for (const cat of result.current.categories) {
      expect(cat).toHaveProperty("category");
      expect(cat).toHaveProperty("spent");
      expect(cat).toHaveProperty("limit");
      expect(cat).toHaveProperty("progress");
      expect(cat).toHaveProperty("color");
      expect(typeof cat.progress).toBe("number");
    }
  });

  it("returns comparisonData array", () => {
    const { result } = renderHook(() => useProgressTrackingViewModel());
    expect(result.current.comparisonData.length).toBeGreaterThan(0);
    for (const item of result.current.comparisonData) {
      expect(item).toHaveProperty("month");
      expect(item).toHaveProperty("budget");
      expect(item).toHaveProperty("actual");
    }
  });
});
