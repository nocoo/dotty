# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-07-16

### Changed

- `README.md`: tech-stack table now shows Vite 8 / TypeScript 7 (was pre-migration
  Vite 7 / TypeScript 5.9); the "Run tests" snippet uses `bun run test` instead
  of a bare `vitest run` that assumes vitest is on PATH.
- `react-i18next` 17.0.9 → 17.0.10 (dependabot, merged from `main`).

## [1.2.1] - 2026-07-15

### Changed

- **Toolchain**: Replaced ESLint + `typescript-eslint` with [Biome](https://biomejs.dev) 2.5.3
  as the single tool for lint, format and import sorting. `eslint.config.js` deleted;
  `biome.json` at repo root holds all rules (`recommended` preset plus tightened
  `noUnusedImports`, `noUnusedVariables`, `noNonNullAssertion`, `useConst`,
  `noDangerouslySetInnerHtml`). `src/test/**` overrides relax `noNonNullAssertion` and
  `noNonNullAssertedOptionalChain` — the only rule relaxations, all others enforced.
  `public/**` is excluded because it holds hand-authored static SVG assets.
- **TypeScript**: Bumped `typescript` 6.0 → 7.0.2. Dropped `baseUrl` from `tsconfig.json`
  (TS 7 removed the option; `paths` stands alone).

### Removed

- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`,
  `typescript-eslint`, `globals` — full ESLint toolchain and the sole
  `eslint-disable` comment in `DashboardLayout.tsx`.

### Fixed

- `src/main.tsx`: guarded lookup of `#root` (removes `noNonNullAssertion` violation).
- `GithubIcon`: default `aria-hidden="true"` + `focusable="false"` for decorative use;
  callers can still override via spread.
- `Section` helpers in `NetworkOpsDashboardPage` and `WearableDashboardPage` now
  actually apply their `className` prop instead of taking it and dropping it
  (`noUnusedFunctionParameters`).
- Every raw `<button>` in `src/` now carries an explicit `type` attribute (a11y).
- Applied Biome import ordering, tab-indent formatting, and `node:` protocol prefix
  across the codebase (~140 files).

## [1.1.1] - 2026-06-12

### Changed

- **deps**: Bumped 24 `@radix-ui/*` packages to latest patch/minor releases (closes #19–#42)
- **deps**: Upgraded `lucide-react` 0.563 → 1.17 (extracted standalone `GithubIcon` component first to preserve removed icon)
- **deps**: Upgraded TypeScript 5 → 6, ESLint stack to v10, i18next 25 → 26, react-i18next 16 → 17, sonner 1 → 2, tailwind-merge 2 → 3, @types/node 22 → 25, jsdom 28 → 29, globals 15 → 17, eslint-plugin-react-refresh 0.4 → 0.5
- **deps**: Pinned and normalized version specifiers across `package.json`

### Security

- **deps**: Bumped `react-router` to 7.17.0 (covers GHSA-8x6r-g9mw-2r78 DoS in `__manifest` endpoint)

### CI

- **security**: Pass `--ignore-scripts` to `bun install` in CI (Shai-Hulud supply-chain defense)

## [1.1.0] - 2026-05-01

### Changed

- Minor version bump to validate CI/CD pipeline

## [1.0.0] - 2026-02-23

### Added

- **i18n**: Full internationalization support with English and Chinese translations
- **Language toggle**: Dropdown in header for switching between languages
- **Version badge**: Subtle version indicator in sidebar header
- **Version API**: `/api/live` dev-server endpoint returning app version and status
- **Version management**: Single source of truth from `package.json` via Vite `define`
- **Dashboard components**: 24 reusable pixel-art visualization cards (trend lines, gauges, heatmaps, charts, etc.)
- **Scenario dashboards**: Wearable health, banking/wealth, and network ops demo pages
- **Interaction showcase**: Toast notifications, dialog patterns, and overlay demos
- **Accessibility**: ARIA labels, landmarks, semantic structure
- **MVVM architecture**: Models, viewmodels, and pages with clean separation of concerns
- **Command palette**: `Cmd+K` search across all pages
- **Theme system**: Light/dark/system toggle with localStorage persistence
- **Color palette**: 24-color chart palette with showcase page
- **Pixel-art design system**: Retro pixel-block aesthetic across all components
- **Loading page**: Pixel spinner animation
- **HeatmapCalendar**: GitHub-style contribution calendar component
- **SlotBarChart**: Time-slot bar chart for schedule visualizations
- **PixelBarChart**: Pixel-block styled bar charts with configurable height

### Changed

- Upgraded to React 19, Vite 7, Tailwind CSS 4, React Router 7, Recharts 3
- Migrated from npm to bun package manager
- Enabled TypeScript strict mode
- Unified all dashboard cards to 2-layer bg-muted/bg-card pattern
