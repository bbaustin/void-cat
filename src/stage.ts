/** This is the current stage you are playing.
 * It's just a number, so access it by using STAGES[CURRENT_STAGE] */
export const CURRENT_STAGE = 2;

// TODO: If you have a map of terrains, you might not need gridSize, only array row/col
export interface Stage {
  gridSize: { x: number; y: number };
}

export const STAGES: Stage[] = [
  {
    gridSize: { x: 2, y: 2 },
  },
  {
    gridSize: { x: 3, y: 3 },
  },
  {
    gridSize: { x: 5, y: 5 },
  },
  {
    gridSize: { x: 10, y: 10 },
  },
];
