import { describe, it, expect } from "vitest";
import { classifyDirection, formatSignedAmount } from "@/models/amount";

describe("amount model", () => {
  describe("classifyDirection", () => {
    it("returns positive for positive amounts", () => {
      expect(classifyDirection(100)).toBe("positive");
      expect(classifyDirection(0.01)).toBe("positive");
    });

    it("returns negative for zero and negative amounts", () => {
      expect(classifyDirection(0)).toBe("negative");
      expect(classifyDirection(-100)).toBe("negative");
      expect(classifyDirection(-0.01)).toBe("negative");
    });
  });

  describe("formatSignedAmount", () => {
    it("formats positive amounts with + prefix", () => {
      expect(formatSignedAmount(100)).toBe("+$100.00");
      expect(formatSignedAmount(45.99)).toBe("+$45.99");
    });

    it("formats negative amounts without + prefix", () => {
      expect(formatSignedAmount(-100)).toBe("$100.00");
      expect(formatSignedAmount(-45.99)).toBe("$45.99");
    });

    it("formats zero without + prefix", () => {
      expect(formatSignedAmount(0)).toBe("$0.00");
    });

    it("formats to two decimal places", () => {
      expect(formatSignedAmount(100.999)).toBe("+$101.00");
      expect(formatSignedAmount(100.001)).toBe("+$100.00");
    });
  });
});
