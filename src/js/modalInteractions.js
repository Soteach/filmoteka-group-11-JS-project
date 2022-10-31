import { refs } from './refs';
import axios from 'axios';

const WATCHED_KEY = 'Watched_KEY';
const QUEUE_KEY = 'Queue_KEY';

const API_KEY = 'c3923fa38d2dd62131b577696cc2f23f';
const mainUrl = `https://api.themoviedb.org/3`;

refs.gallery.addEventListener('click', pleaseWork);

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

function cardMarkup(data) {
  const {
    poster_path,
    genres,
    title,
    name,
    release_date,
    first_air_date,
    overview,
    id,
    vote_average,
    vote_count,
    popularity,
    original_title,
  } = data;

  arr = [];
  for (let index = 0; index < genres.length; index++) {
    const name = Object.values(genres[index]);
    arr.push(name[1]);
  }

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
        <p class="cardItem__genreList">${arr}
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

async function pleaseWork(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const response = await fetchMovieById(event.target.id);
  const markup = cardMarkup(response);
  refs.modalRef.innerHTML = markup;
  toggleModal();
  addListeners();
}

function toggleModal() {
  refs.modalRef.classList.toggle('visually-hidden');
  document.body.classList.toggle('stop-scroll');
}

function addListeners() {
  const btnModalWatched = document.querySelector('.js-WatchedButton');
  const btnModalQueue = document.querySelector('.js-QueueButton');

  btnModalWatched.addEventListener('click', putWatchedIdtoLocalStorage);
  btnModalQueue.addEventListener('click', putQueueIdtoLocalStorage);
}

function putWatchedIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;

  try {
    const currentWatchedArr = JSON.parse(localStorage.getItem(WATCHED_KEY));

    if (currentWatchedArr.includes(filmId)) {
      currentWatchedArr.splice(currentWatchedArr.indexOf(filmId), 1);

      const filmSTRING = JSON.stringify(currentWatchedArr);
      localStorage.setItem(WATCHED_KEY, filmSTRING);

      return;
    }

    currentWatchedArr.push(filmId);

    const filmSTRING = JSON.stringify(currentWatchedArr);
    localStorage.setItem(WATCHED_KEY, filmSTRING);
  } catch (error) {
    console.error(error);
  }
}

function putQueueIdtoLocalStorage(event) {
  const filmId = event.target.dataset.id;

  try {
    const currentQueueArr = JSON.parse(localStorage.getItem(QUEUE_KEY));

    if (currentQueueArr.includes(filmId)) {
      currentQueueArr.splice(currentQueueArr.indexOf(filmId), 1);

      const filmSTRING = JSON.stringify(currentQueueArr);
      localStorage.setItem(QUEUE_KEY, filmSTRING);

      return;
    }

    currentQueueArr.push(filmId);

    const filmSTRING = JSON.stringify(currentQueueArr);
    localStorage.setItem(QUEUE_KEY, filmSTRING);
  } catch (error) {
    console.error(error);
  }
}

// function closeModal(){
//   refs.btnModalWatched.removeEventListener('click', putWatchedIdtoLocalStorage);
// refs.btnModalQueue.removeEventListener('click', putQueueIdtoLocalStorage);
//   if(refs.modalRef.classList.contains('visually-hidden')){
//     return
//   }

// }
