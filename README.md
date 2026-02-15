# dotty

> **Pixel-brutalist dashboard template.**
> Cool-toned monochrome. Sharp geometry. Stacked-block charts. 2-layer cards.

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Framework: Vite](https://img.shields.io/badge/Framework-Vite-646cff.svg?style=flat-square&logo=vite)](https://vite.dev)
[![Style: Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

![Dotty Preview](https://assets.lizheng.me/wp-content/uploads/2026/02/dotty-1-scaled.jpg)

## Design Philosophy

### Cool monochrome

Near-monochrome grayscale with a subtle **blue undertone** (hue 220, saturation 4–14%). No warm yellows, no neutral grays — every surface carries a faint cool cast that keeps the palette clean and prevents the "dirty gray" look that pure `hsl(0 0% …)` produces. The only chromatic accent is green (`--success`) for positive change indicators.

### Sharp + round radius rule

Large layout containers (sidebar shell, main content wrapper) have **zero** border radius — hard, architectural edges. Small interactive controls (buttons, search box, nav items, badges, `kbd` tags) use `rounded-lg`. Page-level cards use `--radius-card` (14px); inner widgets use `--radius-widget` (10px). This creates a deliberate tension between the rigid frame and the soft content within it.

### 2-layer card pattern

The signature visual element. Every card follows a stacked construction:

1. **Outer container** — `bg-muted` with `rounded-[--radius-card]`, the cool-gray base
2. **Inner content area** — `bg-card` with `rounded-[--radius-widget]` and a 1px border, floating inside
3. **Exposed gray zone** — the gap between inner and outer surfaces holds secondary content (footers, labels, metadata)

Depth is communicated through luminance layers, not shadows or gradients.

### Pixel bar charts

Bar charts are rendered as vertically stacked square blocks (`PixelBarChart` component) rather than smooth SVG rectangles. Each bar is a column of discrete squares, reinforcing the pixel-grid aesthetic.

### Logo

Three rounded squares arranged to form the number **7** — two blocks on top (the horizontal stroke) and one block bottom-right (the vertical stroke). The logo ships as both a React component (`DottyLogo`) and a static SVG favicon (`public/logo.svg`).

### Typography

Inter is the global body font. Only card numerical values (stats, metrics, percentages) use IBM Plex Mono via the `font-mono-num` utility. Display headings optionally use DM Sans via `font-display`.

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

All tokens live in `src/index.css` as CSS custom properties with HSL values (hue saturation lightness). Light mode uses `:root`, dark mode uses `.dark`. Every gray-scale token shares hue **220** for consistent cool tonality.

```
--background     Page background         220 14% 96%  (light) / 220 14% 5%  (dark)
--foreground     Primary text             220 14% 10%  (light) / 220 6% 93%  (dark)
--card           Card inner surface       220 20% 100% (light) / 220 10% 9%  (dark)
--muted          Card outer surface       220 10% 93%  (light) / 220 8% 15%  (dark)
--border         Borders                  220 8% 88%   (light) / 220 6% 22%  (dark)
--radius         0px      (global default — sharp corners)
--radius-card    14px     (page-level cards)
--radius-widget  10px     (inner card widgets)
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
