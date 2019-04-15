import './FavouritesPage.scss';
import settings from '../Settings';

const favoritesHtml = data => {
  const { title, imageUrl, description, makerLine, physicalMedium } = data;
  return `<section class="favorite-page">
                  <button class="pop-up-favorite 
                    ${
                      isInFavoriteList(data.objectNumber)
                        ? 'favorite-active'
                        : ''
                    }" 
                    value="favorite">
                      ❤
                  </button>
                  <h1>${title}</h1>
                  <div class="pop-up-row padding-bottom-20">
                      <img src="${imageUrl}">
                      <div class="pop-up-description">${description}</div>
                  </div>
                  <section class="more-details">
                    <div class="pop-up-row">
                      <span>Maker line:</span>
                      <div class="maker-line">${makerLine}</div>
                    </div>
                    <div class="pop-up-row">
                      <span>Physical medium:</span>
                      <div class="physical-medium">${physicalMedium}</div>
                    </div>
                    <div class="pop-up-row">
                      <span>Category:</span>
                      <div class="category">${createFavoritesLinks(
                        data.category
                      )}</div>
                    </div>
                    <div class="pop-up-row">
                      <span>Tags:</span>
                      <div class="tags">${createFavoritesLinks(data.tags)}</div>
                    </div>
                  </section>
              </section>`;
};

const favoritesLinkHtml = link => {
  return `<a href="#${link}">${link}</a>`;
};

const createFavoritesLinks = links => {
  return links.map(link => favoritesLinkHtml(link)).join('');
};

const createFavoritesHtml = () => {
  return (
    '<div id="favorites-page">' +
    settings.favorites.map(favorite => favoritesHtml(favorite)).join('') +
    '</div>'
  );
};

const isInFavoriteList = objectNumber => {
  for (let favorite of settings.favorites) {
    if (objectNumber === favorite.objectNumber) return true;
  }
  return false;
};

const filtersContainerEnable = () => {
  const filtersContainer = document.querySelector('.filters-container');
  filtersContainer.classList.remove('filters-container-disable');
};

const removePopUp = () => {
  const popUp = document.querySelector('.pop-up');
  if (popUp) popUp.remove();
};

const render = () => {
  const favorites = createFavoritesHtml(settings.favorites);
  const darkLayer = document.querySelector('.dark-layer');
  removePopUp();
  filtersContainerEnable();
  darkLayer.classList.remove('dark-layer-visible');
  const cardsList = document.querySelector('.cards-list');
  cardsList.innerHTML = favorites;
  //main.insertAdjacentHTML('afterend', favorites);
};

export default render;
