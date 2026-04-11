import { describe, it, expect } from "vitest";
import {
  toastVariantLabel,
  ALL_TOAST_VARIANTS,
} from "@/models/interaction-showcase";
import type { ToastVariant } from "@/models/types";

describe("interaction-showcase model", () => {
  describe("toastVariantLabel", () => {
    it("returns correct label for each variant", () => {
      expect(toastVariantLabel("default")).toBe("Default");
      expect(toastVariantLabel("success")).toBe("Success");
      expect(toastVariantLabel("error")).toBe("Error");
      expect(toastVariantLabel("warning")).toBe("Warning");
      expect(toastVariantLabel("info")).toBe("Info");
    });

    it("returns labels for all variants in ALL_TOAST_VARIANTS", () => {
      for (const variant of ALL_TOAST_VARIANTS) {
        const label = toastVariantLabel(variant);
        expect(typeof label).toBe("string");
        expect(label.length).toBeGreaterThan(0);
      }
    });
  });

  describe("ALL_TOAST_VARIANTS", () => {
    it("contains all 5 toast variants", () => {
      expect(ALL_TOAST_VARIANTS).toHaveLength(5);
    });

    it("contains expected variants", () => {
      const expected: ToastVariant[] = [
        "default",
        "success",
        "error",
        "warning",
        "info",
      ];
      expect(ALL_TOAST_VARIANTS).toEqual(expected);
    });
  });
});
