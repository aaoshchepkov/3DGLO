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
  counTimer("30 march 2021");

  // menu
  const toggleMenu = () => {
    const bodyMenu = document.querySelector('body');
    let menu = document.querySelector("menu");
    let menuItem = menu.querySelectorAll('li>a');
    let closeBtn = menu.querySelector('.close-btn');
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

    bodyMenu.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest(".menu")) {
        HandlerMenu();
      } else {
        if (target === closeBtn || target.tagName !== 'MENU' && target.tagName !== 'LI') {
          menu.style.transform = `translate(-100%)`;
        }
        if (target) {
          menuItem.forEach((element, i) => {
            if (target === element) {
              menu.style.transform = `translate(-100%)`;
              event.preventDefault();
              const blockID = element.getAttribute('href').substr(1);
              document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        }
      }
      let btnServiceBlock = document.querySelector('main>a>img');
      if (target === btnServiceBlock) {
        event.preventDefault();
        btnServiceBlock = document.querySelector('main>a');
        const blockID = btnServiceBlock.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });


      }

    });
  };
  toggleMenu();
  //popup
  const togglePopu = () => {
    const popup = document.querySelector(".popup");
    const popupContent = document.querySelector(".popup-content");
    const popupBtn = document.querySelectorAll(".popup-btn");

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
            let center =
              document.documentElement.clientWidth / 2 -
              popupContent.offsetWidth / 2;
            if (count > center) {
              clearInterval(timer);
            }
          }, 5);
        }
      });
    });

    popup.addEventListener("mousedown", (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");
        if (target === null) {
          popup.style.display = "none";
        }
      }

    });


  };
  togglePopu();

  //tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");
    const toggletabConten = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };
    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggletabConten(i);
          }
        });
      }
    });
  };
  tabs();


  // Создаем точки
  const addDots = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    const dotsWrapper = document.querySelector('.portfolio-dots');
    let li;
    slide.forEach((item, i) => {
      li = document.createElement('li');
      if (i === 0) {
        li.classList.add('dot-active');
        li.classList.add('dot');
      } else {
        li.classList.add('dot');
      }
      if (i < slide.length) {
        dotsWrapper.appendChild(li);
      }
    });
  };
  addDots();

  // slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    let dot = document.querySelectorAll('.dot');
    const slider = document.querySelector('.portfolio-content');

    let interval;
    let currentSlide = 0;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);

    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (target === elem) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');


    });
    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }

    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }

    });

    startSlide(3000);
  };

  slider();


  // Наша команда
  let command = document.querySelector('.command');
  let commandPhoto = document.querySelectorAll('.command__photo');
  command.addEventListener('mouseover', (event) => {
    let target = event.target;
    commandPhoto.forEach((item) => {
      let memorySrc = item.src;
      if (target === item) {
        item.src = item.dataset.img;
        item.addEventListener('mouseout', () => {
          item.src = memorySrc;
        });
      }
    });
  });


  //Валидация 

  document.addEventListener('input', (event) => {
    let calc = document.querySelector('#calc');
    let inputCalcItem = calc.querySelectorAll('div>  input');
    let target = event.target;
    inputCalcItem.forEach((item) => {
      if (target === item) {
        item.value = item.value.replace(/\D/g, '');
      }
    });

    if (target.matches('#form2-name') || target.matches('#form2-message') || target.matches('#form1-name')) {
      target.value = target.value.replace(/[^а-яё\-\ ]/ig, '');

    }
    if (target.matches('#form2-email') || target.matches('#form1-email')) {
      target.value = target.value.replace(/[^a-z@\-_.!~*']/ig, '');
    }
    if (target.matches('#form2-phone') || target.matches('#form1-phone')) {
      target.value = target.value.replace(/[^0-9\-()]/ig, '');
    }
  });

  document.addEventListener(('blur'), (event) => {
    let target = event.target;
    if (target.matches('#form2-message') || target.matches('#form2-email') || target.matches('#form1-email') ||
      target.matches('#formform2-phone') || target.matches('#form1-phone') ||
      target.matches('#form2-name') || target.matches('#form1-name')) {
      target.value = target.value.replace(/ +/g, ' ').trim();
      target.value = target.value.replace(/-+/g, '-');
      target.value = target.value.replace(/^-/g, '');
      target.value = target.value.replace(/-$/g, '');
    }
    if (target.matches('#form2-name') || target.matches('#form1-name')) {
      target.value = target.value[0].toUpperCase() + target.value.slice(1);
    }
  }, true);



});