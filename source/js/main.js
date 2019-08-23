(function () {

  const maskedInputs = document.querySelectorAll("[data-mask]");

  function maskedInputsInit() {
    for (let i=0; i< maskedInputs.length; i++) {
      maskedInputs[i].addEventListener('input', maskInput);
    }
  }

  maskedInputsInit();

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

  function inputInit() {
    for(let i=0; i<inputs.length; i++) {
      inputs[i].addEventListener('focus', function () {
        let label = this.parentNode.querySelector('label');
        label.classList.add('active-label');
      });

      inputs[i].addEventListener('blur', function () {
        let label = this.parentNode.querySelector('label');
        if(!this.value) {
          label.classList.remove('active-label');
        }
      })
    }
  }

  inputInit();

  const aboutText = document.querySelector('.about-us__text:last-of-type');

  if (window.innerWidth < 1024) {
      const text = aboutText.innerHTML;
      const textArr = text.split('');
      textArr.length = 215;
      textArr.push('..');
      aboutText.innerHTML = textArr.join('');
    }

  const accordBtns = document.querySelectorAll('.js-accordion');

  const menus = document.querySelectorAll('.js-menu');

  function menusInit() {
    for(let i=0; i<menus.length; i++) {
      if(window.innerWidth >= 768) {
        if(menus[i].classList.contains('menu-closed')) {
          menus[i].classList.remove('menu-closed')
        }
      } else {
        menus[i].classList.add('menu-closed')
      }
    }
  }

  menusInit();

  function accordBtnsInit() {
    for(let i=0; i<accordBtns.length; i++) {
      accordBtns[i].addEventListener('click', function () {
        this.classList.toggle('footer-section__button--closed');
        let menu = this.parentNode.querySelector('.js-menu');
        menu.classList.toggle('menu-closed')
      })
    }
  }

  if(window.innerWidth < 768) {
    accordBtnsInit()
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
    }
  });

  const form = document.querySelector('#modal-form');
  const btnClose = document.querySelector('.modal-close');
  const btnOpen = document.querySelector('.js-callback');
  const page = document.querySelector('html');
  const body = document.querySelector('body');
  const escKeyCode = 27;

  btnOpen.addEventListener('click', openModal);

  function closeModal (e) {
    e.preventDefault();
    page.classList.remove('is-locked');
    body.classList.remove('scroll-fix');
    form.classList.add('hidden');
    btnClose.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeByEsc);
  }

  function openModal (e) {
    e.preventDefault();
    page.classList.add('is-locked');
    body.classList.add('scroll-fix');
    form.classList.remove('hidden');
    btnClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeByEsc);
  }

  function closeByEsc (e) {
    if (e.keyCode === escKeyCode || e.key === escKeyCode || e.keyIdentifier === escKeyCode) {
      closeModal(e);
    }
  }

})();


