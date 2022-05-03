// https://api.tibiadata.com/v3/fansites

async function funSide() {
    const response = await fetch('https://api.tibiadata.com/v3/fansites');
    const json = await response.json();
    const part1 = json.fansites;

    const main = document.getElementById('main');

    for (const data of part1.supported) {
        // adding element div
        const element = document.createElement("div");
        element.classList.add('site-list');

        // adding logo
        const logo = document.createElement('img');
        logo.src = data.logo_url;


        // adding link
        const link = document.createElement('a');
        link.href = data.homepage;
        link.target = "_blank";
        link.innerText = "Homepage: " + data.name;

        // adding author
        const author = document.createElement('p');
        author.innerText = "Author: " + data.contact;

        // adding paragraph for logo
        const post = document.createElement('p');
        post.id = 'para';

        post.appendChild(link);
        element.appendChild(logo);
        element.appendChild(post);
        element.appendChild(author);

        main.appendChild(element);
    }

    for (const data2 of part1.promoted) {
        // adding element div
        const element = document.createElement("div");
        element.classList.add('site-list');

        // adding logo
        const logo = document.createElement('img');
        logo.src = data2.logo_url;

        // adding link
        const link = document.createElement('a');
        link.href = data2.homepage;
        link.target = "_blank";
        link.innerText = "Homepage: " + data2.name;

        // adding author
        const author = document.createElement('p');
        author.innerText = "Author: " + data2.contact;

        // adding paragraph for logo
        const post = document.createElement('p');
        post.id = 'para';

        post.appendChild(link);
        element.appendChild(logo);
        element.appendChild(post);
        element.appendChild(author);


        main.appendChild(element);
    }

}
document.addEventListener("DOMContentLoaded", async () => {
    funSide();
});