'use strict'

function userStream() {
    const randomdRaggable = document.querySelector('#randomdraggable')
    const li = document.createElement('li')
    li.id = "userMedia"

    const userMedia = document.createElement('video')
    userMedia.setAttribute('autoplay', 'true')
    userMedia.setAttribute('playsinline', 'true')
    li.appendChild(userMedia)
    randomdRaggable.appendChild(li)

    let media = navigator.mediaDevices.getUserMedia({
        video: true,
        video: {
            facingMode: "user"
        }, // インカメラ
        audio: false,
    });
    media.then((stream) => {
        userMedia.srcObject = stream
    });

    const canvas = document.querySelector("#live")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let canvasCtx = canvas.getContext('2d')
    function canvasUpdate() {
        canvasCtx.drawImage(userMedia, 0, 0, canvas.width, canvas.height)
        requestAnimationFrame(canvasUpdate)
    };
    canvasUpdate();
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        let enter = document.querySelector('h1')
        enter.addEventListener('click', function () {
            enter.className = enter.className === "start" ? "stop" : "start";
            if (enter.className === "start") {
                const thisLi = document.querySelector('#userMedia')
                const userMedia = document.querySelector('#userMedia video')
                const stream = userMedia.srcObject
                const tracks = stream.getTracks()
                tracks.forEach(function (track) {
                    track.stop()
                })
                thisLi.remove()
            } else if (enter.className === "stop") {
                userStream()
            }
        })
    } else if (event.target.readyState === 'complete') {
        const all = document.querySelectorAll('video');
        all.forEach((iii) => {
            iii.addEventListener('click', function () {
                //
            })
        })
    }
});