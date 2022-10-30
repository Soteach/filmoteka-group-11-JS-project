import { refs } from "./refs";
import axios from "axios";
import * as basicLightbox from 'basiclightbox'

const API_KEY = 'c3923fa38d2dd62131b577696cc2f23f'
const mainUrl = `https://api.themoviedb.org/3`;


//api.themoviedb.org/3/movie/436270?api_key=249f222afb1002186f4d88b2b5418b55?

async function fetchMovieById(filmId) {
    const filters = `/movie/${filmId}?api_key=${API_KEY}`;
    try {
        const response = await axios.get(`${mainUrl}${filters}`);
        console.log(response.data);
    return response.data
    } catch (error) {
        console.log(error);
    }
    
  }

  

  function cardMarkup(data){
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
      } = data

     
      arr = []
      for (let index = 0; index < genres.length; index++) {
        const name = Object.values(genres[index]);
        arr.push(name[1])
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
            <label class="storage__label ">
              <input type="checkbox" value="Watched" class="storage__input visuallyhidden" />
              <span class="storage__btn js-WatchedButton" >Watched</span>
            </label>
          </li>
          <li class="storage__item">
            <label class="storage__label ">
              <input type="checkbox" value="Queue" class="storage__input  visuallyhidden" />
              <span class="storage__btn js-QueueButton" >Queue</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal-close-btn">Close</div>
  </div>`;
  }

  async function pleaseWork(event){
    const response = await fetchMovieById(55555)
    const markup = cardMarkup(response)
    

    event.preventDefault()
    if (event.target.nodeName !== "IMG") {
      return
    }
  const clickedImg = event.target
  
  const instance = basicLightbox.create(`
    <img src="${clickedImg.src}">`, {
    onShow: (instance) => {
      // Close when hitting escape.
      galleryContainer.onkeydown = function (event) {
        event = event || window.event;
        let isEscape = false;
        if ("key" in event) {
          isEscape = (event.key === "Escape" || event.key === "Esc");
        } else {
          isEscape = (event.keyCode === 27);
        }
        if (isEscape) {
          instance.close();
        }
      };
    }
  }
)
  instance.innerHtml = markup
  instance.show()

} 
    
  

