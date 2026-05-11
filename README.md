# p2ptalk

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple peer-to-peer video, audio, and data chat application using WebRTC. It includes a Deno-based signaling server to facilitate the connection setup.

## Demos

### Main Application
- **[p2ptalk Demo](https://code4fukui.github.io/p2ptalk/static/index.html)**

This is the primary user-friendly interface. One user initiates a call and shares a generated link with another to connect automatically.

### Manual SDP Test
- **[SDP Test Page](https://code4fukui.github.io/p2ptalk/static/sdptest.html)**

A debugging tool for manually exchanging SDP offers and answers between two browser tabs.

## Features

- Peer-to-peer video and audio streaming via WebRTC.
- Real-time text messaging using Data Channels.
- Simple Deno signaling server for SDP exchange.
- Optional STUN/TURN server configuration for NAT traversal.

## Requirements

- [Deno](https://deno.land/) (for running the server)
- A modern web browser with WebRTC support (e.g., Chrome, Firefox)

## Getting Started

### 1. Run the Signaling Server

Clone the repository and run the server using Deno. You need to grant network, read, and write permissions.

```sh
deno run --allow-net --allow-read --allow-write p2ptalk.js
```

The server will start on `http://localhost:8001` by default.

### 2. Use the Application

1.  **Caller:** Open `http://localhost:8001/` in your browser.
2.  Select video/audio options and click the "call" button.
3.  A unique invitation URL will be generated. Copy this URL and send it to the receiver.
4.  **Receiver:** Open the invitation URL in their browser.
5.  The browsers will connect directly, and the video/chat session will begin.

## Configuration (STUN/TURN)

For connections to work across different networks (e.g., behind NATs), you may need to configure STUN or TURN servers.

Create a file named `static/webrtc_config.json` with your ICE server details. This file is not included in the repository and will be ignored by Git.

**Example `static/webrtc_config.json`:**
```json
{
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" },
    { "urls": "turns:your.turn.server:443", "username": "user", "credential": "password" }
  ]
}
```

## Signaling Server API

The server provides a simple JSON API to exchange SDP data, which is temporarily stored in `sdp.json`.

-   `GET /api/list`: Lists all stored SDP records.
-   `POST /api/get`: Retrieves a specific record by its ID.
-   `POST /api/set`: Adds or updates a record.
-   `POST /api/remove`: Deletes one or more records by ID.

## See Also

-   [WebRTCでP2Pビデオチャット（シグナリングサーバーDeno編）](https://fukuno.jig.jp/3605)
-   [WebRTCをスマホで！ビデオ通話p2ptalk、STUN/TURNサーバー対応](https://fukuno.jig.jp/3924)

## License

MIT License