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
    const bodyMenu = document.querySelector("body");
    let menu = document.querySelector("menu");
    let menuItem = menu.querySelectorAll("li>a");
    let closeBtn = menu.querySelector(".close-btn");
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

    bodyMenu.addEventListener("click", (event) => {
      let target = event.target;
      if (target.closest(".menu")) {
        HandlerMenu();
      } else {
        if (
          target === closeBtn ||
          (target.tagName !== "MENU" && target.tagName !== "LI")
        ) {
          menu.style.transform = `translate(-100%)`;
        }
        if (target) {
          menuItem.forEach((element, i) => {
            if (target === element) {
              menu.style.transform = `translate(-100%)`;
              event.preventDefault();
              const blockID = element.getAttribute("href").substr(1);
              document.getElementById(blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          });
        }
      }
      let btnServiceBlock = document.querySelector("main>a>img");
      if (target === btnServiceBlock) {
        event.preventDefault();
        btnServiceBlock = document.querySelector("main>a");
        const blockID = btnServiceBlock.getAttribute("href").substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start",
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
          }, 1);
        }
      });
    });

    popup.addEventListener("mousedown", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
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
      target = target.closest(".service-header-tab");

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
    const slide = document.querySelectorAll(".portfolio-item");
    const dotsWrapper = document.querySelector(".portfolio-dots");
    let li;
    slide.forEach((item, i) => {
      li = document.createElement("li");
      if (i === 0) {
        li.classList.add("dot-active");
        li.classList.add("dot");
      } else {
        li.classList.add("dot");
      }
      if (i < slide.length) {
        dotsWrapper.appendChild(li);
      }
    });
  };
  addDots();

  // slider
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item");
    let dot = document.querySelectorAll(".dot");
    const slider = document.querySelector(".portfolio-content");

    let interval;
    let currentSlide = 0;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
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

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide(3000);
  };

  slider();

  // Наша команда
  let command = document.querySelector(".command");
  let commandPhoto = document.querySelectorAll(".command__photo");
  command.addEventListener("mouseover", (event) => {
    let target = event.target;
    commandPhoto.forEach((item) => {
      let memorySrc = item.src;
      if (target === item) {
        item.src = item.dataset.img;
        item.addEventListener("mouseout", () => {
          item.src = memorySrc;
        });
      }
    });
  });

  //Валидация
  const validate = () => {
    document.addEventListener("input", (event) => {
      event.preventDefault();
      let calc = document.querySelector("#calc");
      let inputCalcItem = calc.querySelectorAll("div>  input");
      let name = document.querySelectorAll('[name="user_name"]');
      let email = document.querySelectorAll('[name="user_email"]');
      let phone = document.querySelectorAll('[name="user_phone"]');

      let target = event.target;
      const regularValid = () => {
        target.value = target.value.replace(/ +/g, " ");
        target.value = target.value.replace(/-+/g, "-");
        target.value = target.value.replace(/^-|-$/g, "");
        target.value = target.value.trim();
      };

      if (target.matches("#form2-message")) {
        target.value = target.value.replace(/[^а-яё\-\ ,.][^0-9\!?]/gi, "");
        target.addEventListener(
          "blur",
          () => {
            regularValid();
          },
          true
        );
      }

      inputCalcItem.forEach((item) => {
        if (target === item) {
          item.value = item.value.replace(/\D/g, "");
        }
      });

      name.forEach((item) => {
        if (target === item) {
          target.value = target.value.replace(/[^а-яё\ ]/gi, "");
          item.addEventListener(
            "blur",
            () => {
              regularValid();
              target.value = target.value
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.substring(1))
                .join(" ");
            },
            true
          );
        }
      });

      email.forEach((item) => {
        if (target === item) {
          target.value = target.value.replace(/[^a-z@\-_.!~*']/gi, "");
          item.addEventListener(
            "blur",
            () => {
              regularValid();
            },
            true
          );
        }
      });

      phone.forEach((item) => {
        if (target === item) {
          target.value = target.value.replace(/[^0-9\+]/gi, "");
          item.addEventListener(
            "blur",
            () => {
              regularValid();
            },
            true
          );
        }
      });
    });
  };

  validate();

  // Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total");

    const constSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue = countValue + (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
        total = Math.floor(total);
      }
      totalValue.textContent = total;
    };
    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (
        target.matches(".calc-day") ||
        target.matches(".calc-square") ||
        target.matches(".calc-type") ||
        target.matches(".calc-count")
      ) {
        constSum();
      }

      if (target.matches(".calc-type")) {
        if (calcType.options[calcType.selectedIndex].value === "") {
          calcSquare.value = "";
          calcCount.value = "";
          calcDay.value = "";
          totalValue.value = "";
        }
      }
    });
  };
  calc(100);

  // отправка формы

  const sendForm = () => {
    const erorrMessage = "Что то пошло не так...";
    const loadMessage = "Загрузка...";
    const successMessage = "Спасибо за обращение! Мы скоро с вами свяжемся";
    const form = document.querySelectorAll('form');
    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem; z-index:10; color: white;";
     form.forEach((item)=>{
       item.addEventListener('submit', (event) => {
      event.preventDefault();
      item.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      
      const formData = new FormData(item);
      let body = {};
      formData.forEach((value, key) => {
        body[key] = value;
      });
      postData(body, ()=>{
        statusMessage.textContent = successMessage;
        let input = item.querySelectorAll('input');
        input.forEach((item) => {
        item.value = '';
      });

      }, (error)=>{
        statusMessage.textContent = erorrMessage;
        console.error(error);
        let input = item.querySelectorAll('input');
        input.forEach((item) => {
        item.value = '';
      });
      });
      
      
    });
       
     });

    
      let postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', (event) => {
        
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/JSON');
      request.send(JSON.stringify(body));
      
      
    };
   
   
  };

  sendForm();

  
});