'use strict'

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    playerVars: {
      'controls': 0
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

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    const main = document.querySelector('#player');
    const randomdRaggable = document.querySelector('#randomdraggable');
    const src = shuffle(Object.entries(playAll))
    for (let i = 0; i < src.length; i++) {
      const thisSrc = 'img/' + Object.values(src[i][1])[0] + '.jpeg'
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = thisSrc;
      img.dataset.id = Object.values(src[i][1])[1];
      img.addEventListener('click', function () {
        const title = document.querySelector('h1 b');
        const readme = document.querySelector('#readme');
        title.textContent = Object.values(src[i])[0];
        readme.textContent = Object.values(src[i][1])[2];
      })

      li.appendChild(img);
      randomdRaggable.appendChild(li);
    }
  } else if (event.target.readyState === 'complete') {
    const video_ids = document.querySelectorAll('#randomdraggable li img');
    video_ids.forEach(function (video_id) {
      video_id.addEventListener('click', function (e) {
        let videoId = video_id.dataset.id;
        if (videoId) {
          player.loadVideoById({ videoId: videoId });
        }
      })
    });

    player.loadVideoById({ videoId: 'AnqKtwk7mKU' });

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
});