# Prompt: Add a screen

Use this when the feature (or its data layer) mostly exists and you just need a new screen wired correctly.

---

## Template

```
設計ルールを守って {Name}Screen を追加して。

bare React Native CLI（Expoではない）。enforced rules:
- named export のみ（default export 禁止）
- screen から repository / apiClient / storage を直接触らない（lint error になる）。データは hook 経由
- any 禁止 / 型だけの import は `import type` / console.log 禁止（logger を使う）

要件:
- 置き場所: `src/features/{feature}/screens/{Name}Screen.tsx`
- JSX のみ。ロジックは hook に置く。戻り値の型は `(): React.JSX.Element`
- レイアウトは `@/components/layouts/SafeAreaLayout` の `SafeAreaLayout` で包む
- UI primitive は `@/components/ui`（Text, Button, Card, TextInput, LoadingSpinner）を使う
- 色は `@/hooks/use-theme` の `const { colors } = useTheme();` から取得（ハードコード禁止）
- spacing は `@/theme/spacing` の `spacing` を使う
- データが要るなら `src/features/{feature}/hooks/use-{feature}.ts` の hook を consume する
  （hook が無ければ先に hook を作る。screen から repository は呼ばない）

ナビゲーション:
- `src/navigation/AppNavigator.tsx`（または `AuthNavigator.tsx`）に画面を登録
- `src/navigation/types.ts` の ParamList にルート名を追加

画面の中身: {一覧表示 / 詳細 / フォーム 等の説明}

最後に `npm run validate` を実行してエラーを直して。
```

---

## Reference

- List screen consuming a query hook: `src/features/home/screens/HomeScreen.tsx`
- Screen composing a form + hook: `src/features/auth/screens/LoginScreen.tsx`
- Navigator param lists: `src/navigation/types.ts`
