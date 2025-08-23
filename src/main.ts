import {
  addXCardsToHand,
  renderDiscardPile,
  renderWholeDeck,
  setDeckCards,
} from './cardDeck';
import { addDOMCatToGrid, createDOMCat } from './cat';
import { createGrid, setGrid } from './grid';
import { initRotator } from './rotator';
import { showScreen } from './screen';
import { STAGES, type Stage } from './stage';

export const DOM_CAT = createDOMCat();

function initGame({ gridSize }: Stage) {
  const grid = createGrid(gridSize.x, gridSize.y);
  setGrid(grid);
  initRotator();
  setDeckCards();
  addXCardsToHand();
  renderDiscardPile();
  addDOMCatToGrid(DOM_CAT);
  showScreen('screen-game');
}

function initIntermission() {
  renderWholeDeck();
  showScreen('screen-intermission');
}

initGame(STAGES[2]);
