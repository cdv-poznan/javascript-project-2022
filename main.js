async function initGeoWeather() {
  const geoDiv = document.getElementById('geo');
  const weatherDiv = document.getElementById('weather');

  /* Code	Description
    0	Clear sky
    1, 2, 3	Mainly clear, partly cloudy, and overcast
    45, 48	Fog and depositing rime fog
    51, 53, 55	Drizzle: Light, moderate, and dense intensity
    56, 57	Freezing Drizzle: Light and dense intensity
    61, 63, 65	Rain: Slight, moderate and heavy intensity
    66, 67	Freezing Rain: Light and heavy intensity
    71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    77	Snow grains
    80, 81, 82	Rain showers: Slight, moderate, and violent
    85, 86	Snow showers slight and heavy
    95 *	Thunderstorm: Slight or moderate
    96, 99 *	Thunderstorm with slight and heavy hail */
  const m = new Map();
  m.set(0, 'Clear sky');
  m.set(1, 'Mainly clear');
  m.set(2, 'Partly cloudy');
  m.set(3, 'Overcast');
  m.set(45, 'Fog');
  m.set(48, 'Depositing rime fog');

  function getWeatherDescription(code) {
    return m.get(code);
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
      const {temperature, windspeed, winddirection, weathercode} =
        current_weather;

      document.getElementById('weather-loader').remove();

      const tempDiv = document.createElement('div');
      tempDiv.classList.add('temp');
      tempDiv.innerText = `${temperature} °C`;
      weatherDiv.appendChild(tempDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('weather-description');
      descriptionDiv.innerText = getWeatherDescription(weathercode);
      weatherDiv.appendChild(descriptionDiv);
    } catch (error) {
      showError();
    }
  }

  navigator.geolocation.getCurrentPosition(async position => {
    const {latitude, longitude} = position.coords;

    const div = document.createElement('div');
    div.innerText = `Latitude: ${latitude} Longitude: ${longitude}`;
    geoDiv.appendChild(div);

    getWeather(latitude, longitude);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header').style.color = '#666';
  initGeoWeather();
});