import "./cards.scss";
import { cardsData, calculateCardPositions } from "./Data";
import { darkLayerToggle } from "../TransitionEffects/TransitionEffects";
import renderPopUp from "../Pop-up/Pop-up";

const cardHtml = (card, { x, y }) => {
  const { id, headerImage, longTitle } = card;

  return `<div class="card" id="${id}" style="transform: translate(${x}px, ${y}px);">
            <div class="header-image" style="background-image: url('${headerImage}')"></div>
            <div class="long-title">${longTitle}</div>
        </div>`;
};

const createCardsHtml = () => {
  const positions = calculateCardPositions(cardsData);
  return (
    '<div class="cards-list">' +
    positions.map((pos, i) => cardHtml(cardsData[i], pos)).join("") +
    "</div>"
  );
};

const addCardEvent = () => {
  const cards = document.querySelector(".cards-list");
  cards.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (card === null) return;
    else {
      applyCardStyles(card);
      console.log(card.id);
      renderPopUp(card.id);
    }
  });
};

const applyCardStyles = card => {
  toggleSelectedCard(card);
  blurNotSelectedCards(card.id);
};

const toggleSelectedCard = card => {
  const [longTitle] = document.querySelectorAll(
    `[id='${card.id}'] .long-title`
  );
  card.classList.toggle("card-selected");
  longTitle.classList.toggle("long-title-selected");
};

const blurNotSelectedCards = selectedId => {
  const filtersContainer = document.querySelector(".filters-container");
  const cardsList = document.querySelector(".cards-list");
  const cards = document.querySelectorAll(".card");
  darkLayerToggle();
  filtersContainer.classList.toggle("filters-container-disable");
  cardsList.classList.toggle("cards-list-transform");
  cards.forEach(card => {
    if (card.id != selectedId) {
      card.classList.toggle("card-not-selected");
    }
  });
};

const render = () => {
  const cardsList = createCardsHtml();
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", cardsList);
  addCardEvent();
};

export { render as renderCards, applyCardStyles as showCards };
