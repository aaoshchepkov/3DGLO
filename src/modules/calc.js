"use strict";
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
  export default calc;