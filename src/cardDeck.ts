import { createDOMCard, type Card } from './card';
import { CARD_LIBRARY } from './cardLibrary';

type DeckOfTruthType = {
  unusedCards: Card[];
  hand: Card[];
  discardPile: Card[];
};

export let DECK_OF_TRUTH: DeckOfTruthType = {
  unusedCards: [
    CARD_LIBRARY[0],
    CARD_LIBRARY[1],
    CARD_LIBRARY[2],
    CARD_LIBRARY[5],
    { ...CARD_LIBRARY[0], level: 1 },
    CARD_LIBRARY[0],
    CARD_LIBRARY[1],
    CARD_LIBRARY[5],
  ],
  hand: [],
  discardPile: [],
};
/**
 * Takes an array of cards, randomizes it, and returns the randomized array.
 * Intended to be used to shuffle your deck (global).
 * Uses the Schwartzian transform.
 * https://stackoverflow.com/a/46545530
 */
export function shuffleCards(cards: Card[]): Card[] {
  return cards
    .map((value) => ({ value, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map(({ value }) => value);
}

export function getAllCards() {
  return DECK_OF_TRUTH.unusedCards.concat(DECK_OF_TRUTH.discardPile);
}

/**
 * Set fresh deck
 */
export function setDeckCards() {
  DECK_OF_TRUTH.unusedCards = shuffleCards(getAllCards());
  DECK_OF_TRUTH.discardPile = [];
}

// Draw one card
export function drawCard(): Card | null {
  if (DECK_OF_TRUTH.unusedCards.length === 0) {
    reshuffleDiscardIntoDraw();
    if (DECK_OF_TRUTH.unusedCards.length === 0) return null; // no cards at all
  }
  return DECK_OF_TRUTH.unusedCards.pop()!;
}

/**
 * Runs drawCard() in a loop of how many cards your handSize is.
 * This all creates a card in the DOM (in #card-holder)
 * @param handSize Number of cards to draw
 */
export function addXCardsToHand(handSize: number = 3) {
  let cardsDrawn = 0;
  while (cardsDrawn < handSize) {
    /** This removes the card from unusedCards */
    const card = drawCard();
    if (!card) break;

    DECK_OF_TRUTH.hand.push(card);

    addCardToHandVisually(card);
    cardsDrawn++;
  }
}

export function addCardToHandVisually(card: Card) {
  const cardToAdd = createDOMCard(card, true);
  document.getElementById('card-holder')?.appendChild(cardToAdd);
}

function clearHandVisually() {
  document.getElementById('card-holder')!.innerHTML = '';
}

export function addWholeHandVisually() {
  // Note: This might not be ideal? But OK for now
  clearHandVisually();
  const cardHolder = document.getElementById('card-holder');
  DECK_OF_TRUTH.hand.forEach((card) =>
    cardHolder?.appendChild(createDOMCard(card, true))
  );
}

export function renderDiscardPile() {
  const discardPileDOM = document.getElementById('discard')!;
  // console.log(discardPileDOM);
  DECK_OF_TRUTH.discardPile.forEach((card) => {
    const cardToAdd = createDOMCard(card, false);
    discardPileDOM.appendChild(cardToAdd);
  });
}

// Discard a card
export function discardCard(card: Card) {
  DECK_OF_TRUTH.discardPile.push(card);
}

// Reshuffle discard into draw pile
export function reshuffleDiscardIntoDraw() {
  if (DECK_OF_TRUTH.discardPile.length === 0) return;
  DECK_OF_TRUTH.unusedCards = shuffleCards(DECK_OF_TRUTH.discardPile);
  DECK_OF_TRUTH.discardPile = [];
}

export function renderWholeDeck() {
  const viewDeck = document.getElementById('view-deck');
  const allCards = DECK_OF_TRUTH.unusedCards.concat(DECK_OF_TRUTH.discardPile);
  allCards.forEach((card) => {
    const cardToDisplay = createDOMCard(card, false);
    viewDeck?.appendChild(cardToDisplay);
  });
}
