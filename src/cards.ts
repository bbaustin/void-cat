import { move } from './cardsMoves';

interface Card {
  text: string[];
  effect: (() => void)[]; // should this be a function?
  level?: number;
}

// NOTE: Make all cards use "up/down", but run it through a helper which
// when cat is rotated, will change that the "left/right"
export const ALL_CARDS: Card[] = [
  {
    text: ['Roll 1 space up', 'Roll 2 spaces up'],
    effect: [() => move(1, 'right'), () => move(2, 'right')], // Figure out how to do this
  },
  {
    text: ['Assume defensive nap position'],
    effect: [],
  },
  {
    text: ['Assume longcat position'],
    effect: [],
  },
  {
    text: ['Assume standard position'],
    effect: [],
  },
  {
    text: [
      'Roll 1 space up, then 1 space down',
      'Roll 2 spaces up, then 2 spaces down',
      'Roll 3 spaces up, then 3 spaces down',
    ],
    effect: [],
  },
  {
    text: ['Roll 1 space up, then assume defensive nap position'],
    effect: [],
  },
  {
    text: ['Roll 1 space up, then assume longcat position'],
    effect: [],
  },
];

export const INITIAL_CARDS: Card[] = [
  ALL_CARDS[0],
  ALL_CARDS[0],
  ALL_CARDS[0],
  ALL_CARDS[0],
  { ...ALL_CARDS[0], level: 1 },
  ALL_CARDS[1],
  ALL_CARDS[2],
  ALL_CARDS[3],
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

    console.log(cardToAdd);

    document.getElementById('card-holder')?.appendChild(cardToAdd);
  }
}

type CardAttribute = Exclude<keyof Card, 'level'>;

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
