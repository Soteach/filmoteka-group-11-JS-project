import { refs } from './refs';

export function onLogIn() {
  refs.authModal.classList.add('visually-hidden');
  refs.signInBtn.classList.add('visually-hidden');
  refs.btnLogout.classList.remove('visually-hidden');
}

export function onLogOut() {
  refs.signInBtn.classList.remove('visually-hidden');
  refs.btnLogout.classList.add('visually-hidden');
}
