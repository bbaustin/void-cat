import { addCardsToHand, INITIAL_CARDS, shuffleCards } from './card';
import { addDOMCatToGrid, createDOMCat } from './cat';
import { createGrid, setGrid } from './grid';
import { initRotator } from './rotator';
import { STAGES, type Stage } from './stage';

export const DOM_CAT = createDOMCat();

function initGame({ gridSize }: Stage) {
  const grid = createGrid(gridSize.x, gridSize.y);
  setGrid(grid);
  initRotator();
  const shuffledHand = shuffleCards(INITIAL_CARDS);
  addCardsToHand(shuffledHand);
  addDOMCatToGrid(DOM_CAT);
}

initGame(STAGES[2]);
