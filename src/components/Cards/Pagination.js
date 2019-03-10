import "./Pagination.scss";
import settings from "../Settings";
import { cardsReload } from "./Cards";

const paginationHtml = () => {
  return `<div class="pagination">
                <a href="#1">1</a>
                <a href="#2">2</a>
                <a href="#3">3</a>
                <span>...</span>
                <a href="#4">4</a>
                <a href="#5">5</a>
                <a href="#6">6</a>
            </div>`;
};

const createPaginationHtml = async objectNumber => {
  let popUpData = await createPopUpData(objectNumber);
  await console.log("popUpData" + popUpData);
  return popUpHtml(popUpData);
};

const addPaginationEvent = () => {
  const pagination = document.querySelector(".pagination");
  pagination.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (link === null) return;
    settings.page = link.getAttribute("href").replace("#", "");
    cardsReload();
    console.log(settings.page);
  });
};

const render = () => {
  //const popUp = await createPopUpHtml(objectNumber);
  const pagination = paginationHtml();
  const cardsFooter = document.querySelector(".cards-footer");
  cardsFooter.insertAdjacentHTML("beforeend", pagination);
  addPaginationEvent();
};

export default render;
