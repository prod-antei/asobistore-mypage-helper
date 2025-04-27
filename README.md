# 🔥 Asobistore Order Product Fetcher

## 概要
このChrome拡張機能は、**アソビストア（asobistore.jp）** のマイページ注文履歴ページから、  
各注文の「商品名」を自動取得し、注文履歴ページ内に表示するツールです。

- 注文履歴ページのボタンから注文詳細ページにアクセス
- 注文詳細ページ内の「商品名」を抽出
- ボタンの横に商品名を表示して、確認を楽にします！

## デモ
![demo image](demo.png)  
（※ 実際に動作しているスクリーンショットやGIFをあとでここに置くとさらに良いです）

## インストール方法
1. このリポジトリをクローン or ZIPダウンロードします。
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2. Chromeで `chrome://extensions/` を開きます。
3. 右上の「**デベロッパーモード**」をONにします。
4. 「**パッケージ化されていない拡張機能を読み込む**」をクリックします。
5. `your-repo-name/` フォルダを選択します。

これで拡張機能が有効になります！

## 使い方
1. [アソビストア マイページ](https://shop.asobistore.jp/mypage/orderhistory)にログインします。
2. 注文履歴一覧ページを開くと、各注文のボタンの隣に商品名が表示されます！

例：
[注文詳細] 商品名: THE IDOLM@STER 20th anniversary ORCHESTRA CONCERT 公式アクリルスタンド 【風野灯織】


## ファイル構成
asobistore-mypage-helper/
├── manifest.json
├── content_script.js
├── background.js
└── README.md


## 技術スタック
- Manifest V3
- Content Scripts
- Background Service Worker
- JavaScript (Vanilla)

## 注意事項
- アソビストアへのログインが必要です
- ページ構成が変更された場合、動作しなくなる可能性があります
- 本拡張機能は個人の学習目的で開発されています


