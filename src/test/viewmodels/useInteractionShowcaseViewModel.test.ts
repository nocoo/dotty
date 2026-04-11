import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInteractionShowcaseViewModel } from "@/viewmodels/useInteractionShowcaseViewModel";

describe("useInteractionShowcaseViewModel", () => {
  it("returns toasts with variantLabel", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    expect(result.current.toasts.length).toBeGreaterThan(0);
    for (const toast of result.current.toasts) {
      expect(toast).toHaveProperty("variantLabel");
      expect(typeof toast.variantLabel).toBe("string");
    }
  });

  it("returns dialogs array", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    expect(result.current.dialogs.length).toBeGreaterThan(0);
    for (const dialog of result.current.dialogs) {
      expect(dialog).toHaveProperty("id");
      expect(dialog).toHaveProperty("title");
      expect(dialog).toHaveProperty("style");
    }
  });

  it("returns toastVariants array", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    expect(result.current.toastVariants.length).toBe(5);
  });

  it("returns variantLabels with variant and label", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    expect(result.current.variantLabels.length).toBe(5);
    for (const item of result.current.variantLabels) {
      expect(item).toHaveProperty("variant");
      expect(item).toHaveProperty("label");
    }
  });

  it("opens and closes dialog", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    expect(result.current.activeDialog).toBeNull();

    act(() => {
      result.current.openDialog("d1");
    });
    expect(result.current.activeDialog).toBe("d1");

    act(() => {
      result.current.closeDialog();
    });
    expect(result.current.activeDialog).toBeNull();
  });

  it("getDialogById returns correct dialog", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    const dialog = result.current.getDialogById("d1");
    expect(dialog).toBeDefined();
    expect(dialog?.id).toBe("d1");
  });

  it("getDialogById returns undefined for non-existent id", () => {
    const { result } = renderHook(() => useInteractionShowcaseViewModel());
    const dialog = result.current.getDialogById("non-existent");
    expect(dialog).toBeUndefined();
  });
});
