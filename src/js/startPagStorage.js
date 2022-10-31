import { TrendingMovies } from './fetchApi';
import { renderFilmsMarkup } from './renderMarkup';
import { renderPager } from './pagination';

const trendingMovies = new TrendingMovies();

function setToLocacStorageAnswer(answer) {
  localStorage.setItem('currentFilms', JSON.stringify(answer));
}
// 1111
let options = {
  totalItems: 100,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

function createStartList() {
  trendingMovies.fetchGenres().then(({ genres }) => {
    const arr = [...genres];
    localStorage.setItem('genres', JSON.stringify(arr));
  });

  loadAndRenderTrendingMovies(1);
}

function loadAndRenderTrendingMovies(page) {
  trendingMovies.page = page;
  trendingMovies
    .fetchTrendingMovies()
    .then(data => {
      renderFilmsMarkup(data.results);
      renderPager(data.page, data.total_pages, onSelectPage);
    })
    .catch(error => console.log(error));
}

function onSelectPage(page) {
  loadAndRenderTrendingMovies(page);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
createStartList();
