# Dotty

Pixel-brutalist React dashboard template (TypeScript 7, Vite 8, Tailwind/Radix, i18next, Recharts) hosted as a static SPA at `https://dotty.hexly.ai`.
Docs: [README.md](README.md) · [Accessibility Audit](docs/accessibility-audit.md) · [CHANGELOG.md](CHANGELOG.md) · [Retrospective](Retrospective.md)

## Commands

Run from root with Bun (`1.4.2`) and Node 24+. No `.env` file, backend account, or cloud credential is needed locally.

```sh
bun install --frozen-lockfile   # restores Husky via prepare
bun run dev                     # https://dotty.dev.hexly.ai -> 127.0.0.1:7002
bun run typecheck               # S1
bun run lint                    # S2 biome check --error-on-warnings
bun run test                    # vitest run
bun run test:coverage           # L1 >= 95% on models/viewmodels/lib
bun run test:e2e                # L4 Playwright smoke suite against dist/
bun run build                   # B1 emits dist/ incl. api/live.json
bun run preview
```

`build` emits `dist/` including `api/live.json`; `typecheck` alone does not build the SPA.

## Invariants

- Static SPA backed by `src/data/mock.ts` with no D1 database, business backend, or real login; never describe demo forms as production authentication.
- `package.json` `version` is the single version source, injected as `__APP_VERSION__` by Vite and Vitest (`vite.config.ts`, `vitest.config.ts`).
- `/api/live` is served by Vite middleware in dev and emitted as `dist/api/live.json` via `worker.js` in prod; preserve `{ status, version }` JSON and `Cache-Control: no-store`.
- Cloudflare Worker `theme-dotty` (`wrangler.toml`) serves `./dist` with SPA fallback (`run_worker_first = ["/api/live"]`).
- MVVM boundary: `src/viewmodels/` has no View/DOM imports and `src/pages/` stays thin (`src/models/`, `src/viewmodels/`, `src/lib/` hold logic/state); replace `src/data/mock.ts` deliberately when adapting.
- Preserve the cold-gray palette, squared frame/rounded-card hierarchy, pixel charts, and bilingual EN/ZH copy (`src/i18n/locales/`).
- Releases run via [pipeline.yml](.github/workflows/pipeline.yml) (`deploy` job, `D1`–`D5` via `deploy-worker.yml` on `main` push after `quality / Z1: Gate` passes, or `workflow_dispatch` with `deploy=true`; reuses `dotty-dist` without rebuilding and verifies `https://dotty.hexly.ai/api/live`); never run a laptop `wrangler deploy`.
- Release authorization requires bumping `package.json` and `CHANGELOG.md`, passing CI, pushing to `main`, and confirming `GET https://dotty.hexly.ai/api/live` returns the target version.

## Quality & Local Gates

Follows `system1-quality`; CI slot definitions and pinned `base-ci` revision live in [quality-slots.yml](.github/workflows/quality-slots.yml) (called by [pipeline.yml](.github/workflows/pipeline.yml); `quality / Z1: Gate` required on `main`). Status vocabulary: `enforced`, `planned`, `manual`, `N/A`.

- **Exceptions / gaps**: `L2 Runtime` is `N/A` (static assets on Cloudflare Worker); `L3 Integration` (`/api/live` HTTP) is `planned`; `L4 E2E` (Playwright) and `P1 Package` (`wrangler deploy --dry-run`) are `enforced`.
- **Coverage boundary**: L1 enforces 95/95/95/95 on `src/models/`, `src/viewmodels/`, `src/lib/` (excl. `src/models/types.ts`); `src/pages/`, `src/components/`, and browser journeys need their own proof.
- **Local hooks**: Husky (`.husky/`, restored by `bun install`; `lint-staged` is unused) is check-only; never use `--no-verify`.
- **Hook scope & gaps**: `pre-commit` checks staged index (`S1/S2/G1/L1`; gap: negative rejection proof, <30s timing); `pre-push` runs working-tree `B1/L1/S2` + `G2` (gap: stdin pushed refs, <3min).

## Resources & Isolation

| Lane  | Endpoint / State                                                                              | Boundary                                                                   |
| ----- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Dev   | `127.0.0.1:7002` (`https://dotty.dev.hexly.ai`), mock data                                    | Local dev only (not port `7017`); no `.env` or remote state                |
| Tests | Vitest `jsdom`; L4 Playwright against local `dist` preview; future `L3` separate local server | Isolated browser context/storage + scoped cleanup; no remote `-test` infra |
| Prod  | `https://dotty.hexly.ai` (`theme-dotty` Worker)                                               | Read-only checks unless release is authorized; CI `pipeline.yml` only      |

## Retrospective

Record incident narratives in [Retrospective.md](Retrospective.md); promote recurring project constraints to `Invariants` above and enforceable safeguards to tests/hooks.
