import { refs } from './refs';

export function spinnerPlay() {
  refs.spinner.classList.remove('visually-hidden');
}

export function spinnerStop() {
  refs.spinner.classList.add('visually-hidden');
}
