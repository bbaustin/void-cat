export function generateCrystal() {
  const crystal = document.createElement('div');
  crystal.classList.add('crystal');
  return crystal;
}

export type CrystalCoordinates = [number, number][];

export const STAGE_2_CRYSTALS: CrystalCoordinates = [
  [2, 0],
  [1, 1],
  [3, 1],
  [0, 2],
  [4, 2],
  [1, 3],
  [3, 3],
  [2, 4],
];
