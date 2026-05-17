## Summary

<!-- What does this PR do and why? Link to the related issue if applicable. Fixes #___ -->

## Type of Change

- [ ] Bug fix
- [ ] Documentation update
- [ ] Dependency update
- [ ] Tooling / DX improvement
- [ ] Other (describe):

## Checklist

**Quality gates — all must pass before requesting review:**

- [ ] `npm run type-check` — 0 errors
- [ ] `npm run lint` — 0 errors
- [ ] `npm run format:check` — passes
- [ ] `npm run test` — all pass, 0 skipped

**Architecture:**

- [ ] Screens contain JSX only — no direct API calls, no repository imports
- [ ] Business logic is in hooks, not screens
- [ ] No new `any` types introduced — used `unknown` where needed
- [ ] No `console.*` calls — used `logger` util
- [ ] No circular imports introduced
- [ ] Named exports only (no default exports)

**Scope:**

- [ ] This change is within Phase 1 scope (see [CONTRIBUTING.md](../CONTRIBUTING.md))
- [ ] No new runtime dependencies added (or justified below)

**If UI changes:**

- [ ] Tested on iOS simulator
- [ ] Tested on Android emulator
- [ ] Screenshots attached below

---

## Screenshots (if applicable)

| Before | After |
|---|---|
| | |

## Notes for Reviewer

<!-- Anything the reviewer should know: edge cases, follow-up items, decisions made. -->
