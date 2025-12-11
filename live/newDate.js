"use strict"

function showClock() {
    let nowDate = new Date(), hhmmss, hh, mm, ss;
    hh = Number(nowDate.getHours());
    mm = Number(nowDate.getMinutes());
    ss = Number(nowDate.getSeconds());
    hhmmss = hh.toString().padStart( 2, "0") + ":" + mm.toString().padStart( 2, "0") + ":" + ss.toString().padStart( 2, "0");
    document.getElementById("date").textContent = hhmmss;
};