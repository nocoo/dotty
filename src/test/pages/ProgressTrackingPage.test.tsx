import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressTrackingPage from "@/pages/ProgressTrackingPage";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

vi.mock("@/viewmodels/useProgressTrackingViewModel", () => ({
  useProgressTrackingViewModel: () => ({
    summary: { totalLimit: 5000, totalSpent: 3200, remaining: 1800 },
    categories: [
      { category: "Food & Dining", spent: 800, limit: 1000, progress: 80, color: "#3b82f6" },
      { category: "Transport", spent: 200, limit: 500, progress: 40, color: "#10b981" },
    ],
    comparisonData: [
      { month: "Jan", budget: 5000, actual: 4200 },
      { month: "Feb", budget: 5000, actual: 3800 },
    ],
  }),
}));

describe("ProgressTrackingPage", () => {
  it("renders budget summary cards", () => {
    render(<ProgressTrackingPage />);

    expect(screen.getByText("Total Budget")).toBeInTheDocument();
    expect(screen.getByText("Spent So Far")).toBeInTheDocument();
    expect(screen.getByText("Remaining")).toBeInTheDocument();
  });

  it("renders summary amounts", () => {
    render(<ProgressTrackingPage />);

    expect(screen.getByText("$5,000")).toBeInTheDocument();
    expect(screen.getByText("$3,200")).toBeInTheDocument();
    expect(screen.getByText("$1,800")).toBeInTheDocument();
  });

  it("renders Category Budgets section", () => {
    render(<ProgressTrackingPage />);

    expect(screen.getByText("Category Budgets")).toBeInTheDocument();
    expect(screen.getByText("Food & Dining")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
  });

  it("renders spent/limit for each category", () => {
    render(<ProgressTrackingPage />);

    expect(screen.getByText("$800 / $1000")).toBeInTheDocument();
    expect(screen.getByText("$200 / $500")).toBeInTheDocument();
  });

  it("renders Budget vs Actual chart section", () => {
    render(<ProgressTrackingPage />);

    expect(screen.getByText("Budget vs Actual")).toBeInTheDocument();
  });
});
