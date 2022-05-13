/* Aplikacja pobiera dane o połozeniu uzytkownika, a następnie pobiera z API airly dane o jakości powietrza z najblizej połozonego czujnika.
Kolor tła pod komunikatem odpowiada poziomowi zanieczyszczenia w momencie pomiaru. Aplikacja informuje czy stan powietrza pozwala na bezpieczne przebywanie na zewnątrz.
Do poprawnego działania aplikacji wymagane jest zgoda uzytkownika na udostępnianie lokalizacji w przeglądarce lub w sytemie operacyjnym */

document.addEventListener('DOMContentLoaded', () => {});
// Loader włączony/wyłączony po załadowaniu zawartości

/* window.onload = function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.message-box').style.visibility = 'visible';
}; */
document.onreadystatechange = function () {
  if (document.readyState !== 'complete') {
    document.querySelector('message-box').style.visibility = 'hidden';
    document.querySelector('.loader').style.visibility = 'visible';
  } else {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.message-box').style.visibility = 'visible';
  }
};

// Sprawadzanie połozenia uzytkownika

const userPosition = document.getElementById('user-position');

// pobranie danych z API airly dla najbliszego czujnika
const airQuality = {
  fetchAirQuality: function (position) {
    fetch('https://airapi.airly.eu/v2/measurements/nearest?' + position, {
      headers: { apikey: 'B4NwRiiIR9Pvgu4QZnBPRgJlr6dBWefM', Accept: 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          alert('Nie odnaleziono czujnika');
          throw new Error('Nie odnaleziono czujnika');
        } else return response.json();
      })
      .then((data) => this.displayAirQuality(data));

    fetch('https://airapi.airly.eu/v2/installations/nearest?' + position, {
      headers: { apikey: 'B4NwRiiIR9Pvgu4QZnBPRgJlr6dBWefM', Accept: 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Nie odnaleziono czujnika');
        } else return response.json();
      })
      .then((data) => this.displayLocation(data));
  },

  // Uzupełnienie pola Lokalizacja o dane adresu czujnika pobrane z API
  displayLocation: function (data) {
    const { city, street } = data[0].address;
    document.querySelector('.address').innerText = 'Lokalizacja: ' + city + ', ' + street;
  },

  // Podmiana opisów w boxie na dane pobrane z API
  displayAirQuality: function (data) {
    const { value, level, description, advice, color } = data.current.indexes.at(0);
    document.querySelector('.index').innerText = 'Indeks CAQI: ' + value;
    document.querySelector('.level').innerText = 'Poziom: ' + level;
    document.querySelector('.description').innerText = description;
    document.querySelector('.advice').innerText = advice;
    document.querySelector('.message-box').style.background = color;
  },
};
// Określanie lokalizacji uzytkownika
function showPosition(position) {
  userPosition.innerHTML = 'Szerokość: ' + position.coords.latitude + ' <br>Długość: ' + position.coords.longitude;
  airQuality.fetchAirQuality(`lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, function errMessage(error) {
      console.error('Błąd lokalizacji.', error);
    });
  } else {
    userPosition.innerHTML = 'Geolokalizacja niedostępna.';
  }
}

getLocation();

// Dokumentacja API dostępna na https://developer.airly.org/pl/docs#introduction
