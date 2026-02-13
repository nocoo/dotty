import { describe, it, expect } from "vitest";
import { classifyDirection, formatSignedAmount } from "@/models/amount";

describe("amount utilities", () => {
  describe("classifyDirection", () => {
    it("returns positive for positive amount", () => {
      expect(classifyDirection(250)).toBe("positive");
    });

    it("returns negative for negative amount", () => {
      expect(classifyDirection(-100)).toBe("negative");
    });

    it("returns negative for zero", () => {
      expect(classifyDirection(0)).toBe("negative");
    });
  });

  describe("formatSignedAmount", () => {
    it("formats positive amount with + prefix", () => {
      expect(formatSignedAmount(250)).toBe("+$250.00");
    });

    it("formats negative amount without sign prefix", () => {
      expect(formatSignedAmount(-100.5)).toBe("$100.50");
    });

    it("formats zero", () => {
      expect(formatSignedAmount(0)).toBe("$0.00");
    });
  });
});
