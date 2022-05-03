async function tibiaNews() {
  const response = await fetch('https://api.tibiadata.com/v3/news/latest');
  const json = await response.json();

  const tibiaNews = document.getElementById('main_news');

  for (const news of (json.news)) {
    // adding element div
    const newsdiv = document.createElement('div');
    newsdiv.classList.add('news-list');

    // adding paragraph
    const date = document.createElement('p');
    date.innerText = "News date: " + news.date;
    newsdiv.appendChild(date);

    // adding paragraph
    const title = document.createElement('p');
    title.innerText = "Title: " + news.news;
    newsdiv.appendChild(title);

    // adding link
    const link = document.createElement('a');
    link.href = news.url;
    link.target = '_blank';
    link.innerText = "Read more on: " + news.news;

    newsdiv.appendChild(link);

    tibiaNews.appendChild(newsdiv);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  tibiaNews();
});