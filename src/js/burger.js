// Import html and body
import { mainElems } from './app.js';

// Burger
export const burger = () => {
  const burger = document.querySelector('.burger');
  const navbar = document.querySelector('.navbar');

  let scrollPosition = 0;

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
    burger.classList.toggle('is-active');
    navbar.classList.toggle('is-active');

    setTimeout(() => {
      mainElems.body.classList.toggle('burger-lock');
    }, 300);
  }

  // Remove Classes
  function removeClasses() {
    mainElems.body.classList.remove('burger-lock');
    burger.classList.remove('is-active');
    navbar.classList.remove('is-active');
  }
};
