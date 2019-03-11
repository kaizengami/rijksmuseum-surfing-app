import "./Pagination.scss";
import settings from "../Settings";
import { cardsReload } from "./Cards";

const paginationHtml = (paginationPosition, pages) => {
  switch (paginationPosition) {
    case "pagination-start":
      return `<div class="pagination">
                <a href="#${pages[0]}">${pages[0] + 1}</a>
                <a href="#${pages[1]}">${pages[1] + 1}</a>
                <a href="#${pages[2]}">${pages[2] + 1}</a>
                <span>...</span>
                <a href="#${pages[3]}">${pages[3] + 1}</a>
              </div>`;
    case "pagination-middle":
      return `<div class="pagination">
                <a href="#${pages[0]}">${pages[0] + 1}</a>
                <span>...</span>
                <a href="#${pages[1]}">${pages[1] + 1}</a>
                <a href="#${pages[2]}">${pages[2] + 1}</a>
                <a href="#${pages[3]}">${pages[3] + 1}</a>
                <span>...</span>
                <a href="#${pages[4]}">${pages[4] + 1}</a>
              </div>`;
    case "pagination-end":
      return `<div class="pagination">
                <a href="#${pages[0]}">${pages[0] + 1}</a>
                <span>...</span>
                <a href="#${pages[1]}">${pages[1] + 1}</a>
                <a href="#${pages[2]}">${pages[2] + 1}</a>
                <a href="#${pages[3]}">${pages[3] + 1}</a>
              </div>`;
  }
};

const createPaginationHtml = () => {
  let totalCards = settings.totalCards;
  let cardsPerPage = settings.cardsPerPage;
  let currentPage = settings.page;
  //let totalPages = Math.ceil(totalCards / cardsPerPage);
  // TotalCards value is not correct

  let paginationPosition;
  let pages;
  // It has been determined empirically that 9999 cards are available.
  let totalPages = Math.ceil(9999 / cardsPerPage);

  if (currentPage < 3) {
    paginationPosition = "pagination-start";
    pages = [currentPage, currentPage + 1, currentPage + 2, totalPages - 1];
  }
  if (currentPage > 3 && currentPage < totalPages - 2) {
    paginationPosition = "pagination-middle";
    pages = [0, currentPage - 1, currentPage, currentPage + 1, totalPages - 1];
  }
  if (currentPage > 996) {
    paginationPosition = "pagination-end";
    pages = [0, totalPages - 3, totalPages - 2, totalPages - 1];
  }
  return paginationHtml(paginationPosition, pages);
};

const addPaginationEvent = () => {
  const pagination = document.querySelector(".pagination");
  pagination.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (link === null) return;
    settings.page = parseInt(link.getAttribute("href").replace("#", ""));
    cardsReload();
  });
};

const render = () => {
  //const popUp = await createPopUpHtml(objectNumber);
  const pagination = createPaginationHtml();
  const cardsFooter = document.querySelector(".cards-footer");
  cardsFooter.insertAdjacentHTML("beforeend", pagination);
  addPaginationEvent();
};

export default render;
