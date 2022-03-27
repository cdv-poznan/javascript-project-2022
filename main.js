async function bookSearchByTitle() {

    const request = fetch('http://openlibrary.org/search.json');
    const search = (await request).json();
    const TextToSearch = document.getElementById('Text-to-search') 
    
    function getBookByTitleQuery(text) {
        return `?q=${encodeURIComponent(text)}`;
    }
    
    const button = document.getElementById('Search');
    button.addEventListener('click', async ()=>{
        const text = TextToSearch.value;
        const query = getBookByTitleQuery(text);
        const url = `http://openlibrary.org/search.json${query}`;
        const response = await fetch(url);
        const {ResultOfSearch} = await response.json();
        console.log({ResultOfSearch});

    })
}

document.addEventListener('DOMContentLoaded', async()=>{
    bookSearchByTitle();
})





