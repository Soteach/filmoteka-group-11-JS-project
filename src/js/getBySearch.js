import { refs } from './refs';
import axios from 'axios';
import { renderPager } from './pagination';
import { renderFilmsMarkup } from './renderMarkup';

let currentPage = 1;

async function fetchMovies(inputQuery, currentPage) {
  const mainUrl = `https://api.themoviedb.org/3/search/movie`;
  const filters = `?api_key=c3923fa38d2dd62131b577696cc2f23f&query=${inputQuery}&page=${currentPage}`;
  const response = await axios.get(`${mainUrl}${filters}`);
  const { data } = response;

  return data;
}

let inputQuery = '';

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  inputQuery = refs.searchInput.value;
  const data = await fetchMovies(inputQuery, 1);

  renderUI(data);
}

async function renderUI(data) {
  renderFilmsMarkup(data.results);
  renderPager(data.page, data.total_pages, async page => {
    fetchMovies(inputQuery, page).then(data => {
      renderUI(data);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
}

async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;
}