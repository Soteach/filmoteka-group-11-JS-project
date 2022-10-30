import TrendingMovies from './fetchAPI';
import { renderFilmsMarkup } from './renderMarkup';

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
  trendingMovies.fetchGenres().then(({ genres }) => {
    const arr = [...genres];
    localStorage.setItem('genres', JSON.stringify(arr));
  });

  trendingMovies
    .fetchTrendingMovies()
    .then(data => {
      renderFilmsMarkup(data);

      // options.totalItems = trendingMovies.getResults();

      // setToLocacStorageAnswer(data);
    })

    .catch(error => console.log(error));
}

function onSelectPage(page) {
  loadAndRenderTrendingMovies(page);
}
createStartList();
