'use strict'

const playAll = {
  '3月8日': [
    '0308',
    'AnqKtwk7mKU',
    'BnA Alter Museume にプレイタイムズを搬入をした記録'
  ],
  '4月5日': [
    '0405',
    'bVyJ3xpF9jI',
    '芥川亜由弥・中尾香織・ささじまかずま・船川翔司 が、花見をした記録'
  ],
  '5月3日': [
    '0503',
    'YrDo1Zg2avg',
    'woopheadclrms・2n2n・芥川亜由弥・中尾香織・ささじまかずま が、食事をした記録'
  ],
  '6月7日': [
    '0607',
    'LfpdOdqrqSI',
    'Ibuki Kakita・芥川亜由弥・中尾香織・ささじまかずま が、水を写した記録'
  ],
  '7月5日': [
    '0705',
    'YcO45vs8_Tc',
    '芥川亜由弥・中尾香織・ささじまかずま が、風を映した記録'
  ],
  '8月2日': [
    '0802',
    'MQsOJ9NNrho',
    '芥川亜由弥・中尾香織・ささじまかずま・船川翔司 が、昆虫を写した記録'
  ],
  '9月6日': [
    '0906',
    '4iRCoFB2qZw',
    '宙空一派・Ibuki Kakita・芥川亜由弥・中尾香織・ささじまかずま が、近方ぼやぼやをした記録'
  ],
  '10月4日': [
    '1004',
    'LPlODq-ZKTE',
    'wanna be youth・2n2n・芥川亜由弥・中尾香織・ささじまかずま が、靴の上から靴を履いた記録'
  ],
  '11月1日': [
    '1101',
    '7UI5u-suxig',
    'Yuto Ohashi・Kenny Pain・芥川亜由弥・中尾香織・ささじまかずま が、空を見上げた記録'
  ],
  '12月6日': [
    '1206',
    'Ur2Yxipmg5w',
    'Rie Kai・芥川亜由弥・中尾香織・ささじまかずま が、何かに落ちたり何かを落とした記録'
  ]
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    const select = document.querySelector('#modal #twenty');
    const option = document.createElement('option');
    option.innerText = '2020年のプレイタイムズ';
    option.setAttribute("disabled", "true");
    option.setAttribute("selected", "true");
    select.appendChild(option);

    const live = Object.entries(playAll);
    live.forEach((src) => {
      const option = document.createElement('option');
      option.innerText = src[0] + 'のプレイタイムズ';
      option.setAttribute("value", Object.values(src[1])[0]);
      select.appendChild(option);
    });
  }

  else if (event.target.readyState === 'complete') {
    const dialogModal = document.querySelector('#modal'),
      openBtns = document.querySelectorAll('header button, #content button'),
      closeBtn = document.querySelector('#closeBtn');

    function openModal() {
      if (typeof dialogModal.showModal === "function") {
        dialogModal.showModal();
      } else {
        alert("The <dialog> API is not supported by this browser");
      }
    }

    openBtns.forEach((openBtn) => {
      openBtn.addEventListener('click', () => {
        openModal();
      });
    });

    closeBtn.addEventListener('click', () => {
      dialogModal.close();
    });
  }
});
