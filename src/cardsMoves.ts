import type { Direction } from './cat';
import { VOID_CAT } from './main';
import { delay } from './utils';

export const ONE_MOVE = 169;

export function move(numberOfTiles: number, direction: Direction) {
  console.log(VOID_CAT);
  for (let i = 0; i < numberOfTiles; i++) {
    VOID_CAT.style.left += `${ONE_MOVE}px`;
    delay(250);
  }
}
