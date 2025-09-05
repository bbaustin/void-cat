import { GAME_STATE_OF_TRUTH, setGameState } from './gameState';
import { type Card, getCardAttribute } from './card';
import { clamp } from './utils';
import { STAGES } from './stage';
import { CAT_OF_TRUTH } from './cat';
import { playBurnCals } from './sounds';

/**
 * Helper helper, to update the two most commonly updated meters.
 * Probably used when playing a card.
 * @param card the card played
 */
export function updateEnergyAndCalMetersAfterPlayingCard(card: Card) {
  /** Get card costs */
  // Negative of card cost
  const energySpent = -getCardAttribute(card, 'cost');
  const caloriesBurned = getCardAttribute(card, 'caloriesBurned');

  /** Burn one more calorie if in longcat position
   * AND the amount is positive (i.e., not getting attacked)
   * Might wanna do x2 for this */
  const napAdjustment = CAT_OF_TRUTH.stance === 'nap' ? -1 : 0;
  const longCatAdjustment =
    CAT_OF_TRUTH.stance === 'longcat' && caloriesBurned > 0 ? 1 : 0;

  updateEnergy(energySpent + napAdjustment);
  updateCaloriesBurned(caloriesBurned + longCatAdjustment);
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

export function updateCaloriesBurned(amount: number) {
  /* Update game state with calorie information */
  const updatedCaloriesBurned = GAME_STATE_OF_TRUTH.caloriesBurned + amount;
  setGameState('caloriesBurned', updatedCaloriesBurned);

  /* Update DOM */
  document.querySelector(
    '.calories .meter-number'
  )!.innerHTML = `${GAME_STATE_OF_TRUTH.caloriesBurned}`;

  if (amount > 0) {
    playBurnCals();
    const calorieMeter = document.querySelector('.meter.calories');
    calorieMeter?.classList.remove('attention'); // remove the other one
    calorieMeter?.classList.remove('slight-attention');
    void (calorieMeter as HTMLElement).offsetWidth;
    calorieMeter?.classList.add('slight-attention');
  }

  if (amount < 0) {
    const calsMeter = document.querySelector('.meter.calories');
    calsMeter?.classList.remove('slight-attention'); // remove the other one
    calsMeter?.classList.remove('attention');
    void (calsMeter as HTMLElement).offsetWidth;
    calsMeter?.classList.add('attention');
  }
}

/**
 * Updates
 * @param amount Positive number for coins, negative number for spending
 */
export function updateMoney(amount: number) {
  /* Update game state with money information */
  const updatedMoney = GAME_STATE_OF_TRUTH.money + amount;
  setGameState('money', updatedMoney);

  const moneyMeter = document.querySelector('.money .meter-number');

  /* Update DOM */
  moneyMeter!.innerHTML = `${GAME_STATE_OF_TRUTH.money}`;

  /* Animate */
  moneyMeter?.classList.remove('slight-attention');
  void (moneyMeter as HTMLElement).offsetWidth;
  moneyMeter?.classList.add('slight-attention');
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
