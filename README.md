# IQスレ集計サイト

ʃt(c◜･ ᴗ ･) のIQスレを集計するWebサイトです。

## ルール

- ʃt(c◜･ ᴗ ･) は IQ100 からスタート
- 1レスごとに IQ +1
- 秒数 `:00` で IQ +10
- その他のゾロ目（`:11` `:22` `:33` `:44` `:55`）で IQ −10
- 秒数 `:17` で ᶘｲ^⇁^ﾅ川 の IQ −10（100スタート）

## 機能

- スレURLを入力して集計
- ʃt と ᶘｲ^⇁^ﾅ川 の現在IQ表示
- IQ推移グラフ（Chart.js）
- イベント発生回数（:00 / ゾロ目 / :17）

## デプロイ手順

### 1. GitHubリポジトリ作成

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_NAME/iq-tracker.git
git push -u origin main
```

### 2. Vercelにデプロイ

1. [vercel.com](https://vercel.com) でGitHubリポジトリをインポート
2. Framework: **Other**
3. そのままデプロイ

## ファイル構成

```
├── index.html          # メインUI
├── api/
│   └── fetch-thread.js # サーバーレス関数（EUC-JPデコード）
├── vercel.json         # Vercel設定
└── README.md
```

## 仕組み

シタラバBBSはEUC-JPエンコードのため、ブラウザから直接fetchするとCORSエラー＋文字化けが発生します。  
`api/fetch-thread.js`（Vercelサーバーレス関数）がプロキシとして機能し、サーバー側でEUC-JPデコードしてからJSONで返します。

rawmodeのURLフォーマット:
```
https://jbbs.shitaraba.net/bbs/rawmode.cgi/{category}/{board}/{thread}/
```
