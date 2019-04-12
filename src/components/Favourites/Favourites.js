import './Favourites.scss';
import settings from '../Settings';

const favoritesHtml = () => {
  return `<div id="favorite-list" class="favorite-list-visible favorite-list-show">
            <div id="favorite-list-items">
              <div class="favorite-item">
                ${generateFavoriteList()}
              </div>
            </div>
            <div id="favorite-list-line">I<br>I</div>
            <div id="favorite-heart">
              <div class="icon-heart"><span>♥</span></div>
            </div>
          </div>`;
};

const generateFavoriteList = () => {
  const favorites = settings.favorites;
  console.log(favorites);

  return `<div class="favorite-id" id="kyivua">Shiva Nataraja...</div>
          <div class="icon-trash"></div>`;
};

const addInputEvent = () => {};

const render = () => {
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('beforeend', favoritesHtml());
};

export default render;
