import { refs } from './refs';

refs.nightModeBtn.addEventListener('click', handleDarkModeChange)                      

function handleDarkModeChange(){
    toggleDarkMode()
    storeThemeToLS()
}

function toggleDarkMode(){
    
    document.body.classList.toggle('darkTheme')
    refs.nightModeBtn.classList.toggle('dark-theme-edited')
    refs.footerRef.classList.toggle('dark-footer')
}

    

function storeThemeToLS(){
    if(!localStorage.getItem('THEME_KEY')){
        localStorage.setItem('THEME_KEY', 'dark')
    } else if(localStorage.getItem("THEME_KEY") === 'dark'){
        localStorage.setItem('THEME_KEY', 'light')
    } else if(localStorage.getItem("THEME_KEY") === 'light'){
        localStorage.setItem('THEME_KEY', 'dark')
    }
}

function checkSavedTheme(){
    if(localStorage.getItem("THEME_KEY") === 'dark'){
    
    toggleDarkMode()

    }
}

checkSavedTheme()