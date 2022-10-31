const API_KEY = 'c3923fa38d2dd62131b577696cc2f23f';
const BASE_URL = 'https://api.themoviedb.org/3/';

export class TrendingMovies {
  constructor() {
    this.page = 1;
    this.query = '';
    this.results = Number;
    this.totalPages = Number;
  }

  fetchTrendingMovies() {
    return fetch(
      `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.page}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        // this.results = data.total_results;
        // return data.results;
        return data;
      });
  }
  fetchMovie() {
    return fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.query}&page=${this.page}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        this.results = data.total_results;
        return data.results;
      });
  }

  fetchGenres() {
    return fetch(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then(response => response.json());
  }
}
