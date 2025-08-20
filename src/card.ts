import { CARD_LIBRARY } from './cardLibrary';

export type Effect = () => void;

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

export const INITIAL_CARDS: Card[] = [
  CARD_LIBRARY[0],
  CARD_LIBRARY[1],
  CARD_LIBRARY[2],
  CARD_LIBRARY[5],
  { ...CARD_LIBRARY[0], level: 1 },
  CARD_LIBRARY[0],
  CARD_LIBRARY[1],
  CARD_LIBRARY[5],
];

/**
 * Takes an array of cards, randomizes it, and returns the randomized array.
 * Uses the Schwartzian transform.
 * https://stackoverflow.com/a/46545530
 */
export function shuffleCards(cards: Card[]): Card[] {
  return cards
    .map((value) => ({ value, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map(({ value }) => value);
}

export function addCardsToHand(
  cards: Card[],
  handSize: number = 3,
  positionInDeck: number = 0
) {
  for (let i = 0; i <= handSize - 1; i++) {
    const cardPositionInDeck = positionInDeck + i;

    const card = cards[cardPositionInDeck];

    /** Create DOM element */
    const cardToAdd = document.createElement('div');
    cardToAdd.classList.add('card');

    /** Use the level to determine the text;
     * otherwise, if there's no level, use the first element  */
    const textToAppend = getCardAttribute(card, 'text');
    cardToAdd.innerHTML = textToAppend;

    /** Same as above, but with effect instead of text */
    const effectToApply = getCardAttribute(card, 'effect');
    cardToAdd.addEventListener('click', effectToApply);

    document.getElementById('card-holder')?.appendChild(cardToAdd);
  }
}

type CardAttribute = Extract<keyof Card, 'text' | 'effect'>;

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
