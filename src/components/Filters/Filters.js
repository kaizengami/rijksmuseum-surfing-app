import "./Filters.scss";
import { cardsReload } from "../Cards/Cards";
import settings from "../Settings";

const filtersHtml = () => {
  return `<div class="filters-container">
                <input id="search" name="keyword" autocomplete="off" type="text" placeholder="Search keyword...">
                <div class="sorting-buttons">
                    <input id="input-maker" name="maker" class="input-filter" type="text" autocomplete="nope" placeholder="Maker">
                    <input id="input-type" name="type" class="input-filter" type="text" autocomplete="nope" placeholder="Type">
                    <input id="input-material" name="material" class="input-filter" type="text" autocomplete="nope" placeholder="Material">
                </div>
                <button id="search-button" value="Search">Search</button>
            </div>`;
};

const addInputEvent = () => {
  const inputs = document.querySelectorAll(".filters-container input");
  const searchButton = document.getElementById("search-button");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (!inputEmpty()) searchButton.classList.add("search-button-visible");
      else searchButton.classList.remove("search-button-visible");
    });
  });
};

const inputEmpty = () => {
  const inputs = document.querySelectorAll(".filters-container input");
  let emptyInput = true;
  inputs.forEach(input => {
    if (input.value != "") emptyInput = false;
  });
  return emptyInput;
};

const addSearchEvent = () => {
  const searchButton = document.getElementById("search-button");
  const inputs = document.querySelectorAll(".filters-container input");

  searchButton.addEventListener("click", () => {
    inputs.forEach(input => {
      switch (input.name) {
        case "keyword":
          settings.filters.keyword = input.value;
          break;
        case "maker":
          settings.filters.maker = input.value;
          break;
        case "type":
          settings.filters.type = input.value;
          break;
        case "material":
          settings.filters.material = input.value;
          break;
      }
    });
    settings.page = 0;
    cardsReload();
    highlightActiveInput();
  });
};

const highlightActiveInput = () => {
  Object.keys(settings.filters).forEach(name => {
    const input = document.querySelector(
      `.filters-container input[name="${name}"]`
    );
    if (settings.filters[name] != "" && name != "keyword")
      input.classList.add("sorting-buttons-active");
    else input.classList.remove("sorting-buttons-active");
  });
};

const setInputSettings = () => {
  Object.keys(settings.filters).forEach(name => {
    const input = document.querySelector(
      `.filters-container input[name="${name}"]`
    );
    input.value = settings.filters[name];
    console.log(settings.filters[name]);
  });
};

const render = () => {
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", filtersHtml());
  setInputSettings();
  addInputEvent();
  addSearchEvent();
};

export {
  render as renderFiltersContainer,
  setInputSettings as updateFiltersDom
};
