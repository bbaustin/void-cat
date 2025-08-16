import { changeStance, move } from './cardsMoves';

interface Card {
  text: string[];
  effect: (() => void)[];
  level?: number;
  /** Description of stuff that might not make sense immediately.
   * Note that (for now) this is NOT an array.
   * As of yet, level-based "text" is self-explanatory. */
  description?: string;
}

// NOTE: Make all cards use "right/left", but run it through a helper which
// when cat is rotated, will change that to "up/down"
export const ALL_CARDS: Card[] = [
  /* 0 */
  {
    text: ['Roll 1 space right', 'Roll 2 spaces right'],
    effect: [() => move(1), () => move(2)], // Figure out how to do this
  },
  /* 1 */
  {
    text: ['Assume defensive nap position'],
    effect: [() => changeStance('nap')],
    description:
      'Curl into a ball. You only take up one tile (where your head is). You cannot move or burn calories. Once you are hit, you will enter standard position.',
  },
  /* 2 */
  {
    text: ['Assume longcat position'],
    effect: [() => changeStance('longcat')],
    description:
      'Stretch out, taking up three tiles. You burn double calories while in longcat position.',
  },
  /* 3 */
  {
    text: ['Assume standard position'],
    effect: [() => changeStance('standard')],
    description: 'Take the default position. You take up two tiles.',
  },
  /* 4 */
  {
    text: [
      'Roll 1 space right, then 1 space left',
      'Roll 2 spaces right, then 2 spaces left',
      'Roll 3 spaces right, then 3 spaces left',
    ],
    effect: [
      () => {
        move(1);
        move(1, 'left');
      },
      () => {
        move(2);
        move(2, 'left');
      },
      () => {
        move(3);
        move(3, 'left');
      },
    ],
  },
  /* 5 */
  {
    text: ['Roll 1 space right, then assume defensive nap position'],
    effect: [
      () => {
        move(1);
        changeStance('nap');
      },
    ],
  },
  /* 6 */
  {
    text: ['Roll 1 space right, then assume longcat position'],
    effect: [
      () => {
        move(1);
        changeStance('longcat');
      },
    ],
  },
  /* 7 */
  {
    text: ['Void warp to a random tile']
    effect: [
      // TODO!
    ],
    description: 'Immediately transport yourself to a random tile. Burn as many calories as you would have moving there physically.'
  }
  /* 8 */
  {
    text: ['Send a void tendril to snatch an enemy to the right'],
    effect: [ 
      // TODO!
    ],
    description: 'Shoot out a tentacle to the right, until it hits an enemy. That enemy will be eliminated from the grid'
  }
];

export const INITIAL_CARDS: Card[] = [
  ALL_CARDS[0],
  ALL_CARDS[1],
  ALL_CARDS[2],
  ALL_CARDS[3],
  { ...ALL_CARDS[0], level: 1 },
  ALL_CARDS[4],
  ALL_CARDS[5],
  ALL_CARDS[6],
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

type CardAttribute = Exclude<keyof Card, 'level' | 'description'>;

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
