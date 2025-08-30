import { triggerAttacksVisually } from './attack';
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
  console.log(newTurnValue);
  addXCardsToHand();

  // trigger "attack" stage
  triggerAttacksVisually();

  // somehow wait for above

  updateTurn(newTurnValue);
  updateEnergy(1);
}
