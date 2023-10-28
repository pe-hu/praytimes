'use strict'

const play = {
  '3月8日': ['0308', 'AnqKtwk7mKU'],
  '4月5日': ['0405', 'bVyJ3xpF9jI'],
  '5月3日': ['0503', 'YrDo1Zg2avg'],
  '6月7日': ['0607', 'LfpdOdqrqSI'],
  '7月5日': ['0705', 'YcO45vs8_Tc'],
  '8月2日': ['0802', 'MQsOJ9NNrho'],
  '9月6日': ['0906', '4iRCoFB2qZw'],
  '10月4日': ['1004', 'LPlODq-ZKTE'],
  '11月1日': ['1101', '7UI5u-suxig'],
  '12月6日': ['1206', 'Ur2Yxipmg5w'],
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    const select = document.querySelector('#modal #twenty');
    const option = document.createElement('option');
    option.innerText = '2020年のプレイタイムズ';
    option.setAttribute("disabled", "true");
    option.setAttribute("selected", "true");
    select.appendChild(option);

    const live = Object.entries(play);
    live.forEach((src) => {
      const option = document.createElement('option');
      option.innerText = src[0] + 'のプレイタイムズ';
      option.setAttribute("value", Object.values(src[1])[0]);
      select.appendChild(option);
    });
  }

  else if (event.target.readyState === 'complete') {
    const dialogModal = document.querySelector('#modal'),
      openBtn = document.querySelector('header button'),
      closeBtn = document.querySelector('#closeBtn');

    openBtn.addEventListener('click', () => {
      if (typeof dialogModal.showModal === "function") {
        dialogModal.showModal();
      } else {
        alert("The <dialog> API is not supported by this browser");
      }
    });

    closeBtn.addEventListener('click', () => {
      dialogModal.close();
    });
  }
});
