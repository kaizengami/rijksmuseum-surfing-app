import "./CardsControl.scss";
import settings from "../Settings";
import { cardsReload } from "./Cards";

const cardsPerPageHtml = () => {
  return `<div class="cards-per-page">
                <button value="10">10</button>
                <button value="50">50</buttona>
                <button value="100">100</button>
            </div>`;
};

const addButtonsEvent = () => {
  const buttons = document.querySelector(".cards-per-page");
  buttons.addEventListener("click", e => {
    const button = e.target.closest("button");
    if (button === null) return;
    settings.cardsPerPage = button.value;
    cardsReload();
    console.log(settings.cardsPerPage);
  });
};

const render = async () => {
  //const popUp = await createPopUpHtml(objectNumber);
  const cardsPerPage = cardsPerPageHtml();
  const cardsFooter = document.querySelector(".cards-footer");
  cardsFooter.insertAdjacentHTML("beforeend", cardsPerPage);
  setTimeout(() => {
    addButtonsEvent();
  }, 100);
};

export default render;
