import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RecordListPage from "@/pages/RecordListPage";

vi.mock("@/viewmodels/useRecordListViewModel", () => ({
  useRecordListViewModel: () => ({
    records: [
      { id: 1, name: "Netflix", category: "Entertainment", date: "Jan 15", amount: -15.99, direction: "negative" as const, formattedAmount: "-$15.99", status: "Completed", statusVariant: "success" as const },
      { id: 2, name: "Freelance Payment", category: "Income", date: "Jan 14", amount: 2500, direction: "positive" as const, formattedAmount: "+$2,500.00", status: "Pending", statusVariant: "warning" as const },
    ],
    totalCount: 2,
  }),
}));

describe("RecordListPage", () => {
  it("renders transaction count", () => {
    render(<RecordListPage />);

    expect(screen.getByText("2 transactions")).toBeInTheDocument();
  });

  it("renders filter button", () => {
    render(<RecordListPage />);

    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("renders transaction names in desktop table", () => {
    render(<RecordListPage />);

    // Each transaction name appears twice (desktop + mobile)
    expect(screen.getAllByText("Netflix").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Freelance Payment").length).toBeGreaterThanOrEqual(1);
  });

  it("renders table column headers", () => {
    render(<RecordListPage />);

    expect(screen.getByText("Transaction")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
