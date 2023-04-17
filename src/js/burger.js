// Import html and body
import { mainElems } from './app.js';

// Burger
export const burger = () => {
  const burger = document.querySelector('.burger');
  const navbar = document.querySelector('.navbar');

  // If burger exists
  if (burger) {
    // Open and Close navbar by clicking on a burger
    burger.addEventListener('click', (e) => {
      addClasses();
    });

    // Close navbar by clicking on a link
    navbar.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('navbar__link') ||
        e.target.classList.contains('navbar__btn')
      ) {
        removeClasses();
      }
    });
  }

  // Add Classes
  function addClasses() {
    mainElems.body.classList.toggle('is-burger');
    // mainElems.html.classList.toggle('is-burger');
    burger.classList.toggle('is-active');
    navbar.classList.toggle('is-active');
  }

  // Remove Classes
  function removeClasses() {
    mainElems.body.classList.remove('is-burger');
    // mainElems.html.classList.remove('is-burger');
    burger.classList.remove('is-active');
    navbar.classList.remove('is-active');
  }
};
