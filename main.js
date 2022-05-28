
const button = document.getElementById("Search")

// User puts artist and song title values, after a button click fetch api and get the lyrics
button.addEventListener("click", event => {

    // Dodać walidację inputów (obsługa błędów, jednego pola pustego, zamiana spacji na podkreślnik w zmiennych do url "_"

    switch(document.getElementById('artist').value.length){
        case(0):
            alert("Fill in the artist name.")
        default:
            switch(document.getElementById('artist').value.length){
                case(0):
                alert("Fill in the song title name.")
            default:

    //         }
    // }
    // if(document.getElementById('artist').value.length !== 0 || document.getElementById('artist').value.length !== 0){
        console.log('OK')

        const LyricsContent = document.getElementById("LyricsContent")
        const artist = document.getElementById('artist').value
        const song = document.getElementById('song').value
        
        // Zmienić konstrukcję linka na {}
        const ApiURL = "https://api.lyrics.ovh/v1/" + artist + "/" + song + '"'
        console.log(ApiURL)
        
        function getApiResponse(url){
            const LyricsRequest = fetch(url)
            return LyricsRequest
                .then((response) => response.json())
        }
        
            getApiResponse(ApiURL).then((LyricsContent) => {
                const LyricsElement = document.getElementById('LyricsContent')
                LyricsElement.innerText = LyricsContent.lyrics
                console.log(LyricsContent.lyrics)
                console.log(artist)
                console.log(song)
            })
        }
    }
        
        // console.log("NOPE")
})