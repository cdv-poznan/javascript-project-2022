"use strict";
// imdb API
// przykładowy link
// "https://imdb-api.com/en/API/Title/k_1234567/..."

// - znaleźć film - wpisanie w input tytułu filmu, odczytywanie value - search + debounce (poczekać np. 300ms)
// - przycisk szukaj wyzwala akcję szukania w api -> async f() fetch
// - szukanie w movie
// - wyświetlenie nazwy img i linku do filmu / ów

// - za pomocą ID filmu znajdujacego się w repsonse dodanie dodatkowych informacji oraz linku do tych informacji
// - wyświetlenie informacjami filmu - lub wyświetlenie ich poniżej bez zmiany url

window.addEventListener("DOMContentLoaded", () => {
  // const apiKey = "k_pgd93xda"; //second apikey
  const apiKey = "k_28x30ddn";
  const insideDetailBox = document.getElementById("clicked-movie-id");
  const inputSearchMovie = document.getElementById("search-movie");
  const searchResultsMovies = document.getElementById("results-movies");
  const genresList = document.getElementById("genres-list");
  const suggestedResultsList = document.getElementById("suggested-results");
  const urlAPI = `https://imdb-api.com/en/API/SearchMovie/${apiKey}`;
  const urlDetailsAPI = `https://imdb-api.com/en/API/Title/${apiKey}`;
  const advancedSearchUrl = `https://imdb-api.com/API/AdvancedSearch/${apiKey}`;

  function init() {
    inputSearchMovie.addEventListener("keyup", debounce(getMovies, 300));
    // event listener on click movie id from titles list
    searchResultsMovies.addEventListener("click", (event) => {
      const movieID = event.target.closest("a").id;
      getDetails(movieID);
    });
    // event listener on click movie id for suggestion movies
    suggestedResultsList.addEventListener("click", (event) => {
      const movieID = event.target.closest("a").id;
      getDetails(movieID);
    });
  }
  init();

  // wait for execute
  function debounce(callback, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }

  // clear html target
  function clearHtml(target) {
    target.innerHTML = "";
  }

  // search results
  async function getMovies(movie) {
    const movieValue = inputSearchMovie.value;
    const results = await fetch(`${urlAPI}/${movieValue}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((results) => {
        // console.log(data); // return results in console;
        //add pagintion
        // add to DOM
        clearHtml(searchResultsMovies);
        createMoviesDOM(results, searchResultsMovies);
      })
      .catch((error) => console.log(error));
  }

  // create movie list in DOM
  function createMoviesDOM(movies, htmlTarget) {
    for (const movie of movies) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("selected-movie");
      // movieElement.innerHTML = `<a id="${movie.id}" href="${urlAPI}${movie.id}">${movie.title}</a>`;
      movieElement.innerHTML = `<a id="${movie.id}">${movie.title}</a>`;
      // movieElement.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;
      movieElement.style.backgroundImage = `url(${movie.image})`;
      // movieElement.classList.add("single-movie");
      htmlTarget.appendChild(movieElement);
    }
  }

  // get id from selected movie link and create div with details in DOM
  async function getDetails(movieId) {
    const details = await fetch(`${urlDetailsAPI}/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // add to DOM div after clicked on link
        clearHtml(insideDetailBox);
        createMovieDetailsDom(data);
        const genres = transformGenresToApiParam(data.genreList); // " "
        showSuggestions(genres);
      });
    // .catch((error) => new Error("Details not found"));
  }

  // create selected from API details of movie in DOM element
  function createMovieDetailsDom(data) {
    // const insideDetailBox = document.getElementById("clicked-movie-id");
    insideDetailBox.classList.add("detail-conatiner");
    // insideDetailBox.innerHTML = "";
    //image
    if (data.image) {
      const detailBoxImage = document.createElement("div");
      const title = data.title ? data.title : "";
      detailBoxImage.innerHTML = `<img src="${data.image}" alt="${title}">`;
      detailBoxImage.classList.add("movie-image");
      detailBoxImage.classList.add("box-left");
      insideDetailBox.appendChild(detailBoxImage);
    }
    //rightBox
    const detailBoxRight = document.createElement("div");
    detailBoxRight.classList.add("box-right");
    insideDetailBox.append(detailBoxRight);
    //title
    if (data.title) {
      const detailBox = document.createElement("div");
      detailBox.innerHTML = `${data.title}`;
      detailBox.classList.add("title");
      detailBoxRight.appendChild(detailBox);
    }
    //plot
    if (data.plot) {
      const detailBoxPlot = document.createElement("p");
      detailBoxPlot.innerHTML = `${data.plot}`;
      detailBoxPlot.classList.add("plot");
      detailBoxRight.appendChild(detailBoxPlot);
    }
    //rating
    if (data.imDbRating) {
      const ratingIMDb = document.createElement("p");
      ratingIMDb.innerHTML = `IMDb Rating`;
      ratingIMDb.classList.add("rating-title");
      detailBoxRight.appendChild(ratingIMDb);
      const detailBoxRating = document.createElement("p");
      detailBoxRating.innerHTML = `${data.imDbRating} / 10`;
      detailBoxRating.classList.add("rating");
      detailBoxRight.appendChild(detailBoxRating);
    }
    // year
    if (data.year) {
      const detailBoxYear = document.createElement("p");
      detailBoxYear.innerHTML = `Year: ${data.year}`;
      detailBoxYear.classList.add("year");
      detailBoxRight.appendChild(detailBoxYear);
    }
    // genres
    if (data.genres) {
      const detailBoxGenres = document.createElement("p");
      detailBoxGenres.innerHTML = `${data.genres}`;
      detailBoxGenres.classList.add("genres");
      detailBoxGenres.id = "genres";
      detailBoxRight.appendChild(detailBoxGenres);
    }
    // list genres
    if (data.genreList) {
      createGenresDom(data.genreList, genresList);
    }
    // languages
    if (data.languages) {
      const detailBoxLanguages = document.createElement("p");
      detailBoxLanguages.innerHTML = `${data.languages}`;
      detailBoxLanguages.classList.add("movie-languages");
      detailBoxRight.appendChild(detailBoxLanguages);
    }
    //stars - create ul
    if (data.starList) {
      createStars(data.starList, detailBoxRight);
    }
    //awards
    if (data.awards) {
      const detailBoxAwards = document.createElement("p");
      detailBoxAwards.innerHTML = `${data.awards}`;
      detailBoxAwards.classList.add("movie-awards");
      detailBoxRight.appendChild(detailBoxAwards);
    }
    //runtimeStr
    if (data.runtimeStr) {
      const detailBoxRuntimeStr = document.createElement("p");
      detailBoxRuntimeStr.innerHTML = `${data.runtimeStr}`;
      detailBoxRuntimeStr.classList.add("runtime-str");
      detailBoxRight.appendChild(detailBoxRuntimeStr);
    }
    //trailer
    if (data.trailer) {
      const detailBoxTrailer = document.createElement("a");
      detailBoxTrailer.innerHTML = `${data.trailer}`;
      detailBoxTrailer.classList.add("trailer");
      detailBoxRight.appendChild(detailBoxTrailer);
    }
  }

  // list with stars from movie - create list in DOM
  function createStars(stars, box) {
    const detailBoxStars = document.createElement("ul");
    detailBoxStars.classList.add("stars");
    box.appendChild(detailBoxStars);

    for (const star of stars) {
      const starElement = document.createElement("li");
      starElement.innerHTML = star.name;
      detailBoxStars.appendChild(starElement);
    }
  }

  //add to DOM div after clicked on link form suggested movies
  // suggestions
  async function showSuggestions(genres) {
    // transformGenresToApiParam(genres);
    const suggestions = await fetch(`${advancedSearchUrl}/?genres=${genres}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((data) => {
        // create element in DOM with genres which was selected to suggestions
        createMoviesDOM(data, suggestedResultsList);
      });
    // .catch((error) => new Error("Details not found"));
  }

  // transform genres to api param
  function transformGenresToApiParam(genres) {
    const forSuggestionsGenres = genres.map((genre) => {
      return genre.value;
    });
    return forSuggestionsGenres.join().toLowerCase(); // "genre1,genre2,genre3"
  }

  // create div with genres in DOM
  function createGenresDom(genres) {
    const genresElement = document.getElementById("genres-list");
    genresElement.classList.add("genres-suggestions");
    genresElement.innerHTML = "";
    // genresElement.classList.add("genres");
    // genresElement.innerHTML = `<h2>Suggestes movies from Genres:</h2>`;
    for (const genre of genres) {
      const genreElement = document.createElement("li");
      genreElement.classList.add("single-genre");
      genreElement.innerHTML = `${genre.value}`;
      genresElement.appendChild(genreElement);
    }
    // genresList.appendChild(genresElement);
  }

  // maybe add pagination for search results
});
