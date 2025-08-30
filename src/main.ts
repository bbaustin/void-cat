import {
  addXCardsToHand,
  renderDiscardPile,
  renderWholeDeck,
  setDeckCards,
} from './cardDeck';
import { addDOMCatToGrid, createDOMCat } from './cat';
import { createEmptyGrid, renderGrid } from './grid';
import { absorbThing } from './thingUtils';
import { initRotator } from './rotator';
import { showScreen } from './screen';
import { STAGES, type Stage } from './stage';
import { pickup2, zzfx } from './sounds';

export const DOM_CAT = createDOMCat();

type GameStateType = {
  caloriesBurned: number;
  money: number;
  energyCurrent: number;
  energyMax: number;
};

export const GAME_STATE_OF_TRUTH: GameStateType = {
  caloriesBurned: 0,
  money: 0,
  energyCurrent: 5,
  energyMax: 5,
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

  /* Show the game screen */
  showScreen('screen-game');
}

export function initIntermission() {
  renderWholeDeck();
  showScreen('screen-intermission');
}

initGame(STAGES[2]);

// WHERE YOU AT
// Finish styling... move rotators to the left and right, i guess?
// those should have the cost and calories too
// time to change text of card on click?
// reallllly want an undo button
// would be next to a next turn button
