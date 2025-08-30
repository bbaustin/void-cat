import { triggerAttack } from './attack';
import { addXCardsToHand } from './cardDeck';
import { GAME_STATE_OF_TRUTH } from './main';
import { updateEnergy, updateTurn } from './meterUtils';

export function initNextTurnButton() {
  document
    .getElementById('next')
    ?.addEventListener('click', () => updateTurnViaButton());
}

export function updateTurnViaButton() {
  const newTurnValue = GAME_STATE_OF_TRUTH.currentTurn + 1;
  addXCardsToHand();

  // trigger "attack" stage
  triggerAttack();

  // somehow wait for above

  updateTurn(newTurnValue);
  updateEnergy(1);
}
