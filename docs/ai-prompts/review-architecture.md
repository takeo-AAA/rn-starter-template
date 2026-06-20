# Prompt: Review a change against the enforced rules

Use this to audit a diff, a file, or AI-generated code before committing.

---

## Template

```
この変更（または file: {path}）を、このリポジトリの enforced architecture に照らしてレビューして。
ルールを発明せず、下のチェック項目だけで判定すること。違反は「該当箇所 + 修正案」で示して。

強制（lint / type が CI で落ちる）:
- [ ] default export を使っていない（named export のみ）
- [ ] `any` を使っていない（unknown / 具体型）
- [ ] 型だけの import は `import type` になっている
- [ ] 循環 import を作っていない
- [ ] screen が repository を直接 import していない（hook 経由になっている）
- [ ] TS strict を満たす（未使用の import/変数/引数なし、`undefined` を処理、全分岐 return）

規約（warn だが踏襲する）:
- [ ] `console.*` を直接使わず `@/utils/logger` の logger を使っている
- [ ] export 関数に明示的な戻り値型がある

レイヤー責務:
- [ ] screen は JSX のみ（apiClient / storage / ビジネスロジックを持たない）
- [ ] apiClient を使うのは repository だけ
- [ ] repository は plain data を返す（React state / 副作用なし）
- [ ] サーバ状態は TanStack Query、クライアント状態は Zustand（混在していない）

依存と規約:
- [ ] cross-module import は `@/` エイリアス
- [ ] ストレージは `@/utils/storage` 経由（`react-native-mmkv` を直接 import していない）
- [ ] storage キーは `StorageKeys` に定義（インラインのキー文字列なし）
- [ ] 非ゴール（Expo / UI ライブラリ / Firebase / Redux など）を持ち込んでいない

最後に: `npm run validate` で実際に確認できる項目はそれを基準に判断して。
```

---

The authoritative rule sources are `.eslintrc.js`, `tsconfig.json`, and `.cursor/rules/architecture.mdc`. The validation gate is `npm run validate` (type-check + lint + format).
