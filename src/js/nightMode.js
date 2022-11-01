import { refs } from './refs';

refs.nightModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkTheme')
    refs.nightModeBtn.classList.toggle('dark-theme-edited')
    refs.footerRef.classList.toggle('dark-footer')

})                      