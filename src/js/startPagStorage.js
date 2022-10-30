import TrendingMovies from './fetchAPI';
import { renderFilmsMarkup } from './renderMarkup';
import { renderPager } from './pagination';

const trendingMovies = new TrendingMovies();

function setToLocacStorageAnswer(answer) {
  localStorage.setItem('currentFilms', JSON.stringify(answer));
}

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
  console.log(this.options);
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
}
createStartList();
