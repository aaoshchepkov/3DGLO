window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  // timer
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
      if (timer.hours < 10) {
        timerHours.textContent = "0" + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }
      if (timer.minutes < 10) {
        timerMinutes.textContent = "0" + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }
      if (timer.seconds < 10) {
        timerSeconds.textContent = "0" + timer.seconds;
      } else {
        timerSeconds.textContent = timer.seconds;
      }
      if (timer.timeRemaining < 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        document.querySelector(".timer-numbers").style.color = "red";
      }
    }
    let idSetInterval = setInterval(updateClock, 1000);
    if (getTimeRemaining().timeRemaining < 0) {
      clearInterval(idSetInterval);
    }
    updateClock();
  }
  counTimer("28 february 2021");

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");
    const closeBtn = document.querySelector(".close-btn");
    const menuItems = menu.querySelectorAll("ul>li");
    const HandlerMenu = function () {
      if (
        !menu.style.transform ||
        menu.style.transform === `translate(-100%)`
      ) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    };
    btnMenu.addEventListener("click", HandlerMenu);
    closeBtn.addEventListener("click", HandlerMenu);
    menuItems.forEach((elem) => elem.addEventListener("click", HandlerMenu));
  };
  toggleMenu();
  //popup
  const togglePopu = () => {
    const popup = document.querySelector(".popup");
    const popupContent = document.querySelector(".popup-content");
    const popupBtn = document.querySelectorAll(".popup-btn");
    const popupClose = document.querySelector(".popup-close");

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
       if (screen.width < 768) {
          popup.style.display = "block";
       } else {
          let count = 0;
        let timer = setInterval(function () {
           popup.style.display = "block";
          count += 10;
          popupContent.style.left = count + "px";
          let center = (document.documentElement.clientWidth / 2) - (popupContent.offsetWidth /2);
          console.log(center);
          if (count > center) {
            clearInterval(timer);
          }
        }, 5);
       }
       
      });
    });
    
    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };
  togglePopu();
});
