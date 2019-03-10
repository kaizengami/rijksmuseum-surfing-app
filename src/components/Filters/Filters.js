import "./Filters.scss";
import { cardsData, calculateCardPositions } from "../Cards/Data";
import settings from "../Settings";

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

const addButtonsEvent = () => {
  const sortingButtons = document.querySelector(".sorting-buttons");
  sortingButtons.addEventListener("click", e => {
    switch (e.target.value) {
      case "age":
        sortAge();
        break;
      case "reset":
        sortReset();
        break;
      case "name":
        sortName();
        break;
    }
    highlightActiveButton(e.target.value);
    updateDom();
  });
};

const sortAge = () => {};

const sortReset = () => {};

const sortName = () => {};

const highlightActiveButton = value => {
  const buttons = document.querySelectorAll(".sorting-buttons button");
  buttons.forEach(button => {
    if (button.value === value) highlightActiveButtonOption(button);
    else
      button.classList.remove(
        "sorting-buttons-active",
        "sorting-buttons-active-reverse"
      );
  });
};

const highlightActiveButtonOption = button => {
  const sortingOptions = ["age", "name", "reset"];
  button.classList.add("sorting-buttons-active");
  if (sortingOptions.includes(options.sort)) {
    button.classList.remove("sorting-buttons-active-reverse");
  } else {
    button.classList.add("sorting-buttons-active-reverse");
  }
};

const addSearchEvent = () => {
  const search = document.getElementById("search");
  search.addEventListener("input", e => {
    cardsData.forEach((card, i) => {
      const cardNode = document.getElementById(cardsData[i].id);
      if (inputEqualTocardName(e, card)) {
        cardsData[i].isVisible = true;
        cardNode.classList.remove("card-hide");
      } else {
        cardsData[i].isVisible = false;
        cardNode.classList.add("card-hide");
      }
    });
    sortVisibleToTop();
    updateDom();
  });
};

const updateDom = () => {
  const positions = calculateCardPositions(cardsData);
  positions.forEach(({ x, y }, i) => {
    const node = document.getElementById(cardsData[i].id);
    node.style.transform = `translate(${x}px, ${y}px)`;
  });
};

const render = () => {
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", filtersHtml());
  addSearchEvent();
  addButtonsEvent();
};

export default render;
