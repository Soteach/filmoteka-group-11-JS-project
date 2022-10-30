import { refs } from './refs';
import axios from 'axios';
import notiflix from 'notiflix';
import Notiflix from 'notiflix';

const WATCHED_KEY = 'Watched_KEY';
const QUEUE_KEY = 'Queue_KEY';

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
    akaLocalStorage.watched.splice(akaLocalStorage.watched.indexOf(filmId), 1);

    const filmSTRING = JSON.stringify(akaLocalStorage.watched);
    localStorage.setItem(WATCHED_KEY, filmSTRING);

    return;
  }

  akaLocalStorage.watched.push(filmId);

  const filmSTRING = JSON.stringify(akaLocalStorage.watched);

  localStorage.setItem(WATCHED_KEY, filmSTRING);
}

function putQueueIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;

  if (akaLocalStorage.queue.includes(filmId)) {
    akaLocalStorage.queue.splice(akaLocalStorage.queue.indexOf(filmId), 1);

    const filmSTRING = JSON.stringify(akaLocalStorage.queue);
    localStorage.setItem(QUEUE_KEY, filmSTRING);

    return;
  }

  akaLocalStorage.queue.push(filmId);

  const filmSTRING = JSON.stringify(akaLocalStorage.queue);

  localStorage.setItem(QUEUE_KEY, filmSTRING);
}

async function goToWatched() {
  refs.spinner.classList.remove('visually-hidden');

  try {
    const idFilmsArray = JSON.parse(localStorage.getItem(WATCHED_KEY));
    const qweqwe = await Promise.all(idFilmsArray.map(fetchMovieById));

    renderFilmsMarkup(qweqwe);

    refs.spinner.classList.add('visually-hidden');
  } catch (error) {
    Notiflix.Notify.failure('Your Watched gallery is empty!');
    refs.spinner.classList.add('visually-hidden');

    return;
  }
}

async function goToQueue() {
  refs.spinner.classList.remove('visually-hidden');

  try {
    const idFilmsArray = JSON.parse(localStorage.getItem(QUEUE_KEY));
    const qweqwe = await Promise.all(idFilmsArray.map(fetchMovieById));

    renderFilmsMarkup(qweqwe);
    refs.spinner.classList.add('visually-hidden');
  } catch (error) {
    Notiflix.Notify.failure('Your Queue gallery is empty!');
    refs.spinner.classList.add('visually-hidden');

    return;
  }
}

function renderFilmsMarkup(films) {
  refs.libgallerySet.innerHTML = '';

  films
    .map(({ poster_path, genres, title, original_title, release_date, first_air_date, id }) => {
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
                    <span class="films__genres" id=${id}>${
        getGenres(genres) || 'No genres info'
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
