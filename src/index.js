import "./normalize.css";
import "./index.scss";

import { createCardsData } from "./components/Cards/Data";
import { renderDarkLayer } from "./components/TransitionEffects/TransitionEffects";
import renderFiltersContainer from "./components/Filters/Filters";
import { renderCards } from "./components/Cards/Cards";
import renderPagination from "./components/Pagination/Pagination";

(async () => {
  await createCardsData();
  renderDarkLayer();
  renderFiltersContainer();
  renderCards();
  renderPagination();
})();
