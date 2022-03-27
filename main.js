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
  const apiKey = "k_28x30ddn"; //    const apiKey= "k_pgd93xda"
  const inputMovieSearch = document.getElementById("searchMovie");
  const searchResultsMovies = document.getElementById("movieList");
  const suggestedResultsList = document.getElementById("suggestedResultsList");
  const urlAPI = `https://imdb-api.com/en/API/SearchMovie/${apiKey}`;
  const urlDetailsAPI = `https://imdb-api.com/en/API/Title/${apiKey}`;
  const advancedSearchUrl = `https://imdb-api.com/API/AdvancedSearch/${apiKey}`;

  function init() {
    inputMovieSearch.addEventListener("keyup", debounce(getMovies, 300));

    searchResultsMovies.addEventListener("click", (event) => {
      //zamienić na funkcję - powtarza sie
      const movieID = event.target.closest("a").id;
      getDetails(movieID);
    });
    suggestedResultsList.addEventListener("click", (event) => {
      //zamienić na funkcję - powtarza sie powyżej
      const movieID = event.target.closest("a").id;
      getDetails(movieID);
    });
  }
  init();

  function debounce(callback, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }

  //search results
  async function getMovies(movie) {
    const movieValue = inputMovieSearch.value;
    const results = await fetch(`${urlAPI}/${movieValue}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((data) => {
        // console.log(data); // return results in console;
        // add to DOM
        createMoviesDOM(data, searchResultsMovies);
      })
      .catch((error) => console.log(error));
  }

  function createMoviesDOM(movies, htmlTarget) {
    for (const movie of movies) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("singleMovieList");
      // movieElement.innerHTML = `<a id="${movie.id}" href="${urlAPI}${movie.id}">${movie.title}</a>`;
      movieElement.innerHTML = `<a id="${movie.id}">${movie.title}</a>`;
      // movieElement.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;
      movieElement.style.backgroundImage = `url(${movie.image})`;
      htmlTarget.appendChild(movieElement);
    }
  }

  // function which get link and create details DOM
  async function getDetails(movieId) {
    const details = await fetch(`${urlDetailsAPI}/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        //add to DOM div after clicked on link
        createMovieDetailsDom(data);
        const genres = transformGenresToApiParam(data.genreList); // " "
        showSuggestions(genres);
      });
    // .catch((error) => new Error("Details not found"));
  }

  // suggestions
  async function showSuggestions(genres) {
    // transformGenresToApiParam(genres);
    const suggestions = await fetch(`${advancedSearchUrl}/?genres=${genres}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((data) => {
        createMoviesDOM(data, suggestedResultsList);
      });
    // .catch((error) => new Error("Details not found"));
  }

  function transformGenresToApiParam(genres) {
    const currentGenres = genres.map((genre) => {
      return genre.value;
    });
    return currentGenres.join().toLowerCase(); // "genre1,genre2,genre3"
  }

  // function which create details DOM
  function createMovieDetailsDom(data) {
    const insideDetailBox = document.getElementById("currentClickedMovieId");
    insideDetailBox.innerHTML = "";

    //image
    if (data.image) {
      const detailBoxImage = document.createElement("div");
      const title = data.title ? data.title : "";
      detailBoxImage.innerHTML = `<img src="${data.image}" alt="${title}">`;
      detailBoxImage.classList.add("currentMovieImage");
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
      detailBox.classList.add("singleMovieDetails");
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
      const detailBoxRating = document.createElement("p");
      detailBoxRating.innerHTML = `${data.imDbRating}`;
      detailBoxRating.classList.add("rating");
      detailBoxRight.appendChild(detailBoxRating);
    }

    // year
    if (data.year) {
      const detailBoxYear = document.createElement("p");
      detailBoxYear.innerHTML = `${data.year}`;
      detailBoxYear.classList.add("year");
      detailBoxRight.appendChild(detailBoxYear);
    }

    // genre
    if (data.genres) {
      const detailBoxGenres = document.createElement("p");
      detailBoxGenres.innerHTML = `${data.genres}`;
      detailBoxGenres.classList.add("genres");
      detailBoxGenres.id = "genres";
      detailBoxRight.appendChild(detailBoxGenres);
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

    //runtimeStr
    if (data.runtimeStr) {
      const detailBoxRuntimeStr = document.createElement("p");
      detailBoxRuntimeStr.innerHTML = `${data.runtimeStr}`;
      detailBoxRuntimeStr.classList.add("runtimeStr");
      detailBoxRight.appendChild(detailBoxRuntimeStr);
    }
  }

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
});
