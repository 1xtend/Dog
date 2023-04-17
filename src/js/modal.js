/*
Button example

<button type="button" data-modal="modal_1">Open</button>
*/

export const modal = () => {
  const modalTogglers = document.querySelectorAll('[data-modal]');
  const body = document.body;
  const lockPadding = document.querySelectorAll('lock-padding');

  const html = document.documentElement;

  let scrollPosition = 0;
  let unlock = true;

  const timeout = 300;

  if (modalTogglers.length > 0) {
    modalTogglers.forEach((modalToggler) => {
      modalToggler.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = modalToggler.dataset.modal;
        const currentModal = document.querySelector(`#${targetId}`);

        modalOpen(currentModal);

        scrollPosition = window.pageYOffset;
        html.style.position = 'fixed';
        html.style.top = -scrollPosition + 'px';
      });
    });
  }

  const modalCloseBtns = document.querySelectorAll('.close-modal');
  if (modalCloseBtns.length > 0) {
    modalCloseBtns.forEach((closeBtn) => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        modalClose(closeBtn.closest('.modal'));
      });
    });
  }

  function modalOpen(currentModal) {
    if (currentModal && unlock) {
      const modalActive = document.querySelector('.modal.is-active');

      if (modalActive) {
        modalClose(modalActive, false);
      } else {
        bodyLock();
      }

      currentModal.classList.add('is-active');
      currentModal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) {
          modalClose(e.target.closest('.modal'));
        }
      });
    }
  }

  function modalClose(modalActive, doUnlock = true) {
    if (unlock) {
      modalActive.classList.remove('is-active');

      html.style.top = '';
      html.style.position = 'relative';
      window.scrollTo(0, scrollPosition);

      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach((lockElem) => {
        lockElem.style.paddingRight = lockPaddingValue;
      });
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('is-locked');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        lockPadding.forEach((lockElem) => {
          lockElem.style.paddingRight = '0px';
        });
      }

      body.style.paddingRight = '0px';
      body.classList.remove('is-locked');
    }, timeout);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      const modalActive = document.querySelector('.modal.is-active');
      modalClose(modalActive);
    }
  });
};
