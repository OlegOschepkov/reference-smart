 'use strict'; 'use strict';

(function () {
  const inputs = $('.js-input');

  inputs.on('focus', function () {
    let label = $(this).next();
    label.addClass('active-label');
  });

  inputs.on('blur', function () {
    if(!$(this).val()) {
      let label = $(this).next();
      label.removeClass('active-label');
    }
  });

  $('.js-phone').mask('+0(000)000-00-00');

  $('.js-scroll').on('click', function (e) {
    e.preventDefault();
    const scrollTarget = $($(this).attr('href')).offset().top;
    $('html, body').animate({ scrollTop: scrollTarget }, 300);
  })

  const aboutText = $('.about-us__text:last-of-type');

  if (window.innerWidth < 1024) {
    let text = aboutText.text();
    let textArr = text.split('');
    textArr.length = 214;
    textArr.push('..');
    textArr.join('');
    aboutText.html(textArr);
  }

  if(window.innerWidth < 768) {
    $('.site-menu').hide();
    $('.contacts').hide();
  }

  const accordBtn = $('.js-accordion');

  accordBtn.each(function () {
    $(this).on('click', function () {
      $(this).next().toggle(300);
      $(this).toggleClass('footer-section__button--closed')
    })
  })

  const breakpoints = [767, 1023];
  const breakpointsName = ['mobile', 'tablet'];

  function checkbp() {
    const ww = $(window).width();
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

  $(window).resize(function () {
    breakpointCurrent = checkbp();
    if (breakpointLoaded !== breakpointCurrent) {
      window.location.href = window.location.href;
      console.log('reloaded ' + breakpointCurrent);
    };
  });

})();


