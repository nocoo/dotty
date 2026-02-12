import { describe, it, expect } from "vitest";
import { computePortfolioTotal } from "@/models/portfolio";
import type { PortfolioItem } from "@/models/types";

describe("portfolio model", () => {
  describe("computePortfolioTotal", () => {
    const items: PortfolioItem[] = [
      { name: "Stocks", value: 45000, allocation: 45, change: "+12.4%", up: true },
      { name: "Bonds", value: 20000, allocation: 20, change: "+3.2%", up: true },
      { name: "Crypto", value: 10000, allocation: 10, change: "-5.1%", up: false },
    ];

    it("sums all portfolio values", () => {
      expect(computePortfolioTotal(items)).toBe(75000);
    });

    it("returns 0 for empty array", () => {
      expect(computePortfolioTotal([])).toBe(0);
    });
  });
});
