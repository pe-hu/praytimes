'use strict'

async function indexJSON(requestURL) {
  const request = new Request(requestURL);
  const response = await fetch(request);
  const jsonIndex = await response.text();
  const index = JSON.parse(jsonIndex);
  thisDate(index);
  randomdraggable(index);
}

function thisDate(obj) {
  const dataTime = document.querySelector('#date');
  dataTime.textContent = obj.date;
  dataTime.setAttribute("data-time", obj.datetime);
  dataTime.addEventListener('click', function (event) {
    let ago = new Date(obj.datetime);
    let diff = new Date().getTime() - ago.getTime();
    let progress = new Date(diff);
    let now;
    if (progress.getUTCFullYear() - 1970) {
      now = progress.getUTCFullYear() - 1970 + '年前';
    } else if (progress.getUTCMonth()) {
      now = progress.getUTCMonth() + 'ヶ月前';
    } else if (progress.getUTCDate() - 1) {
      now = progress.getUTCDate() - 1 + '日前';
    } else if (progress.getUTCHours()) {
      now = progress.getUTCHours() + '時間前';
    } else if (progress.getUTCMinutes()) {
      now = progress.getUTCMinutes() + '分前';
    } else {
      now = 'たった今';
    }
    event.target.textContent = event.target.textContent === obj.date ? now : obj.date;
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

function randomdraggable(obj) {
  const live = document.querySelector('#live');
  const randomdRaggable = document.querySelector('#randomdraggable');
  const alt = document.querySelector('#alt');
  alt.innerHTML = obj.description;

  if (obj.note) {
    const note = document.querySelector('#note');
    for (let i = 0; i < obj.note.length; i++) {
      if (i === 0) {
        note.innerHTML = obj.note[i] + "<br>"
      } else {
        note.innerHTML += obj.note[i] + "<br>"
      }
    }
  }

  const images = shuffle(obj.randomdraggable)
  for (let i = 0; i < images.length; i++) {
    if (i === 0) {
      live.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    }

    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = directory + images[i].img;
    img.addEventListener('click', function () {
      if (images[i].alt) {
        alt.innerHTML = images[i].alt
      }

      if (images[i].note) {
        const note = document.querySelector('#note');
        for (let ii = 0; ii < images[i].note.length; ii++) {
          if (ii === 0) {
            note.innerHTML = images[i].note[ii] + "<br>"
          } else {
            note.innerHTML += images[i].note[ii] + "<br>"
          }
        }
      }

      live.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    })

    li.appendChild(img);
    randomdRaggable.appendChild(li);
  }
}

window.onload = () => {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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
  }
};