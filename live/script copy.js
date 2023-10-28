const images = {
  '3月8日': ['0308/', 'AnqKtwk7mKU'],
  '4月5日': ['0405/', 'bVyJ3xpF9jI'],
  '5月3日': ['0503/', 'YrDo1Zg2avg'],
  '6月7日': ['0607/', 'LfpdOdqrqSI'],
  '7月5日': ['0705/', 'YcO45vs8_Tc'],
  '8月2日': ['0802/', 'MQsOJ9NNrho'],
  '9月6日': ['0906/', '4iRCoFB2qZw'],
  '10月4日': ['1004/', 'LPlODq-ZKTE'],
  '11月1日': ['1101/', '7UI5u-suxig'],
  '12月6日': ['1206/', 'Ur2Yxipmg5w'],
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    const randomdraggable = document.querySelector('#randomdraggable');
    const select = document.querySelector('header select');

    function shuffle(arrays) {
      const array = arrays.slice();
      for (let i = array.length - 1; i >= 0; i--) {
        const shuffleArr = Math.floor(Math.random() * (i + 1));
        [array[i], array[shuffleArr]] = [array[shuffleArr], array[i]];
      }
      return array;
    }

    const liveRundom = shuffle(Object.entries(images));
    liveRundom.forEach((src) => {
      const li = document.createElement('li');
      const iframe = document.createElement('iframe');
      iframe.setAttribute("src", 'https://www.youtube.com/embed/' + Object.values(src[1])[1] + '?controls=0&disablekb=1&playsinline=1&modestbranding=1&rel=0');
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("playsinline", "");
      iframe.setAttribute("frameborder", "0");

      li.appendChild(iframe);
      randomdraggable.appendChild(li);
    });

    const liveALl = Object.entries(images);
    liveALl.forEach((src) => {
      const option = document.createElement('option');
      option.innerText = src[0] + 'のプレイタイムズ';
      option.setAttribute("value", Object.values(src[1])[0]);
      select.appendChild(option);
    });
  }

  else if (event.target.readyState === 'complete') {
    const dialogModal = document.querySelector('#modal');
    const openBtn = document.querySelector('header button');
    openBtn.addEventListener('click', () => {
      if (typeof dialogModal.showModal === "function") {
        dialogModal.showModal();
      } else {
        alert("The <dialog> API is not supported by this browser");
      }
    });

    const closeBtn = document.querySelector('#closeBtn');
    closeBtn.addEventListener('click', () => {
      dialogModal.close();
    });

    const selectMenu = document.querySelector('header select');
    const optionMenu = document.querySelectorAll("header select option");

    selectMenu.addEventListener('change', function () {
      location.assign(optionMenu[this.selectedIndex].value);
    });
  }
});
