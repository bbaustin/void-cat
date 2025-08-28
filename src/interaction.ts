import { CAT_OF_TRUTH } from './cat';
import { GAME_STATE_OF_TRUTH, setGameState } from './main';
import { type Card, getCardAttribute } from './card';

export function absorbThing() {
  // Do I want a "THING_OF_TRUTH" global?
}

export function updateEnergyAndCalMeters(card: Card) {
  /* Update game state with calorie information */
  const caloriesBurned = getCardAttribute(card, 'caloriesBurned');
  const updatedCaloriesBurned =
    GAME_STATE_OF_TRUTH.caloriesBurned + caloriesBurned;
  setGameState('caloriesBurned', updatedCaloriesBurned);

  /* Update game state with energy information */
  const energySpent = getCardAttribute(card, 'cost');
  const updatedEnergy = Math.max(
    GAME_STATE_OF_TRUTH.energyCurrent - energySpent,
    0
  );
  setGameState('energyCurrent', updatedEnergy);

  /* Update DOM */
  document.querySelector(
    '.calories .meter-number'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.caloriesBurned}`;

  document.querySelector(
    '.energy .meter-number #numerator'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.energyCurrent}`;
}
