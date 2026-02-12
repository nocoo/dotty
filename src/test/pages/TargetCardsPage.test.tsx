import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TargetCardsPage from "@/pages/TargetCardsPage";

vi.mock("@/viewmodels/useTargetCardsViewModel", () => ({
  useTargetCardsViewModel: () => ({
    goals: [
      { name: "Emergency Fund", saved: 7500, target: 10000, icon: "shield", percent: 75, monthlyTarget: 417, onTrack: true },
      { name: "Vacation", saved: 1200, target: 5000, icon: "plane", percent: 24, monthlyTarget: 633, onTrack: false },
    ],
  }),
}));

describe("TargetCardsPage", () => {
  it("renders goal names", () => {
    render(<TargetCardsPage />);

    expect(screen.getByText("Emergency Fund")).toBeInTheDocument();
    expect(screen.getByText("Vacation")).toBeInTheDocument();
  });

  it("renders goal progress percentages", () => {
    render(<TargetCardsPage />);

    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("24%")).toBeInTheDocument();
  });

  it("renders saved/target amounts", () => {
    render(<TargetCardsPage />);

    expect(screen.getByText("$7,500 of $10,000")).toBeInTheDocument();
    expect(screen.getByText("$1,200 of $5,000")).toBeInTheDocument();
  });

  it("renders monthly target info", () => {
    render(<TargetCardsPage />);

    expect(screen.getByText("Monthly target: $417")).toBeInTheDocument();
    expect(screen.getByText("Monthly target: $633")).toBeInTheDocument();
  });

  it("shows On Track badge only for qualifying goals", () => {
    render(<TargetCardsPage />);

    expect(screen.getAllByText("On Track")).toHaveLength(1);
  });
});
