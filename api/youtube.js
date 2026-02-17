"use strict"

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        playerVars: {
            "playsinline": 1,
            "controls": 0
        }
    });
};

function valueChange(e) {
    console.log(e.target.value);
    player.loadVideoById({videoId: e.target.value});
};

const youtubeCH = [
    {
        "id": "osaka",
        "channels": [
            {
                "name": "ラジカルビデオジョッキー RVJJP",
                "id": "UCQ2mmGKtrBp6rL8tSMJCCwA",
                "country": "日本"
            },
            {
                "name": "Kansai HD",
                "id": "UCVdRvQptqqoLJA9s4_QcpiQ",
                "country": "日本"
            },
            {
                "name": "F.S.T. NET",
                "id": "UCwNfkYp9gKIvQDN1kPhpCsQ",
                "country": "日本"
            },
            {
                "name": "防犯カメラ販売・設置工事の防犯110番",
                "id": "UCjeJcwvOUi4XZpM4J9bm74A",
                "country": "日本"
            },
            {
                "name": "金剛山ライブ",
                "id": "UCgZl3r4RcelbiD7unKMZnWw",
                "country": "日本",
                "sound": false
            },
            {
                "name": "ミュージアム星と自然",
                "id": "UCiobklqszPIVm_vUGLY5Gzg",
                "country": "日本",
                "sound": false
            },
            {
                "name": "【公式】五月山動物園 ウォンバットてれび",
                "id": "UC3fDjbb2JVIX6rOLNNqctow",
                "country": "日本",
                "sound": false
            },
            {
                "name": "大阪府寝屋川水系改修工営所",
                "id": "UCcJUM5tiWEnfG7nfWI4davg",
                "country": "日本",
                "sound": false
            },
            {
                "name": "大阪・淀川ライブカメラ-毛馬閘門周辺",
                "id": "UCMIdTAugft4IayajcKZLRjw",
                "country": "日本",
                "sound": false
            },
            {
                "name": "公益財団法人大阪タクシーセンター",
                "id": "UCmq4HR6tnSSxVwsLGzCfT0A",
                "country": "日本",
                "sound": false
            }
        ]
    },
    {
        "id": "japan",
        "channels": [
            {
                "name": "【公式】クロス新宿ビジョン",
                "id": "UC8cnCaq-MquhsebMer9A9rQ",
                "country": "日本"
            },
            {
                "name": "インフォ新宿 channel",
                "id": "UC56apcbc2pLZ9xyBizbD1Dg",
                "country": "日本"
            },
            {
                "name": "歌舞伎町 ライブ ちゃんねる",
                "id": "UCCLnJzwda_Kcdkok3et7n0A",
                "country": "日本"
            },
            {
                "name": "歌舞伎町 ライブ ちゃんねる 2",
                "id": "UCBFDJXGCOdMjVtg2AnReoXA",
                "country": "日本"
            },
            {
                "name": "東京都水防チャンネル",
                "id": "UCaydvLwWthLMbfKLEQSY2UQ",
                "country": "日本",
                "sound": false
            },
            {
                "name": "石川県土木部公園緑地課",
                "id": "UCI-AmuPKmbTweBgZgTqjXuw",
                "country": "日本",
                "sound": false
            }
        ]
    },
    {
        "id": "world",
        "channels": [
            {
                "name": "朝日新聞LIVE",
                "id": "UCaHr0a1x8zmQ1dxanCeuesA",
                "country": "日本",
                "sound": false
            },
            {
                "name": "台湾桃園旅行 Taoyuan Travel",
                "id": "UCARB8y6PuoOBjZXJKIG-LDw",
                "country": "台湾"
            },
            {
                "name": "JazBaz Philippines",
                "id": "UC0djAWwMXP22wzocdJR9dWw",
                "country": "イギリス"
            },
            {
                "name": "Oxford Martin School",
                "id": "UCmXB98lpzelFrlryV2llXUQ",
                "country": "イギリス",
                "sound": false
            },
            {
                "name": "PC1 Limited",
                "id": "UCtUhlZYeQwW5a-gryZeEoCA",
                "country": "イギリス",
                "sound": false
            },
            {
                "name": "use-IP Ltd",
                "id": "UCR77bEpXLTBxztLOEKN3Wbg",
                "country": "イギリス"
            },
            {
                "name": "Tripwebcam",
                "id": "UCEJ3VXhzw2ykC34059F_-cw",
                "country": "イタリア",
                "sound": false
            },
            {
                "name": "Hvar Live",
                "id": "UCQmlVF-VRx75AflM-9gJytg",
                "country": "クロアチア"
            },
            {
                "name": "Levi Ski Resort",
                "id": "UC1HDQ1Q5nVHYF8e7dL4E-pw",
                "country": "フィンランド"
            },
            {
                "name": "PTZtv",
                "id": "UCG8-xn6zUbEqmqlnsvrD33Q",
                "country": "アメリカ合衆国"
            },
            {
                "name": "AE Signage",
                "id": "UC1Rp_0bp86QEUt9TlMN5tlQ",
                "country": "アメリカ合衆国"
            },
            {
                "name": "See Jackson Hole",
                "id": "UCEpDjqeFIGTqHwk-uULx72Q",
                "country": "アメリカ合衆国"
            },
            {
                "name": "Visit Leavenworth",
                "id": "UCza48nR27_AEYbIbwMCOoFQ",
                "country": "アメリカ合衆国"
            },
            {
                "name": "CanmoreAlberta.com",
                "id": "UCSB3xOs0FgIW0uqKTqoXqhg",
                "country": "カナダ"
            },
            {
                "name": "WebcamsDeMexico Live",
                "id": "UC22kLkjatN1XJVC_9T9otRg",
                "country": "メキシコ"
            },
            {
                "name": "webcamsdemexico",
                "id": "UColBcWm6ybTbQnNuQS8JaKg",
                "country": "メキシコ"
            }
        ]
    },
    {
        "id": "nature",
        "channels": [
            {
                "name": "Explore Africa",
                "id": "UCiGOIXjFqy5_mUNxQNOMfHw",
                "sound": false
            },
            {
                "name": "Explore Bears & Bison",
                "id": "UC2Sk0aXLq3ADkH_USGPKT_Q",
                "sound": false
            },
            {
                "name": "Explore Birds Bats Bees",
                "id": "UC8NnosPOvXnm0O1u5YnLQiw",
                "sound": false
            },
            {
                "name": "Explore Dogs",
                "id": "UCfC0RcYzDQcFtHrce2mpvbA",
                "sound": false
            },
            {
                "name": "Explore Oceans",
                "id": "UCSyg9cb3Iq-NtlbxqNB9wGw",
                "sound": false
            },
            {
                "name": "Explore Zen Den",
                "id": "UCUtGnX65osNPQ98Y3-SSgpg",
                "sound": false
            },
            {
                "name": "Explore Live Nature Cams",
                "id": "UC-2KSeUU5SMCX6XLRD-AEvw",
                "country": "アメリカ合衆国",
                "sound": false
            },
            {
                "name": "Africam",
                "id": "UCuoNAKa3P0QR1Lw9QdpmoVg",
                "country": "南アフリカ"
            },
            {
                "name": "NamibiaCam",
                "id": "UC9X6gGKDv2yhMoofoeS7-Gg",
                "country": "ドイツ"
            },
            {
                "name": "Namibia Wildlife Resorts",
                "id": "UCfn4vrrgKXCCg3rxxLRGOvg",
                "country": "南アフリカ",
                "sound": false
            },
            {
                "name": "Coral Morphologic",
                "id": "UCtllXAWa3EcfcsL5tvpqGSw",
                "country": "アメリカ合衆国"
            },
            {
                "name": "Niagara Falls Live",
                "id": "UC15QFO-cdISk-4Sn5CPd78g",
                "country": "アメリカ合衆国"
            },
            {
                "name": "Urban Wildlife Trust WILDCAMS",
                "id": "UCLizlM6gpaVHTKPo7spoqlA",
                "country": "ニュージーランド",
                "sound": false
            }
        ]
    },
    {
        "id": "airport",
        "channels": [
            {
                "name": "ITM SKY CAM",
                "id": "UCur21TajiRsI1Da1GLzv7Lg",
                "country": "日本"
            },
            {
                "name": "Love Flight Jack",
                "id": "UCH1R8j9ReS3GSV3wi58Xu1A",
                "country": "日本"
            },
            {
                "name": "福岡空港ライブカメラ",
                "id": "UCOsw8Of0n0JFV-nbnAmDizw",
                "country": "日本"
            },
            {
                "name": "Information Zulu",
                "id": "UCwUOv8_NNeLaFrjtUpO-VqQ",
                "country": "アメリカ合衆国"
            }
        ]
    },
    {
        "id": "religion",
        "channels": [
            {
                "name": "قناة القران الكريم",
                "id": "UCos52azQNBgW63_9uDJoPDA",
                "country": "サウジアラビア"
            },
            {
                "name": "Naimat",
                "id": "UCFrVnrQF6kTrkDdFZoT9CTQ",
                "country": "サウジアラビア"
            },
            {
                "name": "Ar Rahman",
                "id": "UCWainKMJPyXikjekccFf3NA",
                "country": "サウジアラビア"
            },
            {
                "name": "Vatican News",
                "id": "UC7E-LYc1wivk33iyt5bR5zQ",
                "country": "バチカン市国"
            },
            {
                "name": "Eglise Saint-Nicolas-du-Chardonnet",
                "id": "UCGNiUjfJu2KOf71MKz86z7A",
                "country": "フランス"
            },
            {
                "name": "Sanctuaire Notre-Dame de Lourdes",
                "id": "UC7zlbnNCnuAPiC3goKcFgUg",
                "country": "フランス"
            },
            {
                "name": "Jasna Góra Klasztor Ojców Paulinów",
                "id": "UCKAtPxfE2RAHSCwDABMMeAg",
                "country": "ポーランド"
            },
            {
                "name": "平等寺",
                "id": "UC_MPR_BZ_39Vkd6MDSpIMkw",
                "country": "日本"
            },
            {
                "name": "WEB観音院",
                "id": "UCxWMGibh-_fUU_ai8M7ONAA",
                "country": "日本"
            }
        ]
    }
];

