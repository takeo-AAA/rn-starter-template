# Prompt: Add an API endpoint (repository method + query hook)

Use this when you only need to wire a new backend call into an existing feature.

---

## Template

```
設計ルールを守って {feature} 機能に「{エンドポイントの説明}」を追加して。

bare React Native CLI（Expoではない）。enforced rules:
- named export のみ / any 禁止 / 型だけの import は `import type`
- 循環 import 禁止 / console.log 禁止（logger 使用）
- `apiClient` を使ってよいのは repository だけ。screen / hook から直接 axios は呼ばない

1. repository: `src/features/{feature}/repositories/{feature}.repository.ts`
   - 既存オブジェクト（`as const`）にメソッドを追加、無ければ新規作成
   - `import { apiClient } from '@/services/api/axios.client';`
   - レスポンスは `ApiResponse<T>`（`import type { ApiResponse } from '@/services/api/api.types';`）で型付け
   - 例: `const { data } = await apiClient.post<ApiResponse<X>>('/x', input); return data.data;`
   - mutation 用の入力型は Zod スキーマから `z.infer` で導出した型を使う
   - 戻り値は plain なドメイン型。React state や副作用は書かない

2. hook: `src/features/{feature}/hooks/use-{name}.ts`
   - 取得は `useQuery`、戻り値の型は `UseQueryResult<X, Error>`、query key は `[...] as const`
   - 更新は `useMutation`（必要なら `queryClient.invalidateQueries` でキャッシュを無効化）

メソッド仕様: {HTTP method, path, リクエスト/レスポンスの形}

最後に `npm run validate` を実行してエラーを直して。
```

---

## Reference

- GET repository + query hook: `src/features/home/repositories/home.repository.ts`, `src/features/home/hooks/use-home-data.ts`
- POST repository (login/logout/refresh): `src/features/auth/repositories/auth.repository.ts`
- Response envelope type `ApiResponse<T>`: `src/services/api/api.types.ts`
- The Axios instance + interceptors (auth header, 401 handling, dev mocks): `src/services/api/axios.client.ts`
