import "./Filters.scss";
import { cardsData, calculateCardPositions } from "../Cards/Data";
import settings from "../settings";

const filtersHtml = () => {
  return `<div class="filters-container">
                <input id="search" autocomplete="off" type="text" placeholder="Search keyword...">
                <button id="search-button" value="Search">Search</button>
                <div class="sorting-buttons">
                    <input id="input-maker" class="input-filter" type="text" autocomplete="nope" placeholder="Maker">
                    <input id="input-type" class="input-filter" type="text" autocomplete="nope" placeholder="Type">
                    <input id="input-material" class="input-filter" type="text" autocomplete="nope" placeholder="Material">
                </div>
            </div>`;
};

const render = () => {
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", filtersHtml());
};

export default render;
