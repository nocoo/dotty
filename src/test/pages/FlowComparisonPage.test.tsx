import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FlowComparisonPage from "@/pages/FlowComparisonPage";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Area: () => null,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

vi.mock("@/viewmodels/useFlowComparisonViewModel", () => ({
  useFlowComparisonViewModel: () => ({
    summary: { totalInflow: 15000, totalOutflow: 11000, netFlow: 4000 },
    flowData: [{ month: "Jan", inflow: 5000, outflow: 3500 }],
    netFlowData: [{ month: "Jan", net: 1500 }],
  }),
}));

describe("FlowComparisonPage", () => {
  it("renders flow summary cards", () => {
    render(<FlowComparisonPage />);

    expect(screen.getByText("Total Inflow")).toBeInTheDocument();
    expect(screen.getByText("Total Outflow")).toBeInTheDocument();
    expect(screen.getByText("Net Cash Flow")).toBeInTheDocument();
  });

  it("renders summary amounts", () => {
    render(<FlowComparisonPage />);

    expect(screen.getByText("$15,000")).toBeInTheDocument();
    expect(screen.getByText("$11,000")).toBeInTheDocument();
    expect(screen.getByText("$4,000")).toBeInTheDocument();
  });

  it("renders chart section headers", () => {
    render(<FlowComparisonPage />);

    expect(screen.getByText("Cash Flow Over Time")).toBeInTheDocument();
    expect(screen.getByText("Net Cash Flow by Month")).toBeInTheDocument();
  });
});
