# AI Prompt Collection (Claude Code / Cursor / Copilot Chat)

Copy-paste prompt templates for building on this **bare React Native CLI** starter without breaking its enforced architecture.

Every rule referenced here is enforced by `npm run validate` (TypeScript strict + ESLint). The lint/type gate mechanically rejects the most common ways an AI agent drifts off the architecture — default exports, `any`, circular imports, and screens calling repositories directly. These prompts simply make the agent aim for the patterns the gate already requires, so generated code passes on the first run.

## How to use

1. Pick the closest template below.
2. Fill in the `{...}` placeholders.
3. Paste it to Claude Code / Cursor / Copilot Chat.
4. Tell the agent to finish with `npm run validate` and fix anything it reports.

The single source of truth for the rules is:
- `.cursor/rules/architecture.mdc` (Cursor)
- `.github/copilot-instructions.md` (Copilot)
- This folder (Claude Code)

All three are generated from the same facts in `.eslintrc.js`, `tsconfig.json`, and the `src/` layout. If a rule changes, update all three.

## Always-true context to keep in mind

- Bare React Native CLI (no Expo). New Architecture on by default.
- Named exports only. No `any`. No circular imports. `import type` for type-only imports.
- Layering: **Screen → Hook → Repository (apiClient + TanStack Query) / Store (Zustand)**.
- Screens never call repositories, `apiClient`, or `storage` directly.
- Server state = TanStack Query. Client state = Zustand. They do not cross.
- Path alias `@/` → `src/`. Storage only via `@/utils/storage`. Validated env via `@/app/config/env`.
- Finish with `npm run validate` (type-check + lint + format). It is the CI gate.

## Templates

- [`add-screen.md`](./add-screen.md) — add a screen wired to an existing or new feature.
- [`add-feature.md`](./add-feature.md) — scaffold a full feature module (types → repository → hook → screen → navigation).
- [`add-form-screen.md`](./add-form-screen.md) — a form screen with React Hook Form + Zod validation.
- [`add-api-endpoint.md`](./add-api-endpoint.md) — add a repository method + TanStack Query hook for a new endpoint.
- [`review-architecture.md`](./review-architecture.md) — audit a diff/file against the enforced rules.
