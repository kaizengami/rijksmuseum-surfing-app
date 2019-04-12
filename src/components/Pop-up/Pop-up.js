import './Pop-up.scss';
import { createPopUpData, popUpData } from './Data';
import { showCards, cardsReload } from '../Cards/Cards';
import settings from '../Settings';

let data = {};
let inFavorite = false;

const popUpHtml = popUpData => {
  data = popUpData;
  console.log(data);
  const { title, imageUrl, description, makerLine, physicalMedium } = popUpData;
  return `<section class="pop-up">
                <button class="pop-up-back" value="back">←</button>
                <button class="pop-up-favorite 
                  ${
                    isInFavoriteList(data.objectNumber) ? 'favorite-active' : ''
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
                  <div class="pop-up-row pop-up-row-hidden">
                    <span>Maker line:</span>
                    <div class="maker-line">${makerLine}</div>
                  </div>
                  <div class="pop-up-row pop-up-row-hidden">
                    <span>Physical medium:</span>
                    <div class="physical-medium">${physicalMedium}</div>
                  </div>
                  <div class="pop-up-row pop-up-row-hidden">
                    <span>Category:</span>
                    <div class="category">${createPopUpLinks(
                      popUpData.category
                    )}</div>
                  </div>
                  <div class="pop-up-row pop-up-row-hidden">
                    <span>Tags:</span>
                    <div class="tags">${createPopUpLinks(popUpData.tags)}</div>
                  </div>
                </section>
                <div class="pop-up-row space-around">
                    <button class="pop-up-view-more" value="view_more">View more details</button>
                    <button class="pop-up-close" value="close">Close</button>
                </div>
            </section>`;
};

const popUpLinkHtml = link => {
  return `<a href="#${link}">${link}</a>`;
};

const createPopUpLinks = links => {
  return links.map(link => popUpLinkHtml(link)).join('');
};

const createPopUpHtml = async objectNumber => {
  let popUpData = await createPopUpData(objectNumber);
  return popUpHtml(popUpData);
};

const togglePopUpVisibility = () => {
  const popUp = document.querySelector('.pop-up');
  popUp.classList.toggle('pop-up-visible');
};

const addPopUpEvents = () => {
  const buttons = document.querySelectorAll('.pop-up button');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      switch (e.target.value) {
        case 'back':
          buttonBack();
          break;
        case 'favorite':
          buttonFavorite(e);
          break;
        case 'view_more':
          buttonViewMore();
          break;
        case 'close':
          buttonClose(e);
          break;
      }
    });
  });
};

const buttonFavorite = () => {
  //if ()
  settings.favorites.push(data);
  console.log(settings.favorites);
};

const isInFavoriteList = objectNumber => {
  for (let favorite of settings.favorites) {
    console.log(favorite);
    if (objectNumber === favorite.objectNumber) return true;
  }
  return false;
};

const buttonViewMore = () => {
  showViewMore();
};

const showViewMore = () => {
  const popUp = document.querySelector('.pop-up');
  const popUpBack = document.querySelector('.pop-up-back');
  const buttonViewMore = document.querySelector('.pop-up-view-more');
  const buttonClose = document.querySelector('.pop-up-close');
  const moreDetails = document.querySelectorAll(
    '.more-details .pop-up-row-hidden'
  );
  popUp.classList.add('pop-up-more-details');
  popUpBack.classList.add('pop-up-back-visible');
  buttonViewMore.classList.add('button-hide');
  buttonClose.classList.add('button-hide');
  toggleCardsVisibility();
  moreDetails.forEach(rowHidden => {
    rowHidden.classList.remove('pop-up-row-hidden');
  });
};

const toggleCardsVisibility = () => {
  const cardsList = document.querySelector('main');
  cardsList.classList.toggle('main-hide');
};

const buttonClose = e => {
  const popUp = e.target.closest('.pop-up');
  const selectedCard = document.getElementById(popUpData.objectNumber);
  showCards(selectedCard);
  togglePopUpVisibility();
  popUp.addEventListener('transitionend', () => {
    popUp.remove();
  });
};

const buttonBack = () => {
  const popUp = document.querySelector('.pop-up');
  const selectedCard = document.getElementById(popUpData.objectNumber);
  showCards(selectedCard);
  toggleCardsVisibility();
  togglePopUpVisibility();
  popUp.addEventListener('transitionend', () => {
    popUp.remove();
  });
};

const addMoreDetailsLinkEvents = () => {
  const moreDetails = document.querySelector('.more-details');
  moreDetails.addEventListener('click', e => {
    let tagName = e.target.tagName.toLowerCase();
    if (tagName === 'a') {
      let link = e.target;
      let parentDiv = e.target.closest('div');
      if (parentDiv.classList.contains('category')) {
        moreDetailsCardsReload(link);
      }
      if (parentDiv.classList.contains('tags')) {
        moreDetailsCardsReload(link);
      }
    }
  });
};

const moreDetailsCardsReload = link => {
  const popUp = document.querySelector('.pop-up');
  const darkLayer = document.querySelector('.dark-layer');
  const filtersContainer = document.querySelector('.filters-container');
  settings.filters.keyword = link.getAttribute('href').replace('#', '');
  darkLayer.classList.remove('dark-layer-visible');
  filtersContainer.classList.remove('filters-container-disable');
  popUp.remove();
  toggleCardsVisibility();
  cardsReload();
};

const render = async objectNumber => {
  const popUp = await createPopUpHtml(objectNumber);
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('afterend', popUp);
  addPopUpEvents();
  addMoreDetailsLinkEvents();
  setTimeout(() => {
    togglePopUpVisibility();
  }, 50);
};

export default render;
