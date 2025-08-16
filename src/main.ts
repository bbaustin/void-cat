import { addCardsToHand, INITIAL_CARDS, shuffleCards } from './cards';
import { createGrid, setGrid } from './grid';

const zalgo = ['V̵͚̓O̴͗͜Ï̷̢Ḍ̷̔ ̷̊ͅC̵̘̊a̴̗̋t̸̩̏', 'V̸̜͊O̷͋ͅÏ̴̘D̶̈́͜ ̴̺͐Č̵̠a̵̺͊t̶̰̆', 'V̵͖̖̩̰̍̾͝Õ̵͎͒̃́Ì̸̃ͅD̷͍̭̳͗̋͂͜ ̶͖͔̮͗C̶̝̯̈a̸̩͂́̍̕t̴̢̮̖͛ͅ', 'V̸̩͂̏Ò̵̻̕Į̷͎͐D̶̪͎̋ ̷̠̉C̵̭̦̍̈ą̶̕̚t̵̄̔͜', 'V̴̼͐̑̈Ò̸͇͕̯̐͝I̴͇̤̓̑Ḑ̷͕͛͛̓ ̵͍́̈̋C̶̦̣̮͋̂͒á̸̦͉͖ẗ̵̨͕́'];

function initGame() {
  const grid = createGrid(10, 10);
  setGrid(grid);
  const shuffledHand = shuffleCards(INITIAL_CARDS);
  addCardsToHand(shuffledHand);
}

initGame();
