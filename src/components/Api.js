const API_KEY = "0zZyVckt";

const getCollection = async (cards = 10) => {
  let cardsPerPage = cards;
  const COLLECTION_API_LINK = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&format=json&ps=${cardsPerPage}`;
  try {
    const response = await fetch(COLLECTION_API_LINK);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let data = await response.json();
    console.log(data);
    return data.artObjects;
  } catch (err) {
    return err;
  }
};

const getCollectionDetails = async objectNumber => {
  const COLLECTION_API_LINK = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${API_KEY}&format=json`;
  try {
    const response = await fetch(COLLECTION_API_LINK);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let data = await response.json();
    console.log(data);
    return data.artObject;
  } catch (err) {
    return err;
  }
};

export { getCollection as getCards, getCollectionDetails as getCardDetails };
