"use strict";
const sendForm = () => {
    const erorrMessage = "Что то пошло не так...";
    const loadMessage = "Загрузка...";
    const successMessage = "Спасибо за обращение! Мы скоро с вами свяжемся";
    const form = document.querySelectorAll("form");
    const statusMessage = document.createElement("div");
    let popup = document.querySelector(".popup");

    statusMessage.style.cssText = "font-size: 2rem; color: white;";
    form.forEach((item) => {
      item.addEventListener("submit", (event) => {
        event.preventDefault();
        item.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(item);
        let body = {};
        formData.forEach((value, key) => {
          body[key] = value;
        });
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("status network not 200.");
            }
            statusMessage.textContent = successMessage;
            let input = item.querySelectorAll("input");
            input.forEach((item) => {
              item.value = "";
            });
            setTimeout(() => {
              popup.style.display = "none";
            }, 2000);
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          })
          .catch((error) => {
            statusMessage.textContent = erorrMessage;
            console.error(error);
          });
      });
    });

    let postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(body),
      });
    };
  };
  export default sendForm;