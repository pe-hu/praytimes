'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    randomdVideos(index);
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
        video.id = playAll[i].id;
        video.playsinline = true;
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
            canvasUpdate();
        })
    }
}

window.addEventListener("load", (event) => {
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
