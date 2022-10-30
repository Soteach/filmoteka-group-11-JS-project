import { refs } from './refs';

export function renderFilmsMarkup(films) {
  refs.gallerySet.innerHTML = '';

  films
    .map(({ poster_path, genre_ids, title, name, release_date, first_air_date, id }) => {
      const poster = poster_path
        ? `https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/w400${poster_path}`
        : `https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/w400/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg`;
      return `<li class="gallery__item" data-id=${id || `No ID`}>
                <div class="films__img">
                    <img src=${poster} alt="${title || name || 'No title'}" loading="lazy" id=${id}>
                </div>
                <div class="film__description" id=${id}>
                  <p class="film__title" id=${id}>${title || name || 'No title'}</p>
                  <div class="film__info" id=${id}>
                    <span class="films__genres" id=${id}>${
        getGenres(genre_ids, 3) || 'No genres info'
      }</span>
                    <span class="films__sep" id=${id}>|</span>
                    <span class="films__data" id=${id}>${
        new Date(release_date).getFullYear() || new Date(first_air_date).getFullYear() || 'No info'
      }</span>
                  </div>
                </div>
            </li>`;
    })
    .forEach(c => refs.gallerySet.insertAdjacentHTML('beforeend', c));
}

export function getGenres(genre_ids, maxGenresShown) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  const genresArr = [];

  for (
    let genreIndex = 0;
    genreIndex < maxGenresShown && genreIndex < genre_ids.length;
    genreIndex++
  ) {
    for (const value of genres) {
      if (genre_ids[genreIndex] === value.id) {
        genresArr.push(value.name);
      }
    }
  }
  if (genre_ids.length > maxGenresShown) {
    genresArr.splice(maxGenresShown - 1, 1, 'Other');
  }
  return genresArr.join(', ');
}
