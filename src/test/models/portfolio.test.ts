import { describe, it, expect } from "vitest";
import { computePortfolioTotal } from "@/models/portfolio";
import type { PortfolioItem } from "@/models/types";

describe("portfolio model", () => {
  describe("computePortfolioTotal", () => {
    it("sums all portfolio item values", () => {
      const items: PortfolioItem[] = [
        { name: "Stocks", value: 45000, allocation: 45, change: "+12.4%", up: true },
        { name: "Bonds", value: 20000, allocation: 20, change: "+3.2%", up: true },
        { name: "Real Estate", value: 15000, allocation: 15, change: "+7.8%", up: true },
      ];
      expect(computePortfolioTotal(items)).toBe(80000);
    });

    it("handles empty array", () => {
      expect(computePortfolioTotal([])).toBe(0);
    });

    it("handles single item", () => {
      const items: PortfolioItem[] = [
        { name: "Cash", value: 10000, allocation: 100, change: "+0.5%", up: true },
      ];
      expect(computePortfolioTotal(items)).toBe(10000);
    });

    it("handles decimal values", () => {
      const items: PortfolioItem[] = [
        { name: "A", value: 100.5, allocation: 50, change: "+1%", up: true },
        { name: "B", value: 200.5, allocation: 50, change: "+2%", up: true },
      ];
      expect(computePortfolioTotal(items)).toBe(301);
    });
  });
});
