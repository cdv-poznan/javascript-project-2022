async function fetchGoldPrices(startDate, endDate) {
  const res = await fetch(
    `https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}/?format=json`
  );
  return await res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header').style.color = '#666';

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const goldPrices = await fetchGoldPrices('2022-01-01', '2022-02-13');

  const dates = goldPrices.map(({data}) => data);
  const prices = goldPrices.map(({cena}) => cena);

  const config = {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Cena 1g złowa o próbie 1000',
          data: prices,
          borderWidth: 4,
          backgroundColor: ['rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 206, 86, 1)'],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };

  const chart = new Chart(context, config);
});
