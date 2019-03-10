import { createCardsData } from "./Data";
import { renderCards } from "./Cards";
import renderPagination from "./Pagination";
import renderCardsControl from "./CardsControl";

const render = async () => {
  await createCardsData();
  renderCards();
  renderPagination();
  renderCardsControl();
};

export default render;
