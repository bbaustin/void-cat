import {
  DECK_OF_TRUTH,
  addCardToHandVisually,
  addWholeHandVisually,
} from './cardDeck';
import { handleEffectsSequentially } from './utils';

export interface Card {
  text: string[];
  effect: Effect[];
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

type CardAttribute = Extract<keyof Card, 'text' | 'effect'>;

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
): HTMLDivElement {
  /** Create DOM element */
  const cardToAdd = document.createElement('div');
  cardToAdd.classList.add('card');

  /** Use the level to determine the text;
   * otherwise, if there's no level, use the first element  */
  const textToAppend = getCardAttribute(card, 'text');
  cardToAdd.innerHTML = textToAppend;

  /** Same as above, but with effect instead of text
   * We might not want to apply the effect if
   * viewing all cards during intermission, for example */
  if (shouldApplyEffect) {
    const effectToApply = getCardAttribute(card, 'effect');
    const finalEffectToApply = () => {
      const { hand, discardPile } = DECK_OF_TRUTH;
      const indexOfUsedCard = DECK_OF_TRUTH.hand.indexOf(card);

      /* Do the effects */
      handleEffectsSequentially(effectToApply);

      /* Remove the card from your hand,
       * first in state, and then visually  */
      hand.splice(indexOfUsedCard, 1);
      addWholeHandVisually();

      /* Add to discard pile */
      discardPile.push(card);

      console.log(DECK_OF_TRUTH);
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
function getCardAttribute<K extends CardAttribute>(
  card: Card,
  attribute: K
): Card[K][number] {
  const cardLevel = card.level ?? 0;
  return card[attribute][cardLevel];
}
