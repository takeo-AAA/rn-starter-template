# Prompt: Add a form screen (React Hook Form + Zod)

The canonical example in this repo is the login screen. Mirror its shape: a `*-form.tsx` component (form UI) + a `*Screen.tsx` (composition) + a hook for the side effect.

---

## Template

```
設計ルールを守って「{機能名}」のフォーム画面を実装して。ログイン画面と同じ構成にすること。

bare React Native CLI（Expoではない）。enforced rules:
- named export のみ / any 禁止 / 型だけの import は `import type` / console.log 禁止（logger 使用）
- screen から repository / apiClient / storage を直接触らない（hook 経由）

構成（auth 機能をお手本に）:

1. バリデーション: `src/features/{feature}/types/{feature}.types.ts`
   - Zod スキーマを source of truth にする。型は `z.infer` で導出
   - 例:
     export const xSchema = z.object({
       email: z.email({ error: 'Invalid email address' }),
       password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
     });
     export type XInput = z.infer<typeof xSchema>;

2. フォーム UI: `src/features/{feature}/components/{feature}-form.tsx`
   - React Hook Form + `zodResolver`（`@hookform/resolvers/zod`）
   - 各フィールドは `Controller` でラップし、`@/components/ui` の `TextInput` に繋ぐ
   - props は `{ onSubmit: (data: XInput) => void; isLoading: boolean }`
   - ファイル名はケバブケース（`login-form.tsx` に倣う）

3. 副作用の hook: `src/features/{feature}/hooks/use-{feature}.ts`
   - 送信処理（repository 呼び出し）と isLoading / error を持つ
   - repository は `apiClient` 経由で API を叩く（hook から直接 axios は呼ばない）

4. 画面: `src/features/{feature}/screens/{Name}Screen.tsx`
   - `SafeAreaLayout` で包み、フォームコンポーネントと hook を合成するだけ（JSX のみ）
   - error は `@/hooks/use-theme` の `colors.error` で表示

5. ナビゲーション登録 + `src/navigation/types.ts` にルート追加

フィールド: {email, password などの一覧とバリデーション要件}
送信先: {POST /xxx などのエンドポイント}

最後に `npm run validate` を実行してエラーを直して。
```

---

## Reference (copy these exactly)

- Zod schema + inferred type: `src/features/auth/types/auth.types.ts`
- Form component (RHF + Controller + zodResolver): `src/features/auth/components/login-form.tsx`
- Submit hook with isLoading/error: `src/features/auth/hooks/use-auth.ts`
- Screen composition: `src/features/auth/screens/LoginScreen.tsx`
