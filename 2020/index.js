"use strict"

async function indexJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    randomdVideos(index);
    playVideo(index);
};

async function fetchMD(url = "", query = "") {
    fetch(url)
        .then(response => response.text())
        .then(md => {
            document.querySelector(query).innerText = md;
        }, false);
};

async function fetchHTML(url = "", query = "") {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector(query).innerHTML = html;
        }, false);
};

function shuffle(arrays) {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
        const shuffleArr = Math.floor(Math.random() * (i + 1));
        [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
    } return array;
};

function randomdVideos(obj) {
    const randomdRaggable = document.querySelector("#randomdraggable");
    const playAll = shuffle(obj.play);
    for (let i = 0; i < playAll.length; i++) {

        const input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "youtube");
        input.id = playAll[i].id;
        input.value = playAll[i].id;
        randomdRaggable.appendChild(input);

        const label = document.createElement("label");
        label.setAttribute("for", playAll[i].id);
        label.style.width = `calc(20vw / ${obj.width})`;
        label.style.maxWidth = `calc(10rem / ${obj.width})`;
        randomdRaggable.appendChild(label);

        const video = document.createElement("video");
        video.poster = obj.directory + playAll[i].cover;
        label.appendChild(video);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            video.muted = true;
            video.setAttribute("muted", "true");
            video.setAttribute("playsinline", "true");
        };

        const canvas = document.querySelector("#live");
        canvas.style.backgroundImage = `url(${obj.cover})`;
        let canvasCtx = canvas.getContext("2d");

        function canvasUpdate() {
            input.checked = true;
            canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(canvasUpdate);
        };

        if (playAll[i].src) {
            let ii = 0;
            const source = document.createElement("source");
            source.setAttribute("type", "video/mp4");
            source.src = obj.directory + playAll[i].src[ii];
            video.appendChild(source);

            video.addEventListener("ended", () => {
                if (playAll[i].src.length === 0) {
                    video.pause();
                    ii = 0;
                    source.src = obj.directory + playAll[i].src[0];
                    video.load();
                } else if (ii === playAll[i].src.length - 1) {
                    video.pause();
                    ii = 0;
                    source.src = obj.directory + playAll[i].src[0];
                    video.load();
                } else if (ii < playAll[i].src.length - 1) {
                    ii++;
                    source.src = obj.directory + playAll[i].src[ii];
                    video.load();
                    video.play();
                    canvasUpdate();
                };
            }, false);
        };

        if (i === 0) {
            canvasUpdate();
        };

        video.addEventListener("click", function () {
            canvasUpdate();
        }, false);
    };

    if (obj.youtube) {
        const youtube = document.querySelector("#youtube");
        youtube.href = `https://youtu.be/${obj.youtube}`;
    } else {
        const youtube = document.querySelector("#youtube");
        youtube.remove()

    };

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (obj.audio) {
            const audio = new Audio(obj.directory + obj.audio);
            audio.hidden = true;
            document.querySelector("main").appendChild(audio);

            audio.addEventListener("ended", () => {
                const all = document.querySelectorAll("video");
                all.forEach((iii) => {
                    iii.remove();
                });

                const h2 = document.querySelector("h2");
                const h2b = document.querySelector("h2 b");
                h2.className = "replay";
                h2b.textContent = "Replay";
                h2.addEventListener("click", function () {
                    location.reload();
                });
            }, false);
        };
    };
};

function playVideo(obj) {
    const dataTime = document.querySelector("#time button");
    dataTime.textContent = obj.datetime;
    dataTime.addEventListener("click", function (event) {
        let ago = new Date(obj.datetime);
        let diff = new Date().getTime() - ago.getTime();
        let progress = new Date(diff);
        let now;
        if (progress.getUTCFullYear() - 1970) {
            now = progress.getUTCFullYear() - 1970 + " years ago";
        } else if (progress.getUTCMonth()) {
            now = progress.getUTCMonth() + " months ago";
        } else if (progress.getUTCDate() - 1) {
            now = progress.getUTCDate() - 1 + " days ago";
        } else if (progress.getUTCHours()) {
            now = progress.getUTCHours() + " hour ago";
        } else if (progress.getUTCMinutes()) {
            now = progress.getUTCMinutes() + " minutes ago";
        } else {
            now = "now";
        };
        event.target.textContent = event.target.textContent === obj.datetime ? now : obj.datetime;
    });

    const title = document.querySelector("h1 span");
    title.innerHTML = obj.title;

    const description = document.querySelector("#description");
    if (obj.description) {
        for (const eachP of obj.description) {
            const p = document.createElement("p");
            p.innerHTML = eachP;
            description.appendChild(p);
        };
    };

    const note = document.querySelector("#readme");
    if (obj.note) {
        for (const eachSection of obj.note) {
            const section = document.createElement("section");
            note.appendChild(section);
            for (const eachP of eachSection) {
                const p = document.createElement("p");
                p.innerHTML = eachP;
                section.appendChild(p);
            };
        };
    };

    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    const h2b = document.querySelector("h2 b");
    h2.addEventListener("click", function () {
        h1.hidden = h1.hidden === false ? true : false;
        h2.className = h2.className === "start" ? "stop" : "start";
        h2b.textContent = h2b.textContent === "PLAY" ? "PAUSE" : "PLAY";
        if (h2.className === "start") {
            stop();
        } else if (h2.className === "stop") {
            start();
        };
    }, false);

    function start() {
        const all = document.querySelectorAll("video, audio");
        all.forEach((iii) => {
            iii.play();
        }, false);
    };

    function stop() {
        const all = document.querySelectorAll("video, audio");
        all.forEach((iii) => {
            iii.pause();
        }, false);
    };

    window.onresize = tmResize;
    function tmResize() {
        if (typeof pageResize == "function") {
            pageResize();
        };
    };

    function windowScreen() {
        const canvas = document.querySelector("#live");
        canvas.width = window.innerHeight / obj.width;
        canvas.height = window.innerHeight / obj.height;
    };

    function pageResize() {
        windowScreen();
    };
    windowScreen();
};

window.addEventListener("load", () => {
    const h2 = document.querySelector("h2");
    h2.hidden = false;

    const scrollElement = document.querySelector("#randomdraggable");
    scrollElement.addEventListener("wheel", (e) => {
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
}, false);