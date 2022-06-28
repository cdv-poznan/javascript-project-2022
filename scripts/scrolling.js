//on click id selected-movie scroll to div with id = click-movie
export default function scrollToDetailBox() {
  const clickedMovie = document.getElementById("clicked-movie-id");
  clickedMovie.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
