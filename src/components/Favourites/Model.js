import { getCollection as getCards } from "../Api";

let cards = [];

class Card {
  constructor(card) {
    this.id = card.objectNumber;
    this.headerImage = card.headerImage.url;
    this.longTitle = card.longTitle;
  }
}

const createCardsData = async () => {
  const rawCardsList = await getCards();
  cards = rawCardsList.map(card => new Card(card));
  return cards;
};

const calculateCardPositions = cards => {
  // Starting position begins at the left top corner just below the header.
  // Each new items is generated from left to right.
  // After every 7 items, there will be a new line (+180px).
  //
  //  y
  //  ↑
  //  ╎ (0:0)
  //  ╎  ▯▯▯▯▯▯▯
  //  ╎  ▯▯▯▯▯▯▯
  //  ╎  ▯▯▯▯▯▯▯
  //  -----------→x
  const positions = [];
  const itemsInRow = 2;
  let x = 0;
  let y = -200;

  for (let i = 0; i < cards.length; i++) {
    // if there is place in a row - add item to row
    if (i % itemsInRow) {
      x += 540;

      // if no place in a row - move to new row
    } else {
      y += 200;
      x = 0;
    }

    positions.push({ x, y });
  }

  return positions;
};

export { createCardsData, cards as cardsData, calculateCardPositions };
