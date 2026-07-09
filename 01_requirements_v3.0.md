# 01_requirements.md
# Version 3.0
## il PhotoWedd Web Project
### Software Requirements Specification (SRS)

> 本書はイルフォトウェディングLP・Web予約システム開発の基準書である。

# 1. プロジェクト概要
## 1.1 目的
- Web予約数の最大化
- ブランド価値向上
- 「問い合わせ」ではなく「撮影予約完了」をCVとする

## 1.2 成功指標(KPI)
|項目|目標|
|---|---|
|予約完了率|5%以上|
|LP離脱率|40%以下|
|PageSpeed|90点以上|
|LCP|2.5秒以内|
|CLS|0.1以下|

# 2. ビジネス要件
- Instagram流入を最優先
- スマホで3分以内に予約完了
- LINE相談との導線統合
- 一日完結型サービスを全面訴求

# 3. ブランド要件
## メッセージ
今日、叶えられる夢がある。

## USP
- 来店は撮影当日のみ
- 事前来店不要
- オンライン相談
- LINE相談
- 高品質写真
- 全国対応

# 4. ターゲット・ペルソナ
## メイン
25〜35歳・共働き・タイパ重視

## ペルソナ
29歳会社員。Instagramで比較。結婚式はしない。写真だけ残したい。

# 5. カスタマージャーニー
Instagram→LP→LINE/予約→オンライン相談→予約→撮影→納品→口コミ

# 6. 画面一覧
1 Hero
2 共感
3 解決
4 選ばれる理由
5 撮影フロー
6 衣装
7 ロケーション
8 ギャラリー
9 料金
10 FAQ
11 予約フォーム
12 Thanks

# 7. UI/UX要件
- Appleライク
- 白基調+Blue Rose
- 写真を主役
- 固定CTA
- フェードインのみ
- WCAG考慮
- スマホファースト

# 8. 予約フォーム仕様
## 項目
氏名/フリガナ/メール/電話/希望プラン/相談方法/希望日時/質問/同意

## バリデーション
- 必須
- メール形式
- 電話番号
- 二重送信
- サニタイズ

## 完了処理
- GAS送信
- Gmail通知
- 自動返信
- Spreadsheet保存
- Thanks画面

# 9. GAS仕様
フロー:
フォーム→GAS→Spreadsheet→スタッフ通知→自動返信→ログ

シート列:
受付日時,予約番号,氏名,メール,電話,プラン,相談方法,日時,備考,対応状況

# 10. Gmail仕様
## スタッフ
件名:【イルフォトウェディング】新規予約

本文:
予約情報一覧と管理シートURL

## 自動返信
受付内容
連絡予定
店舗情報

# 11. GA4計測
page_view
scroll
cta_click
line_click
form_start
form_submit
reservation_complete

# 12. SEO
title
description
OGP
JSON-LD
FAQ構造化データ
Breadcrumb
robots
sitemap

# 13. ディレクトリ
project/
 docs/
 src/
 css/
 js/
 images/
 gas/
 README.md

# 14. コーディング規約
HTML5
CSS(BEM)
JavaScript ES6
camelCase
画像WebP
コメント必須

# 15. GitHub運用
main
develop
feature/*
Pull Request必須
GitHub Pages公開

# 16. 受入テスト
- 全フォーム送信成功
- Gmail受信
- 自動返信
- スプレッドシート保存
- スマホ表示確認
- PageSpeed90以上

# 17. 将来拡張
Google Calendar
LINE Messaging API
CRM
多言語
A/Bテスト
CMS化

# 18. 成果物
- LP
- 予約フォーム
- GAS
- README
- GitHub Pages
- SEO設定
- 運用マニュアル
