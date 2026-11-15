# Dotty

Pixel-brutalist React dashboard template, hosted as a static SPA at `https://dotty.hexly.ai`.
Profile: ts-worker-web.
Human overview: [README.md](README.md). Frameworks must not rewrite this file. Maintain this root `AGENTS.md` as the only project handbook; do not create a `CLAUDE.md` alias, copy or import.

## Sources of Truth

This file is the contract; hooks, CI and configuration enforce it. Raise weaker enforcement instead of lowering this contract.

| Fact          | Where                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------ |
| Human docs    | [README.md](README.md), [accessibility audit](docs/accessibility-audit.md), `CHANGELOG.md` |
| Version       | `package.json`, injected as `__APP_VERSION__` by Vite/Vitest                               |
| Enforcement   | `.husky/`, CI/release workflows, `vitest.config.ts`, `vite.config.ts`                      |
| Machine rules | Global `AGENTS.md` and `rules/`                                                            |
| Accidents     | [Retrospective.md](Retrospective.md)                                                       |

## Project Invariants

- This is a static SPA with local mock data, no D1 database, business backend or real login. Do not describe demonstration forms as production authentication.
- `/api/live` is Vite middleware plus emitted `api/live.json` for production; preserve version/status and no-store caching behavior.
- Worker name is `theme-dotty`, assets are `./dist`, with SPA navigation fallback. Deployment is owned by `release.yml`, never a parallel laptop `wrangler deploy`.
- Dev port is 7002 (`dotty.dev.hexly.ai`), not 7017. Preserve the approved cold-gray palette, squared frame/rounded-card hierarchy, pixel charts and bilingual interface.
- Viewmodels have no View/DOM imports; pages stay thin. Replace mock data deliberately when adapting the template.
- Existing coverage denominator is models/viewmodels/lib; pages/components and browser journeys require their own proof.

## Stack / Layout

| Component                                    | Choice                                                  |
| -------------------------------------------- | ------------------------------------------------------- |
| Language / install                           | TypeScript 7; Bun manifest 1.4.2, current CI/CD 1.4.2   |
| App                                          | Vite 8, React Router, Tailwind/Radix, i18next, Recharts |
| Static / tests                               | TypeScript, Biome, Vitest/V8, jsdom/Testing Library     |
| `src/pages/`, `src/components/`              | Demo pages and reusable dashboard elements              |
| `src/models/`, `src/viewmodels/`, `src/lib/` | Logic and presentation state                            |
| `src/data/mock.ts`, `src/i18n/locales/`      | Example data and English/Chinese copy                   |

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

Quality follows System1 v1.3.0 Native Mode (`nocoo/base-ci v2026.15`) in `.github/workflows/quality-slots.yml` and `.github/workflows/ci.yml`. Status: `enforced`, `planned`, `manual`, `N/A`.

| Slot              | Status   | Evidence                                                                          |
| ----------------- | -------- | --------------------------------------------------------------------------------- |
| `S1` Types        | enforced | `bun run typecheck` (pre-commit + CI)                                             |
| `S2` Lint         | enforced | `bun run lint` (`biome check --error-on-warnings`, pre-commit + CI)               |
| `S3` Workflow     | enforced | SHA-pinned workflow action check in CI                                            |
| `G1` Secrets      | enforced | `gitleaks` (`.gitleaks.toml`) in pre-commit + CI                                  |
| `G2` Dependencies | enforced | `osv-scanner` (`osv-scanner.toml`, `bun.lock`) in pre-push + CI                   |
| `B1` Build        | enforced | `bun run build` in pre-push + CI                                                  |
| `L1` Unit         | enforced | `bun run test:coverage` (95/95/95/95 on models/viewmodels/lib) in pre-commit + CI |
| `L2` Runtime      | N/A      | Static assets deployed to Cloudflare Worker                                       |
| `L3` Integration  | planned  | `/api/live` surface exists; no CI HTTP runner yet                                 |
| `L4` E2E          | planned  | No Playwright E2E suite yet                                                       |
| `P1` Package      | N/A      | Private repo, not published to npm                                                |
| `Z1` Gate         | enforced | `quality / Z1: Gate` required status check on `main`                              |

| Hook       | Current behavior                                                  | Required follow-up                                                               |
| ---------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| pre-commit | Index snapshot: typecheck, lint, `test:coverage`, staged Gitleaks | Negative snapshot/coverage rejection proof and <30s timing on reference hardware |
| pre-push   | Working-tree build/coverage/lint, OSV                             | L2+G2 on stdin push refs, <3min                                                  |

Install restores Husky. `lint-staged` configuration is unused. Hooks are check-only; never use `--no-verify` on commits or branch pushes.

## Resources / Isolation

Dev runs at 7002 (`https://dotty.dev.hexly.ai`) with mock data. Production serves static assets. Future L2/L3 must allocate a separate local server, fresh browser context/storage and scoped cleanup, without remote `-test` infrastructure.

## Operations / Release

Authorized maintainers update `package.json` and changelog, commit/push normally, verify CI and push the matching `vX.Y.Z` tag. `release.yml` uses the shared proven-source Worker deployment; tag/manual paths also prove the selected source rather than trusting a tag alone.
GitHub write and the exact `production` environment own deployment credentials. Confirm `GET https://dotty.hexly.ai/api/live` returns the intended version after a requested release; do not deploy from the laptop.

## Retrospective

Narratives stay in [Retrospective.md](Retrospective.md); keep recurring rules here, cross-project lessons in global rules/nmem, and deterministic requirements in hooks/tests.
