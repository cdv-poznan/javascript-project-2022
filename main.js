async function bookSearchByTitle() {

    const TextToSearch = document.getElementById('Text-to-search') 
    
    function getBookByTitleQuery(text) {
        return `?q=${encodeURIComponent(text)}`;
    }
    
    const button = document.getElementById('Search');
    button.addEventListener('click', async ()=>{
        document.getElementById("logo").style.display = "flex";
        document.getElementById("logo").style.marginLeft = "0px";
        document.getElementById("logo").style.marginRight = "0px";
        document.getElementById("logo").style.height = "100px";
        document.getElementById("logo").style.position = "absolute";
        const text = TextToSearch.value;
        const query = getBookByTitleQuery(text);
        const url = `http://openlibrary.org/search.json${query}`;
        const response = await fetch(url);
        const {docs} = await response.json();
        console.log({docs}); 
        console.log(docs.length);
        for (let i=0; i<docs.length; i++ ) {
            const object = docs[i];
            console.log(object);
            const {key, title} = object;
            console.log(title);
            console.log('https://openlibrary.org'+ key);
            let element = document.createElement('div');
            let url = 'https://openlibrary.org'+ key
            element.innerText = title + " " + url; 
            element.classList.add('Result');
            document.getElementById('Results').appendChild(element);
        }
    })
}

document.addEventListener('DOMContentLoaded', async()=>{
    bookSearchByTitle();
})





