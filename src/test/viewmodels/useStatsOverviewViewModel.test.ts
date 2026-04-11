import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStatsOverviewViewModel } from "@/viewmodels/useStatsOverviewViewModel";

describe("useStatsOverviewViewModel", () => {
  it("returns stats with changeColorClass", () => {
    const { result } = renderHook(() => useStatsOverviewViewModel());
    expect(result.current.stats.length).toBeGreaterThan(0);
    for (const stat of result.current.stats) {
      expect(stat).toHaveProperty("label");
      expect(stat).toHaveProperty("value");
      expect(stat).toHaveProperty("change");
      expect(stat).toHaveProperty("changeColorClass");
      expect(typeof stat.changeColorClass).toBe("string");
    }
  });

  it("assigns correct color classes based on change direction", () => {
    const { result } = renderHook(() => useStatsOverviewViewModel());
    for (const stat of result.current.stats) {
      if (stat.change.startsWith("+")) {
        expect(stat.changeColorClass).toBe("text-success");
      } else {
        expect(stat.changeColorClass).toBe("text-muted-foreground");
      }
    }
  });
});
