import { describe, it, expect } from "vitest";
import {
  filterToastsByVariant,
  filterDialogsByStyle,
  toastVariantLabel,
  ALL_TOAST_VARIANTS,
} from "@/models/interaction-showcase";
import type { ShowcaseToast, ShowcaseDialog } from "@/models/types";

const sampleToasts: ShowcaseToast[] = [
  { id: "t1", title: "Saved", description: "Changes saved", variant: "success" },
  { id: "t2", title: "Error", description: "Something failed", variant: "error" },
  { id: "t3", title: "Note", description: "Just a note", variant: "default" },
  { id: "t4", title: "Info", description: "FYI", variant: "info" },
  { id: "t5", title: "Warn", description: "Be careful", variant: "warning" },
];

const sampleDialogs: ShowcaseDialog[] = [
  { id: "d1", title: "About", description: "About this app", style: "info" },
  { id: "d2", title: "Feedback", description: "Send feedback", style: "form" },
  { id: "d3", title: "Delete", description: "Are you sure?", style: "confirm" },
];

describe("filterToastsByVariant", () => {
  it("returns only toasts matching the given variant", () => {
    const result = filterToastsByVariant(sampleToasts, "success");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("t1");
  });

  it("returns empty array when no match", () => {
    const onlyDefault: ShowcaseToast[] = [sampleToasts[2]];
    expect(filterToastsByVariant(onlyDefault, "error")).toHaveLength(0);
  });

  it("returns all items if all match", () => {
    const allSuccess = sampleToasts.map((t) => ({ ...t, variant: "success" as const }));
    expect(filterToastsByVariant(allSuccess, "success")).toHaveLength(5);
  });
});

describe("filterDialogsByStyle", () => {
  it("returns only dialogs matching the given style", () => {
    const result = filterDialogsByStyle(sampleDialogs, "confirm");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("d3");
  });

  it("returns empty array when no match", () => {
    const infoOnly = [sampleDialogs[0]];
    expect(filterDialogsByStyle(infoOnly, "form")).toHaveLength(0);
  });
});

describe("toastVariantLabel", () => {
  it("returns human-readable label for each variant", () => {
    expect(toastVariantLabel("default")).toBe("Default");
    expect(toastVariantLabel("success")).toBe("Success");
    expect(toastVariantLabel("error")).toBe("Error");
    expect(toastVariantLabel("warning")).toBe("Warning");
    expect(toastVariantLabel("info")).toBe("Info");
  });
});

describe("ALL_TOAST_VARIANTS", () => {
  it("contains exactly 5 variants", () => {
    expect(ALL_TOAST_VARIANTS).toHaveLength(5);
  });

  it("includes all expected variants", () => {
    expect(ALL_TOAST_VARIANTS).toContain("default");
    expect(ALL_TOAST_VARIANTS).toContain("success");
    expect(ALL_TOAST_VARIANTS).toContain("error");
    expect(ALL_TOAST_VARIANTS).toContain("warning");
    expect(ALL_TOAST_VARIANTS).toContain("info");
  });
});
