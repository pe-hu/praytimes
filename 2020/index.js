'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    thisDate(index);
    randomdVideos(index);
    playVideo(index);
}

async function fetchMD(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(md => {
            document.querySelector(query).innerText = md;
        });
}

async function fetchHTML(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector(query).innerHTML = html;
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

function thisDate(obj) {
    const dataTime = document.querySelector('#time button');
    dataTime.textContent = obj.datetime;
    dataTime.addEventListener('click', function (event) {
        let ago = new Date(obj.datetime);
        let diff = new Date().getTime() - ago.getTime();
        let progress = new Date(diff);
        let now;
        if (progress.getUTCFullYear() - 1970) {
            now = progress.getUTCFullYear() - 1970 + ' years ago';
        } else if (progress.getUTCMonth()) {
            now = progress.getUTCMonth() + ' months ago';
        } else if (progress.getUTCDate() - 1) {
            now = progress.getUTCDate() - 1 + ' days ago';
        } else if (progress.getUTCHours()) {
            now = progress.getUTCHours() + ' hour ago';
        } else if (progress.getUTCMinutes()) {
            now = progress.getUTCMinutes() + ' minutes ago';
        } else {
            now = 'now';
        }
        event.target.textContent = event.target.textContent === obj.datetime ? now : obj.datetime;
    });
}

function randomdVideos(obj) {
    const main = document.querySelector('main');
    const title = document.querySelector('h1 span');
    const description = document.querySelector('#description');
    const youtube = document.querySelector('#youtube');
    const randomdRaggable = document.querySelector('#randomdraggable');

    title.innerHTML = obj.title;
    description.innerHTML = obj.description;
    youtube.href = `https://youtu.be/${obj.youtube}`;
    const playAll = shuffle(obj.play);
    for (let i = 0; i < playAll.length; i++) {
        const li = document.createElement('li');
        randomdRaggable.appendChild(li);

        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'youtube');
        input.id = playAll[i].id;
        input.value = playAll[i].id;
        li.appendChild(input);

        const label = document.createElement('label');
        label.setAttribute('for', playAll[i].id);
        li.appendChild(label);

        const video = document.createElement('video');
        label.appendChild(video);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            video.muted = true;
            video.setAttribute('muted', 'true');
            video.setAttribute('playsinline', 'true');
        }

        const canvas = document.querySelector("#live");
        canvas.style.backgroundImage = `url(${obj.id}cover.jpeg)`;
        let canvasCtx = canvas.getContext('2d');

        function canvasUpdate() {
            canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(canvasUpdate);
        };

        if (playAll[i].src) {
            let ii = 0;
            const source = document.createElement('source');
            source.setAttribute("type", "video/mp4");
            source.src = obj.id + playAll[i].src[ii];
            video.appendChild(source);

            video.addEventListener('ended', () => {
                if (playAll[i].src.length === 0) {
                    ii = 0;
                    source.src = obj.id + playAll[i].src[ii];
                    video.pause();
                } else if (ii === playAll[i].src.length - 1) {
                    ii = 0;
                    source.src = obj.id + playAll[i].src[ii];
                    video.pause();
                } else if (ii < playAll[i].src.length - 1) {
                    ii++;
                    source.src = obj.id + playAll[i].src[ii];
                    video.load();
                    video.play();
                }
            }, false);
        }

        if (i === 0) {
            canvasUpdate();
        }

        video.addEventListener('click', function () {
            canvasUpdate();
        })
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const audio = new Audio(obj.id + obj.audio);
        audio.hidden = true;
        main.appendChild(audio);

        audio.addEventListener('ended', () => {
            const all = document.querySelectorAll('video');
            all.forEach((iii) => {
                iii.remove();
            })

            const h2 = document.querySelector('h2');
            const h2b = document.querySelector("h2 b");
            h2.className = "replay";
            h2b.textContent = "Replay";
            h2.addEventListener('click', function () {
                location.reload();
            });
        }, false);
    }
}

function playVideo(obj) {
    const h2 = document.querySelector('h2');
    const h2b = document.querySelector("h2 b");

    h2.addEventListener('click', function () {
        h2.className = h2.className === "start" ? "stop" : "start";
        h2b.textContent = h2b.textContent === "PLAY" ? "PAUSE" : "PLAY";
        if (h2.className === "start") {
            stop();
        } else if (h2.className === "stop") {
            start();
        }
    });

    function start() {
        const all = document.querySelectorAll('video, audio');
        all.forEach((iii) => {
            iii.play();
        })
    }

    function stop() {
        const all = document.querySelectorAll('video, audio');
        all.forEach((iii) => {
            iii.pause();
        })
    }

    window.onresize = tmResize;
    function tmResize() {
        if (typeof pageResize == "function") {
            pageResize();
        }
    }

    function windowScreen() {
        const canvas = document.querySelector("#live");
        canvas.width = window.innerHeight / obj.width;
        canvas.height = window.innerHeight / obj.height;
    }

    function pageResize() {
        windowScreen();
    }
    windowScreen();
}

window.addEventListener("load", () => {
    const h2 = document.querySelector('h2');
    h2.hidden = false;

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
