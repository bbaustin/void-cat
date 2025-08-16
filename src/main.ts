import { addCardsToHand, INITIAL_CARDS, shuffleCards } from './cards';
import { addCatToGrid, createCat } from './cat';
import { createGrid, setGrid } from './grid';

export const VOID_CAT = createCat();

function initGame() {
  const grid = createGrid(10, 10);
  setGrid(grid);
  const shuffledHand = shuffleCards(INITIAL_CARDS);
  addCardsToHand(shuffledHand);
  addCatToGrid(VOID_CAT);
}

initGame();
