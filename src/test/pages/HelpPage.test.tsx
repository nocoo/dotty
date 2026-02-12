import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HelpPage from "@/pages/HelpPage";

vi.mock("@/viewmodels/useHelpViewModel", () => ({
  useHelpViewModel: () => ({
    resources: [
      { icon: "book", title: "Getting Started Guide", desc: "Learn the basics of managing your finances" },
      { icon: "message-circle", title: "Contact Support", desc: "Chat with our team for help" },
      { icon: "file-text", title: "API Documentation", desc: "Integrate with third-party services" },
    ],
    filteredFAQs: [
      { q: "How do I reset my password?", a: "Go to Settings > Security > Reset Password" },
      { q: "How do I add a new account?", a: "Navigate to Accounts and click Add Money" },
    ],
  }),
}));

describe("HelpPage", () => {
  it("renders resource cards", () => {
    render(<HelpPage />);

    expect(screen.getByText("Getting Started Guide")).toBeInTheDocument();
    expect(screen.getByText("Contact Support")).toBeInTheDocument();
    expect(screen.getByText("API Documentation")).toBeInTheDocument();
  });

  it("renders resource descriptions", () => {
    render(<HelpPage />);

    expect(screen.getByText("Learn the basics of managing your finances")).toBeInTheDocument();
    expect(screen.getByText("Chat with our team for help")).toBeInTheDocument();
  });

  it("renders FAQ section header", () => {
    render(<HelpPage />);

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders FAQ questions", () => {
    render(<HelpPage />);

    expect(screen.getByText("How do I reset my password?")).toBeInTheDocument();
    expect(screen.getByText("How do I add a new account?")).toBeInTheDocument();
  });
});
