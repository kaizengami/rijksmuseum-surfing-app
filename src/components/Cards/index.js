import { createCardsData, cardsData } from "./Data";
import { renderCards, cardsNotFound } from "./Cards";
import renderPagination from "./Pagination";
import renderCardsControl from "./CardsControl";
import { updateFiltersDom } from "../Filters/Filters";

const render = async () => {
  await createCardsData();
  if (cardsData.length === 0) {
    cardsNotFound();
  } else {
    updateFiltersDom();
    renderCards();
    renderPagination();
    renderCardsControl();
  }
};

export default render;
