var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return r[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){t[e]=r},e.parcelRequired7c6=n);var a=n("2shzp"),o=n("2nhTy"),c=n("cky31");const i={searchForm:document.querySelector(".header-search__form"),searchInput:document.querySelector(".header-search-input"),container:document.querySelector(".gallery__set")};async function s(e,r){const t=`?api_key=c3923fa38d2dd62131b577696cc2f23f&query=${e}&page=${r}`,n=await a.default.get(`https://api.themoviedb.org/3/search/movie${t}`),{data:o}=n;return o}let d="";async function l(e){(0,c.renderFilmsMarkup)(e.results),(0,o.renderPager)(e.page,e.total_pages,(async e=>{s(d,e).then((e=>{l(e),window.scrollTo({top:0,behavior:"smooth"})}))}))}i.searchForm.addEventListener("submit",(async function(e){e.preventDefault(),d=i.searchInput.value;l(await s(d,1))}));
//# sourceMappingURL=index.7ea41e7a.js.map
