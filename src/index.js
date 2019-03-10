import "./normalize.css";
import "./index.scss";

import { renderDarkLayer } from "./components/TransitionEffects/TransitionEffects";
import renderFiltersContainer from "./components/Filters/Filters";
import renderCardsPage from "./components/Cards/index";

renderDarkLayer();
renderFiltersContainer();
renderCardsPage();
