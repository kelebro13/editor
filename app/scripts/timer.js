'use strict'

var needUseTimer = false;
var minutes = 0;
var isTimerStart = false;

var setting = document.querySelector('.timer__button');
var settingModal = document.querySelector('.modal');
var form = document.querySelector('.modal__form');
var closeSetting = document.querySelector('.modal__close-btn');

var timerDisplay = document.querySelector('.timer__display');

var referenceScreenshot = document.querySelector('.reference-screenshot');
var overlay = document.querySelector('.timer-overlay');

setting.addEventListener('click', function () {
  if (settingModal.classList.contains('modal--show')) {
    settingModal.classList.remove('modal--show');
  } else {
    settingModal.classList.add('modal--show');
  }
});

closeSetting.addEventListener('click', function () {
  settingModal.classList.remove('modal--show');
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  needUseTimer = event.target[0].checked;
  minutes = event.target[1].value;
  if (needUseTimer) {
    var a = new Date();
    a.setMinutes(minutes);
    timerDisplay.textContent = a.getMinutes() + ":00";
    timerDisplay.classList.remove('timer__display--disabled');
  }
  else {
      timerDisplay.textContent = "00:00";
      timerDisplay.classList.add('timer__display--disabled');
  }
  settingModal.classList.remove('modal--show');
});

referenceScreenshot.addEventListener('click', function () {
  if (needUseTimer) {
    var allTimer = new Date(Date.now() + minutes * 60000);

    // noinspection JSAnnotator
    function timer() {
      var currentTime = Date.now();
      var diff = allTimer.getTime() - currentTime;
      if (diff >= 0) {
        var t = new Date(0);
        t.setSeconds(0, diff);
        timerDisplay.textContent = t.getMinutes() + ":" + t.getSeconds();
        requestAnimationFrame(timer);
      }
      else {
        overlay.classList.add('timer-overlay--show');
        window.addEventListener('keydown', function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();
        });
      }
    };

    if (isTimerStart === false) {
      isTimerStart = true;
      timer();
    }
  }
});