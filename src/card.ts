import { DECK_OF_TRUTH, addWholeHandVisually, discardCard } from './cardDeck';
import { GAME_STATE_OF_TRUTH } from './gameState';
import { updateEnergyAndCalMetersAfterPlayingCard } from './meterUtils';
import { replaceTextBasedOnRotation } from './rotator';
import { handleEffectsSequentially } from './utils';

export interface Card {
  text: string[];
  effect: Effect[];
  cost: number[];
  caloriesBurned: number[];
  level?: number;
  /** Description of stuff that might not make sense immediately.
   * Note that (for now) this is NOT an array.
   * As of yet, level-based "text" is self-explanatory. */
  description?: string;
  /** We might want to have some cards that can't show up
   * until later in the game for narrative or power purposes */
  minimumStage?: number;
}

export type Effect = () => void;

type CardAttribute = Extract<
  keyof Card,
  'text' | 'effect' | 'cost' | 'caloriesBurned'
>;

/**
 * Takes in a card's data (text, effect, etc...)
 * and creates a div with the needed data rendered.
 * Can avoid adding the click event if needed.
 * Does NOT append the card to the DOM.
 * @param card Data for a card
 * @param shouldApplyEffect Whether or not to add the click event; would refrain, for example, in the "view deck" page
 * @returns HTML div
 */
export function createDOMCard(
  card: Card,
  shouldApplyEffect: boolean
): HTMLButtonElement {
  /** Create DOM element */
  const cardToAdd = document.createElement('button'); // This should be a button
  const cardText = document.createElement('div');
  const cardStats = document.createElement('div');
  cardStats.classList.add('stats');

  cardToAdd.appendChild(cardText);
  cardToAdd.appendChild(cardStats);

  cardToAdd.classList.add('card');

  /* Append text */
  const textToAppend = getCardAttribute(card, 'text');
  cardText.innerText = textToAppend;

  /* Append cals */
  const calSection = document.createElement('div');
  const calToAppend = getCardAttribute(card, 'caloriesBurned');
  calSection.innerHTML = `${calToAppend}`;
  cardStats.appendChild(calSection);

  /* Append cost */
  const costSection = document.createElement('div');
  const costToAppend = getCardAttribute(card, 'cost');
  costSection.innerHTML = `${costToAppend}`;
  cardStats.appendChild(costSection);

  /** Same as above, but with effect instead of text
   * We might not want to apply the effect if
   * viewing all cards during intermission, for example */
  // UPDATE: We probably won't ever not apply effect. Can remove this if needed
  if (shouldApplyEffect) {
    const effectToApply = getCardAttribute(card, 'effect');
    const energyCost = getCardAttribute(card, 'cost');
    const finalEffectToApply = () => {
      const { hand } = DECK_OF_TRUTH;
      const indexOfUsedCard = DECK_OF_TRUTH.hand.indexOf(card);

      if (energyCost > GAME_STATE_OF_TRUTH.energyCurrent) {
        console.log('cannot');
        const energyMeter = document.querySelector('.meter.energy');
        energyMeter?.classList.remove('attention');
        void (energyMeter as HTMLElement).offsetWidth;
        energyMeter?.classList.add('attention');
        // do something to siginify you're out of energy
      } else {
        /* Do the effects */
        handleEffectsSequentially(effectToApply);

        /* Update cals and energy */
        updateEnergyAndCalMetersAfterPlayingCard(card);

        /* Remove the card from your hand,
         * first in state, and then visually  */
        hand.splice(indexOfUsedCard, 1);
        addWholeHandVisually();

        /* Add to discard pile */
        discardCard(card);
      }
    };
    cardToAdd.addEventListener('click', finalEffectToApply);
  }

  return cardToAdd;
}

/**
 * Takes in a card, and returns an attribute (e.g., text or effect),
 * TAKING INTO ACCOUNT the card's level
 * @param card Card
 * @returns type of whatever attribute you're querying for
 */
export function getCardAttribute<K extends CardAttribute>(
  card: Card,
  attribute: K
): Card[K][number] {
  const cardLevel = card.level ?? 0;
  return card[attribute][cardLevel];
}
