export type Thing =
  | 'coin'
  | 'house'
  | 'human'
  | 'dog'
  | 'tank'
  | 'tree'
  | 'planet';

export type ThingCoordinates = [number, number][];

export function generateCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.innerHTML = '1';
  return coin;
}

/**
 * This gives the coordinates of things in a "diamond" shape on the grid.
 * You pass in the largest x or y value; either is OK (it's a square),
 * and you can pass in, for example, `gridRows`.
 * @param maxCoordinate the largest x or y value (assuming a square grid)
 * @returns an array of all of the coordinates of the diamonds to append
 */
export function generateThingCoordinatesInDiamondShape(
  maxCoordinate: number
): ThingCoordinates {
  // if (maxCoordinate % 2 === 0) {
  //   return;
  //   // throw new Error('Grid size must be odd to have a center.');
  // }

  const center = Math.floor(maxCoordinate / 2);
  const coords: ThingCoordinates = [];

  for (let y = 0; y < maxCoordinate; y++) {
    for (let x = 0; x < maxCoordinate; x++) {
      if (Math.abs(x - center) + Math.abs(y - center) === center) {
        coords.push([x, y]);
      }
    }
  }

  return coords;
}

export function generateThingCoordinatesInStraightRowsOrColumns(
  maxCoordinate: number,
  xsOrYs: number[],
  rowOrColumn: 'row' | 'column'
): ThingCoordinates {
  const coords: ThingCoordinates = [];
  xsOrYs.forEach((xOrY) => {
    for (let i = 0; i < maxCoordinate; i++) {
      coords.push(rowOrColumn === 'row' ? [i, xOrY] : [xOrY, i]);
    }
  });
  return coords;
}
