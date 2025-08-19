import { CAT_OF_TRUTH } from './cat';
import { DOM_CAT } from './main';
import { isOutOfBounds } from './grid';
import { delay } from './utils';

/** Distance in pixels one move left or right should take */
export const ONE_MOVE_PX_X = 175;
// TODO: If this ends up being the same, obviously remove
export const ONE_MOVE_PX_Y = 175;

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
  // Can do cooler type for this if you want
  // Cards only have left or right and are gonna be augmented in this fx
  direction: 'left' | 'right' = 'right'
) {
  /** This determines which direction we're moving.
   * Specifically, if we add neg or pos pixels */
  const factor = direction === 'right' ? 1 : -1;

  const shouldMoveHorizontally =
    CAT_OF_TRUTH.headFacing === 'top' || CAT_OF_TRUTH.headFacing === 'bottom';

  const oneMovePx = shouldMoveHorizontally ? ONE_MOVE_PX_X : ONE_MOVE_PX_Y;

  const headDirection = shouldMoveHorizontally ? 'headX' : 'headY';

  const xOrY = shouldMoveHorizontally ? 'x' : 'y';

  const leftOrTop = shouldMoveHorizontally ? 'left' : 'top';

  console.log(leftOrTop);

  // WHERE YOU AT -- vertical movement!!
  // I guess the thing to do is, before the loop,
  // set constants; instead of xInPx, set it to
  // pxToMove = orientation === "ew" ? CAT_OF_TRUTH.headX : CAT_OF_TRUTH.headY

  for (let i = 1; i <= numberOfTiles; i++) {
    /** Get the current x and multiply it by tile width
     * to get the current horizontal px count. */
    const movementPx = shouldMoveHorizontally
      ? CAT_OF_TRUTH.headX * ONE_MOVE_PX_X
      : CAT_OF_TRUTH.headY * ONE_MOVE_PX_Y;

    if (!isOutOfBounds(direction)) {
      /** Add or subtract 1 to the current x */
      CAT_OF_TRUTH[headDirection] += factor;

      /** Also update the data-attribute */
      DOM_CAT.dataset[xOrY] = CAT_OF_TRUTH[headDirection].toString();

      /** Finally actually move the cat */
      DOM_CAT.style[leftOrTop] = `${movementPx + oneMovePx * factor}px`;
    }

    delay(250);
  }
}

export type Stance = 'standard' | 'nap' | 'longcat';

export function changeStance(stance: Stance) {
  DOM_CAT.dataset.stance = stance;
}
