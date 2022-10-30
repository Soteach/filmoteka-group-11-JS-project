import Notiflix from 'notiflix';
import { AuthErrorCodes } from 'firebase/auth';

export function showLoginError(error) {
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    Notiflix.Notify.failure(
      'The password is wrong, my friend! Please try again!',
      {
        timeout: 3000,
      }
    );
  } else {
    Notiflix.Notify.failure(
      'Something is wrong, my friend! Please try again!',
      {
        timeout: 3000,
      }
    );
  }
}

export function showLoginSuccess() {
  Notiflix.Notify.success('Welcome back, pal!', {
    timeout: 3000,
  });
}

export function showCreateLoginSuccess() {
  Notiflix.Notify.success(`Welcome on the board, pal!`, {
    timeout: 3000,
  });
}

export function logOutNotification() {
  Notiflix.Notify.info('See you soon, my cutie pie!🥰', {
    timeout: 3000,
  });
}

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '20px',
  opacity: 1,
  success: {
    background: '#ff6b01',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },
  failure: {
    background: '#ff001b',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
  info: {
    background: '#8F1A2C',
    textColor: '#fff',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
    opacity: 0.5,
  },
});
