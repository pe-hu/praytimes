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
  randomdraggable(indexIndex);
}

function indexHead(obj) {
  const indexTitle = document.createElement('title');
  const ogTitle = document.createElement('meta');
  indexTitle.textContent = obj['title'];
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", obj['title']);
  head.appendChild(indexTitle);
  head.appendChild(ogTitle);

  const indexDescription = document.createElement('meta');
  const ogDescription = document.createElement('meta');
  indexDescription.setAttribute("name", "description");
  indexDescription.setAttribute("content", obj['description']);
  ogDescription.setAttribute("property", "og:description");
  ogDescription.setAttribute("content", obj['description']);
  head.appendChild(indexDescription);
  head.appendChild(ogDescription);

  const indexAuthor = document.createElement( "meta" );
  indexAuthor.setAttribute("name", "author");
  indexAuthor.setAttribute("content", obj['author']);
  head.appendChild(indexAuthor);

  const ogSite = document.createElement( "meta" );
  ogSite.setAttribute("property", "og:site_name");
  ogSite.setAttribute("content", location.hostname);
  head.appendChild(ogSite);

  const ogURL = document.createElement( "meta" );
  ogURL.setAttribute("property", "og:url");
  ogURL.setAttribute("content", location.href);
  head.appendChild(ogURL);

  const ogIMG = document.createElement( "meta" );
  const twitterIMG = document.createElement( "meta" );
  ogIMG.setAttribute("property", "og:image");
  twitterIMG.setAttribute("name", "twitter:image");
  ogIMG.setAttribute("content", location.origin + obj.src);
  twitterIMG.setAttribute("content", location.origin + obj.src);
  head.appendChild(ogIMG);
  head.appendChild(twitterIMG);
}

function randomdraggable(obj) {
  const randomdRaggable = document.querySelector('#randomdraggable');
  const images = obj['images'];

  for (let i = 0; i < images.length; i++) {
    const imagesLi = document.createElement('li');
    imagesLi.setAttribute("draggable", "true");

    const imagesImg = document.createElement('img');
    imagesImg.setAttribute("src", images[i].img);
    imagesImg.setAttribute("onclick", "document.body.background='" + images[i].img + "'");

    imagesLi.appendChild(imagesImg);
    randomdRaggable.appendChild(imagesLi);

    const infomation  = images[i].info;
    for (let j = 0; j < infomation.length; j++) {
    }
  }
}
