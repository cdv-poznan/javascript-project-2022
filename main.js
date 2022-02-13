async function fetchGoldPrices(startDate, endDate) {
  const res = await fetch(
    `https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}/?format=json`
  );
  return await res.json();
}

async function getGoldPricesChartConfig(startDate, endDate) {
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

  return config;
}

async function renderGoldPrices() {
  let fromDate = '2022-01-01';
  let endDate = '2022-02-13';

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const config = await getGoldPricesChartConfig(fromDate, endDate);

  const chart = new Chart(context, config);

  const fromInput = document.getElementById('from-date');
  const endInput = document.getElementById('end-date');

  function updateChart(config) {
    chart.config.data.labels = config.data.labels;
    chart.config.data.datasets = config.data.datasets;
    chart.update();
  }

  fromInput.addEventListener('change', async event => {
    fromDate = event.target.value;
    const update = await getGoldPricesChartConfig(fromDate, endDate);
    updateChart(update);
  });

  endInput.addEventListener('change', async event => {
    endDate = event.target.value;
    const update = await getGoldPricesChartConfig(fromDate, endDate);
    updateChart(update);
  });
}

async function initTranslations() {
  const req = await fetch('https://libretranslate.de/languages');
  const languages = await req.json();

  const sourceLangSelect = document.getElementById('source-lang');
  const targetLangSelect = document.getElementById('target-lang');
  const textarea = document.getElementById('text-to-translate');
  const button = document.getElementById('translate');

  function createLangOption(language) {
    const option = document.createElement('option');
    option.value = language.code;
    option.innerText = language.name;
    return option;
  }

  for (const language of languages) {
    sourceLangSelect.appendChild(createLangOption(language));
    targetLangSelect.appendChild(createLangOption(language));
  }

  function generateTranslateQuery(source, target, text) {
    return `?q=${encodeURIComponent(text)}&source=${source}&target=${target}`;
  }

  button.addEventListener('click', async () => {
    const sourceLang = sourceLangSelect.value;
    const targetLang = targetLangSelect.value;
    const text = textarea.value;
    const query = generateTranslateQuery(sourceLang, targetLang, text);
    const url = `https://libretranslate.de/translate${query}`;

    const response = await fetch(url, {method: 'POST'});
    const {translatedText} = await response.json();

    document.getElementById('translated').innerText = translatedText;
  });
}

async function displayNews() {
  const res = await fetch('https://inshortsapi.vercel.app/news?category=all');
  const json = await res.json();

  const newList = document.getElementById('news-list');

  function createPost(news) {
    const post = document.createElement('div');
    post.classList.add('post');

    const img = document.createElement('img');
    img.src = news.imageUrl;

    post.appendChild(img);

    const p = document.createElement('p');
    p.innerText = news.content;

    post.appendChild(p);

    const link = document.createElement('a');
    link.href = news.readMoreUrl;
    link.target = '_blank';
    link.innerText = 'Read more…';

    post.appendChild(link);

    newList.appendChild(post);
  }

  for (const news of json.data.slice(0, 5)) {
    createPost(news);
  }

  let tick = 5;

  setInterval(() => {
    const old = document.querySelector('.post');
    old.remove();
    const index = tick % json.data.length;
    createPost(json.data[index]);
    tick++;
  }, 10000);
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('header').style.color = '#666';
  renderGoldPrices();
  initTranslations();
  displayNews();
});
