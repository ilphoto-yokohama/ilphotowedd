# 画像ディレクトリ構成

実写真を組み込み済みです。`_originals/` に元データ（高解像度）を保管し、
LP では Web 用に最適化した軽量コピー（合計約1.3MB）を使用しています。

```text
images/
├── hero/
│   ├── hero.jpg          # ヒーロー背景（1200x1800・ベール越しの花嫁）
│   └── og-image.jpg      # OGP画像（1200x630・SNSシェア用）
├── gallery/
│   ├── gallery-wide.jpg  # ワイド枠（暗背景のドラマチックカット）
│   └── gallery01〜05.jpg # ギャラリーグリッド用
├── studio/
│   ├── studio01〜03.jpg  # スタジオ紹介カード用
│   └── rose-closeup.jpg  # 「解決」セクションのローズ写真
├── logo/
│   ├── brand-logo.png    # 公式ブランドロゴ（ヒーローで使用）
│   ├── logo.svg          # 簡易ロゴ
│   └── blue-rose.svg     # ブランドシンボル
└── _originals/           # 撮影元データ（LPでは未使用・公開時は削除可）
```

## 画像を差し替え・追加する際の手順

1. 元データを `_originals/` に入れる
2. `sips` で最適化コピーを作る（例）：

   ```bash
   sips -Z 1000 -s format jpeg -s formatOptions 75 元画像.jpg --out gallery/gallery06.jpg
   ```

3. `index.html` の該当 `<img>` を差し替える。このとき：
   - `alt` 属性に写真の内容を具体的に書く（SEO・アクセシビリティ）
   - `width` / `height` 属性を実寸に合わせる（CLS対策）
   - ヒーロー以外は `loading="lazy"` を付ける

## 補足

- `_originals/` はGitHub Pagesでは配信不要です。リポジトリ容量を抑えたい場合は
  `.gitignore` に `images/_originals/` を追加してください。
- さらに軽量化したい場合は `cwebp`（`brew install webp`）でWebP変換が可能です。
