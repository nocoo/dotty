import { describe, it, expect } from "vitest";
import {
  classifyChange,
  changeToColorClass,
} from "@/models/stats-overview";

describe("stats-overview model", () => {
  describe("classifyChange", () => {
    it("returns positive for + prefix", () => {
      expect(classifyChange("+3.2%")).toBe("positive");
    });

    it("returns negative for - prefix", () => {
      expect(classifyChange("-1.5%")).toBe("negative");
    });

    it("returns neutral for no prefix", () => {
      expect(classifyChange("35%")).toBe("neutral");
    });
  });

  describe("changeToColorClass", () => {
    it("returns text-success for positive", () => {
      expect(changeToColorClass("positive")).toBe("text-success");
    });

    it("returns text-destructive for negative", () => {
      expect(changeToColorClass("negative")).toBe("text-destructive");
    });

    it("returns text-muted-foreground for neutral", () => {
      expect(changeToColorClass("neutral")).toBe("text-muted-foreground");
    });
  });
});
