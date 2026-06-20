# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Copilot, Codex, Gemini CLI, etc.) working in this repository. Rules here are derived **only** from `.eslintrc.js`, `tsconfig.json`, and the actual `src/` structure — do not invent rules. This file is the agent-agnostic source of truth; `.cursor/rules/architecture.mdc` is the same ruleset with full code shapes.

## Project overview

Bare **React Native CLI** starter (no Expo). New Architecture (Fabric + TurboModules + JSI) on by default. The architecture is enforced as **error-level ESLint + strict TypeScript**, so off-pattern code fails `npm run validate` rather than landing silently.

Stack: RN 0.85.3, TypeScript 5.8 strict, React Navigation 7, TanStack Query 5, Zustand 5, Axios, react-native-mmkv 4, React Hook Form 7 + Zod 4.

## Setup & validation commands

```bash
npm install
cp .env.example .env.development
npm run validate     # type-check + lint + format:check — the CI gate
npm run ios          # or: npm run android
npm test             # Jest
```

Always run `npm run validate` before considering a change done. Generated code must pass type-check, lint, and format with zero errors.

## Hard rules (enforced — a violation fails CI)

- **Named exports only.** `import/no-default-export` is `error`. No `export default` in `src/`.
- **No circular imports.** `import/no-cycle` is `error`. `import type` is exempt — prefer it for cross-layer types.
- **No `any`.** `@typescript-eslint/no-explicit-any` is `error`. Use `unknown` and narrow, or a precise type.
- **Type-only imports use `import type`.** `@typescript-eslint/consistent-type-imports` is `error`.
- **Screens must not import repositories.** `import/no-restricted-paths` blocks `features/*/screens` → `features/*/repositories`. A screen reaches data only through a hook.
- **TypeScript strict.** `strict`, `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns` all on. No unused imports/vars/params; handle `string | undefined` from storage reads; every code path returns.

## Conventions (follow unless told otherwise)

- **No `console.*`** (`no-console` is `warn`; only `console.warn`/`console.error` allowed). Use `logger` from `@/utils/logger` — it is `__DEV__`-gated.
- **Explicit return types** on named functions and exported hooks, e.g. `(): React.JSX.Element`, `(): UseQueryResult<Post[], Error>`.

## Layering (do not cross)

```
Screen → Hook → Repository (apiClient + TanStack Query)
              → Store (Zustand: client/UI/auth state)
```

| Layer | Owns | Must NOT |
|---|---|---|
| `features/*/screens/*Screen.tsx` | JSX, layout, events; composes a hook | call repositories / `apiClient` / `storage`; hold business logic |
| `features/*/hooks/use-*.ts` | stateful logic, side effects | render JSX |
| `features/*/repositories/*.repository.ts` | API via `apiClient`, returns plain data | `useState`/side effects; touch stores or UI |
| `features/*/store/*.store.ts`, `src/stores/*` | client/UI/auth state (Zustand + MMKV) | hold server state |
| `services/api/*` | Axios instance + interceptors | business logic |

Server state = TanStack Query. Client state = Zustand. They do not mix.

## File layout & imports

- Path alias `@/` → `src/`. Use `@/...` across modules; relative `../` is fine within a feature.
- **Storage:** import `{ storage, StorageKeys }` from `@/utils/storage`. Never import `react-native-mmkv` directly; never inline string keys.
- **Env:** read from `@/app/config/env` (Zod-validated at startup).
- **Theme:** `useTheme()` from `@/hooks/use-theme`.

## Adding a feature (the only correct flow)

Create `src/features/{name}/{components,hooks,repositories,screens,types}/`, then:

1. `types/{name}.types.ts` — Zod schemas; infer TS types from them.
2. `repositories/{name}.repository.ts` — API via `apiClient`, return plain data.
3. `hooks/use-{name}.ts` — combine repository + store + local state.
4. `screens/{Name}Screen.tsx` — JSX only.
5. Register in `navigation/AuthNavigator.tsx` or `AppNavigator.tsx`; add params to `navigation/types.ts`.

See `docs/ai-prompts/` for copy-paste task prompts and `.cursor/rules/architecture.mdc` for the full ruleset with code shapes.

## Security & secrets

- Never commit secrets. `.env.*` files hold config; real secrets stay out of git.
- The API client injects the `Authorization` header from MMKV and clears it on 401 — don't bypass the interceptor.

## Do not touch / scope

- Don't add Expo, a UI kit, Firebase/Supabase, or Redux/Jotai/Recoil — these are deliberate non-goals (see README).
- Don't disable New Architecture or swap in New-Arch-incompatible libraries.
- Don't relax the ESLint/TS rules above to make code pass — fix the code instead.
