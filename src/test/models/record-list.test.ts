import { describe, it, expect } from "vitest";
import {
  classifyDirection,
  formatSignedAmount,
  classifyStatus,
} from "@/models/record-list";

describe("record-list model", () => {
  describe("classifyDirection", () => {
    it("returns positive for income", () => {
      expect(classifyDirection(5200)).toBe("positive");
    });

    it("returns negative for expense", () => {
      expect(classifyDirection(-15.99)).toBe("negative");
    });
  });

  describe("formatSignedAmount", () => {
    it("formats positive with + prefix", () => {
      expect(formatSignedAmount(1200)).toBe("+$1200.00");
    });

    it("formats negative without sign prefix", () => {
      expect(formatSignedAmount(-82.4)).toBe("$82.40");
    });
  });

  describe("classifyStatus", () => {
    it("returns success for Completed", () => {
      expect(classifyStatus("Completed")).toBe("success");
    });

    it("returns warning for Pending", () => {
      expect(classifyStatus("Pending")).toBe("warning");
    });
  });
});
