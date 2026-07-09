# 01_requirements.md
# Version 2.0
## il PhotoWedd Web Project
### システム要件定義書（SRS）

---

# 1. プロジェクト概要

## 1.1 目的
イルフォトウェディングのブランド価値を高めながら、Web予約数を最大化する。
本LPの最終コンバージョンは「問い合わせ」ではなく「撮影予約完了」とする。

## 1.2 対象ユーザー
- 25～35歳の共働きカップル
- 結婚式は行わないが写真は残したい層
- タイムパフォーマンス・コストパフォーマンス重視
- Instagramを中心に情報収集するユーザー

## 1.3 KPI
- LP予約率
- 予約完了率
- LINE相談率
- LP離脱率
- Google自然検索流入
- Instagram流入

---

# 2. ブランド要件

## ブランドメッセージ
「今日、叶えられる夢がある。」

## ブランドポジション
一日完結型フォトウェディング

## ブランドキーワード
- シンプル
- 上品
- 韓国風
- 白基調
- Blue Rose
- 高品質
- タイムパフォーマンス
- ストレスフリー

---

# 3. マーケティング要件

## USP
- 来店は撮影当日のみ
- 事前来店不要
- オンライン相談
- LINE相談
- 高品質な写真
- 全国対応

## 競合との差別化
価格だけでなく「一日完結」「時間価値」「品質」を主軸に訴求する。

---

# 4. ペルソナ

年齢：29歳
職業：会社員
特徴：
- 共働き
- 平日休み
- 結婚式は実施しない
- 写真だけ残したい
- Instagramで比較検討
- スマホで予約完結したい

---

# 5. カスタマージャーニー

Instagram
↓
LP
↓
LINE相談またはWeb予約
↓
オンライン相談
↓
予約
↓
撮影
↓
データ納品
↓
口コミ投稿

---

# 6. LP要件

## セクション
1. Hero
2. 共感
3. 解決
4. 選ばれる理由
5. 撮影フロー
6. 衣装
7. ロケーション
8. ギャラリー
9. 料金
10. FAQ
11. CTA

## CTA配置
- ファーストビュー
- 各主要セクション末尾
- 画面下固定ボタン

---

# 7. UI/UX要件

- スマホファースト
- Appleライク
- 写真を主役
- 余白を多く
- 白基調＋Blue Rose
- WCAGを考慮
- フェードインのみ
- 高速表示

---

# 8. 機能要件

## 予約フォーム
必須項目
- 氏名
- フリガナ
- メール
- 電話番号
- 希望プラン
- 希望相談方法
- 希望日時
- 質問内容
- 個人情報同意

## バリデーション
- 必須入力
- メール形式
- 電話番号形式
- 二重送信防止

## 完了処理
- サンクスページ
- Gmail通知
- 自動返信
- スプレッドシート保存

---

# 9. 非機能要件

## 性能
- PageSpeed 90点以上
- LCP 2.5秒以内を目標
- CLS 0.1以下を目標

## セキュリティ
- HTTPS
- 入力値サニタイズ
- reCAPTCHA導入可能な構成

## 保守性
- HTML/CSS/JS分離
- コメント付与
- モジュール化

---

# 10. システム構成

Frontend
- HTML5
- CSS3
- JavaScript

Backend
- Google Apps Script

Database
- Google Spreadsheet

Mail
- Gmail

Hosting
- GitHub Pages

---

# 11. SEO・計測

SEO
- title
- description
- OGP
- 構造化データ
- robots.txt
- sitemap.xml
- alt属性
- Lazy Load

計測
- GA4
- GTM
- Microsoft Clarity
- Search Console

イベント
- CTAクリック
- LINEクリック
- フォーム送信
- 予約完了

---

# 12. ディレクトリ設計

project/
├── docs/
├── src/
├── css/
├── js/
├── images/
├── gas/
└── README.md

---

# 13. 命名規則

CSS：BEM
JavaScript：camelCase
画像：kebab-case
Markdown：snake_case

---

# 14. 保守・運用

- GitHubでバージョン管理
- README更新
- 変更履歴記録
- 月次SEO確認
- 四半期ごとにLP改善

---

# 15. 将来拡張

- Google Calendar予約
- LINE Messaging API
- CRM連携
- 多言語対応
- A/Bテスト
- 管理画面追加
