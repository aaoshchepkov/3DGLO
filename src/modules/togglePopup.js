"use strict";
const togglePopup = () => {
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
              document.documentElement.clientWidth / 2;
            if (count > center) {
              clearInterval(timer);
              popupContent.style.left = '50%';
            }
          }, 1);
          
        }
      });
    });

  popup.addEventListener("mousedown", (event) => {
    let target = event.target;
    if (target.classList.contains("popup-close")) {
      popup.style.display = "none";
      popup.querySelector("input").value = "";
    } else {
      target = target.closest(".popup-content");
      if (target === null) {
        popup.style.display = "none";
        popup.querySelector("input").value = "";
      }
    }
  });
};
export default togglePopup;




