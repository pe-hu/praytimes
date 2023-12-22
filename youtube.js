'use strict'

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ii = 0;
var allID;

var player;
var videoId;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            'playsinline': 1,
            'autoplay': 1,
            'controls': 0,
            'rel': 0
        }
    })
}

function shuffle(arrays) {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
        const shuffleArr = Math.floor(Math.random() * (i + 1));
        [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
    }
    return array;
}

function onGoogleLoad() {
    const result = document.getElementById('randomdraggable');
    gapi.client.setApiKey('AIzaSyDwAKBrqYSCArG1B_Y99BswIvz3IfumosE');
    gapi.client.load('youtube', 'v3', function () {
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
                li.appendChild(input);

                const label = document.createElement('label');
                label.setAttribute('for', thisID);
                li.appendChild(label);

                const img = document.createElement('img');
                img.src = 'https://img.youtube.com/vi/' + thisID + '/default.jpg';
                label.appendChild(img);

                input.addEventListener('click', () => {
                    videoId = input.value;
                    player.loadVideoById({ videoId: videoId });
                });
            }
            player.loadVideoById({ videoId: videoId });
        });
    });
}