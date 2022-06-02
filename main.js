const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

// api url
const api_url = "https://www.chartlyrics.com/api.aspx"; //nie działa
//const api_url = "https://api.lyrics.ovh"; //nie działa

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch("${api_url}");

  // Storing data in form of JSON
  const data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  showData(data);
}
// Calling that async function
//getapi(url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}

function showData(data) {
  result.innerHTML = `<ul>${data.data
    .map((song) => `<li></li>`)
    .join("")}</ul>`;
}
//  event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

//alert
const searchTerm = search.value.trim();

if (!searchTerm) {
  alert("Type in a search term");
} else {
  searchSongs(searchTerm);
}
