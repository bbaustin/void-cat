import { createDOMCard } from './card';
import { DECK_OF_TRUTH } from './cardDeck';
import { showScreen } from './screen';

export const miniScreenIds = [
  'buy-cards-screen',
  'view-cards-screen',
  'upgrade-cat-screen',
] as const;

export type MiniScreenId = (typeof miniScreenIds)[number];

export function initUpgradeCatButton() {
  document
    .getElementById('upgrade-cat')
    ?.addEventListener('click', () => handleUpgradeCatButtonClick());
}

export function initBuyCardsButton() {
  document
    .getElementById('buy-cards')
    ?.addEventListener('click', () => handleBuyCardsButtonClick());
}

export function initUpgradeCardsButton() {
  document
    .getElementById('view-cards')
    ?.addEventListener('click', () => handleUpgradeCardsButtonClick());
}

export function handleUpgradeCatButtonClick() {
  const id = 'upgrade-cat-screen';
  showScreen(id);
  applyButtonClasses(id);
}

export function handleBuyCardsButtonClick() {
  const id = 'buy-cards-screen';
  showScreen(id);
  applyButtonClasses(id);
}

export function handleUpgradeCardsButtonClick() {
  const id = 'view-cards-screen';
  showScreen(id);
  applyButtonClasses(id);
  renderWholeDeck();
}

function applyButtonClasses(miniScreenId: MiniScreenId) {
  /* Remove active from all buttons */
  document
    .querySelectorAll('.left-side-button-list button')
    .forEach((btn) => btn.classList.remove('active'));

  /* Get the className by augmenting the miniScreenId
   * It's a little weird, but it's OK */
  const id = miniScreenId.slice(0, -7);

  console.log(document.querySelector(`button#${id}`));

  document.querySelector(`button#${id}`)?.classList.add('active');
}

export function renderWholeDeck() {
  const viewDeck = document.getElementById('view-all');
  const allCards = DECK_OF_TRUTH.unusedCards.concat(DECK_OF_TRUTH.discardPile);
  allCards.forEach((card) => {
    const cardToDisplay = createDOMCard(card, false);
    viewDeck?.appendChild(cardToDisplay);
  });
}
