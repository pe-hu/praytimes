"use strict"

let video_width, video_height, w_divided_h = 9 / 16, thisID;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // for Mobile
} else {
    // for PC
};

function creatrVideo(stream) {
    // Get the video track of the camera stream
    const track = stream.getVideoTracks()[0],
        settings = track.getSettings();

    // Camera resolution
    video_width = settings.width;
    video_height = settings.height;
    console.log(`Width: ${video_width}`);
    console.log(`Height: ${video_height}`);

    const randomdraggable = document.querySelector("#randomdraggable");

    const input = document.createElement("input");
    input.id = thisID;
    input.setAttribute("type", "radio");
    input.setAttribute("name", "channel");
    randomdraggable.appendChild(input);

    const label = document.createElement("label");
    label.style.height = "100%";
    label.setAttribute("for", thisID);
    randomdraggable.appendChild(label);

    const video = document.createElement("video");
    video.setAttribute("autoplay", true);
    video.setAttribute("playsinline", true);
    video.srcObject = stream;
    label.appendChild(video);
    video.play();

    function streamUser() {
        const canvas = document.querySelector("main #live"),
            canvasCtx = canvas.getContext("2d");
        canvasCtx.drawImage(video, 0, 0, window.innerHeight * w_divided_h, window.innerHeight);
        requestAnimationFrame(streamUser);
    };
    streamUser();
};

async function startStreamedVideo() {
    /*
    MediaDevices: enumerateDevices() メソッド
    マイクやカメラ、ヘッドセットなど、現在利用可能なメディア入出力機器の一覧を要求
    https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/enumerateDevices
    */
    if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
    } else {
        const videoDevices = document.querySelector("#videoDevices button");
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                // 入出力機器を列挙
                devices.forEach((device) => {
                    if (device.kind == "videoinput") {
                        thisID = device.deviceId;
                        videoDevices.innerHTML = `${device.label} <small>${device.deviceId}</small>`;
                    };
                });

                /*
                MediaDevices: getUserMedia() メソッド
                要求された種類のメディアを含むトラックを持つ MediaStream (videoとaudio) を生成する
                https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia
                */
                navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: {
                        width: { min: 576, ideal: 720, max: 1080 },
                        height: { min: 1024, ideal: 1280, max: 1920 },
                    }
                }).then((stream) => {
                    const h1 = document.querySelector("h1");
                    const h2 = document.querySelector("h2");
                    const h2b = document.querySelector("h2 b");
                    h1.hidden = true;
                    h2.className = "stop";
                    h2b.textContent = "PAUSE";
                    windowScreen();
                    creatrVideo(stream);
                }).catch((err) => {
                    videoDevices.innerHTML = `デバイスのカメラ・マイクが作動しません <small>${err}</small>`;
                });
            })
            .catch((err) => {
                videoDevices.innerHTML = `${err.name}: ${err.message}`;
            });
    };
};

function stopStreamedVideo() {
    const input = document.getElementById(thisID),
        label = document.querySelector(`label[for="${thisID}"]`),
        video = document.querySelector(`label[for="${thisID}"] video`),
        canvas = document.querySelector("main #live"),
        canvasCtx = canvas.getContext("2d");

    // 停止
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
    video.srcObject = null;

    input.remove();
    label.remove();
    video.remove();

    //  キャンパスをリセット
    canvasCtx.clearRect(0, 0, window.innerHeight * w_divided_h, window.innerHeight);
};

function tmResize() {
    if (typeof pageResize == "function") {
        pageResize();
    };
};
window.onresize = tmResize;

function windowScreen() {
    const canvas = document.querySelector("#live");
    canvas.width = window.innerHeight * w_divided_h;
    canvas.height = window.innerHeight;
};

function pageResize() {
    windowScreen();
};

// Connectボタンが押されたらWebRTCのOffer処理を開始
function connect() {
    if (!peerConnection) {
        console.log('make Offer');
        peerConnection = prepareNewConnection(true);
    }
    else {
        console.warn('peer already exist.');
    }
}

// WebRTCを利用する準備をする
function prepareNewConnection(isOffer) {
    /*
    RTCPeerConnectionのインスタンスを作成
    https://developer.mozilla.org/ja/docs/Web/API/RTCPeerConnection
    */
    const config = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0,
        "iceServers": [{
            "urls": "stun:stun.l.google.com:19302"
        }]
    };
    const peer = new RTCPeerConnection(config);

    // リモートのMediaStreamTrackを受信した時
    peer.ontrack = evt => {
        console.log('-- peer.ontrack()');
        console.log(evt.streams[0]);
    };

    // ICE Candidateを収集したときのイベント
    peer.onicecandidate = evt => {
        if (evt.candidate) {
            console.log(evt.candidate);
        } else {
            console.log('empty ice event');
            console.log(peer.localDescription);
        };
    };

    // ローカルのMediaStreamを利用できるようにする
    if (localStream) {
        console.log('Adding local stream...');
        localStream.getTracks().forEach(track => peer.addTrack(track, localStream));
    } else {
        console.warn('no local stream, but continue.');
    }

    // Offer側でネゴシエーションが必要になったときの処理
    peer.onnegotiationneeded = async () => {
        try {
            if (isOffer) {
                if (negotiationneededCounter === 0) {
                    let offer = await peer.createOffer();
                    console.log('createOffer() succsess in promise');
                    await peer.setLocalDescription(offer);
                    console.log('setLocalDescription() succsess in promise');
                    sendSdp(peer.localDescription);
                    negotiationneededCounter++;
                }
            }
        } catch (err) {
            console.error('setLocalDescription(offer) ERROR: ', err);
        }
    }
    return peer;
}

// 手動シグナリングのための処理を追加する
function sendSdp(sessionDescription) {
    console.log('---sending sdp ---');
    textForSendSdp.value = sessionDescription.sdp;
    textForSendSdp.focus();
    textForSendSdp.select();
}