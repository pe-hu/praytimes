'use strict'

function userStream() {
    const randomdRaggable = document.querySelector('#randomdraggable')
    const live = document.createElement('li')
    live.id = "userMedia"
    randomdRaggable.appendChild(live)

    const input = document.createElement('input')
    input.setAttribute('type', 'radio')
    input.setAttribute('name', 'live')
    input.id = "live"
    input.value = "live"
    input.checked = true
    live.appendChild(input)

    const label = document.createElement('label')
    label.setAttribute('for', 'live')
    live.appendChild(label)

    const userMedia = document.createElement('video')
    userMedia.setAttribute('autoplay', 'true')
    userMedia.setAttribute('playsinline', 'true')
    label.appendChild(userMedia)

    let media = navigator.mediaDevices.getUserMedia({
        video: true,
        video: {
            facingMode: "user"
        }, // インカメラ
        audio: false,
    })
    media.then((stream) => {
        userMedia.srcObject = stream
    })

    function canvasUpdate() {
        const canvas = document.querySelector("#live")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        let canvasCtx = canvas.getContext('2d')
        canvasCtx.drawImage(userMedia, 0, 0, canvas.width, canvas.height)
        requestAnimationFrame(canvasUpdate)
    }
    
    userMedia.addEventListener('click', function () {
        canvasUpdate()
    }, false)
    canvasUpdate()
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        let enter = document.querySelector('h1')
        enter.addEventListener('click', function () {
            enter.className = enter.className === "enter" ? "live" : "enter";
            if (enter.className === "enter") {
                const live = document.querySelector('#userMedia')
                const userMedia = document.querySelector('#userMedia video')
                const stream = userMedia.srcObject
                const tracks = stream.getTracks()
                tracks.forEach(function (track) {
                    track.stop()
                })
                live.remove()
            } else if (enter.className === "live") {
                userStream()
            }
        })
    } else if (event.target.readyState === 'complete') {
        const allVideo = document.querySelectorAll('video')
        allVideo.forEach((video) => {
            video.addEventListener('click', function () {
                function canvasUpdate() {
                    const canvas = document.querySelector("#live")
                    canvas.width = window.innerWidth
                    canvas.height = window.innerHeight
                    let canvasCtx = canvas.getContext('2d')
                    canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    requestAnimationFrame(canvasUpdate)
                }
                canvasUpdate()
            }, false)
        })
    }
});