import { refs } from './refs';

refs.studBtn.addEventListener('click', onOpenModal);
refs.closeStudBtn.addEventListener('click', onModalClose);
refs.studBackdrop.addEventListener('click', clickOnAnyPlace);
document.addEventListener('keydown', onEsc);

function onOpenModal() {
  refs.studModal.classList.toggle('visually-hidden');
  refs.bodyEl.classList.toggle('no_scroll');
}

function onModalClose() {
  window.removeEventListener('keydown', onEsc);
  refs.studModal.classList.toggle('visually-hidden');
  refs.bodyEl.classList.toggle('no_scroll');
}

function onEsc(evt) {
  if (evt.key === 'Escape') {
    refs.studModal.classList.add('visually-hidden');
    refs.bodyEl.classList.remove('no_scroll');
  }
}

function clickOnAnyPlace(evt) {
  if (evt.target.matches('.close') || !evt.target.closest('.stud__modal')) {
    refs.studModal.classList.add('visually-hidden');
    refs.bodyEl.classList.remove('no_scroll');
  }
}
