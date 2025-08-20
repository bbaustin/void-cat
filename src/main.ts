import { addXCardsToHand, shuffleCards } from './card';
import { DECK_OF_TRUTH, renderWholeDeck, setDeck } from './cardDeck';
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
  setDeck(shuffleCards(DECK_OF_TRUTH));
  addXCardsToHand(DECK_OF_TRUTH);
  addDOMCatToGrid(DOM_CAT);
  showScreen('screen-game');
}

// initGame(STAGES[2]);

function initIntermission() {
  renderWholeDeck();
  showScreen('screen-intermission');
}

initIntermission();
