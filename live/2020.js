'use strict'

const playAll = {
  '2月2日': [
    '0202',
    '芥川亜由弥・中尾香織・ささじまかずま が、プレイタイムズの練習・会議をした記録'
  ],
  '3月8日': [
    '0308',
    'BnA Alter Museume にプレイタイムズを搬入をした記録'
  ],
  '4月5日': [
    '0405',
    '芥川亜由弥・中尾香織・ささじまかずま・船川翔司 が、花見をした記録'
  ],
  '5月3日': [
    '0503',
    'woopheadclrms・2n2n・芥川亜由弥・中尾香織・ささじまかずま が、食事をした記録'
  ],
  '6月7日': [
    '0607',
    'Ibuki Kakita・芥川亜由弥・中尾香織・ささじまかずま が、水を写した記録'
  ],
  '7月5日': [
    '0705',
    '芥川亜由弥・中尾香織・ささじまかずま が、風を映した記録'
  ],
  '8月2日': [
    '0802',
    '芥川亜由弥・中尾香織・ささじまかずま・船川翔司 が、昆虫を写した記録'
  ],
  '9月6日': [
    '0906',
    '宙空一派・Ibuki Kakita・芥川亜由弥・中尾香織・ささじまかずま が、近方ぼやぼやをした記録'
  ],
  '10月4日': [
    '1004',
    'wanna be youth・2n2n・芥川亜由弥・中尾香織・ささじまかずま が、靴の上から靴を履いた記録'
  ],
  '11月1日': [
    '1101',
    'Yuto Ohashi・Kenny Pain・芥川亜由弥・中尾香織・ささじまかずま が、空を見上げた記録'
  ],
  '12月6日': [
    '1206',
    'Rie Kai・芥川亜由弥・中尾香織・ささじまかずま が、何かに落ちたり何かを落とした記録'
  ]
}

function creatHeader () {
  const header = document.querySelector('header');
  const select = document.createElement('select');
  select.setAttribute('name', 'twenty')
  const back = document.createElement('input');
  back.setAttribute('type','button');
  back.value = '全部見る'
  back.addEventListener('click', function() {
    location.assign('/live/')
  },false)
  header.appendChild(select);
  header.appendChild(back);
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    ///
  }

  else if (event.target.readyState === 'complete') {
    const select = document.querySelector('[name="twenty"]');
    const option = document.createElement('option');
    option.innerText = '2020年のプレイタイムズ';
    option.setAttribute("selected", "true");
    option.setAttribute("disabled", "true");
    select.appendChild(option);

    const liveAll = Object.entries(playAll);
    liveAll.forEach((src) => {
      const option = document.createElement('option');
      option.innerText = src[0] + 'のプレイタイムズ';
      option.setAttribute("value", Object.values(src[1])[0]);
      select.appendChild(option);
    });

    select.onchange = () => {
      location.assign(live + select.value)
    }
  }
});
