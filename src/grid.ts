import type { Direction } from './cardEffects';
import { CAT_OF_TRUTH } from './cat';
import { CURRENT_STAGE, STAGES } from './stage';
import {
  generateCoin,
  generateThingsInDiamondShape,
  generateThingsInStraightRowsOrColumns,
  type ThingCoordinates,
} from './things';

export type Terrain = 'floor' | 'grass' | 'street' | 'space';

export type ThingOnBoard =
  | 'coin'
  | 'house'
  | 'human'
  | 'dog'
  | 'tank'
  | 'tree'
  | 'planet';

type Tile = {
  x: number;
  y: number;
  terrain: Terrain;
  thing?: ThingOnBoard;
  incomingAttack?: boolean;
};

type Grid = Tile[][];

export function createEmptyGrid(
  width: number,
  height: number,
  terrain: Terrain = 'floor'
): Grid {
  const grid: Grid = [];
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, terrain });
    }
    grid.push(row);
  }
  return grid;
}

export function renderGrid(grid: Grid) {
  const gridContainer = document.getElementById('grid');
  if (!gridContainer) return;

  const gridRows = grid.length;
  const gridColumns = grid[0].length;

  const tileSize = 68; // px

  gridContainer.style.gridTemplateRows = `repeat(${gridRows}, ${tileSize}px)`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridColumns}, ${tileSize}px)`;

  // The container will now auto-size to fit all tiles
  gridContainer.style.width = `${gridRows * (tileSize + 6)}px`;
  gridContainer.style.height = `${gridColumns * (tileSize + 6)}px`;

  gridContainer.innerHTML = '';

  // Populate DOM
  for (let y = 0; y < gridColumns; y++) {
    for (let x = 0; x < gridRows; x++) {
      const tileDiv = document.createElement('div');
      tileDiv.className = 'tile';
      tileDiv.classList.add(grid[y][x].terrain);
      tileDiv.dataset.x = x.toString();
      tileDiv.dataset.y = y.toString();

      // where you at
      // you probably want this to take an array, unless you're sure it's gonna have nothing
      // and/or have an array of tiles to add stuff to
      // you also need to draw and add the stuff TO the tile

      // written out a little more precisely,
      // you should create some "elegant" attack patterns
      // that can also be reused to create things on the grid
      // (like rows of houses, for example)

      //////
      // tileDiv.classList.add('attack');
      /* Assumes that gridColumns === gridRows */
      // addCrystalsToGrid(generateThingsInDiamondShape(gridColumns));
      //////

      gridContainer.appendChild(tileDiv);
    }
  }

  // addThingsToGrid(
  //   generateThingsInStraightRows(gridColumns, [0, 2, 4], 'column')
  // );

  addThingsToGrid(generateThingsInDiamondShape(5));
}

function addThingsToGrid(thingLayout: ThingCoordinates) {
  thingLayout.forEach((thingLocation) => {
    const [x, y] = thingLocation;
    const tileToAppendTo = getTile(x, y);
    if (!tileToAppendTo) {
      return;
    } else {
      tileToAppendTo.innerHTML = '';
      tileToAppendTo.appendChild(generateCoin());
    }
  });
}

function getTile(x: number, y: number): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `.tile[data-x="${x}"][data-y="${y}"]`
  );
}

export function isOutOfBounds(direction: Direction) {
  const addend = direction === 'right' || direction === 'bottom' ? 1 : -1;

  /**
   * If the cat's head is facing top or bottom, move headX
   * If the cat's head is facing left or right, move headY
   */
  const isCatVertical =
    CAT_OF_TRUTH.headFacing === 'top' || CAT_OF_TRUTH.headFacing === 'bottom';

  const headXOrHeadY = isCatVertical ? 'headX' : 'headY';
  const xOrY = isCatVertical ? 'x' : 'y';

  return (
    CAT_OF_TRUTH[headXOrHeadY] + addend < 0 ||
    CAT_OF_TRUTH[headXOrHeadY] + addend >= STAGES[CURRENT_STAGE].gridSize[xOrY]
  );
}
