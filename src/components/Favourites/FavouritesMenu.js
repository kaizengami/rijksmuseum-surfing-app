import './FavouritesMenu.scss';
import settings from '../Settings';
import { toggleFavoriteIcon } from '../Pop-up/Pop-up';
import renderFavoritePage from './FavouritesPage';

const favoritesHtml = () => {
  return `<div id="favorite-list" class="${
    favoriteListEmpty() ? '' : 'favorite-list-visible'
  }">
            <div id="favorite-list-items"></div>
            <div id="favorite-list-line">I<br>I</div>
            <div id="favorite-heart">
              <div class="icon-heart"><span>♥</span></div>
            </div>
          </div>`;
};

const createFavoriteHtml = favorite => {
  const { objectNumber, title } = favorite;

  return `<div class="favorite-item" id="fav-${objectNumber}">
            <div class="favorite-id">${title}...</div>
            <div class="icon-trash"></div>
          </div>`;
};

const generateFavoriteListHtml = () => {
  return (
    settings.favorites.map(favorite => createFavoriteHtml(favorite)).join('') +
    renderShowFavoritesButton()
  );
};

const renderShowFavoritesButton = () => {
  return favoriteListEmpty()
    ? ''
    : '<button id="show-favorites">Show favorites</button>';
};

const renderFavoriteList = () => {
  const favoriteListItems = document.getElementById('favorite-list-items');
  favoriteListItems.innerHTML = generateFavoriteListHtml();
};

const favoriteListEmpty = () => {
  if (settings.favorites.length === 0) return true;
  else return false;
};

const showHideFavoriteList = () => {
  if (favoriteListEmpty()) hideFavoriteList();
  else showFavoriteList();
};

const showFavoriteList = () => {
  const favoriteList = document.getElementById('favorite-list');
  favoriteList.classList.add('favorite-list-visible');
};

const hideFavoriteList = () => {
  const favoriteList = document.getElementById('favorite-list');
  favoriteList.classList.remove('favorite-list-visible');
};

const toggleFavoriteList = () => {
  const favoriteList = document.getElementById('favorite-list');
  favoriteList.classList.toggle('favorite-list-show');
};

const removeFavorite = element => {
  const favorite = element.closest('.favorite-item');
  const id = favorite.id.replace('fav-', '');
  removeFromFavoriteList(id);
  renderFavoriteList();
  toggleFavoriteIcon();
};

const removeFromFavoriteList = object => {
  settings.favorites.forEach((favorite, index) => {
    if (favorite.objectNumber === object)
      return settings.favorites.splice(index, 1);
  });
};

const showFavorites = () => {
  console.log(settings.favorites);
  renderFavoritePage();
};

const addListEvent = () => {
  const favoriteList = document.getElementById('favorite-list');
  favoriteList.addEventListener('click', e => {
    const element = e.target;
    const listItem = element.closest('.favorite-id');
    const removeButton = element.closest('.icon-trash');
    const openListButton = element.closest('.icon-heart');
    const showFavoritesButton = element.closest('#show-favorites');
    if (openListButton) toggleFavoriteList();
    if (listItem) console.log('listItem');
    if (removeButton) removeFavorite(element);
    if (showFavoritesButton) showFavorites(element);
  });
};

const render = () => {
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('beforeend', favoritesHtml());
  renderFavoriteList();
  addListEvent();
};

export { render as renderFavourites, showHideFavoriteList, renderFavoriteList };
