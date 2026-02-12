import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PortfolioPage from "@/pages/PortfolioPage";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/viewmodels/usePortfolioViewModel", () => ({
  usePortfolioViewModel: () => ({
    totalValue: 100000,
    holdings: [
      { name: "Stocks", value: 45000, allocation: 45, change: "+12.3%", up: true },
      { name: "Bonds", value: 30000, allocation: 30, change: "+2.1%", up: true },
      { name: "Crypto", value: 25000, allocation: 25, change: "-5.4%", up: false },
    ],
    performanceData: [{ month: "Jan", value: 95000 }],
  }),
}));

describe("PortfolioPage", () => {
  it("renders portfolio value card", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("Portfolio Value")).toBeInTheDocument();
    expect(screen.getByText("$100,000")).toBeInTheDocument();
  });

  it("renders summary cards", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("Today's Change")).toBeInTheDocument();
    expect(screen.getByText("Total Return")).toBeInTheDocument();
  });

  it("renders chart section headers", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("Portfolio Performance")).toBeInTheDocument();
    expect(screen.getByText("Asset Allocation")).toBeInTheDocument();
  });

  it("renders holdings table", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("Holdings")).toBeInTheDocument();
    // Each holding name appears twice: legend + holdings list
    expect(screen.getAllByText("Stocks")).toHaveLength(2);
    expect(screen.getAllByText("Bonds")).toHaveLength(2);
    expect(screen.getAllByText("Crypto")).toHaveLength(2);
  });

  it("renders holding values and changes", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("$45,000")).toBeInTheDocument();
    expect(screen.getByText("+12.3%")).toBeInTheDocument();
    expect(screen.getByText("-5.4%")).toBeInTheDocument();
  });

  it("renders allocation percentages in legend", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });
});
