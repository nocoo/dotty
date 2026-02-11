// Centralized chart / visualization color palette.
// All values reference CSS custom properties defined in index.css.
// Use these constants everywhere instead of hardcoded HSL strings.

/** Helper — wraps a CSS custom property name for inline style usage. */
const v = (token: string) => `hsl(var(--${token}))`;

/**
 * Returns a CSS color string with alpha from a CSS custom property.
 * Usage: `withAlpha("chart-1", 0.12)` → `hsl(var(--chart-1) / 0.12)`
 */
export const withAlpha = (token: string, alpha: number) =>
  `hsl(var(--${token}) / ${alpha})`;
// ── Sequential chart colors (1-indexed for readability) ──

export const chart = {
  blue: v("chart-1"),
  purple: v("chart-2"),
  green: v("chart-3"),
  pink: v("chart-4"),
  orange: v("chart-5"),
  teal: v("chart-6"),
  amber: v("chart-7"),
  gray: v("chart-8"),
} as const;

/** Ordered array — use for pie / donut / bar where you need N colors by index. */
export const CHART_COLORS = [
  chart.blue,
  chart.purple,
  chart.green,
  chart.pink,
  chart.orange,
  chart.teal,
  chart.amber,
  chart.gray,
] as const;

/** CSS variable names (without --) matching CHART_COLORS order — for withAlpha(). */
export const CHART_TOKENS = [
  "chart-1", "chart-2", "chart-3", "chart-4",
  "chart-5", "chart-6", "chart-7", "chart-8",
] as const;

// ── Semantic aliases ──

export const chartAxis = v("chart-axis");
export const chartMuted = v("chart-muted");

/** Positive / income / inflow */
export const chartPositive = chart.green;

/** Negative / expense / outflow — reuses the destructive token */
export const chartNegative = v("destructive");

/** Primary chart accent (most-used single color) */
export const chartPrimary = chart.blue;
