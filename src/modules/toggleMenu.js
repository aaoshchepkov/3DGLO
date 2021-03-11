"use strict";
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
  export default toggleMenu;