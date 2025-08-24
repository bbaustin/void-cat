export function generateCrystal() {
  const crystal = document.createElement('div');
  crystal.classList.add('crystal');
  return crystal;
}

export type ThingCoordinates = [number, number][];

export const STAGE_2_CRYSTALS: ThingCoordinates = [
  [2, 0],
  [1, 1],
  [3, 1],
  [0, 2],
  [4, 2],
  [1, 3],
  [3, 3],
  [2, 4],
];

export function generateThingsInDiamondShape(n: number): [number, number][] {
  if (n % 2 === 0) {
    throw new Error('Grid size must be odd to have a center.');
  }

  const center = Math.floor(n / 2);
  const coords: ThingCoordinates = [];

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (Math.abs(x - center) + Math.abs(y - center) === center) {
        coords.push([x, y]);
      }
    }
  }

  return coords;
}
