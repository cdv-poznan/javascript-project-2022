const firstSpellsInformationContainer = document.querySelector(
  ".spells__container--1"
);
const secondSpellsInformationContainer = document.querySelector(
  ".spells__container--2"
);
const characterInformationContainer =
  document.querySelector(".character__data");
const searchContainer = document.querySelector(".search__container");
const showMoreBtn = document.querySelector(".show__more");

// Page navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

window.addEventListener("DOMContentLoaded", (event) => {
  fetch(`https://fedeperin-harry-potter-api-en.herokuapp.com/spells`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 72; i++) {
        const spellDataResult = data[i];
        console.log(spellDataResult);

        if (i < 12) {
          const firstHtmlSpells = `
        <div class='spells__information'>
  <p>${spellDataResult.spell}</p>
  <p class="use">${spellDataResult.use}</p>

</div>`;

          firstSpellsInformationContainer.insertAdjacentHTML(
            "beforeend",
            firstHtmlSpells
          );
        } else if (i >= 12) {
          const secondHtmlSpells = `
        <div class='spells__information'>
  <p>${spellDataResult.spell}</p>
  <p class="use">${spellDataResult.use}</p>

</div>`;

          secondSpellsInformationContainer.insertAdjacentHTML(
            "beforeend",
            secondHtmlSpells
          );
        }
      }
    });
});

// Show more spells button

const showLess = function () {
  secondSpellsInformationContainer.classList.add("hidden");
  document.querySelector(".show__more").textContent = "Show more";
};

const showMore = function () {
  secondSpellsInformationContainer.classList.remove("hidden");
  document.querySelector(".show__more").textContent = "Show less";

  showMoreBtn.addEventListener("click", showLess);
};

showMoreBtn.addEventListener("click", showMore);

// showMoreBtn.addEventListener('click', function(){

//     secondSpellsInformationContainer.classList.remove('hidden')
//     document.querySelector('.show__more').textContent = 'Show less'

//     showMoreBtn.addEventListener('click', function(){
//         secondSpellsInformationContainer.classList.add('hidden')
//         document.querySelector('.show__more').textContent = 'Show more'
//     })
// });

// Get information about Character

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
  const characterNameFromUser = capitalizeTheFirstLetterOfEachWord(
    document.querySelector(".input__form").value
  );
  getInformationNick(characterNameFromUser);
  console.log(characterNameFromUser);
});
