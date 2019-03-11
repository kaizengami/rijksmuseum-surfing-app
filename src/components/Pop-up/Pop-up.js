import "./Pop-up.scss";
import { createPopUpData, popUpData } from "./Data";
import { showCards } from "../Cards/Cards";

const popUpHtml = popUpData => {
  const { title, imageUrl, description, makerLine, physicalMedium } = popUpData;
  return `<section class="pop-up">
                <button class="pop-up-back" value="back">←</button>
                <button class="pop-up-favorite" value="favorite">❤</button>
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
  return links.map(link => popUpLinkHtml(link)).join("");
};

const createPopUpHtml = async objectNumber => {
  let popUpData = await createPopUpData(objectNumber);
  return popUpHtml(popUpData);
};

const togglePopUpVisibility = () => {
  const popUp = document.querySelector(".pop-up");
  popUp.classList.toggle("pop-up-visible");
};

const addPopUpEvents = () => {
  const buttons = document.querySelectorAll(".pop-up button");
  buttons.forEach(button => {
    button.addEventListener("click", e => {
      switch (e.target.value) {
        case "back":
          buttonBack();
          break;
        case "favorite":
          break;
        case "view_more":
          buttonViewMore();
          break;
        case "close":
          buttonClose(e);
          break;
      }
    });
  });
};

const buttonViewMore = () => {
  showViewMore();
};

const showViewMore = () => {
  const popUp = document.querySelector(".pop-up");
  const popUpBack = document.querySelector(".pop-up-back");
  const buttonViewMore = document.querySelector(".pop-up-view-more");
  const buttonClose = document.querySelector(".pop-up-close");
  const moreDetails = document.querySelectorAll(
    ".more-details .pop-up-row-hidden"
  );
  popUp.classList.add("pop-up-more-details");
  popUpBack.classList.add("pop-up-back-visible");
  buttonViewMore.classList.add("button-hide");
  buttonClose.classList.add("button-hide");
  toggleCardsVisibility();
  moreDetails.forEach(rowHidden => {
    rowHidden.classList.remove("pop-up-row-hidden");
  });
};

const toggleCardsVisibility = () => {
  const cardsList = document.querySelector("main");
  cardsList.classList.toggle("main-hide");
};

const buttonClose = e => {
  const popUp = e.target.closest(".pop-up");
  const selectedCard = document.getElementById(popUpData.objectNumber);
  showCards(selectedCard);
  togglePopUpVisibility();
  popUp.addEventListener("transitionend", () => {
    popUp.remove();
  });
};

const buttonBack = () => {
  const popUp = document.querySelector(".pop-up");
  const selectedCard = document.getElementById(popUpData.objectNumber);
  showCards(selectedCard);
  toggleCardsVisibility();
  togglePopUpVisibility();
  popUp.addEventListener("transitionend", () => {
    popUp.remove();
  });
};

const render = async objectNumber => {
  const popUp = await createPopUpHtml(objectNumber);
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("afterend", popUp);
  addPopUpEvents();
  setTimeout(() => {
    togglePopUpVisibility();
  }, 50);
};

export default render;
