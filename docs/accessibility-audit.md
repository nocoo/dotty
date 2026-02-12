# Accessibility (a11y) Audit Report

> **Date**: 2026-02-12
> **Scope**: Full codebase review of all TSX templates, pages, and components
> **Standard**: WCAG 2.1 AA

## Executive Summary

The project's accessibility posture relies almost entirely on Radix UI's built-in behavior from shadcn/ui primitives. Custom application code adds virtually **no** explicit ARIA attributes, has **no** a11y linting rules (`eslint-plugin-jsx-a11y` absent), and **no** a11y test coverage (e.g., axe-core).

**Total issues identified: 80+**

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | ~20 | Blocks assistive technology users entirely |
| High | ~25 | Significant information loss or usability degradation |
| Medium | ~25 | Best-practice violations, partial information loss |
| Low | ~10 | Minor improvements |

---

## Critical Issues

### 1. Icon-Only Buttons Without Accessible Names (~15 instances)

Multiple buttons contain only an icon with no `aria-label` or visually-hidden text. Screen readers announce "button" with zero context.

| File | Line(s) | Element | Fix |
|------|---------|---------|-----|
| `src/components/DashboardLayout.tsx` | 78-83 | Mobile hamburger `<button>` (Menu icon) | Add `aria-label="Open navigation menu"` |
| `src/components/DashboardLayout.tsx` | 88-95 | GitHub `<a>` link (Github icon) | Add `aria-label="GitHub repository"` |
| `src/components/AppSidebar.tsx` | 232-237 | Expand sidebar `<button>` (PanelLeft icon) | Add `aria-label="Expand sidebar"` |
| `src/components/AppSidebar.tsx` | 241-246 | Search `<button>` (Search icon) | Add `aria-label="Search"` |
| `src/components/AppSidebar.tsx` | 282-287 | Collapse sidebar `<button>` (PanelLeft icon) | Add `aria-label="Collapse sidebar"` |
| `src/components/AppSidebar.tsx` | 322-324 | Logout `<button>` (LogOut icon) | Add `aria-label="Log out"` |
| `src/components/ThemeToggle.tsx` | 44-54 | Theme toggle `<button>` (Sun/Moon icon) | Replace `title` with `aria-label` |
| `src/pages/LoginPage.tsx` | 74-84 | Password visibility `<button>` (Eye icon) | Add `aria-label="Show/Hide password"` |
| `src/pages/SettingsPage.tsx` | 108-110 | Avatar upload `<button>` (Camera icon) | Add `aria-label="Change profile photo"` |
| `src/pages/SettingsPage.tsx` | 69 | Settings nav buttons on mobile (icons only when text hidden) | Add `aria-label` to each nav button |

**WCAG**: 4.1.2 Name, Role, Value (Level A)

### 2. Form Elements Without Associated Labels (~16 instances)

All `<Label>` components in `SettingsPage.tsx` lack `htmlFor`, and all `<Input>` components lack `id`. Screen readers cannot associate labels with their inputs.

| File | Line(s) | Elements |
|------|---------|----------|
| `src/pages/SettingsPage.tsx` | 123-127 | First name input |
| `src/pages/SettingsPage.tsx` | 130-134 | Last name input |
| `src/pages/SettingsPage.tsx` | 137-142 | Email input |
| `src/pages/SettingsPage.tsx` | 145-150 | Phone input |
| `src/pages/SettingsPage.tsx` | 155-160 | Bio textarea |
| `src/pages/SettingsPage.tsx` | 224-229 | Current password input |
| `src/pages/SettingsPage.tsx` | 233-238 | New password input |
| `src/pages/SettingsPage.tsx` | 241-246 | Confirm password input |
| `src/pages/SettingsPage.tsx` | 387-392 | Currency `<select>` (label is a `<p>`, not `<label>`) |
| `src/pages/SettingsPage.tsx` | 400-405 | Language `<select>` (label is a `<p>`, not `<label>`) |
| `src/pages/SettingsPage.tsx` | 190-201 | 5 notification `<Switch>` toggles (no label association) |
| `src/pages/SettingsPage.tsx` | 275, 285 | 2FA switches (no label association) |
| `src/pages/SettingsPage.tsx` | 413 | Compact mode switch (no label association) |
| `src/pages/InteractionShowcasePage.tsx` | 224-228 | "Your name" input |
| `src/pages/InteractionShowcasePage.tsx` | 231-236 | "Message" textarea |

