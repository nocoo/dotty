import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StatsOverviewPage from "@/pages/StatsOverviewPage";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Cell: () => null,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Area: () => null,
}));

vi.mock("@/viewmodels/useStatsOverviewViewModel", () => ({
  useStatsOverviewViewModel: () => ({
    stats: [
      { label: "Total Income", value: "$12,500", change: "+8.2%", changeColorClass: "text-success" },
      { label: "Total Expenses", value: "$8,300", change: "-3.1%", changeColorClass: "text-destructive" },
      { label: "Net Savings", value: "$4,200", change: "+15.4%", changeColorClass: "text-success" },
      { label: "Investments", value: "$25,000", change: "+5.8%", changeColorClass: "text-success" },
    ],
    weeklyData: [{ day: "Mon", income: 500, expense: 300 }],
    categoryData: [
      { name: "Housing", value: 35 },
      { name: "Food", value: 25 },
      { name: "Transport", value: 15 },
    ],
    trendData: [{ day: "1", value: 10000 }],
  }),
}));

describe("StatsOverviewPage", () => {
  it("renders stat cards", () => {
    render(<StatsOverviewPage />);

    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Total Expenses")).toBeInTheDocument();
    expect(screen.getByText("Net Savings")).toBeInTheDocument();
    expect(screen.getByText("Investments")).toBeInTheDocument();
  });

  it("renders stat values", () => {
    render(<StatsOverviewPage />);

    expect(screen.getByText("$12,500")).toBeInTheDocument();
    expect(screen.getByText("$8,300")).toBeInTheDocument();
    expect(screen.getByText("$4,200")).toBeInTheDocument();
    expect(screen.getByText("$25,000")).toBeInTheDocument();
  });

  it("renders change percentages", () => {
    render(<StatsOverviewPage />);

    expect(screen.getByText("+8.2%")).toBeInTheDocument();
    expect(screen.getByText("-3.1%")).toBeInTheDocument();
  });

  it("renders chart section headers", () => {
    render(<StatsOverviewPage />);

    expect(screen.getByText("Income vs Expenses")).toBeInTheDocument();
    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
    expect(screen.getByText("30-Day Balance Trend")).toBeInTheDocument();
  });

  it("renders category data in legend", () => {
    render(<StatsOverviewPage />);

    expect(screen.getByText("Housing")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
  });
});
