import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LifeAiPage from "@/pages/LifeAiPage";

// Mock recharts to avoid DOM rendering issues in jsdom
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  LineChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Line: () => null,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => null,
  Sector: () => null,
  Legend: () => null,
  ReferenceLine: () => null,
  Rectangle: () => null,
}));

vi.mock("@/viewmodels/useLifeAiViewModel", () => ({
  useLifeAiViewModel: () => ({
    selectedDate: new Date(2026, 1, 13),
    stats: [
      { title: "Steps", value: "8,432", subtitle: "Goal: 10,000", trend: { value: 12.5, label: "vs last week" } },
      { title: "Sleep", value: "7h 24m", subtitle: "Deep: 2h 10m", trend: { value: -3.2, label: "vs avg" } },
      { title: "Heart Rate", value: "72 bpm", subtitle: "Resting avg", trend: { value: 0, label: "stable" } },
      { title: "Calories", value: "2,180", subtitle: "Burned today", trend: { value: 8.1, label: "vs target" } },
    ],
    timeline: [
      { id: "e1", time: "06:30", title: "Wake up", subtitle: "Sleep score 85", color: "bg-blue-500" },
      { id: "e2", time: "07:00", title: "Morning run", subtitle: "5.2 km in 28 min", color: "bg-green-500" },
    ],
    heatmapData: [{ date: "2026-01-01", value: 5 }],
    weeklySteps: [{ label: "Mon", value: 7200 }],
    monthlySleep: [{ label: "Jan", value: 7.2 }],
    activityBreakdown: [{ label: "Running", value: 35 }],
    sleepSlots: [
      { color: "bg-indigo-800", label: "Deep 15m" },
      { color: "bg-indigo-500", label: "Core 15m" },
      { color: "bg-green-600", label: "REM 15m" },
    ],
    heartRateSlots: [
      { color: "bg-green-600", label: "62 bpm" },
      { color: "bg-yellow-600", label: "78 bpm" },
    ],
    activeEventCount: 6,
    totalCalories: 1650,
    goToPrevDay: vi.fn(),
    goToNextDay: vi.fn(),
    goToToday: vi.fn(),
  }),
}));

describe("LifeAiPage", () => {
  it("renders all four stat cards", () => {
    render(<LifeAiPage />);
    expect(screen.getByText("Steps")).toBeInTheDocument();
    expect(screen.getByText("Sleep")).toBeInTheDocument();
    // "Heart Rate" appears in both stat card and slot bar section
    expect(screen.getAllByText("Heart Rate").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Calories")).toBeInTheDocument();
  });

  it("renders stat values", () => {
    render(<LifeAiPage />);
    expect(screen.getByText("8,432")).toBeInTheDocument();
    // "7h 24m" and "72 bpm" appear in both stat cards and slot bar section headers
    expect(screen.getAllByText("7h 24m").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("72 bpm").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("2,180")).toBeInTheDocument();
  });

  it("renders chart section headers", () => {
    render(<LifeAiPage />);
    expect(screen.getByText("Weekly Steps")).toBeInTheDocument();
    expect(screen.getByText("Monthly Sleep (hours)")).toBeInTheDocument();
    expect(screen.getByText("Activity Breakdown")).toBeInTheDocument();
  });

  it("renders timeline section with activity count and calories", () => {
    render(<LifeAiPage />);
    expect(screen.getByText(/6 activities, 1650 kcal/)).toBeInTheDocument();
  });

  it("renders heatmap section", () => {
    render(<LifeAiPage />);
    expect(screen.getByText(/Activity Heatmap/)).toBeInTheDocument();
  });

  it("renders date navigation with Today button", () => {
    render(<LifeAiPage />);
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("renders sleep stages and heart rate slot bar sections", () => {
    render(<LifeAiPage />);
    expect(screen.getByText("Sleep Stages")).toBeInTheDocument();
    // "Heart Rate" appears in both stat card and slot bar section
    const heartRateElements = screen.getAllByText("Heart Rate");
    expect(heartRateElements.length).toBeGreaterThanOrEqual(2);
  });
});
