const head = document.querySelector('head');

let requestURL = 'index.json';
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'text';
request.send();

request.onload = function() {
  const indexIndexText = request.response;
  const indexIndex = JSON.parse(indexIndexText);
  indexHead(indexIndex);
}

function indexHead(obj) {
  const body = document.querySelector('body');
  const liveIframe = document.createElement('iframe');
  liveIframe.setAttribute("src", 'https://www.youtube.com/embed/' + obj.YouTube + '?autoplay=1&mute=1&playsinline=1&loop=1&disablekb=1');
  liveIframe.setAttribute("allowfullscreen", "");
  liveIframe.setAttribute("frameborder", "0");
  liveIframe.setAttribute("id", "live");
  body.appendChild(liveIframe);
}
