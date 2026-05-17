# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

Planned for Phase 2:
- Keychain-backed token storage (opt-in adapter behind `storage` util interface)
- Token refresh interceptor (Axios response interceptor chain)
- Push notifications (FCM / APNs)
- Deep link handling

Planned for Phase 3:
- Fastlane setup (iOS + Android)
- GitHub Actions CI/CD workflow
- OTA update integration (EAS Update compatible)

---

## [1.0.0] — 2026-05-17

### Phase 1 MVP — initial public release

#### Added

**Core Infrastructure**
- React Native 0.85.3 with New Architecture (Fabric + TurboModules + JSI) enabled by default
- TypeScript 5.8 in strict mode (`noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`)
- Path alias `@/` → `src/` configured in both `tsconfig.json` and `babel.config.js`
- Zod-validated environment variables at startup (`src/app/config/env.ts`); missing/malformed vars throw immediately

**Navigation**
- React Navigation 7 with fully typed param lists (`RootStackParamList`, `AuthStackParamList`, `AppTabParamList`)
- `RootNavigator` — switches between `AuthNavigator` and `AppNavigator` based on `isAuthenticated`
- `AuthNavigator` — Login screen stack
- `AppNavigator` — Bottom tab navigator (Home, Settings)

**Auth**
- `useAuth` hook — `login()` / `logout()` with loading and error state
- `authRepository` — `login`, `logout`, `refreshToken` API calls
- `useAuthStore` (Zustand) — `isAuthenticated`, `user`, `isHydrated`; MMKV persistence
- Splash screen during MMKV hydration to prevent auth stack flash

**API Client**
- Axios instance with `Authorization: Bearer` header injection (from MMKV on every request)
- Request/response logging in dev mode only
- `401` response clears `AUTH_TOKEN` and `REFRESH_TOKEN` from MMKV
- Dev-mode adapter mocks for `/auth/login`, `/auth/logout`, `/posts` (app works without a backend)
- `ApiResponse<T>`, `ApiError`, `PaginatedResponse<T>` types

**State Management**
- Zustand v5: `auth.store.ts` (auth state + MMKV persistence), `app.store.ts` (global UI state)
- TanStack Query v5: `useHomeData` hook as the canonical server state pattern

**Storage**
- MMKV v4 typed wrapper (`src/utils/storage.ts`)
- `StorageKeys` enum — single source of truth for all storage keys
- `getString`, `setString`, `getBoolean`, `setBoolean`, `getNumber`, `setNumber`, `remove`, `clearAll`, `contains`

**Forms**
- React Hook Form 7 + Zod v4: `loginSchema` is the source of truth for both runtime validation and TypeScript types
- `login-form.tsx` — uncontrolled form, validation on submit

**Theme**
- Light / dark / system modes
- `ColorTokens` type — typed color palette for light and dark
- `useTheme` hook — returns `{ colors, isDark, mode }`
- Theme mode persisted to MMKV; no flash on cold start

**Shared UI Components**
- `Button`, `Card`, `Text`, `TextInput`, `LoadingSpinner`, `ErrorBoundary`, `SafeAreaLayout`
- Barrel export at `src/components/ui/index.ts`

**Developer Experience**
- ESLint: `import/no-cycle`, `import/no-default-export`, `@typescript-eslint/no-explicit-any`, `no-console` all set to `error`
- `npm run validate` — type-check + lint + format:check
- `npm run test` — Jest with `@react-native/jest-preset`
- Hermes enabled on Android
- Multi-env support: `.env.development`, `.env.staging`, `.env.production` via `--env-file` flag

[Unreleased]: https://github.com/takeo-AAA/rn-starter-template/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/takeo-AAA/rn-starter-template/releases/tag/v1.0.0
