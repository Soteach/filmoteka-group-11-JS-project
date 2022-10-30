import { refs } from './refs';

refs.nightModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkTheme')
    refs.nightModeBtn.classList.toggle('dark-theme-edited')
    refs.footerRef.classList.toggle('dark-footer')
    // console.log(document.body.classList.contains('darkTheme'));
    // if(document.body.classList.contains('darkTheme')){
    //     refs.nightModeBtn.style.backgroundImage = "url(images/dark-theme/sun.png)";
    // } else { refs.nightModeBtn.style.backgroundImage = "url(images/dark-theme/moon2.png)"; }
    
}) 