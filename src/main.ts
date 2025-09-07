import { addXCardsToHand, setDeckCards } from './cardDeck';
import { addDOMCatToGrid, CAT_OF_TRUTH, createDOMCat } from './cat';
import { createEmptyGrid, renderGrid } from './grid';
import { initRotator } from './rotator';
import { showScreen } from './screen';
import { STAGES, type Stage } from './stage';
import {
  initNextTurnButton,
  updateNextButtonViaGoingToIntermission,
} from './nextButton';
import { GAME_STATE_OF_TRUTH } from './gameState';
import { updateTextAndButtonText } from './stageIntermission';

export let DOM_CAT = createDOMCat();

export function initGame({ gridSize, terrain }: Stage) {
  /* Draw game grid */
  const grid = createEmptyGrid(gridSize.x, gridSize.y, terrain);
  renderGrid(grid);

  /* Add the DOMcat to the grid! */
  DOM_CAT = createDOMCat();
  addDOMCatToGrid(DOM_CAT);

  //where you at
  // on stages after 0 cat of truth positions etc
  //are NOT being reset
  CAT_OF_TRUTH.headX = 0;
  CAT_OF_TRUTH.headY = 0;
  CAT_OF_TRUTH.headFacing = 'top';
  CAT_OF_TRUTH.length = 2;
  CAT_OF_TRUTH.stance = 'standard';

  DOM_CAT.dataset.x = `${CAT_OF_TRUTH.headX}`;
  DOM_CAT.dataset.y = `${CAT_OF_TRUTH.headY}`;
  DOM_CAT.dataset.length = `${CAT_OF_TRUTH.length}`;
  DOM_CAT.dataset.headFacing = CAT_OF_TRUTH.headFacing;
  DOM_CAT.dataset.stance = CAT_OF_TRUTH.stance;

  /* Put all cards into the "unused" pile
   * Do this after setting up the cat so the cards are correct */
  setDeckCards();

  /* Add cards to your hand (default: 3) */
  addXCardsToHand();

  /* Create rotator buttons
   * Also do this after CAT so rotator angles are right... */
  initRotator();

  /* Init the next turn button */
  initNextTurnButton();

  /* Show the game screen */
  showScreen('screen-game');
}

export function initIntermission(currentStage: number) {
  /* Init the next turn button */
  initNextTurnButton();

  showScreen('screen-intermission');

  updateTextAndButtonText(currentStage);

  // TODO: Might not want this?
  updateNextButtonViaGoingToIntermission();
}

// initGame(STAGES[GAME_STATE_OF_TRUTH.currentStage]);

initIntermission(GAME_STATE_OF_TRUTH.currentStage);
