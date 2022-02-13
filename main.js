document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header').style.color = '#666';

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const config = {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'A',
          data: [12, 10, 3, 5, 2, 3],
          borderWidth: 4,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const chart = new Chart(context, config);
});
