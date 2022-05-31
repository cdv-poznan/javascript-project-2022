async function initGeoWeather() {
  const geolocalizationDiv = document.getElementById('geolocalization');
  const weatherDiv = document.getElementById('weather');

  /* Code 	Description
0 	Clear sky
1, 2, 3 	Mainly clear, partly cloudy, and overcast
45, 48 	Fog and depositing rime fog
51, 53, 55 	Drizzle: Light, moderate, and dense intensity
56, 57 	Freezing Drizzle: Light and dense intensity
61, 63, 65 	Rain: Slight, moderate and heavy intensity
66, 67 	Freezing Rain: Light and heavy intensity
71, 73, 75 	Snow fall: Slight, moderate, and heavy intensity
77 	Snow grains
80, 81, 82 	Rain showers: Slight, moderate, and violent
85, 86 	Snow showers slight and heavy
95 * 	Thunderstorm: Slight or moderate
96, 99 * 	Thunderstorm with slight and heavy hail */
  const description = new Map();
  description.set(0, 'Clear sky');
  description.set(1, 'Mainly clear');
  description.set(2, 'Partly cloudy');
  description.set(3, 'Overcast');
  description.set(45, 'Fog');
  description.set(48, 'Snowy');

  const icon = new Map();
  icon.set(0, 'images/sunny.svg');
  icon.set(1, 'images/sunny-cloudy.svg');
  icon.set(2, 'images/cloudy-sunny.svg');
  icon.set(3, 'images/cloudy.svg');
  icon.set(45, 'images/fog.svg');
  icon.set(48, 'images/snowy.svg');
  icon.set(1000, 'images/default.svg');

  function getWeatherDescription(code) {
    return description.get(code);
  }

  function getWeatherIconPath(code) {
    if (code > 3){
      if (code != 45){
        if (code != 48){
          return 'images/default.svg';
        }
      }
    } 
    iconPath = icon.get(code);
    return iconPath;
  }

  function showError() {
    document.getElementById('weather-loader').remove();
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.innerText = 'Error while loading the weather :(';
    weatherDiv.appendChild(errorDiv);
  }

  async function getWeather(lat, lon) {
    // try/catch - obsługa błędów
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timeformat=unixtime`;
      const res = await fetch(url);

      if (!res.ok) {
        showError();
        return;
      }

      const {current_weather} = await res.json();
      const {time, temperature, windspeed, winddirection, weathercode} =
        current_weather;

      document.getElementById('weather-loader').remove();

      // time parameters
      const timeDiv = document.createElement('div');
      timeDiv.classList.add('time');
      timeDiv.innerText = `Unix Time: ${time} s`;
      geolocalizationDiv.appendChild(timeDiv);

      // temperature parameters
      const temperatureDiv = document.createElement('div');
      temperatureDiv.classList.add('temperature');
      temperatureDiv.innerText = `Temperature: ${temperature} °C`;
      weatherDiv.appendChild(temperatureDiv);

      // wind parameters
      const windspeedDiv = document.createElement('div');
      windspeedDiv.classList.add('wind-speed');
      windspeedDiv.innerText = `Wind Speed: ${windspeed} km/h`;
      weatherDiv.appendChild(windspeedDiv);

      const winddirectionDiv = document.createElement('div');
      winddirectionDiv.classList.add('wind-direction');
      winddirectionDiv.innerText = `Wind Direction: ${winddirection} °`;
      weatherDiv.appendChild(winddirectionDiv);

      const weathercodeDiv = document.createElement('div');
      weathercodeDiv.classList.add('weather-code');
      weathercodeDiv.innerText = `Weather Code: ${weathercode} WMO`;
      weatherDiv.appendChild(weathercodeDiv);

      const weatherDescriptionDiv = document.createElement('div');
      weatherDescriptionDiv.classList.add('weather-description');
      weatherDescriptionDiv.innerText = 'Weather Description: ' + getWeatherDescription(weathercode);
      weatherDiv.appendChild(weatherDescriptionDiv);

      const iconDiv = document.createElement('div');
      const iconImg = document.createElement('img');
      iconDiv.classList.add('weather-icon');
      iconImg.classList.add('weather-image');
      iconImg.src = getWeatherIconPath(weathercode);
      iconDiv.appendChild(iconImg);
      weatherDiv.appendChild(iconDiv);
    } catch (error) {
      showError();
    }
  }

  navigator.geolocation.getCurrentPosition(async position => {
    const {latitude, longitude} = position.coords;
    const div = document.createElement('div');
    div.innerText = `Latitude: ${latitude} \n Longitude: ${longitude}`;
    geolocalizationDiv.appendChild(div);

    getWeather(latitude, longitude);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header').style.color = '#666';
  initGeoWeather();
});