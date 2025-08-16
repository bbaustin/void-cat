import type { Direction } from './cat';
import { VOID_CAT } from './main';
import { delay } from './utils';

export const ONE_MOVE = 175;

export function move(numberOfTiles: number, direction: Direction) {
  console.log(VOID_CAT);
  for (let i = 1; i <= numberOfTiles; i++) {
    let x = parseInt(VOID_CAT.dataset.x!);
    let y = parseInt(VOID_CAT.dataset.y!);
    // where you at: this is adding a 0 in front of the dataset. Probably because it's a string, not a number :>
    x++;
    VOID_CAT.dataset.x = x.toString();
    VOID_CAT.style.left = `${x * ONE_MOVE}px`;
    delay(250);
  }
}
