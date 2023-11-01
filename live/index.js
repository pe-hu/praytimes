'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    randomdVideos(index);
    playVideo()
}

async function fetchMD(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(md => {
            document.querySelector(query).innerText = md
        });
}

async function fetchHTML(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector(query).innerHTML = html
        });
}

function shuffle(arrays) {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
        const shuffleArr = Math.floor(Math.random() * (i + 1));
        [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
    }
    return array;
}

function randomdVideos(obj) {
    const randomdRaggable = document.querySelector('#randomdraggable');

    const playAll = shuffle(obj.play);
    for (let i = 0; i < playAll.length; i++) {
        const li = document.createElement('li');
        randomdRaggable.appendChild(li);
        
        const video = document.createElement('video');
        video.muted = true;
        video.setAttribute('muted', 'true');
        video.setAttribute('playsinline', '');
        li.appendChild(video);
        
        const canvas = document.querySelector("#live");
        let canvasCtx = canvas.getContext('2d');

        function canvasUpdate() {
            canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(canvasUpdate);
        };

        if (playAll[i].src) {
            let ii = 0
            const source = document.createElement('source');
            source.setAttribute("type", "video/mp4")
            source.src = playAll[i].src[ii]
            video.appendChild(source)
            const audio = new Audio(playAll[i].src[ii]);
            audio.hidden = true;
            li.appendChild(audio);

            video.addEventListener('ended', () => {
                if (playAll[i].src.length === 0) {
                    ii = 0
                    source.src = playAll[i].src[ii]
                    audio.src = playAll[i].src[ii]
                    video.remove()
                    audio.remove()
                } else if (ii === playAll[i].src.length) {
                    ii = 0
                    source.src = playAll[i].src[ii]
                    audio.src = playAll[i].src[ii]
                    video.remove()
                    audio.remove()
                } else if (ii < playAll[i].src.length - 1) {
                    ii++
                    source.src = playAll[i].src[ii]
                    audio.src = playAll[i].src[ii]
                    video.load()
                    video.play()
                    audio.play()
                }
            }, false);
        }

        if (i === 0) {
            canvasUpdate()
        }

        video.addEventListener('click', function () {
            canvasUpdate()
        })
    }
}

function playVideo() {
    let startTime;
    let playtime = 0;
    let timerId;
    let timeToadd = 0;
    
    const h2 = document.querySelector('h2');
    const h2b = document.querySelector("h2 b");
    
    h2.hidden = false
    h2.addEventListener('click', function () {
        h2.className = h2.className === "start" ? "stop" : "start";
        h2b.textContent = h2b.textContent === "PLAY" ? "PAUSE" : "PLAY";
        if (h2.className === "start") {
            stop()
        } else if (h2.className === "stop") {
            start()
        }
    });

    function start() {
        const all = document.querySelectorAll('video, audio');
        all.forEach((iii) => {
            iii.play()
        })
    }

    function stop() {
        const all = document.querySelectorAll('video, audio');
        all.forEach((iii) => {
            iii.pause()
        })
    }
}

window.addEventListener("load", () => {
    const live = document.querySelector('#live');
    live.style.backgroundImage = 'url(cover.jpeg)'
    const scrollElement = document.querySelector('#randomdraggable');
    scrollElement.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
        if (
            (scrollElement.scrollLeft <= 0 && e.deltaY < 0) ||
            (scrollElement.scrollLeft >= maxScrollLeft && e.deltaY > 0)
        )
            return;
        e.preventDefault();
        scrollElement.scrollLeft += e.deltaY;
    });
});