**Fix**: Add matching `id` to each input and `htmlFor` to each label. For switches, wrap with `<label>` or use `aria-labelledby`.

**WCAG**: 1.3.1 Info and Relationships (Level A)

### 3. Charts Completely Inaccessible (~13 chart components)

All Recharts visualizations lack text alternatives. Screen readers encounter opaque SVG graphics with no meaningful content.

| File | Chart Type |
|------|------------|
| `src/components/dashboard/SummaryMetricCard.tsx` | BarChart |
| `src/components/dashboard/SecondaryMetricCard.tsx` | BarChart |
| `src/components/dashboard/AreaChartCard.tsx` | AreaChart (dual series) |
| `src/components/dashboard/BarChartCard.tsx` | BarChart |
| `src/components/dashboard/DonutChartCard.tsx` | PieChart |
| `src/components/dashboard/GaugeCard.tsx` | RadialBarChart |
| `src/components/dashboard/GroupedBarCard.tsx` | BarChart (grouped) |
| `src/components/dashboard/RadialProgressCard.tsx` | RadialBarChart |
| `src/components/dashboard/TrendLineCard.tsx` | LineChart |
| `src/pages/StatsOverviewPage.tsx` | BarChart, PieChart, AreaChart |
| `src/pages/PortfolioPage.tsx` | LineChart, PieChart |
| `src/pages/FlowComparisonPage.tsx` | AreaChart, BarChart |
| `src/pages/ProgressTrackingPage.tsx` | BarChart |

**Fix**: Wrap each `<ResponsiveContainer>` in a `<div role="img" aria-label="...">` with a descriptive summary, or provide a visually-hidden `<table>` with the chart data.

**WCAG**: 1.1.1 Non-text Content (Level A)

### 4. Data Tables Built With `<div>` Instead of `<table>`

| File | Line(s) | Description |
|------|---------|-------------|
| `src/pages/RecordListPage.tsx` | 22-24 | Transaction list uses CSS grid of `<div>`s with `<span>` column headers |
| `src/pages/PortfolioPage.tsx` | 76-97 | Holdings list uses `<div>` elements |

Screen readers cannot navigate these as data tables. Column headers (`Transaction`, `Category`, `Date`, `Amount`, `Status`) are `<span>` elements, not `<th scope="col">`.

**Fix**: Replace with `<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>`.

**WCAG**: 1.3.1 Info and Relationships (Level A)

### 5. Login Page Missing `<form>` Element

`src/pages/LoginPage.tsx:12-141` -- Inputs and submit button are not wrapped in a `<form>`. This breaks native form submission, autofill in some browsers, and screen reader form landmark detection.

**Fix**: Wrap in `<form onSubmit={handleSubmit}>` and add `type="submit"` to the sign-in button.

**WCAG**: 1.3.1 Info and Relationships (Level A)

### 6. No Skip Navigation Link

`index.html` lacks a "Skip to main content" link. Keyboard users must tab through the entire sidebar on every page load.

