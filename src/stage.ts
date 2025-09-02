import type { Terrain } from './grid';
import { GAME_STATE_OF_TRUTH } from './main';
import {
  generateThingCoordinatesInDiamondShape,
  type ThingCoordinates,
} from './thing';

/** This is the current stage you are playing.
 * It's just a number, so access it by using STAGES[CURRENT_STAGE] */
export const CURRENT_STAGE = 2;

// TODO: If you have a map of terrains, you might not need gridSize, only array row/col
export interface Stage {
  gridSize: { x: number; y: number };
  attackCoordinates: (ThingCoordinates | undefined)[];
  terrain?: Terrain;
  turns?: number;
}

export const STAGES: Stage[] = [
  {
    gridSize: { x: 3, y: 3 },
    attackCoordinates: [
      undefined,
      [[0, 0]],
      [[0, 1]],
      [[1, 0]],
      // undefined,
      generateThingCoordinatesInDiamondShape(2),
    ],
  },
  {
    gridSize: { x: 3, y: 3 },
    attackCoordinates: [undefined, [[0, 0]], [[0, 1]], [[1, 0]], undefined],
  },
  {
    gridSize: { x: 5, y: 5 },
    terrain: 'street',
    attackCoordinates: [
      undefined,
      [[0, 0]],
      [[0, 1]],
      [[1, 0]],
      generateThingCoordinatesInDiamondShape(5),
    ],
  },
  {
    gridSize: { x: 5, y: 5 },
    attackCoordinates: [undefined, [[0, 0]], [[0, 1]], [[1, 0]], undefined],
  },
];
