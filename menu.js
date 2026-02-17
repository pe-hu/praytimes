"use strict"

const indexMenu = [
    {
        "href": "/",
        "date": null,
        "title": "プレイタイムズ",
        "description": "praytimes.pe.hu"
    },
    {
        "href": "/2020/",
        "date": "2024.01.07",
        "title": "2020年のプレイタイムズ",
        "description": "これは、ペフによる初めての現代美術作品「プレイタイムズ」の記録映像作品です。"
    },
    {
        "href": "/inn/",
        "date": "2020.06.27 - 2021.01.30",
        "title": "楽観のテクニック The Technique of Optimism",
        "description": "BnA Alter Museum SCG (Stair Case Gallery) にて開催された特別企画展で、現代美術作品「プレイタイムズ」を発表しました。"
    }
];

const options = {month: "long"};
function showClock() {
    let nowDate = new Date(), hhmmss, hh, mm, ss;
    hh = Number(nowDate.getHours());
    mm = Number(nowDate.getMinutes());
    ss = Number(nowDate.getSeconds());
    hhmmss = hh.toString().padStart(2, "0") + ":" + mm.toString().padStart(2, "0") + ":" + ss.toString().padStart(2, "0");
    document.getElementById("date").textContent = new Intl.DateTimeFormat("en-US", options).format(nowDate) + " " + nowDate.getDate() + " " + nowDate.getFullYear();
    document.getElementById("time").textContent = hhmmss;
};

function openModal() {
    if (typeof document.querySelector("#modal").showModal === "function") {
        document.querySelector("#modal").showModal();
    } else {
        alert("The <dialog> API is not supported by this browser");
    };
};

window.addEventListener("load", () => {
    const dialogModal = document.querySelector("#modal"),
        closeBtn = document.querySelector("#closeBtn"),
        dialogMenu = document.querySelector("#modal menu");

    indexMenu.forEach((link) => {
        const li = document.createElement("li");
        dialogMenu.appendChild(li);

        if (link.date) {
            const u = document.createElement("u");
            u.textContent = link.date;
            li.prepend(u);
        };

        const a = document.createElement("a");
        li.appendChild(a);
        a.href = link.href;
        a.textContent = link.title;

        if (link.description) {
            const p = document.createElement("p");
            p.textContent = link.description;
            li.appendChild(p);
        };
    }, false);

    closeBtn.addEventListener("click", () => {
        dialogModal.close();
    }, false);
}, false);