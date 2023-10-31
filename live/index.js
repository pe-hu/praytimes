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

    const playAll = shuffle(obj.play)
    for (let i = 0; i < playAll.length; i++) {
        const li = document.createElement('li');
        const video = document.createElement('video');
        video.setAttribute('poster', `${playAll[i].poster}`)
        video.setAttribute('playsinline', '')

        var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
        if (iOS) {
            video.muted = true;
        }
        const canvas = document.querySelector("#live");
        let canvasCtx = canvas.getContext('2d');

        function canvasUpdate() {
            canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(canvasUpdate);
        };

        li.appendChild(video);
        randomdRaggable.appendChild(li);

        if (playAll[i].src) {
            let ii = 0
            const source = document.createElement('source');
            source.setAttribute("type", "video/mp4")
            source.src = playAll[i].src[ii]
            video.appendChild(source)

            video.addEventListener('ended', () => {
                if (playAll[i].src.length === 0) {
                    ii = 0
                } else if (ii < playAll[i].src.length - 1) {
                    ii++
                } else {
                    ii = 0
                }
                source.src = playAll[i].src[ii]
                video.load()
                video.play()
            }, false);
        }

        if (i == 0) {
            canvasUpdate()
        }

        video.addEventListener('click', function () {
            video.muted = false;
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
    const timeCount = document.querySelector("h2 b");
    
    h2.hidden = false
    h2.addEventListener('click', function () {
        h2.className = h2.className === "start" ? "stop" : "start";
        if (h2.className === "start") {
            stopTimer()
        } else if (h2.className === "stop") {
            startTimer()
        }
    });

    function updateTimeText() {
        var m = Math.floor(playtime / 60000);
        var s = Math.floor((playtime % 60000) / 1000);
        var ms = playtime % 1000;

        m = ("0" + m).slice(-2);
        s = ("0" + s).slice(-2);
        ms = ("00" + ms).slice(-3);

        timeCount.textContent = m + ":" + s + ":" + ms;
    }

    function countUp() {
        timerId = setTimeout(function () {
            playtime = Date.now() - startTime + timeToadd;
            updateTimeText();
            countUp();
        }, 10);
    }

    function startTimer() {
        startTime = Date.now();
        countUp();
        
        const videoAll = document.querySelectorAll('video');
        videoAll.forEach((iii) => {
            iii.play()
        })
    }

    function stopTimer() {
        clearInterval(timerId);
        timeToadd += Date.now() - startTime;
        
        const videoAll = document.querySelectorAll('video');
        videoAll.forEach((iii) => {
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
