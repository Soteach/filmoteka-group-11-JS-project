!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},e.parcelRequired7c6=t);var a=t("4Nugj"),o=t("dIxxU"),i=t("jcFG7"),d=t("5118m");async function s(e,n){const r=`?api_key=c3923fa38d2dd62131b577696cc2f23f&query=${e}&page=${n}`,t=await o.default.get(`https://api.themoviedb.org/3/search/movie${r}`),{data:a}=t;return a}let l="";async function f(e){(0,d.renderFilmsMarkup)(e.results),(0,i.renderPager)(e.page,e.total_pages,(async e=>{s(l,e).then((e=>{f(e),window.scrollTo({top:0,behavior:"smooth"})}))}))}a.refs.searchForm.addEventListener("submit",(async function(e){e.preventDefault(),l=a.refs.searchInput.value;f(await s(l,1))}))}();
//# sourceMappingURL=index.bab2cfad.js.map