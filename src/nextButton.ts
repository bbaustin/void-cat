import { disableAllButtons, enableAllButtons, triggerAttack } from './attack';
import { addXCardsToHand } from './cardDeck';
import {
  GAME_STATE_OF_TRUTH,
  initGame,
  initIntermission,
  setGameState,
} from './main';
import { updateEnergy, updateTurn } from './meterUtils';
import { STAGES } from './stage';
import { generateThingCoordinatesInDiamondShape } from './thing';
import { addThingsToGrid, removeClassNamesFromGrid } from './thingUtils';
import { delay, handleEffectsSequentially } from './utils';

export function initNextTurnButton() {
  const nextButton = document.getElementById('next');
  if (!nextButton) return;
  nextButton.removeEventListener('click', handleNextButtonClick);
  nextButton.addEventListener('click', handleNextButtonClick);
}

export function handleNextButtonClick() {
  if (GAME_STATE_OF_TRUTH.currentScreen === 'screen-intermission') {
    setGameState('currentStage', GAME_STATE_OF_TRUTH.currentStage + 1);
    setGameState('currentScreen', 'screen-game');
    updateTurn(1);
    updateEnergy(GAME_STATE_OF_TRUTH.energyMax);
    updateNextButtonText();
    return initGame(STAGES[GAME_STATE_OF_TRUTH.currentStage]);
  }

  if (!isLastTurn()) {
    return updateTurnViaButton();
  }

  if (isLastTurn()) {
    setGameState('currentScreen', 'screen-intermission');
    document.getElementById('next')!.classList.remove('warning');
    return initIntermission();
  }
}

export async function updateTurnViaButton() {
  const newTurnValue = GAME_STATE_OF_TRUTH.currentTurn + 1;
  addXCardsToHand();

  // trigger "attack" stage
  await handleEffectsSequentially(
    [
      // make everything unclickable
      () => disableAllButtons(),

      // if there's an attack square, trigger it audiovisually
      // also calculate how many tiles were struck with the attack
      () => triggerAttack(),

      // update meters
      () => updateTurn(newTurnValue),
      () => updateEnergy(1),
      () => updateNextButtonText(),

      // update grid
      () => removeClassNamesFromGrid('attack'),
      () =>
        addThingsToGrid(
          // generateThingCoordinatesInDiamondShape(
          //   STAGES[GAME_STATE_OF_TRUTH.currentStage].gridSize.x
          // ),
          STAGES[GAME_STATE_OF_TRUTH.currentStage].attackCoordinates[
            GAME_STATE_OF_TRUTH.currentTurn
          ],
          { className: 'attack' }
        ),

      // make everything clickable again
      () => enableAllButtons(),
    ],
    300
  );
}

export function isLastTurn() {
  const { currentTurn, currentStage } = GAME_STATE_OF_TRUTH;
  const totalTurns = STAGES[currentStage].turns || 5;

  return currentTurn >= totalTurns;
}

export function updateNextButtonText() {
  const nextButton = document.getElementById('next');
  if (!nextButton) return null;

  if (isLastTurn()) {
    handleEffectsSequentially(
      [
        () => (nextButton.innerHTML = 'End stage'),
        () => nextButton.classList.add('warning'),
      ],
      1200
    );
  } else {
    nextButton.classList.remove('warning');
    nextButton.innerHTML = 'Next turn';
  }
}

export function updateNextButtonViaGoingToIntermission() {
  const nextButton = document.getElementById('next');
  if (!nextButton) return null;

  nextButton.innerHTML = 'Go to next stage';
}
