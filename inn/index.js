"use strict"

async function indexJSON(requestURL) {
  const request = new Request(requestURL);
  const response = await fetch(request);
  const jsonIndex = await response.text();
  const index = JSON.parse(jsonIndex);
  thisDate(index);
  imgAll(index);
};

async function fetchMD(url = "", query = "") {
  fetch(url)
    .then(response => response.text())
    .then(md => {
      document.querySelector(query).innerText = md;
    });
};

function shuffle(arrays) {
  const array = arrays.slice();
  for (let i = array.length - 1; i >= 0; i--) {
    const shuffleArr = Math.floor(Math.random() * (i + 1));
    [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
  };
  return array;
};

function thisDate(obj) {
  const dataTime = document.querySelector("#date");
  dataTime.textContent = obj.date;
  dataTime.setAttribute("data-time", obj.datetime);
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
    event.target.textContent = event.target.textContent === obj.date ? now : obj.date;
  }, false);
};

function imgAll(obj) {
  const main = document.querySelector("main");
  const imgAll = document.querySelector("#randomdraggable");
  const alt = document.querySelector("#alt");
  const note = document.querySelector("#note");

  if (obj.description) {
    alt.innerHTML = obj.description;
    alt.hidden = false;
  } else {
    alt.hidden = true;
  };

  if (obj.note) {
    for (let i = 0; i < obj.note.length; i++) {
      if (i === 0) {
        note.innerHTML = obj.note[i];
      } else {
        note.innerHTML += "<br>" + obj.note[i];
      };
    };
    note.hidden = false;
  } else {
    note.hidden = true;
  };

  const images = shuffle(obj.imgAll)
  for (let i = 0; i < images.length; i++) {
    if (i === 0) {
      main.style.backgroundImage = "url(" + obj.directory + images[i].img + ")";
    };

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "youtube");
    input.id = images[i].img;
    input.value = images[i].img;
    imgAll.appendChild(input);
    const label = document.createElement("label");
    label.setAttribute("for", images[i].img);
    imgAll.appendChild(label);
    const img = document.createElement("img");
    img.src = obj.directory + images[i].img;
    if (images[i].alt) {
      img.alt = images[i].alt.replaceAll("<br>", "\n");
    };
    label.appendChild(img);

    input.addEventListener("change", function () {
      if (images[i].alt) {
        alt.innerHTML = images[i].alt;
        alt.hidden = false;
      } else {
        alt.hidden = true;
      };

      if (images[i].note) {
        for (let ii = 0; ii < images[i].note.length; ii++) {
          if (ii === 0) {
            note.innerHTML = images[i].note[ii] + "<br>";
          } else {
            note.innerHTML += images[i].note[ii] + "<br>";
          };
        };
        note.hidden = false;
      } else {
        note.hidden = true;
      };

      main.style.backgroundImage = "url(" + obj.directory + images[i].img + ")";
    });
  };
};

window.onload = () => {
  const scrollElement = document.querySelector("#randomdraggable");
  scrollElement.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
    if (
      (scrollElement.scrollLeft <= 0 && e.deltaY < 0) ||
      (scrollElement.scrollLeft >= maxScrollLeft && e.deltaY > 0)
    ) return;
    e.preventDefault();
    scrollElement.scrollLeft += e.deltaY;
  });
};
