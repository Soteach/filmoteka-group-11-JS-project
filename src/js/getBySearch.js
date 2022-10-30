import axios from 'axios';

const refs = {
  searchForm: document.querySelector('.header-search__form'),
  searchInput: document.querySelector('.header-search-input'),
  container: document.querySelector('.gallery__set'),
};

import { renderFilmsMarkup } from './renderMarkup';

let currentPage = 1;

let markup = '';

async function fetchMovies(inputQuery, currentPage) {
  const mainUrl = `https://api.themoviedb.org/3/search/movie`;
  const filters = `?api_key=c3923fa38d2dd62131b577696cc2f23f&query=${inputQuery}&page=${currentPage}`;
  const response = await axios.get(`${mainUrl}${filters}`);
  // console.log(response);

  // console.log(response.json());

  const { data } = response;

  // console.log(data.results);

  return data.results;
}

let inputQuery = '';
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  inputQuery = refs.searchInput.value;
  // console.log(inputQuery);
  // fetchMovies(inputQuery, 1);
  const data = await fetchMovies(inputQuery, 1);

  renderFilmsMarkup(data);
}

async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;
}
