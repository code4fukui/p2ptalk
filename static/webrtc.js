let peerConnection = null; // RTCPeerConnection
let dataChannel = null;

export const createConnection = async (streamconfig, remoteVideo, localVideo, sdp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = { "iceServers": [] }; // STUN/TURN servers
      const pc = new RTCPeerConnection(config);
    
      pc.ontrack = (e) => { // 通信相手のトラック
        console.log("called: ontrack");
        const stream = e.streams[0];
        playVideo(remoteVideo, stream);
      };
    
      pc.onicecandidate = (e) => { // 通信経路の候補
        console.log("called: onicecandidate");
        if (!e.candidate) { // 通信経路収集完了
          console.log('completed: ICE candidate');
          resolve(pc.localDescription.sdp);
        }
      };

      pc.onconnectionstatechange = (e) => {
        switch (pc.connectionState) {
          case "connected":
          case "disconnected":
          case "failed":
          case "closed":
        }
        console.log("onconnectionstatechange", pc.connectionState);
      };
      pc.ondatachannel = (e) => {
        console.log("ondatachannel", e);
        setupDataChannel(e.channel);
      };
      dataChannel = pc.createDataChannel("data-channel", { ordered: false });
      setupDataChannel(dataChannel);

      peerConnection = pc;
      
      await startVideo(streamconfig, localVideo);
      if (!sdp) {
        createOffer();
      } else {
        await receiveRemoteSdpForAnswer(sdp);
        await createAnswer();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let dataChannelOnMessage = null;
export const setDataChannelOnMessage = (f) => dataChannelOnMessage = f;

const setupDataChannel = (dc) => {
  dc.onerror = (e) => {
    console.log("datachannel onerror", e);
  };
  dc.onmessage = (e) => {
    console.log("datachannel onmessage", e);
    const msg = e.data;
    console.log("msg", msg);
    if (dataChannelOnMessage) {
      dataChannelOnMessage(msg);
    }
  };
  dc.onopen = (e) => {
    console.log("datachannel onopen", e);
  };
  dc.onclose = (e) => {
    console.log("datachannel onclose", e);
  };
};
export const sendDataChannel = (msg) => {
  dataChannel.send(msg);
};

export const startVideo = async (streamconfig, localVideo) => {
  if (!streamconfig.video && !streamconfig.audio) {
    return;
  }
  if (streamconfig.audio) {
    streamconfig.audio = {
      echoCancellation: true,
      noiseSuppression: true,
    };
  }
  const stream = await navigator.mediaDevices.getUserMedia(streamconfig);
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  playVideo(localVideo, stream);
}
export const playVideo = (element, stream) => {
  element.srcObject = stream;
  element.play();
};
export const createOffer = async () => {
  const sessionDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(sessionDescription);
};
export const receiveRemoteSdpForAnswer = async (sdp) => { // from Offer
  const offer = new RTCSessionDescription({ type: "offer", sdp });
  await peerConnection.setRemoteDescription(offer);
};
export const createAnswer = async () => {
  const sessionDescription = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(sessionDescription);
};
export const receiveRemoteSdpForOffer = async (sdp) => { // from Answer
  const answer = new RTCSessionDescription({ type: "answer", sdp });
  await peerConnection.setRemoteDescription(answer);
};
