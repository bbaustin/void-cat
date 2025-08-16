type Terrain =
  | 'floor'
  | 'street'
  | 'wall'
  | 'house'
  | 'tree'
  | 'gunner'
  | 'space'
  | 'planet';

type Tile = {
  x: number;
  y: number;
  terrain: Terrain;
};

type Grid = Tile[][];

export function createGrid(width: number, height: number): Grid {
  const grid: Grid = [];
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, terrain: 'floor' });
    }
    grid.push(row);
  }
  return grid;
}

export function setGrid(grid: Grid) {
  const container = document.getElementById('grid');
  if (!container) return;

  const gridRows = grid.length;
  const gridColumns = grid[0].length;

  const tileSize = 68; // px

  container.style.gridTemplateRows = `repeat(${gridRows}, ${tileSize}px)`;
  container.style.gridTemplateColumns = `repeat(${gridColumns}, ${tileSize}px)`;

  // The container will now auto-size to fit all tiles
  container.style.width = `${gridRows * (tileSize + 6)}px`;
  container.style.height = `${gridColumns * (tileSize + 6)}px`;

  container.innerHTML = '';

  // Populate DOM
  for (let y = 0; y < gridColumns; y++) {
    for (let x = 0; x < gridRows; x++) {
      const tileEl = document.createElement('div');
      tileEl.className = 'tile';
      tileEl.dataset.x = x.toString();
      tileEl.dataset.y = y.toString();

      // Example: set terrain type as a class
      // tileEl.classList.add(grid[y][x].terrain);

      container.appendChild(tileEl);
    }
  }
}
