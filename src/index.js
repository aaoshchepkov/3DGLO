"use strict";
import counTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import sliders from './modules/sliders';
import commandToggle from './modules/commandToggle';
import validate from './modules/validate';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

  // timer
  counTimer("30 march 2021");
  // menu
  toggleMenu();
  //popup
  togglePopup();
  //tabs
  tabs();
  // sliders
  sliders();
  // Наша команда
  commandToggle();
  //Валидация
  validate();
  // Калькулятор
  calc(100);
  // отправка формы
  sendForm();