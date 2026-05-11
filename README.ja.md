# p2ptalk

WebRTCを使用したシンプルなピアツーピアのビデオ、音声、データチャットアプリケーションです。接続の確立を支援するDenoベースのシグナリングサーバーが含まれています。

## デモ

### メインアプリケーション
- **[p2ptalk デモ](https://code4fukui.github.io/p2ptalk/static/index.html)**

メインとなるユーザー向けインターフェースです。1人のユーザーが通話を開始し、生成されたリンクをもう1人に共有することで自動的に接続します。

### 手動SDPテスト
- **[SDPテストページ](https://code4fukui.github.io/p2ptalk/static/sdptest.html)**

2つのブラウザタブ間でSDPのオファーとアンサーを手動で交換するためのデバッグツールです。

## 機能

- WebRTCによるピアツーピアのビデオおよび音声ストリーミング。
- Data Channelを使用したリアルタイムのテキストメッセージング。
- SDP交換用のシンプルなDenoシグナリングサーバー。
- NAT越え（NATトラバーサル）のためのSTUN/TURNサーバーのオプション設定。

## 要件

- [Deno](https://deno.land/)（サーバーの実行用）
- WebRTCをサポートするモダンなWebブラウザ（例: Chrome, Firefox）

## はじめに

### 1. シグナリングサーバーの実行

リポジトリをクローンし、Denoを使用してサーバーを実行します。ネットワーク、読み取り、書き込みの権限を付与する必要があります。

```sh
deno run --allow-net --allow-read --allow-write p2ptalk.js
```

サーバーはデフォルトで `http://localhost:8001` で起動します。

### 2. アプリケーションの使用

1.  **発信者:** ブラウザで `http://localhost:8001/` を開きます。
2.  ビデオ/音声のオプションを選択し、「call」ボタンをクリックします。
3.  一意の招待URLが生成されます。このURLをコピーして受信者に送信します。
4.  **受信者:** 受け取った招待URLをブラウザで開きます。
5.  ブラウザ同士が直接接続され、ビデオ/チャットセッションが開始されます。

## 設定（STUN/TURN）

異なるネットワーク間（例: NAT配下）で接続を確立するには、STUNまたはTURNサーバーを設定する必要がある場合があります。

`static/webrtc_config.json` という名前のファイルを作成し、ICEサーバーの詳細を記述します。このファイルはリポジトリには含まれておらず、Gitの管理対象外となります。

**例: `static/webrtc_config.json`:**
```json
{
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" },
    { "urls": "turns:your.turn.server:443", "username": "user", "credential": "password" }
  ]
}
```

## シグナリングサーバーAPI

サーバーは、SDPデータを一時的に `sdp.json` に保存するためのシンプルなJSON APIを提供します。

-   `GET /api/list`: 保存されたすべてのSDPレコードを一覧表示します。
-   `POST /api/get`: 特定のIDでレコードを取得します。
-   `POST /api/set`: レコードを追加または更新します。
-   `POST /api/remove`: IDで1つ以上のレコードを削除します。

## 関連項目

-   [WebRTCでP2Pビデオチャット（シグナリングサーバーDeno編）](https://fukuno.jig.jp/3605)
-   [WebRTCをスマホで！ビデオ通話p2ptalk、STUN/TURNサーバー対応](https://fukuno.jig.jp/3924)

## ライセンス

MIT License
