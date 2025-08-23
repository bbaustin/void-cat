import {
  addXCardsToHand,
  renderDiscardPile,
  renderWholeDeck,
  setDeckCards,
} from './cardDeck';
import { addDOMCatToGrid, createDOMCat } from './cat';
import { createGrid, renderGrid } from './grid';
import { initRotator } from './rotator';
import { showScreen } from './screen';
import { STAGES, type Stage } from './stage';

export const DOM_CAT = createDOMCat();

function initGame({ gridSize }: Stage) {
  /* Draw game grid */
  const grid = createGrid(gridSize.x, gridSize.y);
  renderGrid(grid);

  /* Create rotator buttons */
  initRotator();

  /* Put all cards into the "unusued" pile */
  setDeckCards();

  /* Add cards to your hand (default: 3) */
  addXCardsToHand();

  // temporary... debugging
  renderDiscardPile();

  /* Add the DOMcat to the grid! */
  addDOMCatToGrid(DOM_CAT);

  /* Show the game screen */
  showScreen('screen-game');
}

function initIntermission() {
  renderWholeDeck();
  showScreen('screen-intermission');
}

initGame(STAGES[2]);
