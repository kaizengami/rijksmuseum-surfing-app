import "./Pagination.scss";
//import { createPopUpData, popUpData } from "./Data";
const paginationHtml = () => {
  return `<div class"pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <span>...</span>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
            </div>`;
};

const createPaginationHtml = async objectNumber => {
  let popUpData = await createPopUpData(objectNumber);
  await console.log("popUpData" + popUpData);
  return popUpHtml(popUpData);
};

const render = async objectNumber => {
  //const popUp = await createPopUpHtml(objectNumber);
  const pagination = paginationHtml();
  const main = document.querySelector(".main");
  main.insertAdjacentHTML("beforeend", pagination);
  //addPaginationEvents();
};

export default render;
