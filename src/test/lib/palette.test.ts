import { describe, it, expect } from "vitest";
import {
  chart,
  CHART_COLORS,
  CHART_TOKENS,
  chartAxis,
  chartPositive,
  chartNegative,
  chartPrimary,
  withAlpha,
} from "@/lib/palette";

describe("palette", () => {
  describe("withAlpha", () => {
    it("returns CSS color string with alpha", () => {
      expect(withAlpha("chart-1", 0.12)).toBe("hsl(var(--chart-1) / 0.12)");
      expect(withAlpha("primary", 0.5)).toBe("hsl(var(--primary) / 0.5)");
    });

    it("handles 0 and 1 alpha values", () => {
      expect(withAlpha("chart-1", 0)).toBe("hsl(var(--chart-1) / 0)");
      expect(withAlpha("chart-1", 1)).toBe("hsl(var(--chart-1) / 1)");
    });
  });

  describe("chart object", () => {
    it("contains all 24 color keys", () => {
      const keys = Object.keys(chart);
      expect(keys.length).toBe(24);
    });

    it("values are CSS variable references", () => {
      expect(chart.primary).toBe("hsl(var(--chart-1))");
      expect(chart.sky).toBe("hsl(var(--chart-2))");
    });
  });

  describe("CHART_COLORS", () => {
    it("contains 24 colors", () => {
      expect(CHART_COLORS.length).toBe(24);
    });

    it("matches chart object values in order", () => {
      const chartValues = Object.values(chart);
      expect(CHART_COLORS).toEqual(chartValues);
    });
  });

  describe("CHART_TOKENS", () => {
    it("contains 24 token names", () => {
      expect(CHART_TOKENS.length).toBe(24);
    });

    it("follows chart-N pattern", () => {
      expect(CHART_TOKENS[0]).toBe("chart-1");
      expect(CHART_TOKENS[23]).toBe("chart-24");
    });
  });

  describe("semantic aliases", () => {
    it("chartAxis is defined", () => {
      expect(chartAxis).toBe("hsl(var(--chart-axis))");
    });

    it("chartPositive uses green", () => {
      expect(chartPositive).toBe(chart.green);
    });

    it("chartNegative uses destructive", () => {
      expect(chartNegative).toBe("hsl(var(--destructive))");
    });

    it("chartPrimary uses primary chart color", () => {
      expect(chartPrimary).toBe(chart.primary);
    });
  });
});
