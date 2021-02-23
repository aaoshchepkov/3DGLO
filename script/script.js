window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  // Таймер
  function counTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStope = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStope - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

     function updateClock() {
      let timer = getTimeRemaining();
      if (timer.hours < 10){
      timerHours.textContent = '0' + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }
      if (timer.minutes < 10){
      timerMinutes.textContent = '0' + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }
      if (timer.seconds < 10){
      timerSeconds.textContent = '0' + timer.seconds;
      } else {
        timerSeconds.textContent = timer.seconds;
      }
      let idSetInterval = setInterval(updateClock,1000);
      if (timer.timeRemaining < 0) {
        clearInterval(idSetInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        document.querySelector('.timer-numbers').style.color = 'red';
      }
      
      
    }
    updateClock();
    
  }
 
  
  counTimer('25 february 2021');

 
});