import { refs } from './refs';
import axios from 'axios';
import { getGenres } from './renderMarkup';

import { spinnerPlay, spinnerStop } from './spinner';

const WATCHED_KEY = 'Watched_KEY';
const QUEUE_KEY = 'Watched_KEY';

const akaLocalStorage = {
  watched: [],
  queue: [],
};

refs.btnWatched.addEventListener('click', goToWatched);

refs.btnQueue.addEventListener('click', goToQueue);

// refs.btnModalWatched.addEventListener('click', putWatchedIdtoLocalStorage);

// refs.btnModalQueue.addEventListener('click', putQueueIdtoLocalStorage);

function putWatchedIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;

  if (akaLocalStorage.watched.includes(filmId)) {
    // akaLocalStorage.watched.
  }

  akaLocalStorage.watched.push(filmId);

  const filmSTRING = JSON.stringify(akaLocalStorage.watched);

  localStorage.setItem(WATCHED_KEY, filmSTRING);
}

function putQueueIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;
  akaLocalStorage.queue.push(filmId);

  const filmSTRING = JSON.stringify(akaLocalStorage.queue);

  localStorage.setItem(QUEUE_KEY, filmSTRING);
}

async function goToWatched() {
  refs.spinner.classList.remove('visually-hidden');

  const idFilmsArray = JSON.parse(localStorage.getItem(WATCHED_KEY));

  const qweqwe = await Promise.all(idFilmsArray.map(fetchMovieById));

  //   console.log(qweqwe);

  renderFilmsMarkup(qweqwe);
  refs.spinner.classList.add('visually-hidden');
}

async function goToQueue() {
  spinnerPlay();
  const idFilmsArray = JSON.parse(localStorage.getItem(QUEUE_KEY));

  const qweqwe = await Promise.all(idFilmsArray.map(fetchMovieById));

  //   console.log(qweqwe);

  renderFilmsMarkup(qweqwe);
  spinnerStop();
}

// console.dir(refs.libgallerySet);

function renderFilmsMarkup(films) {
  //   console.log(films);

  refs.libgallerySet.innerHTML = '';

  films
    .map(({ poster_path, genre_ids, title, original_title, release_date, first_air_date, id }) => {
      const poster = poster_path
        ? `https://image.tmdb.org/t/p/w400${poster_path}`
        : `https://image.tmdb.org/t/p/w400/yEvumAoCB9Z7o9dAzjxrjcwo2FQ.jpg`;
      return `<li class="gallery__item" data-id=${id || `No ID`}>
                <div class="films__img">
                    <img src=https://image.tmdb.org/t/p/original${poster} alt="${
        title || original_title || 'No title'
      }" loading="lazy" id=${id}>
                </div>
                <div class="films__description" id=${id}>
                  <p class="films__title" id=${id}>${title || original_title || 'No title'}</p>
                  <div class="films__meta" id=${id}>
                    <span class="films__genres" id=${id}>
                    
          'No genres info'
      }</span>
                    <span class="films__sep" id=${id}>|</span>
                    <span class="films__data" id=${id}>${
        new Date(release_date).getFullYear() || new Date(first_air_date).getFullYear() || 'No info'
      }</span>
                  </div>
                </div>
            </li>`;
    })
    .forEach(c => refs.libgallerySet.insertAdjacentHTML('beforeend', c));
}

const API_KEY = 'c3923fa38d2dd62131b577696cc2f23f';
const mainUrl = 'https://api.themoviedb.org/3';

async function fetchMovieById(filmId) {
  const filters = `/movie/${filmId}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(`${mainUrl}${filters}`);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// ${getGenres(genre_ids, 3) ||
