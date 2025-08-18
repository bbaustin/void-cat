import { CAT_OF_TRUTH } from './cat';
import { DOM_CAT } from './main';
import { isOutOfBounds } from './stage';
import { delay } from './utils';

/** Distance in pixels one move left or right should take */
export const ONE_MOVE_PX_X = 175;

export type Direction = 'left' | 'right' | 'top' | 'bottom';
// Do I need anything here
export type Orientation = 'ns' | 'ew';

/**
 * Function to move the cat upon playing a "movement" card
 * @param numberOfTiles number of tiles to move
 * @param direction direction to move in. Default is 'right'
 * @param orientation which way you expect to move, based if the cat is horizontally or vertically oriented
 */

// TODO: Where you at: you probably only want to affect left and top
// Do + / - for these
// Otherwise you'd get weird stuff like left: 180px; right 180px; etc
export function move(
  numberOfTiles: number,
  direction: Direction = 'right',
  orientation: Orientation = 'ew'
) {
  /** This determines which direction we're moving.
   * Specifically, if we add neg or pos pixels */
  const factor = direction === 'right' ? 1 : -1;
  for (let i = 1; i <= numberOfTiles; i++) {
    /** Get the current x and multiply it by tile width
     * to get the current horizontal px count. */
    const xInPx = CAT_OF_TRUTH.headX * ONE_MOVE_PX_X;

    if (!isOutOfBounds(direction)) {
      /** Add or subtract 1 to the current x */
      CAT_OF_TRUTH.headX += factor;

      /** Also update the data-attribute */
      DOM_CAT.dataset.x = CAT_OF_TRUTH.headX.toString();

      /** Finally actually move the cat */
      DOM_CAT.style.left = `${xInPx + ONE_MOVE_PX_X * factor}px`;
    }

    delay(250);
  }
}

export type Stance = 'standard' | 'nap' | 'longcat';

export function changeStance(stance: Stance) {
  DOM_CAT.dataset.stance = stance;
}
