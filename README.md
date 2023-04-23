# poptalk

## simple test

- https://code4fukui.github.io/p2ptalk/static/sdptest.html

1. open this URL on 2 browser tabs (A and B)
2. A: create offer
3. B: create answer from offer
4. A: accept answer

## how to run

```sh
deno run p2ptalk.js
```

open http://localhost:8001/ on your browser

## config

static/webrtc_config.json if use STUN/TURN
```json
{
  "iceServers": [
    { "urls": "stun:xxx.xxx" },
    { "urls": "turns:xxx.xxx", "username": "xxx", "credential": "xxx" }
  ]
}
```

## blog

- https://fukuno.jig.jp/3605

