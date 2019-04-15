import './Cards.scss';
import { cardsData, calculateCardPositions } from './Data';
import renderCards from './index';
import { darkLayerToggle } from '../TransitionEffects/TransitionEffects';
import { renderPopUp } from '../Pop-up/Pop-up';

const cardHtml = (card, { x, y }) => {
  const { id, headerImage, longTitle } = card;

  return `<div class="card" id="${id}" style="transform: translate(${x}px, ${y}px);">
            <div class="header-image" style="background-image: url('${headerImage}')"></div>
            <div class="long-title">${longTitle}</div>
        </div>`;
};

const createCardsHtml = () => {
  const positions = calculateCardPositions(cardsData);
  const lastPosition = positions[positions.length - 1];
  return (
    '<div class="cards-list">' +
    positions.map((pos, i) => cardHtml(cardsData[i], pos)).join('') +
    cardsFooter(lastPosition.y) +
    '</div>'
  );
};

const cardsFooter = y => {
  return `<footer class="cards-footer" style="transform: translateY(${y +
    200}px);">
            <div class="api-credit">
            <a href="https://www.rijksmuseum.nl/en/api/terms-and-conditions-of-use" target="_blank">
              App was developed using the Rijksmuseum API
            </a>
            </div>
          </footer>`;
};

const addCardEvent = () => {
  const cards = document.querySelector('.cards-list');
  cards.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card === null) return;
    else {
      applyCardStyles(card);
      renderPopUp(card.id);
    }
  });
};

const applyCardStyles = card => {
  toggleSelectedCard(card);
  blurNotSelectedCards(card.id);
  hideCardsFooter();
};

const toggleSelectedCard = card => {
  const [longTitle] = document.querySelectorAll(
    `[id='${card.id}'] .long-title`
  );
  centerSelectedCard(card);
  longTitle.classList.toggle('long-title-selected');
};

const centerSelectedCard = card => {
  const translate = card.style.transform.replace(/[^0-9\-.,]/g, '').split(',');
  const translateY = `${translate[1] / 2 - 250}px`;
  card.style.setProperty('--card-selected-y', translateY);
  card.classList.toggle('card-selected');
  console.log(card);
};

const blurNotSelectedCards = selectedId => {
  const filtersContainer = document.querySelector('.filters-container');
  const cardsList = document.querySelector('.cards-list');
  const cards = document.querySelectorAll('.card');
  darkLayerToggle();
  filtersContainer.classList.toggle('filters-container-disable');
  cardsList.classList.toggle('cards-list-transform');
  cards.forEach(card => {
    if (card.id != selectedId) {
      card.classList.toggle('card-not-selected');
    }
  });
};

const hideCardsFooter = () => {
  const cardsFooter = document.querySelector('.cards-footer');
  cardsFooter.classList.toggle('cards-list-footer-hide');
};

const cardsReload = () => {
  const cardsList = document.querySelector('.cards-list');
  cardsList.remove();
  setTimeout(() => {
    renderCards();
  }, 500);
};

const cardsNotFound = () => {
  const main = document.querySelector('.main');
  let cardsList = `<div class="cards-list">
                      <div class="cards-not-found">
                        No art object could be found by your query
                      </div>
                    </div>`;
  main.insertAdjacentHTML('beforeend', cardsList);
};

const render = () => {
  const cardsList = createCardsHtml();
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('beforeend', cardsList);
  addCardEvent();
};

export {
  render as renderCards,
  applyCardStyles as showCards,
  cardsNotFound,
  cardsReload
};
