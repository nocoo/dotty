import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CardShowcasePage from "@/pages/CardShowcasePage";

const mockFormatBalance = vi.fn((balance: number) => `$${balance.toLocaleString()}`);

vi.mock("@/viewmodels/useCardShowcaseViewModel", () => ({
  useCardShowcaseViewModel: (showBalance: boolean) => ({
    cards: [
      {
        name: "Platinum",
        bank: "Chase",
        number: "**** **** **** 4242",
        expiry: "12/28",
        balance: 3500,
        limit: 10000,
        network: "visa" as const,
        color: "from-gray-800 to-gray-900",
        colorScheme: {
          textPrimary: "text-white",
          textSecondary: "text-gray-300",
          textMuted: "text-gray-400",
          chipHighContrast: true,
          overlayOpacity: { large: "bg-white/5", small: "bg-white/5" },
        },
        utilization: 35,
      },
    ],
    cardCount: 1,
    formatBalance: showBalance
      ? (balance: number) => `$${balance.toLocaleString()}`
      : () => "****",
  }),
}));

describe("CardShowcasePage", () => {
  it("renders card count", () => {
    render(<CardShowcasePage />);

    expect(screen.getByText("1 cards active")).toBeInTheDocument();
  });

  it("renders card bank and name", () => {
    render(<CardShowcasePage />);

    expect(screen.getByText("Chase")).toBeInTheDocument();
    // "Platinum" appears in card and usage bar
    expect(screen.getAllByText(/Platinum/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders hide/show balance toggle", () => {
    render(<CardShowcasePage />);

    expect(screen.getByText("Hide balances")).toBeInTheDocument();
  });

  it("toggles balance visibility on button click", () => {
    render(<CardShowcasePage />);

    const toggle = screen.getByText("Hide balances");
    fireEvent.click(toggle);

    expect(screen.getByText("Show balances")).toBeInTheDocument();
  });

  it("renders Card Security section", () => {
    render(<CardShowcasePage />);

    expect(screen.getByText("Card Security")).toBeInTheDocument();
    expect(screen.getByText("Online Payments")).toBeInTheDocument();
    expect(screen.getByText("Contactless")).toBeInTheDocument();
    expect(screen.getByText("ATM Withdrawal")).toBeInTheDocument();
  });

  it("renders VISA network logo", () => {
    render(<CardShowcasePage />);

    expect(screen.getByText("VISA")).toBeInTheDocument();
  });

  it("renders utilization bar with percentage", () => {
    render(<CardShowcasePage />);

    expect(screen.getByText("35%")).toBeInTheDocument();
  });
});
