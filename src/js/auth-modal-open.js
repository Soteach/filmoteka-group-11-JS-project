import { refs } from './refs';

refs.signInBtn.addEventListener('click', onSignInModal);
refs.closeAuthBtn.addEventListener('click', onSignInModal);
refs.authForm.addEventListener('submit', authFormHandler);
document.addEventListener('keydown', onEsc);
refs.authBackdrop.addEventListener('click', clickOnAnyPlace);

export function onSignInModal() {
  refs.authModal.classList.toggle('visually-hidden');
}

export function authFormHandler(evt) {
  evt.preventDefault();
}

export function onEsc(evt) {
  if (evt.key === 'Escape') {
    refs.authModal.classList.add('visually-hidden');
  }
}

export function clickOnAnyPlace(evt) {
  if (evt.target.matches('.form__close') || !evt.target.closest('.modal')) {
    refs.authModal.classList.add('visually-hidden');
  }
}
