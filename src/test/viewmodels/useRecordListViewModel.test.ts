import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRecordListViewModel } from "@/viewmodels/useRecordListViewModel";

describe("useRecordListViewModel", () => {
  it("returns records with derived properties", () => {
    const { result } = renderHook(() => useRecordListViewModel());
    expect(result.current.records.length).toBeGreaterThan(0);
    for (const record of result.current.records) {
      expect(record).toHaveProperty("direction");
      expect(record).toHaveProperty("formattedAmount");
      expect(record).toHaveProperty("statusVariant");
      expect(["positive", "negative"]).toContain(record.direction);
      expect(["success", "warning"]).toContain(record.statusVariant);
    }
  });

  it("returns correct totalCount", () => {
    const { result } = renderHook(() => useRecordListViewModel());
    expect(result.current.totalCount).toBe(result.current.records.length);
  });

  it("formats amounts correctly", () => {
    const { result } = renderHook(() => useRecordListViewModel());
    for (const record of result.current.records) {
      expect(record.formattedAmount).toMatch(/^\+?\$[\d,.]+$/);
    }
  });
});
