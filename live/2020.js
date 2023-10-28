'use strict'

const play2020 = {
  '3月8日': ['0308', 'BnA Alter Museume にプレイタイムズを搬入をした記録'],
  '4月5日': ['0405', '芥川亜由弥・中尾香織・ささじまかずま・船川翔司 が、花見をした記録'],
  '5月3日': ['0503', 'woopheadclrms・2n2n・芥川亜由弥・中尾香織・ささじまかずま が、食事をした記録'],
  '6月7日': ['0607', 'Ibuki Kakita・芥川亜由弥・中尾香織・ささじまかずま が、水を写した記録'],
  '7月5日': ['0705', '芥川亜由弥・中尾香織・ささじまかずま が、風を映した記録'],
  '8月2日': ['0802', '芥川亜由弥・中尾香織・ささじまかずま・船川翔司 が、昆虫を写した記録'],
  '9月6日': ['0906', '宙空一派・Ibuki Kakita・芥川亜由弥・中尾香織・ささじまかずま が、近方ぼやぼやをした記録'],
  '10月4日': ['1004', 'wanna be youth・2n2n・芥川亜由弥・中尾香織・ささじまかずま が、靴の上から靴を履いた記録'],
  '11月1日': ['1101', 'Yuto Ohashi・Kenny Pain・芥川亜由弥・中尾香織・ささじまかずま が、空を見上げた記録'],
  '12月6日': ['1206', 'Rie Kai・芥川亜由弥・中尾香織・ささじまかずま が、何かに落ちたり何かを落とした記録'],
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    const select = document.querySelector('#modal #twenty');
    const option = document.createElement('option');
    option.innerText = '2020年のプレイタイムズ';
    option.setAttribute("disabled", "true");
    option.setAttribute("selected", "true");
    select.appendChild(option);

    const live = Object.entries(play2020);
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
