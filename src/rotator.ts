import type { Direction } from './cardEffects';
import { CAT_OF_TRUTH } from './cat';
import { DOM_CAT } from './main';
import { CURRENT_STAGE, STAGES } from './stage';

export function initRotator() {
  const buttonLeft = document.querySelector('.arrow.left');
  const buttonRight = document.querySelector('.arrow.right');

  buttonLeft?.addEventListener('click', () => rotate('clockwise'));
  buttonRight?.addEventListener('click', () => rotate('counterClockwise'));
}

export const ORDER_OF_DIRECTIONS: Direction[] = [
  'top', // Feet facing 6 o'clock
  'left', // Feet facing 3 o'clock
  'bottom', //  Feet facing 12 o'clock
  'right', //   Feet facing 9 o'clock
];

/** This is the translate offset we need for each direction */
const DIRECTION_OFFSETS: Record<
  Direction,
  { x: number; y: number; angle: number }
> = {
  top: { x: 0, y: 0, angle: 0 },
  left: { x: -55, y: -55, angle: 270 },
  bottom: { x: 0, y: -110, angle: 180 },
  right: { x: 55, y: -55, angle: 90 },
};

type RotationDirection = 'clockwise' | 'counterClockwise';

/**
 * Loops through the ORDER_OF_DIRECTIONS const per click;
 * the order is: 'top' / 'left' / 'bottom' / 'right'
 * @param currentDirection headFacing of the cat
 * @param rotationDirection 'clockwise' or 'counterClockwise', depending on which button pressed
 * @returns index of ORDER_OF_DIRECTIONS
 */
export function getRotatedDirection(
  currentDirection: Direction,
  rotationDirection: RotationDirection
) {
  const currentIndex = ORDER_OF_DIRECTIONS.indexOf(currentDirection);
  /**  */
  if (rotationDirection === 'counterClockwise') {
    return currentIndex === 3
      ? ORDER_OF_DIRECTIONS[0]
      : ORDER_OF_DIRECTIONS[currentIndex + 1];
  } else {
    return currentIndex === 0
      ? ORDER_OF_DIRECTIONS[3]
      : ORDER_OF_DIRECTIONS[currentIndex - 1];
  }
}

/**
 * This rotates the DOM_CAT on the screen,
 * and updates the CAT_OF_TRUTH's headFacing param.
 * @param rotationDirection 'clockwise' or 'counterClockwise', depending on which button pressed
 */
export function rotate(rotationDirection: RotationDirection) {
  if (
    willRotationBeOutOfBounds(
      CAT_OF_TRUTH.headX,
      CAT_OF_TRUTH.headY,
      CAT_OF_TRUTH.headFacing,
      rotationDirection,
      CAT_OF_TRUTH.length,
      STAGES[CURRENT_STAGE].gridSize // TODO: Make this a global somewhere
    )
  ) {
    console.log("Can't rotate, would go out of bounds!");
    return;
  }

  /* Determine what the next direction is */
  const newDirection = getRotatedDirection(
    CAT_OF_TRUTH.headFacing,
    rotationDirection
  );

  /* Get new translate offsets and angle */
  const { x, y, angle } = DIRECTION_OFFSETS[newDirection];

  /* Update state before visible DOM changes */
  CAT_OF_TRUTH.headFacing = newDirection;
  DOM_CAT.dataset.headFacing = CAT_OF_TRUTH.headFacing;

  /* Update DOM */
  DOM_CAT.style.transform = `rotate(${angle}deg) translate(${x}px, ${y}px)`;
  DOM_CAT.style.transformOrigin = 'top'; // keep this fixed
}

function getOccupiedTiles(
  headX: number,
  headY: number,
  facing: Direction,
  length: number
): { x: number; y: number }[] {
  const tiles = [{ x: headX, y: headY }]; // head always included

  for (let i = 1; i < length; i++) {
    switch (facing) {
      case 'top':
        tiles.push({ x: headX, y: headY + i });
        break;
      case 'bottom':
        tiles.push({ x: headX, y: headY - i });
        break;
      case 'left':
        tiles.push({ x: headX + i, y: headY });
        break;
      case 'right':
        tiles.push({ x: headX - i, y: headY });
        break;
    }
  }

  return tiles;
}

function willRotationBeOutOfBounds(
  headX: number,
  headY: number,
  currentFacing: Direction,
  rotation: RotationDirection,
  length: number,
  gridSize: { x: number; y: number }
): boolean {
  const newFacing = getRotatedDirection(currentFacing, rotation);
  const occupied = getOccupiedTiles(headX, headY, newFacing, length);

  return occupied.some(
    ({ x, y }) => x < 0 || x >= gridSize.x || y < 0 || y >= gridSize.y
  );
}
