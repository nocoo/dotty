import { describe, it, expect } from "vitest";
import {
  classifyChange,
  changeToColorClass,
} from "@/models/stats-overview";

describe("stats-overview model", () => {
  describe("classifyChange", () => {
    it("returns positive for + prefixed strings", () => {
      expect(classifyChange("+2.4%")).toBe("positive");
      expect(classifyChange("+100")).toBe("positive");
    });

    it("returns negative for - prefixed strings", () => {
      expect(classifyChange("-3.2%")).toBe("negative");
      expect(classifyChange("-50")).toBe("negative");
    });

    it("returns neutral for unprefixed strings", () => {
      expect(classifyChange("35%")).toBe("neutral");
      expect(classifyChange("100")).toBe("neutral");
      expect(classifyChange("Food")).toBe("neutral");
    });
  });

  describe("changeToColorClass", () => {
    it("returns text-success for positive", () => {
      expect(changeToColorClass("positive")).toBe("text-success");
    });

    it("returns text-muted-foreground for negative", () => {
      expect(changeToColorClass("negative")).toBe("text-muted-foreground");
    });

    it("returns text-muted-foreground for neutral", () => {
      expect(changeToColorClass("neutral")).toBe("text-muted-foreground");
    });
  });
});
