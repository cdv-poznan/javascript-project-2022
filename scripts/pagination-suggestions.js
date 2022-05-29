"use strict";
const prevBtn = document.getElementById("prev-bt");
const nextBtn = document.getElementById("next-bt");
const curPage = document.getElementById("cur-page");
const totPages = document.getElementById("tot-pages");

let width = document.body.clientWidth;
let PER_PAGE = width > 767 ? 5 : 1;

export default function loadPagingSuggestions(totalItems, callback) {
  let currentPageNumber = 1;
  prevBtn.disabled = currentPageNumber === 1;
  curPage.textContent = currentPageNumber;
  const totalPageCount = Math.ceil(totalItems / PER_PAGE);
  totPages.textContent = totalPageCount;

  function updatePaging() {
    curPage.textContent = currentPageNumber;
    const pagingOptions = {
      currentPageNumber: currentPageNumber,
      perPage: PER_PAGE,
    };
    callback(pagingOptions);
    nextBtn.disabled = currentPageNumber === totalPageCount;
    prevBtn.disabled = currentPageNumber === 1;
  }
  updatePaging();

  nextBtn.addEventListener("click", () => {
    currentPageNumber++;
    updatePaging();
  });

  prevBtn.addEventListener("click", () => {
    currentPageNumber--;
    updatePaging();
  });
}
