# dotty

> **Pixel-brutalist dashboard template.**
> A monochrome React SPA with sharp geometry, stacked-block charts, and a 2-layer card system.

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Framework: Vite](https://img.shields.io/badge/Framework-Vite-646cff.svg?style=flat-square&logo=vite)](https://vite.dev)
[![Style: Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

![Dotty Preview](https://assets.lizheng.me/wp-content/uploads/2026/02/dotty-1-scaled.jpg)

## Design Philosophy

### Monochrome palette

Pure black-and-white in both light and dark modes. All chart colors, heatmaps, and data visualizations are grayscale. The only accent is green for positive change indicators (e.g. "+0.94%").

### Sharp + round radius rule

Large layout containers (sidebar shell, main content wrapper) have **zero** border radius — hard, architectural edges. Small interactive controls (buttons, search box, nav items, badges, `kbd` tags) use `rounded-lg`. Page-level cards use a dedicated `--radius-card` (14px) token; inner widgets use `--radius-widget` (10px).

### 2-layer card pattern

The signature visual element. Every card follows a stacked construction:

1. **Outer container** — `bg-muted` with `rounded-[--radius-card]`, providing the gray base
2. **Inner content area** — `bg-card` with `rounded-[--radius-widget]` and a 1px border, sitting inside the outer container
3. **Exposed gray zone** — the gap between inner and outer surfaces holds secondary content (footers, labels, metadata)

This creates a tactile, layered depth without shadows or gradients.

### Pixel bar charts

Bar charts are rendered as vertically stacked square blocks (`PixelBarChart` component) rather than smooth SVG rectangles. Each bar is a column of discrete colored squares, reinforcing the pixel-grid aesthetic.

### Typography

Inter is the global body font — unchanged, no overrides. Only card numerical values (stats, metrics, percentages) use IBM Plex Mono via the `font-mono-num` utility class. Display headings optionally use DM Sans via `font-display`.

## Pages

28 pages organized into 5 sidebar sections. Currently the Dashboard page is fully implemented; all others are layout-ready stubs.

| Section | Pages |
|---|---|
| **Blocks** | Dashboard, Components, Health, Accounts, Progress Tracking, Flow Comparison, Portfolio, Interactions |
| **Scenarios** | Wearable Health, Banking & Wealth, Network Ops |
| **Controls** | Controls, Buttons, Feedback, Overlays, Data Display, Navigation, Forms, Tables, Pills |
| **Pages** | Login, Badge Login, Static Page, Loading, 404 |
| **System** | Layout, Color Palette, Settings |

## Tech Stack

| Layer | Technology |
|---|---|
| **Build** | [Vite 7](https://vite.dev) + SWC |
| **UI** | [React 19](https://react.dev) + TypeScript 5.9 |
| **Routing** | [React Router 7](https://reactrouter.com) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + @tailwindcss/vite + tw-animate-css |
| **Components** | [shadcn/ui](https://ui.shadcn.com) (31 primitives) |
| **Charts** | [Recharts 3](https://recharts.org) + custom PixelBarChart |
| **Icons** | [Lucide React](https://lucide.dev) (1.5px stroke) |
| **Testing** | [Vitest 4](https://vitest.dev) + Testing Library |
| **Package Manager** | [Bun](https://bun.sh) |

## Design Tokens

All tokens live in `src/index.css` as CSS custom properties. Light mode uses `:root`, dark mode uses `.dark`.

```
--background     Page background
--foreground     Primary text
--card           Card inner surface
--muted          Card outer surface / secondary backgrounds
--border         Borders (subtle gray)
--radius         0px (global default — sharp corners)
--radius-card    14px (page-level cards)
--radius-widget  10px (inner card widgets)
```

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (port 7017)
bun dev

# Build for production
bun run build

# Run tests
bun test
```

## License

[MIT](https://opensource.org/licenses/MIT)
