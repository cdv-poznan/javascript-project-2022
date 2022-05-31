const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://dog.ceo/api/breeds/image/random"; //"https://api.lyrics.ovh"; //URL for API
//documentation: https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search

// Search songs by artist or song name

//function searchSongs(term) {
// fetch(`${apiURL}/suggest/${term}`)
//.then((res) => res.json())
//.then((data) => console.log(data));
//}

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}`);
  const data = await res.json();

  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  result.innerHTML = `
      <ul class="songs">
        ${data.data
          .map(
            (song) => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
          )
          .join("")}
      </ul>
    `;
  more.innerHTML = "";
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
              <h2><strong>${artist}</strong> - ${songTitle}</h2>
              <span>${lyrics}</span>
          `;
  }
  more.innerHTML = "";
}

//Add Event listener on submit

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  //console.log(searchTerm);

  if (!searchTerm) {
    alert("Type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
