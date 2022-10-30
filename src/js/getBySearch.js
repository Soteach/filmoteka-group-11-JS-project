
import axios from 'axios';
import { spinnerPlay, spinnerStop } from './spinner';

const refs = {
  searchForm: document.querySelector('.header-search__form'),
  searchInput: document.querySelector('.header-search-input'),
  container: document.querySelector('.gallery__set'),
  notifyError: document.querySelector('.form-text'),
};

import { renderFilmsMarkup } from './renderMarkup';

let currentPage = 1;

let markup = '';

async function fetchMovies(inputQuery, currentPage) {
  const mainUrl = `https://api.themoviedb.org/3/search/movie`;
  const filters = `?api_key=c3923fa38d2dd62131b577696cc2f23f&query=${inputQuery}&page=${currentPage}`;

  const response = await axios.get(`${mainUrl}${filters}`);

  const { data } = response;

  return data.results;
}

let inputQuery = '';
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  inputQuery = refs.searchInput.value;

  const data = await fetchMovies(inputQuery, 1);
  if (data.length === 0) {
    return (refs.notifyError.textContent =
      'Search result not successful. Enter the correct movie name.');
  }

  renderFilmsMarkup(data);
}

async function renderUI(data) {
  renderFilmsMarkup(data.results);
  renderPager(data.page, data.total_pages, async page => {
    fetchMovies(inputQuery, page).then(data => {
      renderUI(data);
    });
  });
}