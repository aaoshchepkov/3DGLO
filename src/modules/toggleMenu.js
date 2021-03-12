"use strict";
const toggleMenu = () => {
    const bodyMenu = document.querySelector("body");
    let menu = document.querySelector("menu");
    let menuItem = menu.querySelectorAll("li>a");
    let closeBtn = menu.querySelector(".close-btn");
    
    bodyMenu.addEventListener("click", (event) => {
      let target = event.target;
      if (target.closest(".menu")) {
         menu.classList.toggle("active-menu");
      } else {
        if (
          target === closeBtn ||
          (target.tagName !== "MENU" && target.tagName !== "LI")
        ) {
         menu.classList.remove("active-menu");
        }
        if (target) {
          menuItem.forEach((element, i) => {
            if (target === element) {
             menu.classList.remove("active-menu");
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