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

describe("AccountsPage", () => {
  it("renders account cards with balances", () => {
    render(<AccountsPage />);

    expect(screen.getByText("Checking")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("+2.4%")).toBeInTheDocument();
  });

  it("renders activity list", () => {
    render(<AccountsPage />);

    expect(screen.getByText("Grocery Store")).toBeInTheDocument();
    expect(screen.getByText("Salary Deposit")).toBeInTheDocument();
    expect(screen.getByText("-$45.50")).toBeInTheDocument();
    expect(screen.getByText("+$3,200.00")).toBeInTheDocument();
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
});
