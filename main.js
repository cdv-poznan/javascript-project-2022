const characterInformationContainer = document.querySelector('.character__data')
const inputForm = document.querySelector('.input__form')



/*
const fillInformation = function(data){
const html = `
<div class="character__information">
<h1>Character information:</h1>
<p title="Name">❓${data.name}</p>
<p title="Birth">👶🏻${data.dateOfBirth}</p>
<p title="Gender">👥${data.gender}</p>
<p title="Ancestry">🌀${data.ancestry}</p>
<p title="House">🏠${data.house}</p>
<p title="Wand">🪄${data.wand.core}</p>
<p title="Patronus">🧙🏻‍♂️${data.patronus}</p>
</div>
<img class="character__image" src="${data.image}" alt="No_data">
`;

characterInformationContainer.insertAdjacentHTML('beforeend', html);

};
*/

/*
const request = fetch(`http://hp-api.herokuapp.com/api/characters`)
.then(response => response.json())
.then(data => fillInformation(data[1]));
*/

const getInformation = function(charaterName){
fetch(`http://hp-api.herokuapp.com/api/characters`)
.then(response => response.json())
.then(data => {
    const result = data.find( ({ name }) => name === `${charaterName}` );
    console.log(result.name);
    // console.log(data)

  
        const html = `
        <div class="character__information">
        <h1>Character information:</h1>
        <p title="Name">❓${result.name}</p>
        <p title="Birth">👶🏻${result.dateOfBirth}</p>
        <p title="Gender">👥${result.gender}</p>
        <p title="Ancestry">🌀${result.ancestry}</p>
        <p title="House">🏠${result.house}</p>
        <p title="Wand">🪄${result.wand}</p>
        <p title="Patronus">🧙🏻‍♂️${result.patronus}</p>
        </div>
        <img class="character__image" src="${result.image}" alt="No_data">
        `;
        
        characterInformationContainer.insertAdjacentHTML('beforeend', html);
        
    


});



    
};
getInformation('Harry Potter')


