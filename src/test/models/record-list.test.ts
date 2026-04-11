import { describe, it, expect } from "vitest";
import { classifyStatus } from "@/models/record-list";

describe("record-list model", () => {
  describe("classifyStatus", () => {
    it("returns success for Completed status", () => {
      expect(classifyStatus("Completed")).toBe("success");
    });

    it("returns warning for Pending status", () => {
      expect(classifyStatus("Pending")).toBe("warning");
    });
  });
});
