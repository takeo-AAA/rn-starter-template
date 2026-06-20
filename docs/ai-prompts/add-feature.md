# Prompt: Add a full feature module

Use this to scaffold a new `src/features/{name}/` module end to end, following the enforced architecture.

---

## Template

```
設計ルールを守って「{機能名}」機能を追加して。

このリポジトリは bare React Native CLI（Expoではない）。enforced rules を必ず守ること:
- named export のみ（default export 禁止 = lint error）
- any 禁止（unknown を使う = lint error）
- 型だけの import は `import type`（lint error）
- 循環 import 禁止（lint error）
- screen から repository を直接 import するのは禁止（lint error）。データは hook 経由でのみ取得する
- console.log は使わず `@/utils/logger` の logger を使う

レイヤー構成: Screen → Hook → Repository(apiClient + TanStack Query) / Store(Zustand)。
サーバ状態は TanStack Query、クライアント状態は Zustand。混ぜない。

`src/features/{name}/` を作り、既存の auth / home 機能と同じ形で実装して:

1. `types/{name}.types.ts`
   - 入力は Zod スキーマを source of truth にし、型は `z.infer` で導出する
   - 例: `export const xSchema = z.object({...}); export type XInput = z.infer<typeof xSchema>;`

2. `repositories/{name}.repository.ts`
   - `apiClient`（`@/services/api/axios.client`）だけを使う唯一の層
   - `as const` のオブジェクトリテラルにして、メソッドは plain なドメイン型を返す
   - レスポンスは `ApiResponse<T>`（`@/services/api/api.types`）でラップされている前提:
     `const { data } = await apiClient.get<ApiResponse<X[]>>('/x'); return data.data;`

3. `hooks/use-{name}.ts`
   - repository + store + local state を組み合わせる唯一の層
   - サーバ取得は TanStack Query を使い、戻り値の型は `UseQueryResult<X[], Error>`
   - query key は `['{name}', ...] as const`

4. `screens/{Name}Screen.tsx`
   - JSX のみ。`axios` / `storage` / ビジネスロジックは書かない
   - hook を consume する。戻り値の型は `(): React.JSX.Element`
   - `@/components/ui` の Text/Button 等の primitive と `@/hooks/use-theme` の `{ colors }` を使う

5. ナビゲーションに登録
   - `src/navigation/AuthNavigator.tsx` か `AppNavigator.tsx` に画面を追加
   - `src/navigation/types.ts` の該当 ParamList にルートを追加（型安全なナビゲーション）

エンドポイント仕様: {GET /xxx などの説明、レスポンス形}
クライアント状態が必要なら: {必要な Zustand state の説明。不要なら「なし」}

最後に必ず `npm run validate` を実行して、type-check / lint / format のエラーをすべて直して。
```

---

## Reference shapes already in the repo

- Repository: `src/features/auth/repositories/auth.repository.ts`, `src/features/home/repositories/home.repository.ts`
- Hook (server state): `src/features/home/hooks/use-home-data.ts`
- Hook (state machine + store): `src/features/auth/hooks/use-auth.ts`
- Screen: `src/features/home/screens/HomeScreen.tsx`
- Zod types: `src/features/auth/types/auth.types.ts`
- Zustand store: `src/features/auth/store/auth.store.ts`
