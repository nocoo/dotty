# Dotty

Pixel-brutalist dashboard template (Vite SPA on Cloudflare Workers assets). Live: `https://dotty.hexly.ai`.
Profile: ts-worker-web
Direction: [README.md](README.md). No numbered `docs/01`. Frameworks must not rewrite this file.

## Sources of Truth

This file is the **contract**. Hooks, CI, and config are **enforcement**. If they disagree, raise enforcement; never lower this file.

| Fact | Where |
|---|---|
| Agent handbook | this file |
| Human docs | README.md, CHANGELOG.md, `docs/accessibility-audit.md` |
| Version | `package.json` `"version"` (`__APP_VERSION__` in Vite/Vitest) |
| Enforcement | `.husky/*`, `.github/workflows/{ci,release}.yml`, `vitest.config.ts` |
| Machine rules | global `AGENTS.md`, `rules/git-commit.md` |
| Accidents | [Retrospective.md](Retrospective.md) |
| Env files | omit |

## Project Invariants

- Static SPA + mock data (`src/data/mock.ts`). No D1, no auth, no real backend. `/api/live` is Vite middleware only.
- Wrangler worker name is `theme-dotty`; `[assets]` is `./dist`. Do not laptop-`wrangler deploy` — CD is `release.yml`.
- Dev server port **7002** (`vite.config.ts`), host `dotty.dev.hexly.ai`. README must not say 7017.
- Coverage gate is models/viewmodels/lib only (`vitest.config.ts` `include`). Pages/components are not in the 95% denominator.
- MVVM: viewmodels have no View/DOM imports; pages stay thin.
- `lint-staged` in package.json is unused. pre-commit runs full `lint` + `test` (no coverage) + gitleaks.

## Stack / Layout

| Component | Choice |
|---|---|
| Language | TypeScript 7 strict |
| Package manager | Bun (`packageManager` bun@1.3.6; CD 1.3.11; CI bun-quality default `latest`) |
| Runtime | Vite 8 SPA; CF Workers assets (`theme-dotty`) |
| Lint | Biome `check --error-on-warnings .` |
| Tests | Vitest L1 95% all four on models/viewmodels/lib |
| Data | mock only |

```
src/pages/  src/viewmodels/  src/models/  src/components/
src/data/mock.ts
```

## Commands

```bash
bun run dev
bun run typecheck
bun run lint
bun run build
bun run test
bun run test:coverage
```

## Verification

Status: `enforced` | `planned` | `manual` | `N/A`. `enforced` Evidence = hook/CI/config/script.

Org gaps: index-snapshot pre-commit; stdin-range pre-push; `.skip`/`.only`; coverage on pre-commit; CI typecheck (`typecheck-command: "true"` skips it).

Today: pre-commit typecheck/lint/`test`/gitleaks `--staged` on the working tree. pre-push `build` + `test:coverage` + `lint` + osv. CI bun-quality `@aec4adc1a817c56790d1698329ef9398a15a754a` (v2026.5): build, `test:coverage`, gitleaks, osv; typecheck skipped.

| Change | Proof | Status | Evidence |
|---|---|---|---|
| Logic | L1 vitest ≥95% on models/viewmodels/lib | enforced | pre-push + CI `test:coverage`; `vitest.config.ts`. pre-commit `test` has no thresholds |
| API L2 | — | N/A | — |
| UI L3 | Playwright | N/A | — |
| Types / lint | tsc + Biome 0 warning | enforced | pre-commit typecheck + lint (working tree). CI lint only |
| G2 secrets | gitleaks | enforced | pre-commit `--staged`; CI bun-quality |
| G2 deps | osv `bun.lock` | enforced | pre-push; CI bun-quality |
| Bundler | `vite build` → `dist/` | enforced | pre-push `build`; CI pre-command; CD `release.yml` |
| Docs | README if public UI contract changes | manual | human review |
| Release | tag `vX.Y.Z` == package.json; CD deploy | enforced | `.github/workflows/release.yml` |

| Hook | Org bar | Status | Evidence |
|---|---|---|---|
| pre-commit | index snapshot | planned | — |
| pre-push | stdin ref range | planned | — |

`--no-verify` forbidden on commits and branch pushes. Tag-only may skip.

## Resources / Isolation

| Purpose | Port / resource | Isolation |
|---|---|---|
| Dev | 7002 `https://dotty.dev.hexly.ai` | mock data; no prod stores |
| Prod | `https://dotty.hexly.ai` (`theme-dotty`) | static assets |

## Operations / Release

- Entry: bump `package.json` + CHANGELOG.md, commit, push `main`, wait CI, then push tag `vX.Y.Z`. Who: GitHub write + `production` Environment.
- Tag push deploys immediately (no CI wait). `main` CD waits CI-green. Do not laptop-`wrangler deploy`.
- Live-check: `https://dotty.hexly.ai`.

## Retrospective

| Kind | Where |
|---|---|
| Accident narrative | [Retrospective.md](Retrospective.md) |
| Recurring project rule | one line here (cap ~10) |
| Checkable rule | hook or test |

- Dev port is 7002, not 7017.
- Coverage is models/viewmodels/lib only.
