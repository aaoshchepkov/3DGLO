"use strict";
const validate = () => {
    function maskPhone(selector, masked = "+7 (___) ___-__-__") {
      const elems = document.querySelectorAll(selector);

      function mask(event) {
        const keyCode = event.keyCode;
        const template = masked,
          def = template.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, "");
        let i = 0,
          newValue = template.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i !== -1) {
          newValue = newValue.slice(0, i);
        }
        let reg = template
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        ) {
          this.value = newValue;
        }
      }

      for (const elem of elems) {
        elem.addEventListener("input", mask);
        elem.addEventListener("focus", mask);
        elem.addEventListener("blur", mask);
      }
    }
    maskPhone('[name="user_phone"]', "+7-___-___-__-__");
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
        target.value = target.value.replace(/[^а-яё\-\ ,.!?]/gi, "");
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
              if (target.value.length < 2) {
                target.placeholder = "Имя должно быть не короче 2 букв";
                setTimeout(function () {
                  target.placeholder = "Ваше имя";
                }, 3000);
                target.value = "";
              }
            },
            true
          );
        }
      });

      email.forEach((item) => {
        if (target === item) {
          target.value = target.value.replace(/[^a-z0-9\@\-_.!~*']/gi, "");
          item.addEventListener(
            "blur",
            () => {
              regularValid();
              let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (reg.test(item.value) === false) {
                target.placeholder = "Введите в формате mail@mail.com";
                setTimeout(function () {
                  target.placeholder = "E-mail";
                }, 3000);
                target.value = "";
              }
            },
            true
          );
        }
      });

      phone.forEach((item) => {
        if (target === item) {
          target.value = target.value.replace(/[^0-9\+-]/gi, "");
          item.addEventListener(
            "blur",
            () => {
              regularValid();
              if (target.value.length < 16) {
                target.placeholder = "Введите в формате +7-999-999-99-99";
                setTimeout(function () {
                  target.placeholder = "Номер телефона";
                }, 3000);
                target.value = "";
              }
            },
            true
          );
        }
      });
    });
  };
  export default validate;