**Fix**: Add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>` as the first child of `<body>`, and `id="main-content"` to the `<main>` element.

**WCAG**: 2.4.1 Bypass Blocks (Level A)

---

## High Issues

### 7. Mobile Sidebar Lacks Focus Management

`src/components/DashboardLayout.tsx:62-72`:

- **Overlay backdrop** is a `<div onClick>` -- not keyboard-focusable, no `role`, no `aria-label`
- **No Escape key** handler to close the sidebar
- **No focus trap** -- keyboard focus can tab behind the overlay to invisible content
- **Missing** `role="dialog"`, `aria-modal="true"`, `aria-label`

**Fix**: Use a dialog/drawer pattern with focus trap (e.g., Radix Dialog or a custom focus-trap hook). Add `onKeyDown` for Escape. Move focus into the sidebar on open and restore on close.

**WCAG**: 2.1.1 Keyboard (Level A), 1.4.13 Content on Hover or Focus (Level AA)

### 8. Progress Bars Missing ARIA Attributes (~5 instances)

| File | Line(s) | Description |
|------|---------|-------------|
| `src/pages/CardShowcasePage.tsx` | 110-115 | Credit utilization bars |
| `src/pages/ProgressTrackingPage.tsx` | 38-39 | Category budget bars |
| `src/pages/TargetCardsPage.tsx` | 30-31 | Goal progress bars |
| `src/components/dashboard/GaugeCard.tsx` | 33-58 | Credit score gauge |
| `src/components/dashboard/RadialProgressCard.tsx` | 27-45 | Savings progress |

All are purely visual `<div>` elements. Screen readers convey zero information.

**Fix**: Add `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`, and `aria-label`.

**WCAG**: 4.1.2 Name, Role, Value (Level A)

### 9. Color-Only Information Indicators (~11 instances)

Information conveyed solely through color without text/pattern alternatives:

| Pattern | Files | Issue |
|---------|-------|-------|
| Income vs. Expense | `RecentListCard.tsx`, `RecordListPage.tsx`, `AccountsPage.tsx` | Green/red color + small arrow icon only |
| Positive/Negative trends | `SummaryMetricCard.tsx`, `SecondaryMetricCard.tsx`, `TrendLineCard.tsx`, `ItemListCard.tsx` | `text-success`/`text-destructive` color only (+ sign prefix partially mitigates) |
| Chart data series | `AreaChartCard.tsx`, `GroupedBarCard.tsx`, `DonutChartCard.tsx` | Color-only differentiation between series |
| Gauge rating | `GaugeCard.tsx` | Score label color varies (green/amber/red) |

**Fix**: Add visually-hidden text (e.g., "Income:", "Expense:", "increased by", "decreased by"), or use patterns/shapes in addition to color.

**WCAG**: 1.4.1 Use of Color (Level A)

### 10. Fake Toggle Switches in CardShowcasePage

`src/pages/CardShowcasePage.tsx:132-134` -- "Online Payments", "Contactless", "ATM Withdrawal" toggles are pure `<div>` elements styled to look like switches.

- Not focusable via keyboard
- No `role="switch"`, `aria-checked`, `tabIndex`
- No `onClick` or `onKeyDown` handlers

**Fix**: Replace with `<Switch>` from shadcn/ui (already available in `src/components/ui/switch.tsx`), or add proper ARIA switch semantics.

**WCAG**: 2.1.1 Keyboard (Level A), 4.1.2 Name, Role, Value (Level A)

### 11. Theme Selector Missing Radio Group Semantics

`src/pages/SettingsPage.tsx:349-365` -- Light/Dark/System buttons behave as a radio group but lack:
- `role="radiogroup"` on parent
- `role="radio"` on each button
- `aria-checked` for the selected option

**Fix**: Add radio group ARIA attributes, or use an actual `<fieldset>` with `<input type="radio">`.

**WCAG**: 4.1.2 Name, Role, Value (Level A)

---

## Medium Issues

### 12. Heading Hierarchy Problems

| Issue | Files |
|-------|-------|
| `<h2>` used for data values (`$8,800`) instead of section headings | `SummaryMetricCard.tsx`, `SecondaryMetricCard.tsx`, `BarChartCard.tsx`, `TrendLineCard.tsx`, `ProgressTrackingPage.tsx`, `FlowComparisonPage.tsx` |
| `<h3>` used directly under `<h1>` (skipping `<h2>`) | `StatsOverviewPage.tsx` |
| No headings at all in page content | `DashboardPage.tsx`, `RecordListPage.tsx` |

**Fix**: Use `<p>` or `<span>` for data values, ensure sequential heading hierarchy (h1 > h2 > h3).

**WCAG**: 1.3.1 Info and Relationships (Level A)

### 13. Missing Semantic Landmarks

| Issue | Files |
|-------|-------|
| `<aside>` lacks `aria-label` | `AppSidebar.tsx` |
| Standalone pages missing `<main>` | `BadgeLoginPage.tsx`, `NotFound.tsx` |
| Pages are `<div>` soup with no `<section>` | `DashboardPage.tsx`, `AccountsPage.tsx`, `StatsOverviewPage.tsx`, `ProgressTrackingPage.tsx`, `FlowComparisonPage.tsx`, `HelpPage.tsx`, `PalettePage.tsx`, `InteractionShowcasePage.tsx` |
| Settings `<nav>` lacks `aria-label` | `SettingsPage.tsx` |

**Fix**: Add `aria-label` to landmarks, wrap standalone pages in `<main>`, use `<section aria-labelledby="...">` for logical groupings.

**WCAG**: 1.3.1 Info and Relationships (Level A)

### 14. Decorative Icons Missing `aria-hidden`

All Lucide icons throughout the project lack explicit `aria-hidden="true"`. While `lucide-react` may set this by default at the library level, it is an implicit dependency on library behavior rather than an explicit declaration.

**Fix**: Verify lucide-react's default behavior. If not automatically set, add `aria-hidden="true"` to all decorative icons.

**WCAG**: 1.1.1 Non-text Content (Level A)

### 15. Color Contrast Concerns

| Element | Files | Risk |
|---------|-------|------|
| `text-muted-foreground` at small sizes | Multiple files | May fail 4.5:1 ratio |
| 10-11px text (`text-[10px]`, `text-[11px]`) | `RecordListPage.tsx`, `AppSidebar.tsx` | Requires 4.5:1 at this size |
| `text-yellow-500` on `bg-yellow-500/10` | `RecordListPage.tsx` | Likely insufficient contrast |

**Fix**: Audit with a contrast checker tool. Ensure minimum 4.5:1 for normal text and 3:1 for large text.

**WCAG**: 1.4.3 Contrast (Minimum) (Level AA)

### 16. Non-Focusable Interactive Elements

| File | Line(s) | Element |
|------|---------|---------|
| `src/components/AppSidebar.tsx` | 262 | Avatar with `cursor-pointer` -- not a button, no tabIndex |
| `src/pages/HelpPage.tsx` | 19-24 | Resource cards with `cursor-pointer` -- plain `<div>`, not keyboard accessible |
| `src/components/dashboard/RecentListCard.tsx` | 21 | "View All" `<span>` with `cursor-pointer` -- not focusable |

**Fix**: Use `<button>` or `<a>` for interactive elements. If using `<div>`, add `role="button"`, `tabIndex={0}`, and `onKeyDown` handler.

**WCAG**: 2.1.1 Keyboard (Level A)

---

## Remediation Plan

### Batch P0 -- Quick Wins (estimated: 1-2 hours)

High-impact, low-effort fixes:

1. Add `aria-label` to all icon-only buttons and links
2. Add `htmlFor`/`id` pairs to all form label/input associations
3. Add skip navigation link to `index.html`

**Files**: `DashboardLayout.tsx`, `AppSidebar.tsx`, `ThemeToggle.tsx`, `LoginPage.tsx`, `SettingsPage.tsx`, `InteractionShowcasePage.tsx`, `index.html`

### Batch P1 -- Structural Fixes (estimated: 3-4 hours)

1. Wrap charts in `<div role="img" aria-label="...">` with descriptive summaries
2. Replace div-based data tables with proper `<table>` elements
3. Wrap login inputs in `<form>` element
4. Fix heading hierarchy (replace `<h2>` on data values with `<p>`)

**Files**: All dashboard components, `RecordListPage.tsx`, `PortfolioPage.tsx`, `LoginPage.tsx`, `StatsOverviewPage.tsx`

### Batch P2 -- Component Upgrades (estimated: 2-3 hours)

1. Implement focus trap and keyboard handling for mobile sidebar
2. Add `role="progressbar"` with ARIA values to all progress indicators
3. Replace fake toggle switches with `<Switch>` from shadcn/ui
4. Add radio group semantics to theme selector

**Files**: `DashboardLayout.tsx`, `CardShowcasePage.tsx`, `ProgressTrackingPage.tsx`, `TargetCardsPage.tsx`, `SettingsPage.tsx`, `GaugeCard.tsx`, `RadialProgressCard.tsx`

### Batch P3 -- Semantic Enrichment (estimated: 2-3 hours)

1. Fix heading hierarchy across all pages
2. Add semantic landmarks (`<section>`, `<main>`, `<nav aria-label>`)
3. Add non-color indicators for income/expense/trend direction
4. Add `aria-hidden="true"` to decorative icons (if needed)

**Files**: ~15 files across pages and components

### Batch P4 -- Tooling and Prevention (estimated: 1 hour)

1. Install and configure `eslint-plugin-jsx-a11y`
2. Add axe-core integration tests with `@axe-core/react` or `vitest-axe`
3. Add a11y checks to CI pipeline

**Files**: `eslint.config.js`, `package.json`, test files

---

## References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Recharts Accessibility](https://recharts.org/en-US/guide/accessibility)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
