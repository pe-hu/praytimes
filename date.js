'use strict'

async function dateJson(requestURL) {
  const request = new Request(requestURL);
  const response = await fetch(request);
  const jsonIndex = await response.text();
  const index = JSON.parse(jsonIndex);
  thisDate(index);
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