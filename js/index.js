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
    if (progress.getUTCFullYear() - 1970) {
      event.target.textContent = progress.getUTCFullYear() - 1970 + '年前';
    } else if (progress.getUTCMonth()) {
      event.target.textContent = progress.getUTCMonth() + 'ヶ月前';
    } else if (progress.getUTCDate() - 1) {
      event.target.textContent = progress.getUTCDate() - 1 + '日前';
    } else if (progress.getUTCHours()) {
      event.target.textContent = progress.getUTCHours() + '時間前';
    } else if (progress.getUTCMinutes()) {
      event.target.textContent = progress.getUTCMinutes() + '分前';
    } else {
      event.target.textContent = 'たった今';
    }
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
  alt.textContent = obj.title;

  const images = shuffle(obj.randomdraggable)
  for (let i = 0; i < images.length; i++) {
    if (i === 0) {
      live.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    }
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = directory + images[i].img;
    img.addEventListener('click', function () {
      alt.innerHTML = images[i].alt
      live.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    })

    li.appendChild(img);
    randomdRaggable.appendChild(li);
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