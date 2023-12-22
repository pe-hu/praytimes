'use strict'

var ii = 0;
var allID;

var player;
var videoId;

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            'playsinline': 1,
            'autoplay': 1,
            'controls': 0,
            'rel': 0
        }
    });
}

function onGoogleLoad() {
    gapi.client.setApiKey('AIzaSyDwAKBrqYSCArG1B_Y99BswIvz3IfumosE');
    gapi.client.load('youtube', 'v3', function () {
        const result = document.getElementById('randomdraggable');

        var request = gapi.client.youtube.playlistItems.list({
            playlistId: 'PLNxErRQ8jPVZl46rUXgcLHhaR5AbDW6Cn',
            part: 'snippet,contentDetails',
            maxResults: 50,
        });

        request.execute(function (response) {
            const items = shuffle(response.items);
            for (var i = 0; i < items.length; i++) {
                var snippet = items[i].snippet;
                var thisTitle = snippet.title;
                var thisID = snippet.resourceId.videoId;

                const li = document.createElement('li');
                result.appendChild(li);

                const input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'youtube');
                input.id = thisID;
                input.value = thisID;
                input.dataset.title = thisTitle;
                input.dataset.no = i;
                li.appendChild(input);

                const label = document.createElement('label');
                label.setAttribute('for', thisID);
                label.innerText = thisTitle;
                li.appendChild(label);

                if (i === 0) {
                    input.checked = true;
                    ii = input.dataset.no;
                    videoId = input.value;
                } else if (i === items.length - 1) {
                    allID = input.dataset.no;
                }

                input.addEventListener('click', () => {
                    videoId = input.value;
                    ii = input.dataset.no;
                    player.loadVideoById({ videoId: videoId });
                });
            }
            player.loadVideoById({ videoId: videoId });
        });
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