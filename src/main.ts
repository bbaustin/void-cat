import {
  addXCardsToHand,
  renderDiscardPile,
  renderWholeDeck,
  setDeckCards,
} from './cardDeck';
import { addDOMCatToGrid, createDOMCat } from './cat';
import { createEmptyGrid, renderGrid } from './grid';
import { initRotator } from './rotator';
import { showScreen } from './screen';
import { STAGES, type Stage } from './stage';
import { initNextTurnButton } from './stageTurn';

export const DOM_CAT = createDOMCat();

type GameStateType = {
  caloriesBurned: number;
  money: number;
  energyCurrent: number;
  energyMax: number;
  currentTurn: number;
  currentStage: number;
};

export const GAME_STATE_OF_TRUTH: GameStateType = {
  caloriesBurned: 0,
  money: 0,
  energyCurrent: 5,
  energyMax: 5,
  currentTurn: 1,
  currentStage: 2, //pls change
};

export function setGameState<K extends keyof GameStateType>(
  key: K,
  value: GameStateType[K]
): void {
  GAME_STATE_OF_TRUTH[key] = value;
}

function initGame({ gridSize, terrain }: Stage) {
  /* Draw game grid */
  const grid = createEmptyGrid(gridSize.x, gridSize.y, terrain);
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

  /* Init the next turn button */
  initNextTurnButton();

  /* Show the game screen */
  showScreen('screen-game');
}

export function initIntermission() {
  renderWholeDeck();
  showScreen('screen-intermission');
}

initGame(STAGES[GAME_STATE_OF_TRUTH.currentStage]);
