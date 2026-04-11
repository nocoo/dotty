import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTargetCardsViewModel } from "@/viewmodels/useTargetCardsViewModel";

describe("useTargetCardsViewModel", () => {
  it("returns enriched goals with computed properties", () => {
    const { result } = renderHook(() => useTargetCardsViewModel());
    expect(result.current.goals.length).toBeGreaterThan(0);
    for (const goal of result.current.goals) {
      expect(goal).toHaveProperty("percent");
      expect(goal).toHaveProperty("monthlyTarget");
      expect(goal).toHaveProperty("onTrack");
      expect(typeof goal.percent).toBe("number");
      expect(typeof goal.monthlyTarget).toBe("number");
      expect(typeof goal.onTrack).toBe("boolean");
    }
  });

  it("preserves original goal properties", () => {
    const { result } = renderHook(() => useTargetCardsViewModel());
    for (const goal of result.current.goals) {
      expect(goal).toHaveProperty("name");
      expect(goal).toHaveProperty("target");
      expect(goal).toHaveProperty("saved");
      expect(goal).toHaveProperty("icon");
    }
  });

  it("computes percent correctly", () => {
    const { result } = renderHook(() => useTargetCardsViewModel());
    for (const goal of result.current.goals) {
      const expected = Math.round((goal.saved / goal.target) * 100);
      expect(goal.percent).toBe(expected);
    }
  });
});
