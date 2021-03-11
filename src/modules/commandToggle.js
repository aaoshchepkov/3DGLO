 "use strict";
 const commandToggle = (event) => {
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
  };
  export default commandToggle;