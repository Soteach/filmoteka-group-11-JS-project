import axios from 'axios';
import { renderPager } from './pagination';

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

  return data;
}

let inputQuery = '';
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  inputQuery = refs.searchInput.value;

  // console.log(inputQuery);
  // fetchMovies(inputQuery, 1);
  const data = await fetchMovies(inputQuery, 1);

  renderUI(data);
}

async function renderUI(data) {
  renderFilmsMarkup(data.results);
  renderPager(data.page, data.total_pages, async page => {
    fetchMovies(inputQuery, page).then(data => {
      renderUI(data);
    });
  });
}

async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;
}

// async function addPagination() {
//   await fetchMovies(inputQuery, currentPage).then(res => {
//     totalPages = res.total_pages;
//     return totalPages;
//   });
//   if (totalPages === 0) {
//     refs.searchErrorNotif.textContent =
//       'Search result not successful. Enter the correct movie name and try again';
//     $(#pagination-container).pagination(destroy);
//     refs.moviesList.innerHTML = ``;
//     return;
//   } else if (inputQuery === ``) {
//     refs.searchErrorNotif.textContent = 'Please enter the name of the movie';
//     $(#pagination-container).pagination(destroy);
//     refs.moviesList.innerHTML = ``;
//     return;
//   }
//   refs.searchErrorNotif.textContent = '';
// }
