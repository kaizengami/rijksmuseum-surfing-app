import "./TransitionEffects.scss";

const darkLayerHtml = () => {
  return '<div class="dark-layer"></div>';
};

const darkLayerToggle = () => {
  const darkLayer = document.querySelector(".dark-layer");
  darkLayer.classList.toggle("dark-layer-visible");
};

const render = () => {
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", darkLayerHtml());
};

export { render as renderDarkLayer, darkLayerToggle };
