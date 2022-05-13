"use strict";
import loadPaging from "./pagination.js";
import loadPagingSuggestions from "./pagination-suggestions.js";
import scrollToDetailBox from "./scrolling.js";

window.addEventListener("DOMContentLoaded", () => {
  const apiKey = "k_pgd93xda"; //second apikey
  // const apiKey = "k_28x30ddn";
  // const apiKey = "k_n2nfzz4l";
  const insideDetailBox = document.getElementById("clicked-movie-id");
  const inputSearchMovie = document.getElementById("search-movie");
  const searchResultsMoviesContainer = document.getElementById("movies");
  const searchResultsMovies = document.getElementById("results-movies");
  const genresList = document.getElementById("genres-list");
  const suggestedResultsListContainer =
    document.getElementById("suggested-movies");
  const suggestedResultsList = document.getElementById("suggested-results");
  const urlAPI = `https://imdb-api.com/en/API/SearchMovie/${apiKey}`;
  const urlDetailsAPI = `https://imdb-api.com/en/API/Title/${apiKey}`;
  const advancedSearchUrl = `https://imdb-api.com/API/AdvancedSearch/${apiKey}`;

  window.onload = function () {
    document.getElementById("pagination-results").style.display = "none";
    document.getElementById("pagination-suggestions").style.display = "none";
  };

  function init() {
    inputSearchMovie.addEventListener("keyup", debounce(getMovies, 300));
    // event listener on click movie id from titles list
    searchResultsMovies.addEventListener("click", async (event) => {
      const movieID = event.target.closest("a").id;
      await getDetails(movieID);
      scrollToDetailBox();
    });
    // event listener on click movie id for genres movies
    suggestedResultsList.addEventListener("click", async (event) => {
      const movieID = event.target.closest("a").id;
      await getDetails(movieID);
      scrollToDetailBox();
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

  //show loader
  function showLoader(target) {
    const loader = target.getElementsByClassName("loader-container");
    loader[0].classList.add("visible");
  }
  // hide loader
  function hideLoader(target) {
    const loader = target.getElementsByClassName("loader-container");
    loader[0].classList.remove("visible");
  }

  // search results
  async function getMovies(movie) {
    showLoader(searchResultsMoviesContainer);
    const movieValue = inputSearchMovie.value;
    const results = await fetch(`${urlAPI}/${movieValue}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((results) => {
        hideLoader(searchResultsMoviesContainer);
        document.getElementById("pagination-results").style.display = "block";
        // add pagintion
        loadPaging(results.length, (pagingOptions) => {
          clearHtml(searchResultsMovies);
          const newArray = pageArraySplit(results, pagingOptions);
          createMoviesDOM(newArray, searchResultsMovies);
        });
      })
      .catch((error) => console.log(error));
  }

  // create movie list in DOM
  function createMoviesDOM(movies, htmlTarget) {
    for (const movie of movies) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("selected-movie");
      movieElement.setAttribute("id", "click-movie");
      movieElement.innerHTML = `<a id="${movie.id}">${movie.title}</a>`;
      movieElement.style.backgroundImage = `url(${movie.image})`;
      movieElement.style.backgroundSize = "cover";
      htmlTarget.appendChild(movieElement);
      // movie title
      const movieElementTitle = document.createElement("p");
      movieElementTitle.classList.add("results-movies-title");
      movieElementTitle.setAttribute("id", "click-movie");
      movieElementTitle.innerHTML = `<a id="${movie.id}">${movie.title}</a>`;
      movieElement.appendChild(movieElementTitle);
    }
  }

  // get id from selected movie link and create div with details
  async function getDetails(movieId) {
    const details = await fetch(`${urlDetailsAPI}/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        clearHtml(insideDetailBox);
        createMovieDetailsDom(data);
        if (data.genreList) {
          const genres = transformGenresToApiParam(data.genreList); // " "
          showSuggestions(genres);
        }
      });
    // .catch((error) => new Error("Details not found"));
  }

  // create selected from API details
  function createMovieDetailsDom(data) {
    insideDetailBox.classList.add("detail-conatiner");
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
    //stars
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

  // list with movie's stars
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

  //suggested movies
  async function showSuggestions(genres) {
    showLoader(suggestedResultsListContainer);
    const suggestions = await fetch(`${advancedSearchUrl}/?genres=${genres}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .then((results) => {
        hideLoader(suggestedResultsListContainer);
        document.getElementById("pagination-suggestions").style.display =
          "block";
        loadPagingSuggestions(results.length, (pagingOptions) => {
          clearHtml(suggestedResultsList);
          const newArray = pageArraySplit(results, pagingOptions);
          createMoviesDOM(newArray, suggestedResultsList);
        });
        // .catch((error) => new Error("Details not found"));
      });
  }

  // transform genres to api param
  function transformGenresToApiParam(genres) {
    const forSuggestionsGenres = genres.map((genre) => {
      return genre.value;
    });
    return forSuggestionsGenres.join().toLowerCase();
  }

  // create div with genres in DOM
  function createGenresDom(genres) {
    const genresElement = document.getElementById("genres-list");
    genresElement.classList.add("genres-suggestions");
    genresElement.innerHTML = "";
    for (const genre of genres) {
      const genreElement = document.createElement("li");
      genreElement.classList.add("single-genre");
      genreElement.innerHTML = `${genre.value}`;
      genresElement.appendChild(genreElement);
    }
  }
  // pagination for search results
  function pageArraySplit(array, pagingOptions) {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;

    return array.slice(startingIndex, endingIndex);
  }
  //
});
