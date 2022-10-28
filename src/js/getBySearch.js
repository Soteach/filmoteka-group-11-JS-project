const refs = {
  searchForm: document.querySelector('.header-search__form'),
  searchInput: document.querySelector('.header-search-input'),
};
console.log(searchForm);
let currentPage = 1;

let markup = '';


async function fetchMovies(inputQuery, currentPage) {
  const mainUrl = `https://api.themoviedb.org/3/search/movie`;
  const filters = `?api_key=${c3923fa38d2dd62131b577696cc2f23f}&query=${inputQuery}&page=${currentPage}`;
  const response = await fetch(`${mainUrl}${filters}`);
  return response.json();
}

let inputQuery = '';
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  inputQuery = refs.searchInput.value;
}

 async function renderMoviesList(pageNumber) {
  currentPage = pageNumber;

  await fetchMovies(inputQuery, currentPage).then(res => {
    const moviesResult = res.results;
    if (moviesResult.length >= 1) {
      markup = moviesResult.map(
        ({
          id,
          title,
          original_title,
          poster_path,
          genre_ids,
          release_date,
          vote_average,
        }) => {
          const genresList = JSON.parse(localStorage.getItem('genres'));
          const genres = genre_ids.map(item => {
            return getGenreById(item, genresList);
          });
          let genresMarkup = '';
          if (genres.length === 0) {
            genresMarkup = 'No genres';
          } else if (genres.length < 3) {
            genresMarkup = genres.join(',&nbsp;');
          } else {
            genresMarkup = `${genres[0]}, ${genres[1]}, Others`;
          }
          let poster = '';
          poster_path === null
            ? (poster = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg')
            : (poster = poster_path);
          let relDate = '';
          release_date === '' || release_date === undefined
            ? (relDate = 'No date')
            : (relDate = release_date.slice(0, 4));

          return `<li>
            <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${original_title}" class="img"  id="${id}"/>
            <div>
              <h2>${title}</h2>
              <div>
                <p>${genresMarkup} | ${relDate}</p>
              </div>
            </div>
        </li>`;
        }
      );
      return markup;
    }
  });
}

