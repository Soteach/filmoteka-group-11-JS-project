var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var r=o[e];delete o[e];var t={id:e,exports:{}};return n[e]=t,r.call(t.exports,t,t.exports),t.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},e.parcelRequired7c6=r);var t=r("9TCtp"),i=r("cky31"),l=r("2nhTy");const s=new(0,t.TrendingMovies);function a(e){s.page=e,s.fetchTrendingMovies().then((e=>{(0,i.renderFilmsMarkup)(e.results),(0,l.renderPager)(e.page,e.total_pages,d)})).catch((e=>console.log(e)))}function d(e){a(e),window.scrollTo({top:0,behavior:"smooth"})}s.fetchGenres().then((({genres:e})=>{const n=[...e];localStorage.setItem("genres",JSON.stringify(n))})),a(1);
//# sourceMappingURL=index.b7bc5f8f.js.map
