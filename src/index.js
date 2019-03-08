import "./normalize.css";
import "./index.scss";

import { createCardsData } from "./components/Cards/Data";
import { renderDarkLayer } from "./components/TransitionEffects/TransitionEffects";
import renderFiltersContainer from "./components/Filters/Filters";
import renderCardsList from "./components/Cards/Cards";

(async () => {
  await createCardsData();
  renderDarkLayer();
  renderFiltersContainer();
  renderCardsList();
})();
