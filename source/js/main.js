'use strict';

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
})();


