import { triggerAttack } from './attack';
import { addXCardsToHand } from './cardDeck';
import {
  GAME_STATE_OF_TRUTH,
  initGame,
  initIntermission,
  setGameState,
} from './main';
import { updateEnergy, updateTurn } from './meterUtils';
import { showScreen } from './screen';
import { STAGES } from './stage';
import { handleEffectsSequentially } from './utils';

export function initNextTurnButton() {
  document
    .getElementById('next')
    ?.addEventListener('click', () => handleNextButtonClick());
}

export function handleNextButtonClick() {
  if (GAME_STATE_OF_TRUTH.currentScreen === 'screen-intermission') {
    setGameState('currentStage', GAME_STATE_OF_TRUTH.currentStage + 1);
    return initGame(STAGES[GAME_STATE_OF_TRUTH.currentStage]);
  }

  if (!isLastTurn()) {
    return updateTurnViaButton();
  }

  if (isLastTurn()) {
    setGameState('currentScreen', 'screen-intermission');
    return initIntermission();
  }
}

export function updateTurnViaButton() {
  const newTurnValue = GAME_STATE_OF_TRUTH.currentTurn + 1;
  addXCardsToHand();

  // trigger "attack" stage
  triggerAttack();

  // somehow wait for above

  updateTurn(newTurnValue);
  updateEnergy(1);
  updateNextButtonText();
}

export function updateViaIntermission() {
  const nextButton = document.getElementById('next');
  if (!nextButton) return null;

  nextButton.innerHTML = 'Go to next stage';
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
  }
}
