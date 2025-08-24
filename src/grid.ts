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

      // tileDiv.classList.add('attack');

      gridContainer.appendChild(tileDiv);
    }
  }

  // addThingsToGrid(
  //   generateThingsInStraightRows(gridColumns, [0, 2, 4], 'column')
  // );

  addThingsToGrid(generateThingsInDiamondShape(5), { thing: 'coin' });
  addThingsToGrid(
    generateThingsInStraightRowsOrColumns(gridColumns, [0, 2, 4], 'column'),
    { className: 'attack' }
  );
}

type ThingOrClass =
  | { thing: ThingOnBoard; className?: never }
  | { thing?: never; className: string };

/**
 * This does the actual appending on stuff to the board.
 * Stuff refers to either Things (like coins) or CSS classes (like 'attack')
 * @param coordinates these are [x, y][] coordinates, but most likely come from a function like generateThingsInDiamondShape, which generate these for you
 * @param thingOrClass you should pass either {className: 'whatever'} OR {thing: 'coin'}, but not both
 */
function addThingsToGrid(
  coordinates: ThingCoordinates,
  thingOrClass: ThingOrClass
) {
  coordinates.forEach((thingLocation) => {
    const [x, y] = thingLocation;
    const { thing, className } = thingOrClass;

    const tileToAppendTo = getTile(x, y);
    if (!tileToAppendTo) {
      return;
    }

    if (thing) {
      // NOTE: Clear out div first
      // You might not want/need to do this
      tileToAppendTo.innerHTML = '';
      if (thing === 'coin') {
        return tileToAppendTo.appendChild(generateCoin());
      }
    }

    if (className) {
      return tileToAppendTo.classList.add(className);
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
