const apiKey = "0bd56a60b494c2b8ef7759890948e62e";
const apiUrl = "http://api.weatherstack.com/";

const form = document.querySelector("form");
const weatherDetails = document.querySelector(".details");

//event listener

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = document.querySelector("input").value;
  getWeather(location);
});

async function getWeather(location) {
  const response = await fetch(
    `${apiUrl}current?access_key=${apiKey}&query=${location}`
  );

  const data = await response.json();
  console.log(data);
}
