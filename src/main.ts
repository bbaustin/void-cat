import {
  addXCardsToHand,
  renderDiscardPile,
  // renderWholeDeck,
  setDeckCards,
} from './cardDeck';
import { addDOMCatToGrid, createDOMCat } from './cat';
import { createEmptyGrid, renderGrid } from './grid';
import { initRotator } from './rotator';
import { showScreen, type ScreenId } from './screen';
import { STAGES, type Stage } from './stage';
import {
  initNextTurnButton,
  updateNextButtonViaGoingToIntermission,
} from './nextButton';
import {
  handleUpgradeCatButtonClick,
  initBuyCardsButton,
  initUpgradeCardsButton,
  initUpgradeCatButton,
} from './stageIntermission';
import { GAME_STATE_OF_TRUTH } from './gameState';

export const DOM_CAT = createDOMCat();

export function initGame({ gridSize, terrain }: Stage) {
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
  // renderDiscardPile();

  /* Add the DOMcat to the grid! */
  addDOMCatToGrid(DOM_CAT);

  /* Init the next turn button */
  initNextTurnButton();
  // TODO: These should be in initIntermission
  initBuyCardsButton();
  initUpgradeCardsButton();
  initUpgradeCatButton();

  /* Show the game screen */
  showScreen('screen-game');
}

export function initIntermission() {
  showScreen('screen-intermission');
  /* Initiate with first button clicked */
  /* May get rid of this stuff as deadline draws near */
  handleUpgradeCatButtonClick();
  updateNextButtonViaGoingToIntermission();
}

initGame(STAGES[GAME_STATE_OF_TRUTH.currentStage]);
