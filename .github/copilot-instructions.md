# GitHub Copilot Instructions

This is a **bare React Native CLI** starter (React Native 0.85.3, **no Expo**). New Architecture (Fabric + TurboModules + JSI) is enabled by default. TypeScript is in strict mode.

Generate code that passes `npm run validate` (type-check + lint + format) on the first try. The rules below come **only** from this repo's `.eslintrc.js`, `tsconfig.json`, and `src/` layout — do not introduce conventions that are not already here.

## Hard rules — these fail CI (ESLint `error` / TS)

- **Named exports only.** `import/no-default-export` is an error. Never write `export default`. Use `export const Foo = ...`.
- **No circular imports.** `import/no-cycle` is an error. Type-only imports are exempt — use `import type` when importing only types.
- **No `any`.** `@typescript-eslint/no-explicit-any` is an error. Use `unknown` and narrow, or a precise type.
- **`import type` for type-only imports.** `@typescript-eslint/consistent-type-imports` is an error. Example: `import type { ApiResponse } from '@/services/api/api.types';`. For mixed imports: `import axios, { type AxiosInstance } from 'axios';`.
- **Screens must not import repositories.** `import/no-restricted-paths` blocks `src/features/*/screens` from importing from `src/features/*/repositories`. A screen gets data only via a hook.
- **TypeScript strict gate.** `strict`, `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns` are all on. No unused imports/vars/params; handle `undefined`; every branch returns.

## Strong conventions — follow them (ESLint `warn`)

- **No `console.log`.** `no-console` warns (only `console.warn`/`console.error` allowed). Use `logger` from `@/utils/logger` — it is `__DEV__`-gated.
- **Explicit function return types.** Match the codebase: `(): React.JSX.Element`, `(): Promise<void>`, `(): UseQueryResult<Post[], Error>`.

## Architecture (one direction)

```
Screen → Hook → Repository (apiClient + TanStack Query)
              → Store (Zustand)
```

- **`features/*/screens/*Screen.tsx`** — JSX, layout, events only. No `apiClient`, no `storage`, no business logic.
- **`features/*/hooks/use-*.ts`** — the only layer that combines repository + store + local state. No JSX.
- **`features/*/repositories/*.repository.ts`** — the only place that calls `apiClient`. Returns plain typed data, no React state.
- **`features/*/store/*.store.ts`, `src/stores/*`** — Zustand client/UI/auth state, persisted via the `storage` util. **Not** server state.
- **`components/ui/*`** — presentational primitives only (no navigation, no API).
- **`services/api/*`** — Axios instance + interceptors only.

**Server vs client state:** TanStack Query owns server state; Zustand owns client state. Do not put fetched server data in Zustand.

## Patterns to mirror

Repository:
```ts
import { apiClient } from '@/services/api/axios.client';
import type { ApiResponse } from '@/services/api/api.types';

export const postsRepository = {
  async getAll(): Promise<Post[]> {
    const { data } = await apiClient.get<ApiResponse<Post[]>>('/posts');
    return data.data;
  },
} as const;
```

Hook (server state):
```ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

const POSTS_QUERY_KEY = ['posts'] as const;

export const usePosts = (): UseQueryResult<Post[], Error> =>
  useQuery({ queryKey: POSTS_QUERY_KEY, queryFn: postsRepository.getAll });
```

Screen:
```ts
export const PostsScreen = (): React.JSX.Element => {
  const { data, isLoading, error } = usePosts();
  // JSX only
};
```

Validation (Zod is the source of truth; infer the type):
```ts
export const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
});
export type LoginInput = z.infer<typeof loginSchema>;
```

Form (React Hook Form + Zod via `Controller`):
```ts
const { control, handleSubmit, formState: { errors } } =
  useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
```

## Imports, storage, env, theme

- **Path alias `@/` → `src/`.** Use it for cross-module imports; relative paths are fine within a feature.
- **Storage:** import `{ storage, StorageKeys }` from `@/utils/storage`. Never import `react-native-mmkv` directly in features. Add keys to the `StorageKeys` object, never inline strings. `storage.getString()` returns `string | undefined`.
- **Env:** read from `@/app/config/env` (`env.API_BASE_URL`); it is Zod-validated at startup.
- **Theme:** `useTheme()` from `@/hooks/use-theme` → `{ colors, isDark }`; change mode via `useThemeStore().setMode(...)`.

## Adding a feature

Create `src/features/{name}/{components,hooks,repositories,screens,types}/`, then in order: define Zod types → repository (apiClient) → hook (combines repo/store/state) → screen (JSX only) → register in `navigation/AuthNavigator.tsx` or `AppNavigator.tsx` → add params to `navigation/types.ts`.

## Out of scope (do not add)

Expo, a UI component library, Firebase/Supabase, Redux/Jotai, push notifications, deep linking, Keychain, token-refresh interceptor. These are intentional non-goals for this template.
