import { refs } from './refs';
import axios from 'axios';
import Notiflix from 'notiflix';

let btnModalWatched = '';
let btnModalQueue = '';

const WATCHED_KEY = 'Watched_KEY';
const QUEUE_KEY = 'Queue_KEY';

const API_KEY = 'c3923fa38d2dd62131b577696cc2f23f';
const mainUrl = `https://api.themoviedb.org/3`;

refs.gallery.addEventListener('click', modalAppear);

const nothingPlaceHolder = `<li style="display: flex;align-items: center; justify-content: center;
 width: 100%; height: 592px; background: linear-gradient( 45deg, rgba(108, 9, 9, 0.8267682072829132) 0%,
 rgba(62, 65, 87, 0.83) 50%, rgba(108, 9, 9, 0.83) 100% ); " > <p style="font-size: 48px;
 font-weight: 700">Nothing added to list</p></li>`;

async function fetchMovieById(filmId) {
  const filters = `/movie/${filmId}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(`${mainUrl}${filters}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

function cardMarkup(data) {
  const {
    poster_path,
    genres,
    title,
    overview,
    id,
    vote_average,
    vote_count,
    popularity,
    original_title,
  } = data;

  const arr = [];
  for (let index = 0; index < genres.length; index++) {
    const name = Object.values(genres[index]);
    arr.push(name[1]);
  }

  const arrToString = arr.join(', ');

  return `<div class="modal-card" data-action="${id}">
    <div class="cardItem__image">
      <img class="image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"/>
    </div>
  
    <div class=" cardItem__wrapper">
      <h2 class="cardItem__name">${title}</h2>
      <p class="cadrItem__vote cardItem_text">
        Vote / Votes<span class="cardItem__vote_average">${vote_average}</span>/<span
          class="cardItem__vote_count">${vote_count}</span>
      </p>
      <p class="cardItem__popularity cardItem_text">
        Popularity<span class="cardItem___data">${popularity}</span>
      </p>
      <p class="cardItem-Title cardItem_text">
        Original Title<span class="cardItem__title_data">${original_title}</span>
      </p>
      <div class="genres">
        <p class="cardItem__genre cardItem_text">
          Genre
        </p>
        <p class="cardItem__genreList">${arrToString}
          <span class="cardItem__genre_data"></span>
        </p>
  
      </div>
      <p class="cardItem__about">About</p>
      <p class="cardItem__description">
        ${overview}
      </p>
      <div class="cardItem__listButton">
        <ul class="storage">
          <li class="storage__item">
              <button class="storage__btn js-WatchedButton" data-id=${id} >Watched</button>
            </label>
          </li>
          <li class="storage__item">
              <button class="storage__btn js-QueueButton" data-id=${id} >Queue</button>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal-close-btn"><svg class="close-svg" width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M8 8L22 22" stroke="black" stroke-width="2"></path>
				<path d="M8 22L22 8" stroke="black" stroke-width="2"></path>
			</svg></div>
  </div>`;
}

async function modalAppear(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const response = await fetchMovieById(event.target.id);
  const markup = cardMarkup(response);

  refs.modalRef.innerHTML = markup;

  btnModalWatched = document.querySelector('.js-WatchedButton');
  btnModalQueue = document.querySelector('.js-QueueButton');

  try {
    const idFilmsQueueArray = JSON.parse(localStorage.getItem(QUEUE_KEY));
    const idFilmsWatchedArray = JSON.parse(localStorage.getItem(WATCHED_KEY));

    if (idFilmsQueueArray) {
    if (idFilmsQueueArray.includes(event.target.id)) {
      btnModalQueue.classList.add('modal__btn--active');
    }
    }
    if (idFilmsWatchedArray) {
    if (idFilmsWatchedArray.includes(event.target.id)) {
      btnModalWatched.classList.add('modal__btn--active');
    }
    }
  } catch (error) {}

  refs.modalBdrop.classList.remove('visually-hidden');
  document.body.style.overflow = 'hidden';

  addListeners(event);
}

function addListeners() {
  btnModalWatched = document.querySelector('.js-WatchedButton');
  btnModalQueue = document.querySelector('.js-QueueButton');
  const closeButton = document.querySelector('.modal-close-btn');

  closeButton.addEventListener('click', modalClose);
  refs.modalBdrop.addEventListener('click', modalCloseOnBdClick);
  window.addEventListener('keydown', modalCloseOnEscape);
  btnModalWatched.addEventListener('click', putWatchedIdtoLocalStorage);
  btnModalQueue.addEventListener('click', putQueueIdtoLocalStorage);
}

function putWatchedIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;

  try {
    const checkIfNull = localStorage.getItem(WATCHED_KEY);
    let currentWatchedArr = checkIfNull === null ? [] : JSON.parse(checkIfNull);
    if (currentWatchedArr) {
      if (currentWatchedArr.includes(filmId)) {
        currentWatchedArr.splice(currentWatchedArr.indexOf(filmId), 1);
        if (currentWatchedArr.length === 0) {
          localStorage.removeItem(WATCHED_KEY);
          btnModalQueue = document.querySelector('.js-WatchedButton');
          btnModalQueue.classList.remove('modal__btn--active');
          return;
        }
        const filmSTRING = JSON.stringify(currentWatchedArr);
        localStorage.setItem(WATCHED_KEY, filmSTRING);
        btnModalWatched = document.querySelector('.js-WatchedButton');
        btnModalWatched.classList.remove('modal__btn--active');
        return;
      }

      currentWatchedArr.push(filmId);

      const filmSTRING = JSON.stringify(currentWatchedArr);
      localStorage.setItem(WATCHED_KEY, filmSTRING);
      btnModalWatched = document.querySelector('.js-WatchedButton');
      btnModalWatched.classList.add('modal__btn--active');
    }
  } catch (error) {
    console.error(error);
  }
}

function putQueueIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;

  try {
    const checkIfNull = localStorage.getItem(QUEUE_KEY);
    let currentQueueArr = checkIfNull === null ? [] : JSON.parse(checkIfNull);
    if (currentQueueArr) {
      if (currentQueueArr.includes(filmId)) {
        currentQueueArr.splice(currentQueueArr.indexOf(filmId), 1);
        if (currentQueueArr.length === 0) {
          localStorage.removeItem(QUEUE_KEY);
          btnModalQueue = document.querySelector('.js-QueueButton');
          btnModalQueue.classList.remove('modal__btn--active');
          return;
        }
        const filmSTRING = JSON.stringify(currentQueueArr);
        localStorage.setItem(QUEUE_KEY, filmSTRING);
        btnModalQueue = document.querySelector('.js-QueueButton');
        btnModalQueue.classList.remove('modal__btn--active');
        return;
      }

      currentQueueArr.push(filmId);

      const filmSTRING = JSON.stringify(currentQueueArr);
      localStorage.setItem(QUEUE_KEY, filmSTRING);
      btnModalQueue = document.querySelector('.js-QueueButton');
      btnModalQueue.classList.add('modal__btn--active');
    }
  } catch (error) {
    console.error(error);
  }
}


////////////modal close functional

function modalClose() {
  refs.modalBdrop.classList.add('visually-hidden');

  window.removeEventListener('keydown', modalCloseOnEscape);
  document.body.style.overflow = '';
  const btnWatched = document.querySelector('.js-btn-watched');

  try {
    if (btnWatched.classList.contains('filter__btn--active')) {
      goToWatched();
    } else {
      goToQueue();
    }
  } catch (error) {}
}

function modalCloseOnBdClick(event) {
  if (event.target.classList.contains('box')) {
    modalClose();
  }
}

function modalCloseOnEscape(event) {
  if (event.code === 'Escape') {
    modalClose();
  }
}

async function goToWatched() {
  refs.spinner.classList.remove('visually-hidden');

  const btnWatched = document.querySelector('.js-btn-watched');
  const btnQueue = document.querySelector('.js-btn-queue');

  btnWatched.classList.add('filter__btn--active');
  btnQueue.classList.remove('filter__btn--active');

  try {
    const idFilmsArray = JSON.parse(localStorage.getItem(WATCHED_KEY));
    const qweqwe = await Promise.all(idFilmsArray.map(fetchMovieById));

    renderFilmsMarkup(qweqwe);

    refs.spinner.classList.add('visually-hidden');
  } catch (error) {
    Notiflix.Notify.failure('Your Watched gallery is empty!');
    refs.libgallerySet.innerHTML = nothingPlaceHolder;
    refs.spinner.classList.add('visually-hidden');

    return;
  }
}

async function goToQueue() {
  refs.spinner.classList.remove('visually-hidden');

  const btnWatched = document.querySelector('.js-btn-watched');
  const btnQueue = document.querySelector('.js-btn-queue');

  btnQueue.classList.add('filter__btn--active');
  btnWatched.classList.remove('filter__btn--active');

  try {
    const idFilmsArray = JSON.parse(localStorage.getItem(QUEUE_KEY));
    const qweqwe = await Promise.all(idFilmsArray.map(fetchMovieById));

    renderFilmsMarkup(qweqwe);
    refs.spinner.classList.add('visually-hidden');
  } catch (error) {
    Notiflix.Notify.failure('Your Queue gallery is empty!');
    refs.spinner.classList.add('visually-hidden');
    refs.libgallerySet.innerHTML = nothingPlaceHolder;
    return;
  }
}

function renderFilmsMarkup(films) {
  refs.libgallerySet.innerHTML = '';

  films
    .map(
      ({
        poster_path,
        genres,
        title,
        original_title,
        release_date,
        first_air_date,
        id = 55555,
      }) => {
        const poster = poster_path
          ? `https://image.tmdb.org/t/p/w400${poster_path}`
          : `https://image.tmdb.org/t/p/w400/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg`;

        return `<li class="gallery__item" data-id=${id}>
                <div class="films__img">
                    <img class="poster" src=https://image.tmdb.org/t/p/original${poster} alt="${
          title || original_title || 'No title'
        }" loading="lazy" id=${id}>
                </div>
                <div class="film__description" id=${id}>
                  <p class="film__title" id=${id}>${
          title || original_title || 'No title'
        }</p>
                  <div class="films__meta" id=${id}>
                    <span class="films__genres" id=${id}>${
          getGenres(genres) || 'No genres info'
        }</span>
                    
                    <span class="films__sep" id=${id}>|</span>
                    <span class="films__data" id=${id}>${
          new Date(release_date).getFullYear() ||
          new Date(first_air_date).getFullYear() ||
          'No info'
        }</span>
                  </div>
                </div>
            </li>`;
      }
    )
    .forEach(c => refs.libgallerySet.insertAdjacentHTML('beforeend', c));
}

function getGenres(genres) {
  const arr = [];

  for (let index = 0; index < genres.length; index++) {
    const name = Object.values(genres[index]);
    arr.push(name[1]);
  }

  const ArrToJoin = [];

  if (arr.length > 3) {
    ArrToJoin.push(arr[0]);
    ArrToJoin.push(arr[1]);
    ArrToJoin.push('Other');
    return ArrToJoin.join(', ');
  }

  return arr.join(', ');
}
