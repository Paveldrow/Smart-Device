const page = document.querySelector('.page__body');
page.classList.remove('page__body--no-js');


const feedbackButton = document.querySelector('.feedback-button-js');
const feedbackButtonClose = document.querySelector('.modal__button-close');
const modalButton = document.querySelector('.form__button--modal');

const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.form--modal');
const userName = document.querySelector('.form__input--name');
const phone = document.querySelector('.form__input--phone');
const phoneFeedback = document.querySelector('.form__input--phone-feedback');
const message = document.querySelector('.form__input--message');
const accordeons = document.querySelectorAll('.accordeon');

const focusableEls = modalForm.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');

const firstFocusableEl = focusableEls[0];
const lastFocusableEl = focusableEls[focusableEls.length - 1];

function trapFocus(element) {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener('keydown', function (e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
    if (!isTabPressed) {
      return;
    };

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      };
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      };
    };
  });
};


const validatePhone = function (element) {
  const imPhone = new Inputmask('+7 (999) 999-99-99');
  imPhone.mask(element);
};

validatePhone(phoneFeedback);

const setLocalStorage = () => {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('phone', phone.value);
  localStorage.setItem('message', message.value);
};

const getLocalStorage = () => {
  userName.value = localStorage.getItem("name");
  phone.value = localStorage.getItem("phone");
  message.value = localStorage.getItem("message");
}

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeModal();
  }
};

modal.addEventListener('click', (evt) => {
  if (evt.target === modal) {
    page.classList.remove('page__body--open-modal');
    modal.classList.remove('modal--show');
  }
});

const openModal = () => {
  modal.classList.add('modal--show');
  page.classList.add('page__body--open-modal');
  trapFocus(modalForm);
  userName.focus();
  validatePhone(phone);
  document.addEventListener('keydown', onPopupEscKeydown);
  getLocalStorage();
};

const closeModal = () => {
  page.classList.remove('page__body--open-modal');
  modal.classList.remove('modal--show');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

feedbackButton.addEventListener('click', () => {
  openModal();
});

feedbackButtonClose.addEventListener('click', () => {
  page.classList.remove('page__body--open-modal');
  modal.classList.remove('modal--show');
});

modalForm.addEventListener("submit", function (evt) {
  setLocalStorage();
});

const accordeonsControl = function (accordeonsList) {
  for (let item of accordeonsList) {
    item.addEventListener('click', () => {
      if (item.classList.contains('accordeon--open')) {
        item.classList.remove('accordeon--open')
      } else {
        accordeons.forEach(element => {
          element.classList.remove('accordeon--open');
        });
        item.classList.add('accordeon--open');
      };
    });
  };
}

accordeonsControl(accordeons);

