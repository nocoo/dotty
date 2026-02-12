import { describe, it, expect } from "vitest";
import {
  computeUtilization,
  deriveColorScheme,
  formatBalance,
} from "@/models/card-showcase";

describe("card-showcase model", () => {
  describe("computeUtilization", () => {
    it("computes correct utilization percentage", () => {
      expect(computeUtilization(3250, 10000)).toBe(33);
    });

    it("returns 0 when limit is 0", () => {
      expect(computeUtilization(100, 0)).toBe(0);
    });

    it("rounds to nearest integer", () => {
      expect(computeUtilization(1820, 5000)).toBe(36);
    });
  });

  describe("deriveColorScheme", () => {
    it("returns dark theme for amex", () => {
      const scheme = deriveColorScheme("amex");
      expect(scheme.textPrimary).toBe("text-amber-50");
      expect(scheme.chipHighContrast).toBe(true);
    });

    it("returns light theme for visa", () => {
      const scheme = deriveColorScheme("visa");
      expect(scheme.textPrimary).toBe("text-white");
      expect(scheme.chipHighContrast).toBe(false);
    });

    it("returns light theme for mastercard", () => {
      const scheme = deriveColorScheme("mastercard");
      expect(scheme.textPrimary).toBe("text-white");
      expect(scheme.chipHighContrast).toBe(false);
    });
  });

  describe("formatBalance", () => {
    it("formats visible balance with dollar sign", () => {
      expect(formatBalance(3250, true)).toBe("$3,250");
    });

    it("masks hidden balance", () => {
      expect(formatBalance(3250, false)).toBe("••••••");
    });
  });
});
