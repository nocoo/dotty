import { describe, it, expect } from "vitest";
import {
  computeUtilization,
  deriveColorScheme,
  formatBalance,
} from "@/models/card-showcase";

describe("card-showcase model", () => {
  describe("computeUtilization", () => {
    it("computes correct percentage", () => {
      expect(computeUtilization(3250, 10000)).toBe(33);
      expect(computeUtilization(5000, 10000)).toBe(50);
      expect(computeUtilization(10000, 10000)).toBe(100);
    });

    it("returns 0 when limit is 0", () => {
      expect(computeUtilization(100, 0)).toBe(0);
    });

    it("returns 0 when balance is 0", () => {
      expect(computeUtilization(0, 10000)).toBe(0);
    });

    it("rounds to nearest integer", () => {
      expect(computeUtilization(333, 1000)).toBe(33);
      expect(computeUtilization(336, 1000)).toBe(34);
    });
  });

  describe("deriveColorScheme", () => {
    it("returns high contrast for amex", () => {
      const scheme = deriveColorScheme("amex");
      expect(scheme.chipHighContrast).toBe(true);
      expect(scheme.textSecondary).toBe("text-foreground/80");
    });

    it("returns low contrast for visa", () => {
      const scheme = deriveColorScheme("visa");
      expect(scheme.chipHighContrast).toBe(false);
      expect(scheme.textSecondary).toBe("text-foreground/70");
    });

    it("returns low contrast for mastercard", () => {
      const scheme = deriveColorScheme("mastercard");
      expect(scheme.chipHighContrast).toBe(false);
      expect(scheme.textSecondary).toBe("text-foreground/70");
    });

    it("includes common properties for all networks", () => {
      for (const network of ["visa", "mastercard", "amex"] as const) {
        const scheme = deriveColorScheme(network);
        expect(scheme.textMuted).toBe("text-muted-foreground");
        expect(scheme.textPrimary).toBe("text-foreground");
        expect(scheme.overlayOpacity.large).toBe("bg-foreground/[0.04]");
        expect(scheme.overlayOpacity.small).toBe("bg-foreground/[0.02]");
      }
    });
  });

  describe("formatBalance", () => {
    it("shows formatted balance when visible", () => {
      expect(formatBalance(3250, true)).toBe("$3,250");
      expect(formatBalance(1000000, true)).toBe("$1,000,000");
    });

    it("shows masked balance when not visible", () => {
      expect(formatBalance(3250, false)).toBe("\u2022\u2022\u2022\u2022\u2022\u2022");
    });

    it("handles zero balance", () => {
      expect(formatBalance(0, true)).toBe("$0");
    });
  });
});
