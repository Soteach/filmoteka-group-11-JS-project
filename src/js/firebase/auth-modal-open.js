import { refs } from '../refs';

refs.signInBtn.addEventListener('click', onSignInModal);
refs.closeAuthBtn.addEventListener('click', onSignInModal);
refs.authForm.addEventListener('submit', authFormHandler);
document.addEventListener('keydown', onEsc);
refs.authBackdrop.addEventListener('click', clickOnAnyPlace);

function onSignInModal() {
  refs.authModal.classList.toggle('visually-hidden');
  refs.bodyEl.classList.toggle('no_scroll');
}

function authFormHandler(evt) {
  evt.preventDefault();
}

function onEsc(evt) {
  if (evt.key === 'Escape') {
    refs.authModal.classList.add('visually-hidden');
    refs.bodyEl.classList.remove('no_scroll');
  }
}

function clickOnAnyPlace(evt) {
  if (
    evt.target.matches('.form__close') ||
    !evt.target.closest('.auth-modal')
  ) {
    refs.authModal.classList.add('visually-hidden');
    refs.bodyEl.classList.remove('no_scroll');
  }
}
