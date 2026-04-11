import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCardShowcaseViewModel } from "@/viewmodels/useCardShowcaseViewModel";

describe("useCardShowcaseViewModel", () => {
  it("returns non-empty cards list with derived properties", () => {
    const { result } = renderHook(() => useCardShowcaseViewModel(true));
    expect(result.current.cards.length).toBeGreaterThan(0);
    for (const card of result.current.cards) {
      expect(card).toHaveProperty("colorScheme");
      expect(card).toHaveProperty("utilization");
      expect(typeof card.utilization).toBe("number");
    }
  });

  it("returns correct card count", () => {
    const { result } = renderHook(() => useCardShowcaseViewModel(true));
    expect(result.current.cardCount).toBe(result.current.cards.length);
  });

  it("formatBalance shows value when showBalance is true", () => {
    const { result } = renderHook(() => useCardShowcaseViewModel(true));
    const formatted = result.current.formatBalance(3250);
    expect(formatted).toBe("$3,250");
  });

  it("formatBalance masks value when showBalance is false", () => {
    const { result } = renderHook(() => useCardShowcaseViewModel(false));
    const formatted = result.current.formatBalance(3250);
    expect(formatted).toBe("\u2022\u2022\u2022\u2022\u2022\u2022");
  });

  it("formatBalance updates when showBalance changes", () => {
    const { result, rerender } = renderHook(
      ({ show }) => useCardShowcaseViewModel(show),
      { initialProps: { show: true } }
    );
    expect(result.current.formatBalance(1000)).toBe("$1,000");

    rerender({ show: false });
    expect(result.current.formatBalance(1000)).toBe("\u2022\u2022\u2022\u2022\u2022\u2022");
  });
});
