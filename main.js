const spellsInformationContainer = document.querySelector(".spells__container");
const characterInformationContainer =
  document.querySelector(".character__data");
const searchContainer = document.querySelector(".search__container");


// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
  
    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });



window.addEventListener("DOMContentLoaded", (event) => {
  fetch(`https://fedeperin-harry-potter-api-en.herokuapp.com/spells`)
    .then((response) => response.json())
    .then((data) => {


      for (let i = 0; i < 72; i++) {
        const spellDataResult = data[i];
        console.log(spellDataResult);
        
    
        const htmlSpells = `
        <div class='spells__information'>
  <p>${spellDataResult.spell}</p>
  <p class="use">${spellDataResult.use}</p>

</div>`;



        spellsInformationContainer.insertAdjacentHTML("beforeend", htmlSpells);
        }

       
    });
    
});



// get information about Character

const getInformationNick = function (characterNick) {
  fetch(`https://fedeperin-harry-potter-api-en.herokuapp.com/characters`)
    .then((response) => response.json())
    .then((data) => {
      const nickDataResult = data.find(
        ({ nickname }) => nickname === `${characterNick}`
      );

      console.log(nickDataResult);

      const html = `
        <img class="character__image" src="${nickDataResult.image}" alt="No_data">
        <div class="character__information">
        <h1>Character information:</h1>
        <p title="Name">❓ ${nickDataResult.character}</p>
        <p title="House">❓ ${nickDataResult.hogwartsHouse}</p>
        <p title="Child">❓ ${nickDataResult.child}</p>
        <p title="Actor">❓ ${nickDataResult.interpretedBy}</p>
        
        </div>
        `;

      characterInformationContainer.insertAdjacentHTML("beforeend", html);
    });
};
getInformationNick("Harry");

// Capitalize The First Letter Of Each Word in input__form

function capitalizeTheFirstLetterOfEachWord(word) {
  const separateWord = word.toLowerCase().split(" ");
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}


// Action on click

searchContainer.addEventListener("submit", function (e) {
  characterInformationContainer.innerHTML = "";
  e.preventDefault();
  // const characterNameFromUser = document.querySelector('.input__form').value
  const characterNameFromUser = capitalizeTheFirstLetterOfEachWord(
    document.querySelector(".input__form").value
  );
  getInformationNick(characterNameFromUser);
  console.log(characterNameFromUser);
});
