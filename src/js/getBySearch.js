import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';

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
  refs.spinner.classList.remove('visually-hidden');

  inputQuery = event.target.elements.input.value;

  const data = await fetchMovies(inputQuery, 1);
  if (data.length === 0) {
    return (refs.notifyError.textContent =
      'Search result not successful. Enter the correct movie name.');
  }

  if (data) {
    Notiflix.Notify.warning('No such films found. Try again!');
    return;
  }

  renderFilmsMarkup(data);
  refs.spinner.classList.add('visually-hidden');
}

// async function addPagination() {
//   await fetchMovies(inputQuery, currentPage).then(res => {
//     totalPages = res.total_pages;
//     return totalPages;
//   });
//   if (totalPages === 0) {
//     refs.searchErrorNotif.textContent =
//       'Search result not successful. Enter the correct movie name and try again';
//     $(`#pagination-container`).pagination(`destroy`);
//     refs.moviesList.innerHTML = ``;
//     return;
//   } else if (inputQuery === ``) {
//     refs.searchErrorNotif.textContent = 'Please enter the name of the movie';
//     $(`#pagination-container`).pagination(`destroy`);
//     refs.moviesList.innerHTML = ``;
//     return;
//   }
//   refs.searchErrorNotif.textContent = '';
// }
