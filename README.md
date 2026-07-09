# il PhotoWedd（イルフォトウェディング）LP

「今日、叶えられる夢がある。」— 来店は撮影当日だけの一日完結型フォトウェディング専門店、
il PhotoWeddのランディングページです。

**このLPのゴールは「問い合わせ」ではなく「Web予約フォームからの撮影予約完了」です。**

## 特徴

- スマホファースト・Apple風の余白重視デザイン（白基調 × Blue Rose）
- サイト内予約フォーム → Google Apps Script → スプレッドシート保存 → Gmail通知 → 自動返信
- GitHub Pagesでそのまま公開できる静的構成（ビルド不要）
- SEO対応（title / description / OGP / JSON-LD / FAQ構造化データ / robots.txt / sitemap.xml）
- GA4イベント計測（page_view / scroll / cta_click / line_click / form_start / form_submit / reservation_complete）

## ディレクトリ構成

```text
ilphotowedd/
├── index.html              # LP本体（予約フォーム含む）
├── thanks.html             # 予約完了ページ
├── css/style.css            # スタイル（BEM命名）
├── js/main.js                # UI制御・検証・GAS送信・GA4計測
├── images/                   # 画像（現状はプレースホルダー、README参照）
├── gas/Code.gs                # Google Apps Script（シート保存・Gmail通知・自動返信）
├── docs/
│   ├── GAS_SETUP.md          # GAS導入手順（必読）
│   └── copywriting.md        # コピーライティング全文
├── robots.txt
├── sitemap.xml
├── LICENSE
├── 01_requirements_v3.0.md   # 要件定義書
├── il_photowedd_lp_brief.md  # LPブリーフ
└── CLAUDE.md                 # 開発ガイドライン
```

> `ilphotowedd.html` は初期検討時の別デザイン案（濃紺×ゴールド）です。本番では使用していません。

## セットアップ

### 1. ローカルで確認する

Python同梱のシンプルサーバーで確認できます。

```bash
python3 serve.py
# または
python3 -m http.server 3456
```

`http://localhost:3456` を開いて確認してください。

### 2. GAS（予約フォームの送信先）を設定する

予約フォームは [`js/main.js`](js/main.js) 内の `GAS_ENDPOINT` に設定した
Google Apps ScriptのWebアプリURLへ送信されます。**このURLを設定するまでは
フォーム送信が失敗します。** 手順は [`docs/GAS_SETUP.md`](docs/GAS_SETUP.md) を参照してください。

### 3. GA4計測IDを設定する

`index.html` と `thanks.html` 内の `G-XXXXXXXXXX` を、実際のGA4計測IDに置き換えてください。

## GitHub Pagesで公開する

1. このディレクトリの内容をGitHubリポジトリのルート（`main`ブランチ）にpushする
2. リポジトリの **Settings → Pages** で、Source を `Deploy from a branch`、
   Branch を `main` / `/(root)` に設定する
3. 数分後に `https://<username>.github.io/<repo>/` で公開される
4. 独自ドメインを使う場合は `CNAME` ファイルをルートに追加する

公開後は、`index.html` / `thanks.html` 内の以下のURLを実際の公開URLに合わせて更新してください。

- `canonical` タグ
- OGPの `og:url` / `og:image`
- `robots.txt` の `Sitemap:` 行
- `sitemap.xml` の `<loc>`

## 受け入れテスト（公開前チェックリスト）

- [ ] 全セクションのリンク切れがないか
- [ ] スマホ（375px）・タブレット（768px）・PC（1440px）で表示崩れがないか
- [ ] 予約フォームの必須バリデーション（氏名・フリガナ・メール・電話・プラン・希望日・相談方法・同意）
- [ ] 二重送信防止（送信ボタンが送信中は無効化されるか）
- [ ] フォーム送信 → スプレッドシートに行が追加されるか
- [ ] スタッフ宛Gmail通知が届くか
- [ ] お客様宛自動返信メールが届くか
- [ ] Thanksページで予約番号が表示され、`reservation_complete` イベントが発火するか
- [ ] PageSpeed Insights スマホスコア90点以上
- [ ] FAQアコーディオンがキーボード操作でも開閉できるか

## CV改善のための追加提案

1. **実写真への差し替え**：現状はSVGプレースホルダーのため、実際の撮影写真に差し替えることで
   信頼感・予約率が大きく向上します（`images/README.md`参照）。
2. **LINEミニアプリ／リッチメニュー連携**：LINE相談から予約フォームへの導線をさらに短縮できます。
3. **フォーム入力の自動保存**：入力途中の離脱対策として、`localStorage`への一時保存を検討。
4. **A/Bテスト**：ヒーローのCTA文言（「Webで予約する」 vs 「今すぐ予約する」）を検証。
5. **Googleカレンダー連携**：GAS側で空き日程を判定し、埋まっている日を選べないようにする（将来拡張）。
6. **口コミ・お客様の声セクション**：信頼性訴求のため、撮影後にレビュー収集フローを追加する。
