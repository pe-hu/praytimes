'use strict'

async function indexJSON(requestURL) {
  const request = new Request(requestURL);
  const response = await fetch(request);
  const jsonIndex = await response.text();
  const index = JSON.parse(jsonIndex);
  randomdraggable(index);
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

      main.style.backgroundImage = 'url(' + directory + images[i].img + ')'
    })

    li.appendChild(img);
    randomdRaggable.appendChild(li);
  }
}