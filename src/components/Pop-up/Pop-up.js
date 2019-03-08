import "./Pop-up.scss";
import { createPopUpData } from "./Data";

const popUpHtml = (title, imgUrl, description, makerLine, physicalMedium) => {
  return `<div class="pop-up">
                <button class="pop-up-favorite">❤</button>
                <h1>${title}</h1>
                <div class="pop-up-row">
                    <img src="${imgUrl}">
                    <div class="pop-up-description">${description}</div>
                </div>
                <div class="pop-up-row padding-top-10">
                  <span>Maker line:</span>
                  <div class="maker-line">${makerLine}</div>
                </div>
                <div class="pop-up-row">
                  <span>Physical medium:</span>
                  <div class="physical-medium">${physicalMedium}</div>
                </div>
                <div class="pop-up-row">
                  <span>Category:</span>
                  <div class="category"></div>
                </div>
                <div class="pop-up-row">
                  <span>Tags:</span>
                  <div class="tags"></div>
                </div>
                <div class="pop-up-row space-around">
                    <button class="pop-up-view-more" value="view_more">View more details</button>
                    <button class="pop-up-close" value="close">Close</button>
                </div>
            </div>`;
};

const createPopUpHtml = async objectNumber => {
  let popUpData = await createPopUpData(objectNumber);
  await console.log("popUpData" + popUpData);
  return popUpHtml(
    popUpData.title,
    popUpData.imageUrl,
    popUpData.description,
    popUpData.makerLine,
    popUpData.physicalMedium
  );
};

const addPopUpEvents = () => {
  const buttons = document.querySelectorAll(".pop-up button");
  console.log(buttons);
  buttons.forEach(button => {
    button.addEventListener("click", e => {
      switch (e.target.value) {
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
  console.log("View more");
};

const buttonClose = e => {
  const popUp = e.target.closest(".pop-up");
  popUp.remove();
};

const render = async objectNumber => {
  const popUp = await createPopUpHtml(objectNumber);
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", popUp);
  addPopUpEvents();
};

export default render;
