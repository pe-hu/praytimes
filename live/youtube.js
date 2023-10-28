'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL);
    const response = await fetch(request);
    const jsonIndex = await response.text();
    const index = JSON.parse(jsonIndex);
    youtube(index);
}

function shuffle(arrays) {
  const array = arrays.slice();
  for (let i = array.length - 1; i >= 0; i--) {
    const shuffleArr = Math.floor(Math.random() * (i + 1));
    [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
  }
  return array;
}

function youtube(obj) {
    const randomdraggable = document.querySelector('#randomdraggable');
    const youtube = shuffle(obj.youtube)
    for (let i = 0; i < youtube.length; i++) {
        const li = document.createElement('li');
        const iframe = document.createElement('iframe');
        iframe.setAttribute("src", 'https://www.youtube.com/embed/' + youtube[i].id + '?controls=0&disablekb=1&playsinline=1&modestbranding=1&rel=0');
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("playsinline", "");
        iframe.setAttribute("frameborder", "0");

        li.appendChild(iframe);
        randomdraggable.appendChild(li);
    }
}