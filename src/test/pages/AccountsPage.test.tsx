import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountsPage from "@/pages/AccountsPage";

vi.mock("@/viewmodels/useAccountsViewModel", () => ({
  useAccountsViewModel: () => ({
    accountList: [
      { name: "Checking", balance: 5000, change: "+2.4%" },
      { name: "Savings", balance: 12000, change: "+1.1%" },
    ],
    activityList: [
      { desc: "Grocery Store", amount: -45.5, date: "Jan 15", direction: "negative" as const, formattedAmount: "-$45.50" },
      { desc: "Salary Deposit", amount: 3200, date: "Jan 14", direction: "positive" as const, formattedAmount: "+$3,200.00" },
    ],
  }),
}));

vi.mock("@/viewmodels/useRecordListViewModel", () => ({
  useRecordListViewModel: () => ({
    records: [
      { id: 1, name: "Grocery Store", category: "Food", date: "Jan 15", amount: -45.5, direction: "negative" as const, formattedAmount: "-$45.50", status: "Completed", statusVariant: "success" as const },
      { id: 2, name: "Salary Deposit", category: "Income", date: "Jan 14", amount: 3200, direction: "positive" as const, formattedAmount: "+$3,200.00", status: "Completed", statusVariant: "success" as const },
    ],
    totalCount: 2,
  }),
}));

describe("AccountsPage", () => {
  it("renders account cards with balances", () => {
    render(<AccountsPage />);

    expect(screen.getByText("Checking")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("+2.4%")).toBeInTheDocument();
  });

  it("renders activity list", () => {
    render(<AccountsPage />);

    expect(screen.getAllByText("Grocery Store").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Salary Deposit").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("-$45.50").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("+$3,200.00").length).toBeGreaterThanOrEqual(1);
  });

  it("renders action buttons", () => {
    render(<AccountsPage />);

    expect(screen.getByText("Add Money")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("renders Recent Activity section header", () => {
    render(<AccountsPage />);

    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
  });

  it("renders transaction records section", () => {
    render(<AccountsPage />);

    expect(screen.getByText("2 transactions")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
  });
});
