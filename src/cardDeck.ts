import { createDOMCard, type Card } from './card';
import { CARD_LIBRARY } from './cardLibrary';

export let DECK_OF_TRUTH: Card[] = [
  CARD_LIBRARY[0],
  CARD_LIBRARY[1],
  CARD_LIBRARY[2],
  CARD_LIBRARY[5],
  { ...CARD_LIBRARY[0], level: 1 },
  CARD_LIBRARY[0],
  CARD_LIBRARY[1],
  CARD_LIBRARY[5],
];

// Minor TODO: This is probably ideal for all global varibles, to avoid chaos
export function setDeck(deck: Card[]) {
  DECK_OF_TRUTH = deck;
}

export function renderWholeDeck() {
  const viewDeck = document.getElementById('view-deck');
  DECK_OF_TRUTH.forEach((card) => {
    const cardToDisplay = createDOMCard(card, false);
    viewDeck?.appendChild(cardToDisplay);
  });
}
