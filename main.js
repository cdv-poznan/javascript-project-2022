const firstSpellsInformationContainer = document.querySelector(
  ".spells__container--1"
);
const secondSpellsInformationContainer = document.querySelector(
  ".spells__container--2"
);
const characterInformationContainer =
  document.querySelector(".character__data");
const nickNameInformationContainer = document.querySelector(".nick__name");
const searchContainer = document.querySelector(".search__container");
const showMoreBtn = document.querySelector(".show__more");
const showLessBtn = document.querySelector(".show__less");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");

// Page navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Get information about spells

window.addEventListener("DOMContentLoaded", (event) => {
  //   fetch(`https://fedeperin-harry-potter-api-en.herokuapp.com/spells`)
  fetch(`https://harry-potter-api-english-production.up.railway.app/spells`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 72; i++) {
        const spellDataResult = data[i];

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

const showMore = function () {
  secondSpellsInformationContainer.classList.remove("hidden");
  showMoreBtn.classList.add("hidden");
  showLessBtn.classList.remove("hidden");
};

const showLess = function () {
  secondSpellsInformationContainer.classList.add("hidden");
  showMoreBtn.classList.remove("hidden");
  showLessBtn.classList.add("hidden");
};

showMoreBtn.addEventListener("click", showMore);
showLessBtn.addEventListener("click", showLess);

// Modal Window

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  nickNameInformationContainer.textContent = "";
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Modal Window - nick character help
const nickCharacterHelp = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  // fetch(`https://fedeperin-harry-potter-api-en.herokuapp.com/characters`)
  fetch(`https://harry-potter-api-english-production.up.railway.app/characters`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 23; i++) {
        const nickCharacterHelpData = data[i];
        const nickHtml = `
        <p>${nickCharacterHelpData.nickname},</p>
        `;

        nickNameInformationContainer.insertAdjacentHTML("beforeend", nickHtml);
      }
    });
};

// Get information about Character

const getInformationNick = function (characterNick) {
  //   fetch(`https://fedeperin-harry-potter-api-en.herokuapp.com/characters`)
  fetch(`https://harry-potter-api-english-production.up.railway.app/characters`)
    .then((response) => response.json())
    .then((data) => {
      const nickDataResult = data.find(
        ({ nickname }) => nickname === `${characterNick}`
      );

      if (nickDataResult === undefined) {
        // alert("blad");
        nickCharacterHelp();
      } else {
        if (nickDataResult.child.length === 0) {
          nickDataResult.child = "NO DATA";
        }

        const html = `
        <img class="character__image" src="${nickDataResult.image}" alt="No_data">
        <div class="character__information">
        <h1>Character information:</h1>
        <p title="Name">Name: ${nickDataResult.character}</p>
        <p title="House">House: ${nickDataResult.hogwartsHouse}</p>
        <p class="Child" title="Child">Child: ${nickDataResult.child}</p>
        <p title="Actor">Actor: ${nickDataResult.interpretedBy}</p>
        
        </div>
        `;

        characterInformationContainer.insertAdjacentHTML("beforeend", html);
      }
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
