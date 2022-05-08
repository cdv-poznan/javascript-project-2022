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
        document.getElementById("signature").style.padding = "18px 0px 0px 0px";
        document.getElementById("Search").style.margin = "25px 135px 50px 135px";
        document.getElementById("Div-to-search").style.padding = "20px 20px 0px 150px";
        const text = TextToSearch.value;
        const query = getBookByTitleQuery(text);
        const url = `https://openlibrary.org/search.json${query}`;
        const response = await fetch(url);
        const {docs, numFound} = await response.json();
        
        
        document.getElementById('Results').innerHTML="";

        let NumberofResults = document.createElement('p');
        NumberofResults.classList.add('Number');
        NumberofResults.innerText="Number of Results for "+'"'+ TextToSearch.value +'"'+ " = " + numFound;
        document.getElementById("Results").appendChild(NumberofResults);
        
        for (let i=0; i<docs.length; i++ ) {
            const object = docs[i];
            const {key, title, cover_edition_key, author_name, subject_key, first_publish_year, number_of_pages_median} = object;
            let border = document.createElement('div');
            let element = document.createElement('div');
            let elementAuthor = document.createElement('div');
            let elementPublication = document.createElement('div');
            let elementPages = document.createElement('div');

            let elementImg = document.createElement('img');
            let elementButton = document.createElement('button');
            let elementLink = document.createComment('a');
            let url = 'https://openlibrary.org'+ key;
            let urlCover = 'https://covers.openlibrary.org/b/olid/'+ cover_edition_key + "-M.jpg";
            elementImg.setAttribute("src", urlCover);
            
            element.innerText = title,
            elementAuthor.innerText = author_name;
            elementPublication.innerText = "First publication: " + first_publish_year + " yr";
            elementPages.innerText = "Pages: " + number_of_pages_median;
            border.classList.add('border');
            element.classList.add('text');
            elementAuthor.classList.add('textAuthor');
            elementPublication.classList.add('textPublication');
            elementPages.classList.add('textPages');
            elementImg.classList.add('img');
            elementButton.classList.add('button');
            elementButton.innerText='Read more';
            document.getElementById('Results').appendChild(border);
            border.appendChild(element);
            border.appendChild(elementAuthor);
            border.appendChild(elementPublication);
            border.appendChild(elementPages);
            border.appendChild(elementImg);
            border.appendChild(elementButton);
            border.appendChild(elementLink);

            elementButton.onclick = function() {
                const win = window.open(url, '_blank');
                win.focus();
            };
        }
    })
}

document.addEventListener('DOMContentLoaded', async()=>{
    bookSearchByTitle();
})