// 乱数を生成
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

function shuffle(arrays) {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
        const shuffleArr = Math.floor(Math.random() * (i + 1));
        [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
    } return array;
};

/* YouTube Data API
Google API Console へのアクセス APIし、キーを作成
https://developers.google.com/youtube/v3/getting-started?hl=ja */

const API_KEY = "AIzaSyDwza1gBR5FklnGlwD-oZ-HTwus0hHNFX4"; // 取得したAPIキー

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function () {console.log("Sign-in successful");},
            function (err) {console.error("Error signing in", err);});
};
function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
            function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.error("Error loading GAPI client for API", err);
            });
};
gapi.load("client:auth2", function () {
    loadClient().then(createIndex);
});

/* Search : list
チャンネルIDからライブ放送（eventTypeパラメータの値を参照）のリストを取得
https://developers.google.com/youtube/v3/docs/search/list?hl=ja
*/

function execute(ch) {
    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "channelId": ch.id,
        "eventType": "live",
        "type": [
            "video"
        ]
    }).then(function (data) {
        const items = data.result.items;
        if (items && items.length > 0) {
            items.forEach((each, index) => {
                if (index == 0) {
                    const a = document.createElement("a");
                    a.className = "link";
                    a.textContent = ch.name;
                    a.href = "https://www.youtube.com/channel/" + ch.id;
                    a.setAttribute("target", "_blank");
                    document.querySelector("#link").appendChild(a);

                    const randomdRaggable = document.querySelector("#randomdraggable");
                    const input = document.createElement("input");
                    input.setAttribute("type", "radio");
                    input.setAttribute("name", "youtube");
                    input.id = each.id.videoId;
                    input.value = each.id.videoId;
                    randomdRaggable.appendChild(input);
                    input.addEventListener("change", valueChange);

                    const label = document.createElement("label");
                    label.setAttribute("for", each.id.videoId);
                    randomdRaggable.appendChild(label);

                    const iframe = document.createElement("iframe");
                    iframe.src = "https://www.youtube.com/embed/" + each.id.videoId + "?autoplay=1&mute=1&playsinline=1&enablejsapi=1";
                    label.appendChild(iframe);
                };
            }, false);
        };
    }, function (err) {console.error("Execute error", err);});
};

let params = new URLSearchParams(location.search);
function createIndex() {
    new Promise((resolve) => {
        if (params.get("id")) {
            youtubeCH.forEach((eachID) => {
                if (eachID.id == params.get("id")) {
                    const items = shuffle(eachID.channels);
                    items.forEach((eachCh, index) => {
                        if (index < 5) {
                            execute(eachCh);
                        };
                    }, false);
                };
            }, false);
        } else {
            youtubeCH.forEach((eachID) => {
                const thisCH = eachID.channels[getRandomInt(eachID.channels.length)]
                if (thisCH.sound == false) {
                    // console.log("unload", thisCH);
                } else {
                    execute(thisCH);
                };
            }, false);
        };
        resolve();
    }).then(() => {
        window.addEventListener("load", () => {
            const h1 = document.querySelector("main h1");
            const h2 = document.querySelector("main h2");
            document.querySelector("main h2 button").addEventListener("click", function () {
                h1.hidden = true;
                h2.hidden = true;
            }, false);
        }, false);
    });
};
