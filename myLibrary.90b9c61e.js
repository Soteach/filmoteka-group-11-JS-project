function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},s={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in i)return i[e].exports;if(e in s){var t=s[e];delete s[e];var n={id:e,exports:{}};return i[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){s[e]=t},t.parcelRequired7c6=n);var a=n("krGWQ"),l=n("2shzp"),r=n("eWCmQ");const d=document.querySelector(".js-btn-watched"),o=document.querySelector(".js-btn-queue");async function c(){a.refs.spinner.classList.remove("visually-hidden"),d.classList.add("filter__btn--active"),o.classList.remove("filter__btn--active");try{const e=JSON.parse(localStorage.getItem("Watched_KEY"));u(await Promise.all(e.map(f))),a.refs.spinner.classList.add("visually-hidden")}catch(t){return e(r).Notify.failure("Your Watched gallery is empty!"),void a.refs.spinner.classList.add("visually-hidden")}}function u(e){a.refs.libgallerySet.innerHTML="",e.map((({poster_path:e,genres:t,title:i,original_title:s,release_date:n,first_air_date:a,id:l})=>`<li class="gallery__item" data-id=${l||"No ID"}>\n                <div class="films__img">\n                    <img src=https://image.tmdb.org/t/p/original${e?`https://image.tmdb.org/t/p/w400${e}`:"https://image.tmdb.org/t/p/w400/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg"} alt="${i||s||"No title"}" loading="lazy" id=${l}>\n                </div>\n                <div class="film__description" id=${l}>\n                  <p class="film__title" id=${l}>${i||s||"No title"}</p>\n                  <div class="films__meta" id=${l}>\n                    <span class="films__genres" id=${l}>${function(e){const t=[];for(let i=0;i<e.length;i++){const s=Object.values(e[i]);t.push(s[1])}const i=[];if(t.length>3)return i.push(t[0]),i.push(t[1]),i.push("Other"),i.join(", ");return t.join(", ")}(t)||"No genres info"}</span>\n                    \n                    <span class="films__sep" id=${l}>|</span>\n                    <span class="films__data" id=${l}>${new Date(n).getFullYear()||new Date(a).getFullYear()||"No info"}</span>\n                  </div>\n                </div>\n            </li>`)).forEach((e=>a.refs.libgallerySet.insertAdjacentHTML("beforeend",e)))}d.addEventListener("click",c),o.addEventListener("click",(async function(){a.refs.spinner.classList.remove("visually-hidden"),o.classList.add("filter__btn--active"),d.classList.remove("filter__btn--active");try{const e=JSON.parse(localStorage.getItem("Queue_KEY"));u(await Promise.all(e.map(f))),a.refs.spinner.classList.add("visually-hidden")}catch(t){return e(r).Notify.failure("Your Queue gallery is empty!"),void a.refs.spinner.classList.add("visually-hidden")}}));async function f(e){const t=`/movie/${e}?api_key=c3923fa38d2dd62131b577696cc2f23f`;try{return(await l.default.get(`https://api.themoviedb.org/3${t}`)).data}catch(e){console.log(e)}}c();
//# sourceMappingURL=myLibrary.90b9c61e.js.map
