import { refs } from './refs';
import throttle from 'lodash.throttle';

refs.upBtn.addEventListener('click', backToTheTop);
// window.addEventListener('scroll', throttle(onScroll(refs.upBtn), 250));

// function onScroll() {
//   if (pageYOffset < document.documentElement.clientHeight) {
//     refs.upBtn.classList.add('visuallyhidden');
//   } else {
//     refs.upBtn.classList.remove('visuallyhidden');
//   }
// }

function backToTheTop() {
  console.log('click');
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

console.log(refs.upBtn);
