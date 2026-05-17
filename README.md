# RN Starter Template

Production-ready React Native 0.85.3 starter template for real-world apps.

## Stack

| Category | Library | Version |
|---|---|---|
| Framework | React Native | 0.85.3 |
| Language | TypeScript | strict mode |
| Navigation | React Navigation | 7.x |
| Server State | TanStack Query | 5.100.10 |
| Client State | Zustand | 5.0.13 |
| HTTP | Axios | 1.16.1 |
| Storage | MMKV | 4.3.1 |
| Forms | React Hook Form + Zod | 7.x / 4.x |

## Requirements

| Tool | Version |
|---|---|
| Node.js | >= 22.11.0 |
| JDK | 17 |
| Android SDK | 15 (VanillaIceCream) |
| Xcode | Latest |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/takeo-AAA/rn-starter-template.git
cd rn-starter-template

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.development
# Edit .env.development with your API URL

# 4. iOS
cd ios && bundle install && bundle exec pod install && cd ..
npx react-native run-ios

# 5. Android
npx react-native run-android
```

## Directory Structure

```
src/
├── app/
│   ├── config/
│   │   └── env.ts              # Zod-validated env vars
│   └── providers/
│       └── AppProvider.tsx     # Root provider (Query + Nav + SafeArea)
├── features/
│   ├── auth/                   # Auth feature (self-contained)
│   │   ├── components/         # Auth-specific UI
│   │   ├── hooks/              # useAuth — login/logout logic
│   │   ├── repositories/       # API calls (auth endpoints)
│   │   ├── screens/            # LoginScreen, SplashScreen
│   │   ├── store/              # Zustand auth state
│   │   └── types/              # Auth types + Zod schemas
│   ├── home/                   # Home feature (TanStack Query + FlatList)
│   └── settings/               # Settings + theme switcher
├── components/
│   ├── ui/                     # Button, Text, TextInput, Card, LoadingSpinner, ErrorBoundary
│   └── layouts/                # SafeAreaLayout
├── hooks/
│   └── use-theme.ts            # Dark/light mode hook
├── navigation/
│   ├── RootNavigator.tsx       # Auth <-> App switching
│   ├── AuthNavigator.tsx
│   ├── AppNavigator.tsx        # Bottom tab navigator
│   └── types.ts                # Typed route params (all 3 stacks)
├── services/
│   └── api/
│       └── axios.client.ts     # Axios instance + request/response interceptors
├── stores/
│   ├── theme.store.ts          # Theme mode (light/dark/system) + MMKV persistence
│   └── app.store.ts            # Global UI state
├── theme/
│   ├── colors.ts               # Light + dark color tokens (ColorTokens type)
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
├── types/
│   └── global.d.ts             # __DEV__, process.env type declarations
└── utils/
    ├── storage.ts              # MMKV v4 wrapper (StorageKeys enum)
    └── logger.ts               # Dev-only logger (__DEV__ gate)
```

## Architecture Rules

### Data Flow

```
Screen -> Hook -> Repository -> ApiClient (Axios)
Screen -> Hook -> Store (Zustand)
                    Server state -> TanStack Query
```

### Layer Responsibilities

| Layer | Responsibility | Forbidden |
|---|---|---|
| `screens/` | JSX structure only | Business logic |
| `hooks/` | Encapsulate stateful logic | Direct API calls |
| `repositories/` | API calls + response mapping | UI concerns |
| `stores/` | UI state + auth state | Server state |
| `components/ui/` | Reusable UI primitives | Navigation, API calls |

### Enforced Rules (ESLint)

- `import/no-cycle` — cross-feature circular imports are build errors
- `import/no-default-export` — named exports only
- `@typescript-eslint/no-explicit-any` — `any` is a build error; use `unknown`
- `no-console` — use `logger` util instead

## Environment Variables

Copy `.env.example` and fill in your values:

```bash
API_BASE_URL=https://your-api.com   # Required. Must be a valid URL.
API_TIMEOUT=10000                    # Milliseconds
APP_ENV=development                  # development | staging | production
```

Three env files are supported: `.env.development`, `.env.staging`, `.env.production`.

> **Security**: Never put secrets (private keys, payment keys) in env files.
> They are bundled into the app binary. Use a backend proxy for sensitive operations.

## Theme System

```ts
import { useTheme } from '@/hooks/use-theme';

const MyComponent = () => {
  const { colors, isDark } = useTheme();
  return <View style={{ backgroundColor: colors.background }} />;
};
```

Switch theme programmatically:

```ts
import { useThemeStore } from '@/stores/theme.store';

const { setMode } = useThemeStore();
setMode('dark');    // 'light' | 'dark' | 'system'
```

Theme selection is persisted to MMKV and survives app restarts.

## Adding a New Feature

1. Create `src/features/{name}/` with subdirectories:
   ```
   components/   hooks/   repositories/   screens/   types/
   ```
2. Define types in `types/{name}.types.ts`
3. Add API calls in `repositories/{name}.repository.ts`
4. Encapsulate logic in `hooks/use-{name}.ts`
5. Build screen in `screens/{Name}Screen.tsx` — JSX only, no business logic
6. Register screen in the appropriate navigator

### Never do this in a screen:

```ts
// Bad — business logic in screen
const handleLogin = async () => {
  const res = await axios.post('/auth/login', { email, password });
  storage.setString('token', res.data.token);
};

// Good — delegate to hook
const { login } = useAuth();
```

## API Client

Axios interceptors handle automatically:
- `Authorization: Bearer {token}` header on every request
- `401` response — clears MMKV tokens
- Request/response logging in dev mode only

```ts
// In a repository — never call apiClient from a screen or hook directly
import { apiClient } from '@/services/api/axios.client';

const { data } = await apiClient.get<ApiResponse<User[]>>('/users');
```

## Storage

Always use the `storage` util — never import MMKV directly in features:

```ts
import { storage, StorageKeys } from '@/utils/storage';

storage.setString(StorageKeys.AUTH_TOKEN, token);
const token = storage.getString(StorageKeys.AUTH_TOKEN); // string | undefined
const removed = storage.remove(StorageKeys.AUTH_TOKEN);  // boolean (MMKV v4)
```

## Validation Commands

```bash
npm run type-check     # TypeScript strict check (0 errors = pass)
npm run lint           # ESLint with import/no-cycle
npm run format:check   # Prettier check
npm run test           # Jest
```

## New Architecture

This template targets **React Native 0.85.3** with **New Architecture enabled by default**
(Fabric + TurboModules + JSI). All included libraries are New Architecture compatible.

To disable (not recommended):
- Android: `newArchEnabled=false` in `android/gradle.properties`
- iOS: `ENV['RCT_NEW_ARCH_ENABLED'] = '0'` in `ios/Podfile`

## Phase Roadmap

| Phase | Scope |
|---|---|
| **Phase 1 (this template)** | Auth, Home, Settings, Theme, API client, MMKV, Navigation |
| Phase 2 (planned) | Push notifications, Keychain token storage, DeepLink |
| Phase 3 (planned) | Fastlane, CI/CD, OTA updates |

## License

MIT
