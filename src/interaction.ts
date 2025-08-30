import { GAME_STATE_OF_TRUTH, setGameState } from './main';
import { type Card, getCardAttribute } from './card';
import { clamp } from './utils';

export function absorbThing() {
  // Do I want a "THING_OF_TRUTH" global?
}

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
 * @param card Card played
 */
export function updateEnergy(amount: number) {
  /* Update game state with energy information */
  const updatedEnergy = clamp(
    GAME_STATE_OF_TRUTH.energyCurrent + amount,
    0,
    GAME_STATE_OF_TRUTH.energyMax
  );
  setGameState('energyCurrent', updatedEnergy);

  /* Update the DOM */
  document.querySelector(
    '.energy .meter-number #numerator'
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
  const updatedMoney = GAME_STATE_OF_TRUTH.money + amount;
  setGameState('money', updatedMoney);
  document.querySelector(
    '.money .meter-number'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.money}`;
}

// This might not want to be here
export function updateTurn() {}
