"use strict";
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const currentPage = document.getElementById("current-page");
const totalPages = document.getElementById("total-pages");

let width = document.body.clientWidth;
let PER_PAGE = width > 767 ? 5 : 1;

export default function loadPaging(totalItems, callback) {
  let currentPageNumber = 1;
  previousButton.disabled = currentPageNumber === 1;
  currentPage.textContent = currentPageNumber;
  const totalPageCount = Math.ceil(totalItems / PER_PAGE);
  totalPages.textContent = totalPageCount;

  function updatePaging() {
    currentPage.textContent = currentPageNumber;
    const pagingOptions = {
      currentPageNumber: currentPageNumber,
      perPage: PER_PAGE,
    };
    callback(pagingOptions);
    nextButton.disabled = currentPageNumber === totalPageCount;
    previousButton.disabled = currentPageNumber === 1;
  }
  updatePaging();

  nextButton.addEventListener("click", () => {
    currentPageNumber++;
    updatePaging();
  });

  previousButton.addEventListener("click", () => {
    currentPageNumber--;
    updatePaging();
  });
}
