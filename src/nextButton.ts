import { disableAllButtons, enableAllButtons, triggerAttack } from './attack';
import { addXCardsToHand } from './cardDeck';
import { stopScriptEvents } from './drama';

import { GAME_STATE_OF_TRUTH, setGameState } from './gameState';
import { initGame, initIntermission } from './main';
import { updateEnergy, updateTurn } from './meterUtils';
import { STAGES } from './stage';
import { addThingsToGrid, removeClassNamesFromGrid } from './thingUtils';
import { handleEffectsSequentially } from './utils';

export function initNextTurnButton() {
  const nextButton = document.querySelectorAll('.next');
  if (!nextButton) return;
  nextButton.forEach((btn) => {
    btn.removeEventListener('click', handleNextButtonClick);
    btn.addEventListener('click', handleNextButtonClick);
    console.log(nextButton);
  });
}

export function handleNextButtonClick() {
  if (GAME_STATE_OF_TRUTH.currentScreen === 'screen-intermission') {
    setGameState('currentScreen', 'screen-game');
    updateTurn(1);
    updateEnergy(GAME_STATE_OF_TRUTH.energyMax);
    updateNextButtonText();
    return initGame(STAGES[GAME_STATE_OF_TRUTH.currentStage]);
  }

  if (!isLastTurn()) {
    return updateTurnViaButton();
  }

  /** Add 1 to the stage
   * Switch the screen */
  if (isLastTurn()) {
    setGameState('currentStage', GAME_STATE_OF_TRUTH.currentStage + 1);
    setGameState('currentScreen', 'screen-intermission');
    document.querySelector('.next')!.classList.remove('warning');
    return initIntermission(GAME_STATE_OF_TRUTH.currentStage);
  }
}

export async function updateTurnViaButton() {
  const newTurnValue = GAME_STATE_OF_TRUTH.currentTurn + 1;
  addXCardsToHand();

  stopScriptEvents();

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
      () => updateEnergy(GAME_STATE_OF_TRUTH.energyMax),
      () => updateNextButtonText(),

      // update grid
      () => removeClassNamesFromGrid('attack'),
      () =>
        addThingsToGrid(
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
  const nextButton = document.querySelector('.next');
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
  const nextButton = document.querySelector('.next');
  if (!nextButton) return null;

  nextButton.innerHTML = 'Go to next stage';
}
