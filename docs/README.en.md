<p align="center">
  <img src="../assets/brand/icon-rounded.png" width="128" height="128" alt="Dotty" />
</p>

<h1 align="center">Dotty</h1>

<p align="center">Build dashboards with cool grays, layered cards, and pixel bar charts.</p>

<p align="center">
  <a href="https://dotty.hexly.ai">Website</a> ·
  <a href="../README.md">简体中文</a>
</p>

## What it does

Dotty is a React dashboard template and interface example collection. Reuse its layouts, controls, and charts for an admin interface, personal data view, or product prototype. A square outer frame and rounded cards use grayscale layers to organize information.

The project is a static SPA with sample data. Health, finance, network, and login pages demonstrate layouts and interactions; they do not connect to a business backend, database, or real authentication service.

## Features

- Browse sidebar layouts, navigation, forms, data tables, dialogs, notifications, and interactive controls.
- Combine statistic cards, pixel bar charts, trends, heatmaps, radar charts, and flow diagrams.
- Explore account, progress, portfolio, health, wearable, banking, and network-operations scenarios.
- Reuse login, badge-login, loading, static-content, and 404 page designs.
- Switch between light and dark themes or Chinese and English, with palette and layout reference pages.
- Use models and viewmodels that separate some calculations and presentation state from pages, making sample data easier to replace.

## Usage

Open the [live example](https://dotty.hexly.ai) and explore pages from the sidebar. Login forms, metrics, and business actions are template demonstrations.

| Examples | Routes |
| --- | --- |
| Dashboard and components | `/`, `/components` |
| Controls, data, forms, navigation | `/interactive`, `/data`, `/forms`, `/navigation` |
| Accounts, progress, flows, portfolio | `/accounts`, `/progress-tracking`, `/flow-comparison`, `/portfolio` |
| Scenario pages | `/health`, `/wearable`, `/banking`, `/network` |
| Layout and theme references | `/layout`, `/palette`, `/settings` |

For your own project, select pages and components from `src/pages/`, replace `src/data/mock.ts` and page-level sample data, then add your own data access and authentication.

Most visual settings live in [src/index.css](../src/index.css). `:root` and `.dark` define themes; `--radius-card` and `--radius-widget` control the two card layers. Body text uses Inter, and numerical values use IBM Plex Mono through `font-mono-num`. [PixelBarChart](../src/components/PixelBarChart.tsx) renders values as stacked square blocks.

## Development

Use Bun. Node.js 24 or newer is recommended.

```bash
git clone https://github.com/nocoo/dotty.git
cd dotty
bun install --frozen-lockfile
bun run dev
```

The development address is `http://localhost:7002`. No environment variables or backend account are required.

```bash
bun run typecheck
bun run lint
bun run build
bun run preview
```

The build output is `dist/`. Configure static hosting to fall back to `index.html` for React Router. The repository's [Cloudflare configuration](../wrangler.toml) already enables SPA fallback, and its existing [deployment workflow](../.github/workflows/release.yml) publishes these static assets.

`src/models/` contains calculations, `src/viewmodels/` combines data with presentation state, and `src/i18n/locales/` contains Chinese and English strings. `/api/live` exists only in the Vite development server; it is not a production business API.

## Tests

| Layer | Command |
| --- | --- |
| Unit and component tests | `bun run test` |
| Watch during development | `bun run test:watch` |

Tests use Vitest, jsdom, and Testing Library with local sample data and need no cloud services. Run `bun run test:coverage` for a report on models, viewmodels, and lib. The repository currently has no separate API or browser end-to-end test entry point.

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF)

| Area | Implementation |
| --- | --- |
| Application and routing | React, TypeScript, React Router |
| Build and styling | Vite, SWC, Tailwind CSS, Radix UI |
| Charts and localization | Recharts, PixelBarChart, i18next / react-i18next |
| Development and hosting | Bun, Biome, Vitest, Testing Library, Cloudflare Workers static assets |

## Documentation

- [Brand assets and usage](../assets/brand/README.md)
- [Accessibility audit](accessibility-audit.md)
- [Changelog](../CHANGELOG.md)

## License

[MIT](../LICENSE) © 2026 Zheng Li
