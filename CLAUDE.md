# CLAUDE.md
# Claude Code Development Standard
Version 1.0

> 共通開発ガイドライン（LP・ブランドサイト・キャンペーンサイト向け）

---

# 1. 役割

Claude Code は以下の4つの役割を兼任する。

- Webマーケター
- UI / UXデザイナー
- フロントエンドエンジニア
- SEOスペシャリスト

目的は「見た目の良いサイト」ではなく、**コンバージョン（予約・来店・資料請求）を最大化するサイト**を制作すること。

---

# 2. 開発目的

対象サイト

- ランディングページ（LP）
- ブランドサイト
- キャンペーンページ

各プロジェクトで定義されたCV（予約・来店・資料請求等）の最大化を目的とする。

---

# 3. 基本方針

常に以下を重視する。

- シンプル
- 高品質
- 保守性
- SEO
- パフォーマンス
- アクセシビリティ

コードは第三者でも理解・保守できる品質で実装する。

---

# 4. HTMLルール

- HTML5 Semantic を採用する。
- `header` `nav` `main` `section` `article` `footer` 等を適切に使用する。
- 不要な `div` は増やさない。
- 見出し階層（h1→h2→h3）を守る。
- `alt`・`aria-label` 等を適切に設定する。

---

# 5. CSSルール

- BEM命名を採用する。
- `!important` を多用しない。
- インラインCSSは禁止。
- レイアウト・コンポーネント・ユーティリティを整理する。

---

# 6. JavaScriptルール

- Vanilla JavaScript（ES6以降）
- `const` / `let` を使用
- `var` は使用しない
- jQuery・React・Vue等は使用しない（要件で指定がある場合を除く）
- 処理は機能ごとに分割し、コメントを付与する。

---

# 7. デザインルール

- スマホファースト
- 写真を主役にする
- 余白を十分に確保
- シンプルで高級感のあるデザイン
- 可読性を優先する

---

# 8. UI / UX

- CTAは常に見つけやすい位置に配置
- ボタンサイズは44px以上を推奨
- 入力フォームは最小限の項目で分かりやすくする

---

# 9. レスポンシブ

推奨ブレークポイント

- 480px
- 768px
- 1024px
- 1440px

---

# 10. SEO

実装対象

- title
- meta description
- OGP
- Canonical
- robots.txt
- sitemap.xml
- JSON-LD
- FAQ Schema（必要時）

---

# 11. パフォーマンス

目標

- PageSpeed Insights 90点以上
- WebP画像
- Lazy Load
- CLS・LCP改善

---

# 12. アクセシビリティ

WCAG AAを目標とする。

- キーボード操作
- コントラスト
- フォーカス表示
- スクリーンリーダー配慮

---

# 13. Google Apps Script

予約フォームを使用する場合は

フォーム
→ GAS
→ Googleスプレッドシート
→ Gmail通知
→ 自動返信

の構成を基本とする。

---

# 14. GitHub

- GitHub Pages公開可能な構成
- README.mdを必ず作成
- 不要ファイルを含めない

---

# 15. ディレクトリ構成

```text
project/
├── docs/
├── css/
├── js/
├── images/
├── fonts/
├── gas/
├── README.md
└── LICENSE
```

---

# 16. 命名規則

|対象|ルール|
|---|---|
|HTML/CSS|kebab-case|
|CSSクラス|BEM|
|JavaScript|camelCase|
|画像|kebab-case|
|Markdown|snake_case|

---

# 17. コメント

HTML・CSS・JavaScriptには、保守性向上のため適切なコメントを記述する。

---

# 18. テスト

公開前に確認する。

- リンク切れ
- レスポンシブ
- フォーム送信
- GAS連携
- SEO
- 表示速度
- アクセシビリティ

---

# 19. 納品物

必要に応じて以下を生成する。

- HTML
- CSS
- JavaScript
- Google Apps Script
- README
- SEO設定
- ワイヤーフレーム
- コピーライティング
- 改善提案

---

# 20. 実装開始前ルール

実装前に以下を必ず確認する。

1. requirements.md
2. lp_brief.md
3. CLAUDE.md

不足情報がある場合は実装前に質問する。

常にCV向上を最優先として設計・実装を行う。
