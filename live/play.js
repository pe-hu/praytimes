'use strict'

window.onload = () => {
    const h2 = document.querySelector('h2');
    const timeCount = document.querySelector("h2 b");
    const videoAll = document.querySelectorAll('video');

    let startTime;
    let playtime = 0;
    let timerId;
    let timeToadd = 0;

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
        videoAll.forEach((video) => {
            video.play()
        })
    }

    function stopTimer() {
        clearInterval(timerId);
        timeToadd += Date.now() - startTime;
        videoAll.forEach((video) => {
            video.pause()
        })
    }

    h2.hidden = false
    h2.addEventListener('click', function () {
        h2.className = h2.className === "start" ? "stop" : "start";
        if (h2.className === "start") {
            stopTimer()
        } else if (h2.className === "stop") {
            startTimer()
        }
    });
}