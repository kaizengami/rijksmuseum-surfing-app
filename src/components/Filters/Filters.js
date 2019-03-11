import "./Filters.scss";
import { cardsReload } from "../Cards/Data";
import settings from "../Settings";

const filtersHtml = () => {
  return `<div class="filters-container">
                <input id="search" autocomplete="off" type="text" placeholder="Search keyword...">
                <div class="sorting-buttons">
                    <input id="input-maker" class="input-filter" type="text" autocomplete="nope" placeholder="Maker">
                    <input id="input-type" class="input-filter" type="text" autocomplete="nope" placeholder="Type">
                    <input id="input-material" class="input-filter" type="text" autocomplete="nope" placeholder="Material">
                </div>
                <button id="search-button" value="Search">Search</button>
            </div>`;
};

const addSearchEvent = () => {
  const search = document.getElementById("search");
  search.addEventListener("input", e => {
    //if (search.value.length == 0)
  });
};

const render = () => {
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", filtersHtml());
  addSearchEvent();
};

export default render;
