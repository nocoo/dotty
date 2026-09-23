# Dotty

Pixel-brutalist React dashboard template, hosted as a static SPA at `https://dotty.hexly.ai`.
Profile: ts-worker-web.
Human overview: [README.md](README.md). Frameworks must not rewrite this file. Maintain this root `AGENTS.md` as the only project handbook; do not create a `CLAUDE.md` alias, copy or import.

## Sources of Truth

This file is the contract; hooks, CI and configuration enforce it. Raise weaker enforcement instead of lowering this contract.

| Fact | Where |
|---|---|
| Human docs | [README.md](README.md), [accessibility audit](docs/accessibility-audit.md), `CHANGELOG.md` |
| Version | `package.json`, injected as `__APP_VERSION__` by Vite/Vitest |
| Enforcement | `.husky/`, CI/release workflows, `vitest.config.ts`, `vite.config.ts` |
| Machine rules | Global `AGENTS.md` and `rules/` |
| Accidents | [Retrospective.md](Retrospective.md) |

## Project Invariants

- This is a static SPA with local mock data, no D1 database, business backend or real login. Do not describe demonstration forms as production authentication.
- `/api/live` is Vite middleware plus emitted `api/live.json` for production; preserve version/status and no-store caching behavior.
- Worker name is `theme-dotty`, assets are `./dist`, with SPA navigation fallback. Deployment is owned by `release.yml`, never a parallel laptop `wrangler deploy`.
- Dev port is 7002 (`dotty.dev.hexly.ai`), not 7017. Preserve the approved cold-gray palette, squared frame/rounded-card hierarchy, pixel charts and bilingual interface.
- Viewmodels have no View/DOM imports; pages stay thin. Replace mock data deliberately when adapting the template.
- Existing coverage denominator is models/viewmodels/lib; pages/components and browser journeys require their own proof.

## Stack / Layout

| Component | Choice |
|---|---|
| Language / install | TypeScript 7; Bun manifest 1.3.6, current CI/CD 1.4.2 |
| App | Vite 8, React Router, Tailwind/Radix, i18next, Recharts |
| Static / tests | TypeScript, Biome, Vitest/V8, jsdom/Testing Library |
| `src/pages/`, `src/components/` | Demo pages and reusable dashboard elements |
| `src/models/`, `src/viewmodels/`, `src/lib/` | Logic and presentation state |
| `src/data/mock.ts`, `src/i18n/locales/` | Example data and English/Chinese copy |

## Commands

Run from the root with Bun and Node 24+ for current tooling. No env file, backend account or cloud credential is needed for tests or local development.

```bash
bun install --frozen-lockfile
bun run dev
bun run typecheck
bun run lint
bun run build
bun run test
bun run test:coverage
bun run preview
```

`build` emits `dist/`, including the status asset; typechecking alone does not build the SPA. There is no independent API or browser E2E runner yet.

## Verification

6DQ = L1/L2/L3 + G2 + D1; the former G1 dimension was merged into L1 on 2026-09-21. Status: `enforced`, `planned`, `manual`, `N/A`.

| Dimension | Required proof | Status | Current enforcement / gap |
|---|---|---|---|
| L1 logic (incl. former G1 static) | Statements, branches, functions and lines each ≥95%; no `.skip` / `.only`; strict types and check-only lint with zero errors/warnings | planned | Push/CI enforce all four metrics on models/viewmodels/lib; broader UI proof and skip/focus gate are missing. Static lane: local pre-commit typecheck/lint; CI lints but explicitly sets `typecheck: false`, an enforcement gap. No index-snapshot/timing/rejection proof |
| L2 HTTP | Real HTTP for the status response and SPA asset contract | planned | A real `/api/live` surface exists; no HTTP runner currently verifies its status/version/cache contract |
| L3 UI | Critical navigation, theme/language, forms and chart journeys | planned | No browser E2E entrypoint exists; absence of Playwright does not make UI verification N/A |
| G2 security | Secret and dependency scans; missing scanner fails | enforced | Staged Gitleaks at commit, OSV on `bun.lock` at push, shared CI scans |
| D1 isolation | Per-run local browser/storage state; no production/daily-dev data | planned | Unit tests use mock data in jsdom; isolated HTTP/browser harness and cleanup guards are absent |
| Build | Real Vite bundle and status asset | enforced | Pre-push build and CI prepare-command; release workflow rebuilds proven source |
| Docs | UI and accessibility contract reviewed | manual | README/accessibility notes when behavior changes |

| Hook | Current behavior | Required follow-up |
|---|---|---|
| pre-commit | Working-tree typecheck/lint/tests without coverage; staged Gitleaks | Unified L1 (types, check-only lint, coverage) on index snapshot, <30s |
| pre-push | Working-tree build/coverage/lint, OSV | L2+G2 on stdin push refs, <3min |

Install restores Husky. `lint-staged` configuration is unused. Hooks are check-only; never use `--no-verify` on commits or branch pushes.
CI now uses `base-ci/quality.yml@ad43150de3a2be2fa464b5cd2f921dc4fa9f8f0f`; typechecking remains explicitly disabled there rather than implemented by a no-op command.

## Resources / Isolation

Dev runs at 7002 (`https://dotty.dev.hexly.ai`) with mock data. Production serves static assets. Future L2/L3 must allocate a separate local server, fresh browser context/storage and scoped cleanup, without remote `-test` infrastructure.

## Operations / Release

Authorized maintainers update `package.json` and changelog, commit/push normally, verify CI and push the matching `vX.Y.Z` tag. `release.yml` uses the shared proven-source Worker deployment; tag/manual paths also prove the selected source rather than trusting a tag alone.
GitHub write and the exact `production` environment own deployment credentials. Confirm `GET https://dotty.hexly.ai/api/live` returns the intended version after a requested release; do not deploy from the laptop.

## Retrospective

Narratives stay in [Retrospective.md](Retrospective.md); keep recurring rules here, cross-project lessons in global rules/nmem, and deterministic requirements in hooks/tests.
