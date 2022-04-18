async function bookSearchByTitle() {

    const TextToSearch = document.getElementById('Text-to-search') 
    
    function getBookByTitleQuery(text) {
        return `?q=${encodeURIComponent(text)}`;
    }
    
    const button = document.getElementById('Search');
    button.addEventListener('click', async ()=>{
        document.getElementById("logo").style.display = "flex";
        document.getElementById("logo").style.marginLeft = "20px";
        document.getElementById("logo").style.marginRight = "0px";
        document.getElementById("logo").style.marginTop = "20px";
        document.getElementById("logo").style.height = "100px";
        document.getElementById("logo").style.position = "absolute";
        const text = TextToSearch.value;
        const query = getBookByTitleQuery(text);
        const url = `https://openlibrary.org/search.json${query}`;
        const response = await fetch(url);
        const {docs} = await response.json();
        console.log(response);

        const children = document.getElementById('Results').children;
        for (i=0; i<children.length; i++) {
            document.getElementById('Results').removeChild(children[i]);
        }       

        for (let i=0; i<docs.length; i++ ) {
            const object = docs[i];
            const {key, title, cover_edition_key} = object;
            let border = document.createElement('div');
            let element = document.createElement('div');
            let elementImg = document.createElement('img');
            let elementButton = document.createElement('button');
            let elementLink = document.createComment('a');
            let url = 'https://openlibrary.org'+ key;
            let urlCover = 'https://covers.openlibrary.org/b/olid/'+ cover_edition_key + "-M.jpg";
            // elementImg.src(urlCover);
            elementImg.setAttribute("src", urlCover);
            // elementLink.setAttribute("href", url);
            element.innerText = title + " " + url + " " + urlCover;
            border.classList.add('border');
            element.classList.add('text');
            elementImg.classList.add('img');
            elementButton.classList.add('button');
            elementButton.innerText='czytaj więcej';
            document.getElementById('Results').appendChild(border);
            border.appendChild(element);
            border.appendChild(elementImg);
            border.appendChild(elementButton);
            // document.getElementById('Results').appendChild(elementLink);
        }
    })
}

document.addEventListener('DOMContentLoaded', async()=>{
    bookSearchByTitle();
})





