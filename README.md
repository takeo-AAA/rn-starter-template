# RN Starter Template

A **bare React Native CLI** starter built for developers who let **AI coding agents** write the code.
It turns your project's architecture rules into **lint and type errors**, so when Claude Code, Cursor, or any agent drifts off-pattern, the build fails instead of the codebase rotting.
Minimal and lock-in free — no UI kit, no Firebase, no Redux — so the context an agent reads stays small and harder to drift in. Bare RN CLI with New Architecture verified across every dependency (not Expo — see [How it compares](#how-it-compares)).

![React Native](https://img.shields.io/badge/React_Native-0.85.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8_strict-3178C6?logo=typescript&logoColor=white)
![New Architecture](https://img.shields.io/badge/New_Architecture-enabled-22C55E)
![AGENTS.md](https://img.shields.io/badge/AGENTS.md-included-0EA5E9)
![Agent-friendly](https://img.shields.io/badge/AI_agents-guardrailed-8B5CF6)
![License](https://img.shields.io/badge/license-MIT-blue)

> **Honest scope:** lint and types catch the *majority* of agent mistakes — cross-layer edits, circular imports, `any`, default exports, screens reaching into data access — mechanically. They are not a formal architecture prover. This is a lightweight guardrail, not a sandbox. See [Built for AI coding agents](#built-for-ai-coding-agents).

---

## Built for AI coding agents

AI agents are productive until they quietly break your structure: a screen starts calling a repository directly, a circular import sneaks in, an `any` papers over a real type, and three commits later the layering is gone. The usual fixes — long style guides and PR review — are advisory, and agents (like people) skip them.

This starter makes the rules **non-advisory**. The architecture is encoded as `error`-level ESLint rules and `strict` TypeScript, so off-pattern code **fails `npm run validate`** rather than landing silently:

| What agents tend to do | What stops it here | Severity |
|---|---|---|
| Call a repository straight from a screen | `import/no-restricted-paths` (`screens/` → `repositories/` blocked) | **error** |
| Introduce a circular import | `import/no-cycle` (runtime imports only; `import type` exempt) | **error** |
| Reach for `any` to silence a type | `@typescript-eslint/no-explicit-any` | **error** |
| Add a `default export`, breaking import consistency | `import/no-default-export` | **error** |
| Ship code that doesn't actually type-check | `tsc --noEmit` with `strict`, `noUnusedLocals`, `noImplicitReturns` | **error** |
| Leave a stray `console.log` | `no-console` (`warn`, `error` allowed) | warn |

**Why a *bare, minimal* base helps the agent too:** no Firebase, no UI kit, no Redux means a smaller, more predictable context for the model to read — fewer competing patterns to imitate, less to get wrong. The same minimalism that keeps lock-in out keeps the agent on-rails.

The layer responsibilities, allowed imports, and naming rules live in [`AGENTS.md`](AGENTS.md) — the cross-agent standard read by Cursor, Copilot, Codex, and Claude Code — and in full in [Architecture](#architecture). Point your agent at `AGENTS.md`.

> **Shipped:** machine-readable agent config — [`AGENTS.md`](AGENTS.md) and `CLAUDE.md` in the repo root, `.cursor/rules/architecture.mdc`, and `.github/copilot-instructions.md` — all generated from the same enforced rules, so editor and CLI agents get identical guidance. Task prompt templates: [`docs/ai-prompts/`](docs/ai-prompts/).

---

## Why this starter exists

Most React Native starters fall into one of two traps: a bare CLI output with nothing useful, or so loaded with opinions that stripping them costs more than starting fresh. The free, popular ones (Ignite, Obytes) also assume **Expo** — a different world if you want a bare, native New Architecture setup.

This one occupies the middle ground production teams actually need, and adds a guardrail layer that matters when an agent is at the keyboard:

- **Enough structure to ship without rewriting** — feature-based directories, typed navigation, a real API client with interceptors, MMKV-backed auth persistence.
- **Architecture enforced, not suggested** — the layering above isn't a convention you hope everyone follows; it's `error`-level lint + strict types that fail the build. Humans and agents get the same hard stop.
- **Nothing you'll have to rip out** — no Firebase, no UI-kit lock-in, no state management for cases that don't need it. Everything here earns its place.
- **Every dependency verified New-Architecture-compatible** — New Arch is the default across the ecosystem now; the value here is that nothing in the dependency list will force a painful migration or a "works on old arch, breaks on new arch" wall mid-project.

---

## How it compares

Positioning, not a leaderboard — pick what fits your project. Star counts and prices are point-in-time and will drift.

| | This starter | Ignite | Obytes | Paid bundles ($179–499) |
|---|---|---|---|---|
| Base | **bare RN CLI (no Expo)** | Expo (bare possible) | Expo + Expo Router | Expo / RN |
| New Architecture | **assumed, day one** | depends on RN version | depends on Expo SDK | varies |
| Architecture enforced by lint/types as `error` | **yes** (no-cycle, no-default-export, no-any, screen→repo) | no | no | varies |
| Built around AI agents writing the code | **yes (core thesis)** | not a focus | `claude.md` included | some market to "AI founders" |
| Lock-in (UI kit / backend / state lib) | **none** | MobX-State-Tree | Nativewind | high (payments, SaaS, admin) |
| Price | **free (MIT)** | free (MIT) | free (MIT) | $179–499 |

Where each shines: **Ignite** for maturity and generators; **Obytes** if you're happy on Expo + Nativewind; **paid bundles** if you want payments/auth/SaaS pre-built. **This starter** if you want a minimal, agent-guardrailed base — bare RN CLI, no lock-in — whose structure an AI agent can't quietly dismantle. If you'd rather have Expo's tooling and don't need a bare native setup, pick one of the Expo-based options above; that's the right call for most new projects.

---

## Production-Ready Philosophy

| Principle | What it means here |
|---|---|
| **Type safety is non-negotiable** | `strict: true`, `noImplicitAny`, `noUnusedLocals`. TypeScript errors are CI failures. |
| **`any` is a build error** | ESLint `@typescript-eslint/no-explicit-any` is set to `error`. Use `unknown`. |
| **No circular dependencies** | `import/no-cycle` blocks them at lint time, not at runtime when they're hard to trace. |
| **Named exports only** | `import/no-default-export` — consistent import style, better tree-shaking, easier refactors. |
| **Screens are dumb** | Business logic lives in hooks, not JSX. Screens receive state and handlers; they never call repositories directly. |
| **Server state ≠ client state** | TanStack Query owns server state. Zustand owns UI state. They do not cross. |
| **No console.log in production** | `no-console` lints `console.*` (`warn`, `error` allowed); the `logger` util is gated on `__DEV__` so nothing leaks to production logs. |
| **Env validation at startup** | Zod validates all env vars before the app mounts. Missing vars crash fast with a readable error, not a mysterious `undefined` deeper in the stack. |

---

## Features

Ordered by what you get out of it, not by where it lives in the tree.

**Stay on-pattern automatically**
- **Enforced architecture** — `error`-level ESLint (`import/no-cycle`, `import/no-default-export`, `@typescript-eslint/no-explicit-any`, `screens/` → `repositories/` blocked) plus `strict` TypeScript. Off-pattern code fails `npm run validate`; you (or your agent) find out at commit time, not in review.
- **One command to verify everything** — `npm run validate` runs type-check + lint + format. Green means the structure held.

**Skip the boring setup**
- **Working auth flow, end to end** — Splash → MMKV hydration → authenticated/unauthenticated stacks. Token persistence survives restarts. Wire your endpoints and go.
- **Runs without a backend** — Axios adapter mocks `/auth/login`, `/auth/logout`, and `/posts` in dev, so the app boots and the flows work on a fresh clone.
- **Real API client included** — Axios with request/response interceptors: `Authorization` header injection, `401` auto-clear, dev-only logging.
- **Fail-fast config** — Zod validates all env vars at startup; a missing/malformed var crashes with a readable error instead of a silent `undefined` deep in the stack.

**Type-safe by default**
- **Typed navigation** — React Navigation 7 with `RootStackParamList`, `AuthStackParamList`, `AppTabParamList`. Route params are checked end to end.
- **Schema-first forms** — React Hook Form + Zod v4; `loginSchema` is the single source for both runtime validation and inferred TypeScript types.
- **Server vs client state, separated** — TanStack Query v5 (typed query keys, `UseQueryResult<T>`) for server state; Zustand v5 for auth and UI state. They don't cross.

**Fast and predictable at runtime**
- **New Architecture** — Fabric, TurboModules, JSI enabled by default on Android and iOS; all libraries chosen for compatibility.
- **MMKV storage** — synchronous, JSI-based, via a typed wrapper with a central `StorageKeys` enum. No hydration flicker, no raw MMKV imports in features.
- **Theme that doesn't flash** — light/dark/system modes, `ColorTokens`-typed palette, persisted to MMKV and restored before first paint.
- **Hermes** — enabled on Android for faster startup and lower memory.

**Quality-of-life**
- **Error boundary** — top-level `ErrorBoundary` catches render errors and prevents blank screens.
- **Path aliases** — `@/` → `src/`, configured in both `tsconfig.json` and Babel.

---

## Stack

| Category | Library | Version |
|---|---|---|
| Framework | React Native | 0.85.3 |
| Language | TypeScript | 5.8 (strict) |
| Navigation | React Navigation | 7.x |
| Server State | TanStack Query | 5.100.10 |
| Client State | Zustand | 5.0.13 |
| HTTP | Axios | 1.16.1 |
| Storage | react-native-mmkv | 4.3.1 |
| Forms | React Hook Form | 7.76.0 |
| Validation | Zod | 4.4.3 |
| Native Modules | react-native-nitro-modules | 0.35.6 |
| Gestures | react-native-gesture-handler | 2.24.0 |

---

## Screenshots

> Not captured yet. Drop PNGs into `docs/screenshots/` and uncomment the block below.
> Planned set: Login, Home (list), Settings (light), Settings (dark).

<!-- Uncomment once the files exist in docs/screenshots/:
| Login | Home | Settings (light) | Settings (dark) |
|---|---|---|---|
| ![Login](docs/screenshots/login-light.png) | ![Home](docs/screenshots/home-light.png) | ![Settings light](docs/screenshots/settings-light.png) | ![Settings dark](docs/screenshots/settings-dark.png) |
-->

---

## Quick Start

```bash
# Option A: clone with full git history
git clone https://github.com/takeo-AAA/rn-starter-template.git my-app
cd my-app

# Option B: degit — files only, no git history (recommended for new projects)
npx degit takeo-AAA/rn-starter-template my-app
cd my-app
git init

# Both options: install and configure
npm install
cp .env.example .env.development

# Confirm the guardrails pass on a clean checkout
npm run validate
```

Edit `.env.development`, then continue to platform-specific setup below.

**Using an AI agent?** Point its instructions at the [Architecture](#architecture) and [Built for AI coding agents](#built-for-ai-coding-agents) sections, and have it run `npm run validate` before every commit — that's the gate that keeps generated code on-pattern.

---

## Setup

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | >= 22.11.0 | `node --version` |
| npm | >= 10 | bundled with Node 22 |
| JDK | 17 | Android only. OpenJDK 17 recommended. |
| Android SDK | API 35 (VanillaIceCream) | via Android Studio SDK Manager |
| Xcode | 16+ (latest) | iOS only. App Store or developer.apple.com |
| CocoaPods | >= 1.15 | `sudo gem install cocoapods` or `brew install cocoapods` |
| Ruby | >= 3.0 | Required for CocoaPods via Bundler |

Verify your environment:

```bash
npx react-native doctor
```

---

## Environment Variables

React Native CLI 20.x loads `.env` files via the `--env-file` flag passed to `react-native start` (or `run-ios` / `run-android`). Three env files are provided:

| File | Purpose | Loaded by |
|---|---|---|
| `.env.development` | Local dev | `--env-file .env.development` (default for `npm start`) |
| `.env.staging` | Staging builds | `--env-file .env.staging` |
| `.env.production` | Production builds | `--env-file .env.production` |

Copy the example and fill in your values:

```bash
cp .env.example .env.development
# edit .env.development
```

To run against a specific env:

```bash
# Start Metro with staging env
npx react-native start --env-file .env.staging

# Or pass directly to run commands
npx react-native run-ios --env-file .env.staging
npx react-native run-android --env-file .env.staging
```

`.env.example`:

```bash
API_BASE_URL=https://api.example.com   # Required. Must be a valid HTTPS URL.
API_TIMEOUT=10000                       # Milliseconds. Default: 10000.
APP_ENV=development                     # development | staging | production
```

All env vars are validated with Zod at startup (`src/app/config/env.ts`). A missing or malformed variable throws immediately with a structured error — not a silent `undefined` at runtime.

**Gitignore**: `.env.development`, `.env.staging`, `.env.production` contain real values and must not be committed. Add them to `.gitignore`. Only `.env.example` (containing no real secrets) should be tracked.

```bash
# .gitignore
.env.development
.env.staging
.env.production
```

> **Security**: Never store secrets (private keys, payment credentials, signing secrets) in env files. Env vars are bundled into the app binary and readable by anyone who unpacks the APK or IPA. Route sensitive operations through your backend.

---

## iOS Setup

```bash
# 1. Install Ruby dependencies (CocoaPods via Bundler)
bundle install

# 2. Install pods
cd ios && bundle exec pod install && cd ..

# 3. Run on simulator
npx react-native run-ios

# Run on a specific simulator
npx react-native run-ios --simulator="iPhone 16"

# Run on a physical device
npx react-native run-ios --device "Your Device Name"
```

**Minimum iOS version**: `min_ios_version_supported` (React Native 0.85.3 → iOS 15.1).

**New Architecture**: Enabled by default via RN 0.85.3. To disable (not recommended):

```ruby
# ios/Podfile
ENV['RCT_NEW_ARCH_ENABLED'] = '0'
```

**Common issues**: See [Troubleshooting](#troubleshooting).

---

## Android Setup

```bash
# Run on emulator or connected device
npx react-native run-android

# Target a specific device
npx react-native run-android --deviceId emulator-5554

# Release build
npx react-native run-android --mode=release
```

**SDK target**: API 35 (Android 15 VanillaIceCream).  
**Min SDK**: API 24 (Android 7.0) — set in `android/build.gradle`.

**New Architecture**: `newArchEnabled=true` in `android/gradle.properties`.  
**Hermes**: `hermesEnabled=true` in `android/gradle.properties`.

To disable New Architecture (not recommended):

```properties
# android/gradle.properties
newArchEnabled=false
```

**JVM memory**: Default is `-Xmx2048m`. Increase if Gradle runs out of heap on large builds:

```properties
# android/gradle.properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
```

---

## Folder Structure

```
src/
├── app/
│   ├── config/
│   │   └── env.ts                    # Zod-validated env vars — single source of truth
│   └── providers/
│       └── AppProvider.tsx           # Root provider (QueryClient + NavigationContainer + SafeArea)
│
├── features/                         # Feature-based modules — self-contained by design
│   ├── auth/
│   │   ├── components/
│   │   │   └── login-form.tsx        # Form UI only — no business logic
│   │   ├── hooks/
│   │   │   └── use-auth.ts           # login/logout state machine
│   │   ├── repositories/
│   │   │   └── auth.repository.ts    # API calls only (login, logout, refreshToken)
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx       # Composes login-form.tsx + useAuth
│   │   │   └── SplashScreen.tsx      # Shown during MMKV hydration
│   │   ├── store/
│   │   │   └── auth.store.ts         # Zustand: isAuthenticated, user, MMKV persistence
│   │   └── types/
│   │       └── auth.types.ts         # LoginInput (Zod schema + inferred type), User, AuthTokens, AuthState
│   │
│   ├── home/
│   │   ├── hooks/
│   │   │   └── use-home-data.ts      # TanStack Query wrapper — returns UseQueryResult<Post[]>
│   │   ├── repositories/
│   │   │   └── home.repository.ts    # getPosts() → apiClient.get('/posts')
│   │   ├── screens/
│   │   │   └── HomeScreen.tsx        # FlatList consuming useHomeData
│   │   └── types/
│   │       └── home.types.ts
│   │
│   └── settings/
│       └── screens/
│           └── SettingsScreen.tsx    # Theme switcher (light / dark / system)
│
├── components/
│   ├── ui/                           # Shared UI primitives — no navigation, no API calls
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Text.tsx
│   │   ├── TextInput.tsx
│   │   └── index.ts                  # Barrel export
│   └── layouts/
│       └── SafeAreaLayout.tsx
│
├── hooks/
│   ├── use-auth.ts                   # Re-export from features/auth — single public API
│   └── use-theme.ts                  # Returns { colors, isDark, mode }
│
├── navigation/
│   ├── RootNavigator.tsx             # Auth <-> App switching based on isAuthenticated
│   ├── AuthNavigator.tsx             # Stack: Login
│   ├── AppNavigator.tsx              # BottomTabs: Home, Settings
│   └── types.ts                      # RootStackParamList, AuthStackParamList, AppTabParamList
│
├── services/
│   └── api/
│       ├── axios.client.ts           # Axios instance + request/response interceptors
│       └── api.types.ts              # ApiResponse<T>, ApiError, PaginatedResponse<T>
│
├── stores/
│   ├── theme.store.ts                # ThemeMode ('light' | 'dark' | 'system') + MMKV persistence
│   └── app.store.ts                  # Global UI state (e.g., isOnline)
│
├── theme/
│   ├── colors.ts                     # ColorTokens — light + dark palettes
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   └── index.ts
│
├── types/
│   └── global.d.ts                   # __DEV__, process.env type declarations
│
└── utils/
    ├── storage.ts                    # MMKV v4 typed wrapper + StorageKeys enum
    └── logger.ts                     # Dev-only logger (__DEV__ gate, no-op in production)
```

---

## Architecture

### Data Flow

```
Screen
  └── Hook (useAuth, useHomeData, useTheme)
        ├── Repository (API calls via apiClient)   ← server state via TanStack Query
        └── Store (Zustand)                        ← client state (auth, theme, UI)
```

Screens never call repositories directly. Hooks are the boundary between UI and data.

### Layer Responsibilities

| Layer | Owns | Never touches |
|---|---|---|
| `screens/` | JSX, layout, user events | Business logic, direct API calls |
| `hooks/` | Stateful logic, side effects | Direct JSX rendering |
| `repositories/` | API calls, response mapping | UI concerns, stores |
| `stores/` | UI state, auth state | Server state (use TanStack Query) |
| `components/ui/` | Reusable primitives | Navigation, API calls, feature stores |
| `services/api/` | Axios instance, interceptors | Business logic |

### Enforced Rules

**ESLint:**

| Rule | Severity | Effect |
|---|---|---|
| `import/no-restricted-paths` | error | `screens/` cannot import `repositories/` — screens go through hooks, never straight to data access |
| `import/no-cycle` | error | Runtime circular imports fail the build. Type-only imports don't count: `consistent-type-imports` forces `import type`, which carries no runtime dependency |
| `import/no-default-export` | error | Named exports only across the codebase |
| `@typescript-eslint/no-explicit-any` | error | Use `unknown`; `any` fails lint |
| `@typescript-eslint/consistent-type-imports` | error | Type imports must use `import type` |
| `no-console` | warn | Use the `logger` util; `console.*` (except `warn`/`error`) is flagged |

**TypeScript (`tsconfig.json`):**

| Flag | Value |
|---|---|
| `strict` | `true` |
| `noImplicitAny` | `true` |
| `strictNullChecks` | `true` |
| `noUnusedLocals` | `true` |
| `noUnusedParameters` | `true` |
| `noImplicitReturns` | `true` |

### Path Aliases

`@/` resolves to `src/`. Configured in both `tsconfig.json` and `babel.config.js` via `babel-plugin-module-resolver`.

```ts
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/services/api/axios.client';
import { storage, StorageKeys } from '@/utils/storage';
```

---

## Auth Flow

```
App cold start
    │
    ▼
AppProvider mounts
    │
    ▼
SplashScreen renders          ← isHydrated === false
    │
    ▼
useAuthStore.hydrate()        ← reads MMKV: AUTH_TOKEN + USER_PROFILE
    │
    ├── token found + user found
    │       │
    │       ▼
    │   isAuthenticated = true → AppNavigator (Home + Settings tabs)
    │
    └── token missing / user missing
            │
            ▼
        isAuthenticated = false → AuthNavigator (Login screen)
                │
                ▼
            User submits credentials (React Hook Form + Zod validation)
                │
                ▼
            useAuth.login()
                │
                ▼
            authRepository.login()  →  POST /auth/login
                │
                ▼
            setAuthenticated(user, accessToken, refreshToken)
                │   ├── stores token in MMKV (StorageKeys.AUTH_TOKEN)
                │   ├── stores refresh token (StorageKeys.REFRESH_TOKEN)
                │   └── stores user JSON (StorageKeys.USER_PROFILE)
                │
                ▼
            isAuthenticated = true → RootNavigator switches to AppNavigator
```

**Token injection**: Axios request interceptor reads `StorageKeys.AUTH_TOKEN` from MMKV on every request and sets `Authorization: Bearer {token}`.

**401 handling**: Axios response interceptor clears `AUTH_TOKEN` and `REFRESH_TOKEN` from MMKV on 401. Note: the Zustand `isAuthenticated` flag is NOT updated by the interceptor — only MMKV is cleared. The UI switches to the auth stack on the next screen mount that reads `isAuthenticated`, or when `clearAuth()` is called explicitly. If your app needs immediate redirect on 401, call `useAuthStore.getState().clearAuth()` inside the interceptor.

**Logout**: `useAuth.logout()` calls `POST /auth/logout` (best-effort — network failure does not block local clear), then `clearAuth()` which removes all MMKV keys and sets `isAuthenticated = false`.

---

## Theme System

```ts
import { useTheme } from '@/hooks/use-theme';

const MyComponent = () => {
  const { colors, isDark } = useTheme();
  return <View style={{ backgroundColor: colors.background }} />;
};
```

Switch mode programmatically:

```ts
import { useThemeStore } from '@/stores/theme.store';

const { setMode } = useThemeStore();
setMode('dark');    // 'light' | 'dark' | 'system'
```

Mode is persisted to MMKV (`StorageKeys.THEME_MODE`) and restored on cold start — no flash.

---

## API Client

The Axios instance at `src/services/api/axios.client.ts` handles:

- `Authorization: Bearer {token}` on every request (reads from MMKV)
- Dev-only request/response logging (`logger.debug`)
- `401` response → clears auth tokens from MMKV

Use `apiClient` only in `repositories/`. Never call it from screens or hooks directly.

```ts
// In a repository
import { apiClient } from '@/services/api/axios.client';
import type { ApiResponse } from '@/services/api/api.types';

const { data } = await apiClient.get<ApiResponse<User[]>>('/users');
// data.data is typed as User[]
```

**Response envelope**: All API responses are typed as `ApiResponse<T>`:

```ts
type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
```

**Dev mocks**: The client ships with Axios adapter mocks for `/auth/login`, `/auth/logout`, and `/posts`. The app works out of the box without a backend. Remove or replace these in production.

---

## Storage

Always import from `@/utils/storage`. Never import `react-native-mmkv` directly in feature code.

```ts
import { storage, StorageKeys } from '@/utils/storage';

// Write
storage.setString(StorageKeys.AUTH_TOKEN, token);
storage.setBoolean('some_flag', true);

// Read
const token = storage.getString(StorageKeys.AUTH_TOKEN); // string | undefined

// Delete — returns boolean (MMKV v4)
storage.remove(StorageKeys.AUTH_TOKEN);
```

All storage keys are in `StorageKeys` const object. Add new keys there — not as inline strings.

---

## Adding a New Feature

1. Create `src/features/{name}/` with:

   ```
   components/
   hooks/
   repositories/
   screens/
   types/
   ```

2. Define types in `types/{name}.types.ts` — use Zod schemas for input validation, infer TypeScript types from them.

3. Add API calls in `repositories/{name}.repository.ts`. Return plain data — no `useState`, no side effects.

4. Wrap logic in `hooks/use-{name}.ts`. This is the only layer that combines repositories, stores, and local state.

5. Build screen in `screens/{Name}Screen.tsx`. JSX only. No `axios`, no `storage`, no business logic.

6. Register screen in the appropriate navigator (`AuthNavigator.tsx` or `AppNavigator.tsx`).

7. Add route types to `navigation/types.ts`.

**Pattern to follow:**

```ts
// repositories/posts.repository.ts
export const postsRepository = {
  async getAll(): Promise<Post[]> {
    const { data } = await apiClient.get<ApiResponse<Post[]>>('/posts');
    return data.data;
  },
} as const;

// hooks/use-posts.ts
export const usePosts = (): UseQueryResult<Post[], Error> =>
  useQuery({ queryKey: ['posts'], queryFn: postsRepository.getAll });

// screens/PostsScreen.tsx
export const PostsScreen = (): React.JSX.Element => {
  const { data, isLoading, error } = usePosts();
  // JSX only
};
```

---

## Validation Commands

Run all checks before pushing:

```bash
npm run type-check     # tsc --noEmit (0 errors required)
npm run lint           # ESLint — import/no-cycle, no-explicit-any, no-console
npm run format:check   # Prettier
npm run test           # Jest
```

Or run all at once:

```bash
npm run validate       # type-check + lint + format:check (no tests)
npm run validate && npm run test   # full pre-push check
```

---

## Troubleshooting

### Metro bundler not picking up env changes

Metro caches env vars at startup. After editing an `.env.*` file:

```bash
npx react-native start --reset-cache
```

### iOS: `pod install` fails with Ruby version errors

Use Bundler to pin CocoaPods to the version in `Gemfile.lock`:

```bash
bundle install
bundle exec pod install
```

Do not run bare `pod install` — it may use a system CocoaPods version that differs from what the project expects.

### iOS: Module not found after adding a native library

```bash
cd ios && bundle exec pod install && cd ..
```

Then rebuild. Metro hot reload does not pick up new native modules.

### Android: `JAVA_HOME` not set or wrong JDK

```bash
# Verify JDK 17 is active
java -version
# Should print: openjdk version "17.x.x"

# If not, set JAVA_HOME explicitly
export JAVA_HOME=/path/to/jdk17
```

On macOS with multiple JDKs via Homebrew:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### Android: Gradle build fails with `Could not resolve`

```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

### Android: New Architecture crash on launch

Check that all native libraries in `package.json` are New Architecture compatible. Running `npx react-native doctor` can flag incompatible libraries.

### `@/` path alias not resolving

Both `tsconfig.json` and `babel.config.js` must be configured. If you cloned without running `npm install` first:

```bash
npm install
npx react-native start --reset-cache
```

### Env validation throws on startup

```
Error: Invalid environment variables: { "API_BASE_URL": [{ "message": "Invalid url" }] }
```

`API_BASE_URL` must be a valid URL including scheme. Check your `.env.development`:

```bash
API_BASE_URL=https://api.example.com   # ✓ valid
API_BASE_URL=api.example.com           # ✗ missing scheme
```

---

## FAQ

**Q: Does "built for AI agents" mean the agent can't write bad code?**  
No, and the README won't pretend otherwise. Lint and types catch a specific, high-value class of mistakes — circular imports, cross-layer access, `any`, default exports, code that doesn't type-check — *mechanically*, so those never land silently. They do **not** prove logical correctness, catch bad UX, or formally verify architecture (that needs heavier tooling like a hermetic build). Think of it as a guardrail that eliminates the most common structural drift, not a substitute for review or tests.

**Q: Where are the `CLAUDE.md` / `AGENTS.md` files?**  
In the repo root. `AGENTS.md` is the cross-agent source of truth (read by Cursor, Copilot, Codex, Gemini, Claude Code); `CLAUDE.md` is a thin pointer to it. Editor-specific configs live in `.cursor/rules/architecture.mdc` and `.github/copilot-instructions.md`, and task prompt templates in [`docs/ai-prompts/`](docs/ai-prompts/) — all generated from the same enforced rules in `.eslintrc.js` / `tsconfig.json`. Run `npm run validate` before committing.

**Q: Can I use this with Expo?**  
No — this is a bare React Native CLI setup. If Expo fits your project (it's the default most new teams should start with in 2026), use an Expo-based starter instead. This one is for teams that specifically want a bare native New Architecture setup without Expo's managed layer.

**Q: Why MMKV instead of AsyncStorage?**  
MMKV is synchronous, JSI-based, and 10–30× faster than AsyncStorage on benchmarks. For auth tokens and theme preferences that are read on every app launch, synchronous access eliminates the hydration flicker that AsyncStorage's async reads cause. MMKV v4 uses `createMMKV()` and is New Architecture compatible.

**Q: Why Zustand instead of Redux / Jotai?**  
Zustand's API surface is minimal: one `create()` call, direct state mutations, no boilerplate. For the client state scope in this template (auth, theme, global UI flags), Zustand is sufficient. TanStack Query handles the heavier server state problem. If your app has deeply nested state that needs time-travel debugging, evaluate Redux Toolkit instead.

**Q: Why React Hook Form + Zod over Formik?**  
React Hook Form is uncontrolled by default — fewer re-renders on keypress. Zod v4 is the schema layer: you define the schema once, infer the TypeScript type from it, and use the same schema for both client validation and (if your backend uses Zod) server validation. Formik requires more boilerplate for the same result.

**Q: Why not include push notifications / deep links / Keychain?**  
They're in the roadmap (Phase 2). Including them in Phase 1 would require configuration choices (e.g., FCM vs APNs-only, specific deep link schemes) that vary per project and would make the template harder to use as a starting point.

**Q: Can I rename the app?**  
Yes. Use `npx react-native-rename` or edit manually:
- `app.json` → `"name"` and `"displayName"`
- `android/app/src/main/res/values/strings.xml` → `<string name="app_name">`
- `ios/{AppName}/` directories and `Info.plist`

**Q: Is there a Keychain-backed token storage option?**  
Not in Phase 1. MMKV stores tokens in the device's encrypted storage (Android Keystore on Android, Data Protection on iOS when `NSFileProtectionComplete` is set). For highly sensitive apps, Phase 2 will add an optional `react-native-keychain` adapter behind the `storage` util interface — swap it without changing feature code.

---

## Non-goals

This template intentionally excludes the following. Adding them is outside the scope of Phase 1 and PRs for these will be closed.

| Not included | Rationale |
|---|---|
| Expo / Managed Workflow | Incompatible with bare New Architecture module setup |
| UI component library (NativeBase, Tamagui, etc.) | Design system choice is project-specific |
| Firebase / Supabase | Backend choice is project-specific |
| Redux / Jotai / Recoil | Zustand + TanStack Query covers this template's scope |
| Push notifications | Phase 2 |
| Keychain token storage | Phase 2 — MMKV relies on OS-level encryption (Android Keystore / iOS Data Protection) |
| Token refresh interceptor | Phase 2 |
| Deep linking | Phase 2 |
| Fastlane | Phase 3 |
| CI/CD (GitHub Actions, Bitrise, etc.) | Phase 3 |
| OTA updates | Phase 3 |
| App Store submission | Consumer's responsibility |

> Phase 2 and 3 features may be released as a separate Pro tier under a commercial license.
> This OSS version will remain MIT.

---

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| **Phase 1 (this repo)** | Auth, navigation, API client, MMKV, theme, forms, multi-env | ✅ v1.0.0 |
| **Phase 2** | Keychain, token refresh interceptor, push notifications, deep links | Planned |
| **Phase 3** | Fastlane, GitHub Actions CI/CD, OTA updates | Planned |

---

## License

MIT
