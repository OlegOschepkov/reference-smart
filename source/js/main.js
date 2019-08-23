'use strict';

(function () {
  const maskedInputs = document.querySelectorAll("[data-mask]");

  maskedInputs.forEach(function (el) {
    el.addEventListener('input', maskInput);
  })

  function maskInput() {
    const input = this;
    const mask = input.dataset.mask;
    const value = input.value;
    const literalPattern = /[0\*]/;
    const numberPattern = /[0-9]/;
    let newValue = "";
    try {
      const maskLength = mask.length;
      let valueIndex = 0;
      let maskIndex = 0;

      for (; maskIndex < maskLength;) {
        if (maskIndex >= value.length) break;

        if (mask[maskIndex] === "0" && value[valueIndex].match(numberPattern) === null) break;

        // Found a literal
        while (mask[maskIndex].match(literalPattern) === null) {
          if (value[valueIndex] === mask[maskIndex]) break;
          newValue += mask[maskIndex++];
        }
        newValue += value[valueIndex++];
        maskIndex++;
      }

      input.value = newValue;
    } catch (e) {
      console.log(e);
    }
  }

  const inputs = document.querySelectorAll('.js-input');

  inputs.forEach(function (el) {
    el.addEventListener('focus', function () {
      let label = el.parentNode.querySelector('label');
      label.classList.add('active-label');
    });

    el.addEventListener('blur', function () {
      let label = el.parentNode.querySelector('label');
      if(!el.value) {
        label.classList.remove('active-label');
      }
    })
  });

  const aboutText = document.querySelector('.about-us__text:last-of-type');

  if (window.innerWidth < 1024) {
      const text = aboutText.innerHTML;
      const textArr = text.split('');
      textArr.length = 215;
      textArr.push('..');
      aboutText.innerHTML = textArr.join('');
    }

  const accordBtns = document.querySelectorAll('.js-accordion');

  const menu = document.querySelectorAll('.js-menu');

  menu.forEach(function (el) {
    if(window.innerWidth >= 768) {
      if(el.classList.contains('menu-closed')) {
        el.classList.remove('menu-closed')
      }
    } else {
      el.classList.add('menu-closed')
    }
  });

  if(window.innerWidth < 768) {
    accordBtns.forEach(function (el) {
      el.addEventListener('click', function () {
        el.classList.toggle('footer-section__button--closed');
        let menu = el.parentNode.querySelector('.js-menu');
        menu.classList.toggle('menu-closed')
      })
    })
  }

  const breakpoints = [320, 767, 1023, 1440];
  const breakpointsName = ['smallest', 'phablet', 'tablet', 'desktop'];

  function checkbp() {
    const ww = window.innerWidth;
    let returnVal = breakpointsName[0];
    for (let i = 0; i < breakpoints.length; i++) {
      if (ww > breakpoints[i]) {
        returnVal = breakpointsName[i + 1];
        if (i + 1 >= breakpoints.length) {
          returnVal = breakpointsName[i];
        }
      }
    }
    return returnVal;
  }

  const breakpointLoaded = checkbp();
  let breakpointCurrent;

  window.addEventListener('resize', function () {
    breakpointCurrent = checkbp();
    if (breakpointLoaded != breakpointCurrent) {
      window.location.href = window.location.href;
      console.log('reloaded ' + breakpointCurrent);
    };
  });

})();


