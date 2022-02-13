async function fetchGoldPrices(startDate, endDate) {
  const res = await fetch(
    `https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}/?format=json`
  );
  return await res.json();
}

async function renderGoldPricesChart(startDate, endDate) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const goldPrices = await fetchGoldPrices(startDate, endDate);

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
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header').style.color = '#666';

  const fromInput = document.getElementById('from-date');
  const endInput = document.getElementById('end-date');
  let fromDate = '2022-01-01';
  let endDate = '2022-02-13';

  fromInput.addEventListener('change', event => {
    fromDate = event.target.value;
    renderGoldPricesChart(fromDate, endDate);
  });

  endInput.addEventListener('change', event => {
    endDate = event.target.value;
    renderGoldPricesChart(fromDate, endDate);
  });

  renderGoldPricesChart(fromDate, endDate);
});
