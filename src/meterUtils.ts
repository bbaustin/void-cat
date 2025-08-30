import { GAME_STATE_OF_TRUTH, setGameState } from './main';
import { type Card, getCardAttribute } from './card';
import { clamp } from './utils';
import { STAGES } from './stage';
import { addXCardsToHand } from './cardDeck';

/**
 * Helper helper, to update the two most commonly updated meters.
 * Probably used when playing a card.
 * @param card the card played
 */
export function updateEnergyAndCalMetersAfterPlayingCard(card: Card) {
  /* Negative of card cost */
  const energySpent = -getCardAttribute(card, 'cost');
  updateEnergy(energySpent);
  updateCaloriesBurned(card);
}

/**
 * Update
 * @param amountToAdd amount of energy to be added to current energy
 */
export function updateEnergy(amountToAdd: number) {
  /* Update game state with energy information */
  const updatedEnergy = clamp(
    GAME_STATE_OF_TRUTH.energyCurrent + amountToAdd,
    0,
    GAME_STATE_OF_TRUTH.energyMax
  );
  setGameState('energyCurrent', updatedEnergy);

  /* Update the DOM */
  document.querySelector(
    '.energy .meter-number .numerator'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.energyCurrent}`;
}

export function updateCaloriesBurned(card: Card) {
  /* Update game state with calorie information */
  const caloriesBurned = getCardAttribute(card, 'caloriesBurned');
  const updatedCaloriesBurned =
    GAME_STATE_OF_TRUTH.caloriesBurned + caloriesBurned;
  setGameState('caloriesBurned', updatedCaloriesBurned);

  /* Update DOM */
  document.querySelector(
    '.calories .meter-number'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.caloriesBurned}`;
}

/**
 * Updates
 * @param amount Positive number for coins, negative number for spending
 */
export function updateMoney(amount: number) {
  /* Update game state with money information */
  const updatedMoney = GAME_STATE_OF_TRUTH.money + amount;
  setGameState('money', updatedMoney);

  /* Update DOM */
  document.querySelector(
    '.money .meter-number'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.money}`;
}

// TODO: Might wanna be able to apply a turn here
export function updateTurn(turn: number) {
  const currentStageMaxTurns =
    STAGES[GAME_STATE_OF_TRUTH.currentStage].turns || 5;

  /* In this case, we've reached the end of this stage.
   * Go to the intermission stage. */
  if (turn > currentStageMaxTurns) {
    // maybe trigger some message, and then go to intermission
    return;
  }
  /* Update state */
  setGameState('currentTurn', turn);

  /* Update DOM */
  document.querySelector(
    '.turn .meter-number .numerator'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.currentTurn}`;

  return;
}

export function updateTurnViaButton() {
  const newTurnValue = GAME_STATE_OF_TRUTH.currentTurn + 1;
  console.log(newTurnValue);
  addXCardsToHand();

  // trigger "attack" stage

  // somehow wait for above

  updateTurn(newTurnValue);
  updateEnergy(1);
}
