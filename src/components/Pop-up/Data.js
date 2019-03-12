import { getCollectionDetails as getCardDetails } from "../Api";

let popUp = [];

class PopUp {
  constructor(popUp) {
    this.title = popUp.title;
    this.description = popUp.description;
    this.imageUrl = popUp.webImage.url;
    this.makerLine = popUp.label.makerLine;
    this.physicalMedium = popUp.physicalMedium;
    this.documentation = popUp.documentation;
    this.category = popUp.objectCollection;
    this.tags = popUp.objectTypes;
    this.objectNumber = popUp.objectNumber;
  }
}

const createPopUpData = async objectNumber => {
  const rawPopUp = await getCardDetails(objectNumber);
  popUp = new PopUp(rawPopUp);
  return popUp;
};

export { createPopUpData, popUp as popUpData };
