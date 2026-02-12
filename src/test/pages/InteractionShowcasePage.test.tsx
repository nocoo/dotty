import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InteractionShowcasePage from "@/pages/InteractionShowcasePage";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));

// Mock the viewmodel
const mockOpenDialog = vi.fn();
const mockCloseDialog = vi.fn();

vi.mock("@/viewmodels/useInteractionShowcaseViewModel", () => ({
  useInteractionShowcaseViewModel: () => ({
    toasts: [
      { id: "t1", title: "Changes saved", description: "Profile updated.", variant: "success", variantLabel: "Success" },
      { id: "t2", title: "Payment failed", description: "Card declined.", variant: "error", variantLabel: "Error" },
    ],
    dialogs: [
      { id: "d1", title: "About Basalt", description: "A modern dashboard template.", style: "info" },
      { id: "d2", title: "Send Feedback", description: "Tell us what you think.", style: "form" },
      { id: "d3", title: "Delete Account", description: "This cannot be undone.", style: "confirm" },
    ],
    toastVariants: ["default", "success", "error", "warning", "info"],
    variantLabels: [
      { variant: "default", label: "Default" },
      { variant: "success", label: "Success" },
      { variant: "error", label: "Error" },
      { variant: "warning", label: "Warning" },
      { variant: "info", label: "Info" },
    ],
    activeDialog: null,
    openDialog: mockOpenDialog,
    closeDialog: mockCloseDialog,
    getDialogById: (id: string) => {
      const dialogs = [
        { id: "d1", title: "About Basalt", description: "A modern dashboard template.", style: "info" },
        { id: "d2", title: "Send Feedback", description: "Tell us what you think.", style: "form" },
        { id: "d3", title: "Delete Account", description: "This cannot be undone.", style: "confirm" },
      ];
      return dialogs.find((d) => d.id === id);
    },
  }),
}));

describe("InteractionShowcasePage", () => {
  it("renders overview section", () => {
    render(<InteractionShowcasePage />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText(/interactive ui patterns/i)).toBeInTheDocument();
  });

  it("renders toast notification cards", () => {
    render(<InteractionShowcasePage />);
    expect(screen.getByText("Toast Notifications")).toBeInTheDocument();
    expect(screen.getByText("Changes saved")).toBeInTheDocument();
    expect(screen.getByText("Payment failed")).toBeInTheDocument();
  });

  it("renders toast variant labels", () => {
    render(<InteractionShowcasePage />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders dialog section with cards", () => {
    render(<InteractionShowcasePage />);
    expect(screen.getByText("Dialogs")).toBeInTheDocument();
    expect(screen.getByText("About Basalt")).toBeInTheDocument();
    expect(screen.getByText("Send Feedback")).toBeInTheDocument();
    expect(screen.getByText("Delete Account")).toBeInTheDocument();
  });

  it("renders dialog style labels", () => {
    render(<InteractionShowcasePage />);
    expect(screen.getByText("Informational")).toBeInTheDocument();
    expect(screen.getByText("Form Input")).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("fires sonner toast on toast card click", async () => {
    const { toast } = await import("sonner");
    render(<InteractionShowcasePage />);
    fireEvent.click(screen.getByText("Changes saved"));
    expect(toast.success).toHaveBeenCalled();
  });

  it("calls openDialog on dialog card click", () => {
    render(<InteractionShowcasePage />);
    fireEvent.click(screen.getByText("About Basalt"));
    expect(mockOpenDialog).toHaveBeenCalledWith("d1");
  });
});
