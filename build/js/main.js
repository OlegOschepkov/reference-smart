'use strict';

(function () {

  function getScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    var inner = document.createElement('div');
    outer.appendChild(inner);
    var scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
  }

  var scrollWidth = getScrollbarWidth();

  var scrolls = document.querySelectorAll('.js-scroll');

  function smoothScroll() {
    for (var i = 0; i < scrolls.length; i++) {
      scrolls[i].addEventListener('click', function (e) {
        e.preventDefault();
        // eslint-disable-next-line no-invalid-this
        var target = this.getAttribute('href');
        var targetPos = document.querySelector(target).offsetTop;
        var startPos = window.pageYOffset;
        var distance = targetPos - startPos;
        var startTime = null;
        var duration = 300;

        function animation(currentTime) {
          if (startTime === null) {
            startTime = currentTime;
          }
          var timeElapsed = currentTime - startTime;
          var run = ease(timeElapsed, startPos, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        requestAnimationFrame(animation);
      });
    }
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  smoothScroll();

  var maskedInputs = document.querySelectorAll('[data-mask]');

  function maskedInputsInit() {
    for (var i = 0; i < maskedInputs.length; i++) {
      maskedInputs[i].addEventListener('input', maskInput);
    }
  }

  maskedInputsInit();

  function maskInput() {
    // eslint-disable-next-line no-invalid-this
    var input = this;
    var mask = input.dataset.mask;
    var value = input.value;
    var literalPattern = /[0\*]/;
    var numberPattern = /[0-9]/;
    var newValue = '';
    try {
      var maskLength = mask.length;
      var valueIndex = 0;
      var maskIndex = 0;

      for (; maskIndex < maskLength;) {
        if (maskIndex >= value.length) {
          break;
        }

        if (mask[maskIndex] === '0' && value[valueIndex].match(numberPattern) === null) {
          break;
        }

        // Found a literal
        while (mask[maskIndex].match(literalPattern) === null) {
          if (value[valueIndex] === mask[maskIndex]) {
            break;
          }
          newValue += mask[maskIndex++];
        }
        newValue += value[valueIndex++];
        maskIndex++;
      }

      input.value = newValue;
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }

  var inputs = document.querySelectorAll('.js-input');

  function inputInit() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('focus', function () {
        // eslint-disable-next-line no-invalid-this
        var label = this.parentNode.querySelector('label');
        label.classList.add('active-label');
      });

      inputs[i].addEventListener('blur', function () {
        // eslint-disable-next-line no-invalid-this
        var label = this.parentNode.querySelector('label');
        // eslint-disable-next-line no-invalid-this
        if (!this.value) {
          label.classList.remove('active-label');
        }
      });
    }
  }

  inputInit();

  var aboutText = document.querySelector('.about-us__text:last-of-type');

  if (window.innerWidth < 1024) {
    var text = aboutText.innerHTML;
    var textArr = text.split('');
    textArr.length = 215;
    textArr.push('..');
    aboutText.innerHTML = textArr.join('');
  }

  var accordBtns = document.querySelectorAll('.js-accordion');

  var menus = document.querySelectorAll('.js-menu');

  function menusInit() {
    for (var i = 0; i < menus.length; i++) {
      if (window.innerWidth >= 768) {
        if (menus[i].classList.contains('menu-closed')) {
          menus[i].classList.remove('menu-closed');
        }
      } else {
        menus[i].classList.add('menu-closed');
      }
    }
  }

  menusInit();

  function accordBtnsInit() {
    for (var i = 0; i < accordBtns.length; i++) {
      accordBtns[i].addEventListener('click', function () {
        // eslint-disable-next-line no-invalid-this
        var btn = this.querySelector('.footer-section__button');
        btn.classList.toggle('footer-section__button--closed');
        // eslint-disable-next-line no-invalid-this
        var menu = this.querySelector('.js-menu');
        menu.classList.toggle('menu-closed');
      });
    }
  }

  if (window.innerWidth < 768) {
    accordBtnsInit();
  }

  var breakpoints = [320, 767, 1023, 1440];
  var breakpointsName = ['smallest', 'phabvar', 'tabvar', 'desktop'];

  function checkbp() {
    var ww = window.innerWidth;
    var returnVal = breakpointsName[0];
    for (var i = 0; i < breakpoints.length; i++) {
      if (ww > breakpoints[i]) {
        returnVal = breakpointsName[i + 1];
        if (i + 1 >= breakpoints.length) {
          returnVal = breakpointsName[i];
        }
      }
    }
    return returnVal;
  }

  var breakpointLoaded = checkbp();
  var breakpointCurrent;

  window.addEventListener('resize', function () {
    breakpointCurrent = checkbp();
    if (breakpointLoaded !== breakpointCurrent) {
      window.location.href = window.location.href;
    }
  });

  var form = document.querySelector('#modal-form');
  var btnClose = document.querySelector('.modal-close');
  var btnOpen = document.querySelector('.js-callback');
  var page = document.querySelector('html');
  var body = document.querySelector('body');
  var escKeyCode = 27;

  btnOpen.addEventListener('click', openModal);

  function closeModal(e) {
    e.preventDefault();
    page.classList.remove('is-locked');
    body.removeAttribute('style');
    form.classList.add('hidden');
    btnClose.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeByEsc);
  }

  function openModal(e) {
    e.preventDefault();
    page.classList.add('is-locked');
    body.setAttribute('style', 'padding-right: ' + scrollWidth + 'px;');
    form.classList.remove('hidden');
    btnClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeByEsc);
  }

  function closeByEsc(e) {
    if (e.keyCode === escKeyCode || e.key === escKeyCode || e.keyIdentifier === escKeyCode) {
      closeModal(e);
    }
  }
})();
