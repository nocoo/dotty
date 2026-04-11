import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("handles conditional classes with false", () => {
      const condition = false;
      expect(cn("foo", condition && "bar", "baz")).toBe("foo baz");
    });

    it("handles conditional classes with true", () => {
      const condition = true;
      expect(cn("foo", condition && "bar", "baz")).toBe("foo bar baz");
    });

    it("handles undefined and null", () => {
      expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
    });

    it("merges tailwind classes correctly", () => {
      expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("handles arrays", () => {
      expect(cn(["foo", "bar"])).toBe("foo bar");
    });

    it("handles objects", () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
    });

    it("handles empty input", () => {
      expect(cn()).toBe("");
      expect(cn("")).toBe("");
    });
  });
});
