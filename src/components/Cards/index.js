import { createCardsData, cardsData } from "./Data";
import { renderCards, cardsNotFound } from "./Cards";
import renderPagination from "./Pagination";
import renderCardsControl from "./CardsControl";

const render = async () => {
  await createCardsData();
  if (cardsData.length === 0) {
    cardsNotFound();
  } else {
    renderCards();
    renderPagination();
    renderCardsControl();
  }
};

export default render;
