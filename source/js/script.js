const page = document.querySelector('.page__body');
page.classList.remove('.page__body--no-js');

const feedbackButton = document.querySelector('.feedback-button-js');
const feedbackButtonClose = document.querySelector('.modal__button-close');
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.form--modal');
const userName = document.querySelector('.form__input--name');
const phone = document.querySelector('.form__input--phone');
const message = document.querySelector('.form__input--message');
const accordeons = document.querySelectorAll('.accordeon');

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
    modal.classList.remove('modal--show');
  }
});

const openModal = () => {
  modal.classList.add('modal--show');
  document.addEventListener('keydown', onPopupEscKeydown);
  getLocalStorage();
  userName.focus();
};

const closeModal = () => {
  modal.classList.remove('modal--show');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

feedbackButton.addEventListener('click', () => {
  openModal();
});

feedbackButtonClose.addEventListener('click', () => {
  modal.classList.remove('modal--show');
});

modalForm.addEventListener("submit", function (evt) {
  setLocalStorage();
});



for (let item of accordeons) {
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
