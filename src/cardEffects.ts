import { CAT_OF_TRUTH } from './cat';
import { DOM_CAT } from './main';
import { isOutOfBounds } from './grid';
import { delay } from './utils';
import { absorbThing } from './thingUtils';

/** Distance in pixels one move left or right should take */
export const ONE_MOVE_PX_X = 175;
// TODO: If this ends up being the same, obviously remove
export const ONE_MOVE_PX_Y = 175;

export type Direction = 'left' | 'right' | 'top' | 'bottom';
export type Stance = 'standard' | 'nap' | 'longcat';

/**
 * Function to move the cat upon playing a "movement" card
 * @param numberOfTiles number of tiles to move
 * @param direction direction to move in. Default is 'right'
 * @param orientation which way you expect to move, based if the cat is horizontally or vertically oriented
 */
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

      /** Move the cat on the DOM */
      DOM_CAT.style[leftOrTop] = `${movementPx + oneMovePx * factor}px`;

      /** Interact with Things on the grid */
      absorbThing();
    }

    delay(250);
  }
}

export function changeStance(stance: Stance) {
  DOM_CAT.dataset.stance = stance;

  // remove all stance classes and add the intended one
  const stances: Stance[] = ['standard', 'nap', 'longcat'];
  DOM_CAT.classList.remove(...stances);
  DOM_CAT.classList.add(stance);
}
