'use strict'

async function indexJSON(requestURL) {
  const request = new Request(requestURL);
  const response = await fetch(request);
  const jsonIndex = await response.text();
  const index = JSON.parse(jsonIndex);
  thisDate(index);
  randomdraggable(index);
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
    event.target.textContent = event.target.textContent === obj.date ? now : obj.date;
  });
}

function randomdraggable(obj) {
  const main = document.querySelector('main');
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
      main.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    }

    const li = document.createElement('li');
    randomdRaggable.appendChild(li);

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'youtube');
    input.id = images[i].img;
    input.value = images[i].img;
    li.appendChild(input);

    const label = document.createElement('label');
    label.setAttribute('for', images[i].img);
    li.appendChild(label);

    const img = document.createElement('img');
    img.src = directory + images[i].img;
    label.appendChild(img);

    input.addEventListener('change', function () {
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

      main.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    })
  }
}

window.onload = () => {
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
};
