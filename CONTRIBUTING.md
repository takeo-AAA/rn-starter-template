# Contributing

Thank you for your interest in contributing to RN Starter Template.

This document covers what contributions are accepted, how to submit them, and what the review bar looks like. Read it before opening a PR.

---

## Scope

This repository is a **Phase 1 MVP template**. The scope is intentionally constrained.

**In scope (PRs accepted):**
- Bug fixes in existing features (auth, navigation, API client, storage, theme, forms)
- Documentation improvements (README, CONTRIBUTING, code comments)
- Dependency version updates that maintain New Architecture compatibility
- Tooling improvements (ESLint rules, TypeScript config, Jest setup)

**Out of scope (PRs will be closed without merge):**

| Feature | Reason |
|---|---|
| Push notifications (FCM, APNs) | Phase 2 |
| Keychain / secure token storage | Phase 2 |
| Token refresh interceptor | Phase 2 |
| Deep linking | Phase 2 |
| Fastlane | Phase 3 |
| CI/CD workflows | Phase 3 |
| OTA update integration | Phase 3 |
| New UI screens or features | Outside template scope |
| Third-party UI library integration | Outside template scope |
| State management library replacement | Architectural decision, not open for change |

If you want to discuss roadmap items, open a [feature request issue](https://github.com/takeo-AAA/rn-starter-template/issues/new?template=feature_request.md) instead.

---

## Before You Open a PR

1. **Check existing issues and PRs.** Duplicate work wastes everyone's time.
2. **Open an issue first for non-trivial changes.** Bug fixes with a clear reproduction can skip this. Anything that touches architecture, adds dependencies, or changes public interfaces needs prior discussion.
3. **Confirm your change is in scope** (see table above).

---

## Development Setup

```bash
git clone https://github.com/takeo-AAA/rn-starter-template.git
cd rn-starter-template
npm install
cp .env.example .env.development
# Edit .env.development

# iOS
cd ios && bundle install && bundle exec pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

---

## Code Requirements

All PRs must pass the following before review:

```bash
npm run type-check    # 0 TypeScript errors
npm run lint          # 0 ESLint errors (warnings are acceptable)
npm run format:check  # Prettier formatting
npm run test          # All tests pass, 0 skipped
```

Shortcut:

```bash
npm run validate && npm run test
```

**Do not submit PRs with failing checks.** CI will block the merge; fixing it after opening wastes reviewer time.

---

## Architecture Rules

All contributions must respect the layer boundaries defined in the README.

| Layer | Owns | Never |
|---|---|---|
| `screens/` | JSX, layout, user events | Business logic, direct API calls |
| `hooks/` | Stateful logic, side effects | Direct JSX |
| `repositories/` | API calls, response mapping | UI concerns, stores |
| `stores/` | UI state, auth state | Server state |
| `components/ui/` | Reusable primitives | Navigation, API calls, feature stores |

**Named exports only.** `import/no-default-export` is enforced by ESLint.  
**No `any`.** Use `unknown` and narrow with type guards.  
**No `console.*`.** Use `logger` from `@/utils/logger`.  
**No circular imports.** `import/no-cycle` is a build error.

---

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

[optional body]
```

| Type | Use for |
|---|---|
| `fix` | Bug fix |
| `feat` | New feature within Phase 1 scope |
| `docs` | Documentation only |
| `chore` | Dependency updates, tooling |
| `refactor` | Code change with no behavior change |
| `test` | Tests only |

Examples:
```
fix(auth): clear Zustand store on 401 in addition to MMKV
docs(readme): add --env-file usage for staging builds
chore(deps): bump axios to 1.17.0
```

---

## Pull Request Process

1. Fork the repository and create a branch from `main`.
2. Make your changes following the requirements above.
3. Fill in the PR template completely — incomplete templates will be closed.
4. A maintainer will review within a reasonable time. Reviews may request changes.
5. Squash or rebase before merge if requested.

---

## Dependency Policy

- New runtime dependencies require justification: what problem it solves, why existing tools can't handle it, New Architecture compatibility confirmation.
- Dev dependencies (linting, testing) have a lower bar but still require justification.
- Dependencies that are not New Architecture compatible will not be accepted.

---

## Publishing Checklist (maintainers only)

Before pushing a new release or publishing to npm, verify the following:

```bash
# 1. Check npm package name availability
npm info rn-starter-template

# 2. Confirm no real secrets are tracked
git ls-files | grep -E "\.env\." | grep -v ".env.example"

# 3. Confirm all URLs in documentation match the actual repository
grep -r "takeo-AAA" . --exclude-dir=node_modules --exclude-dir=.git

# 4. Run full validation
npm run validate && npm run test
```

---

## License

By submitting a contribution, you agree that your contribution is licensed under the [MIT License](LICENSE) and that you have the right to grant that license.
