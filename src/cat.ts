export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type Cat = {
  headX: number;
  headY: number;
  length: number;
  facing: Direction;
};

/** These are the CSS classes for each cat part.
 * They are to be used inside a div with id "cat". */
const catClasses = [
  'ear left',
  'ear right',
  'eye left',
  'eye right',
  'nose',
  'smile',
  'paw front-left',
  'paw front-right',
  'paw back-left',
  'paw back-right',
];

/**
 * Creates voidCat div and applies classes, attributes, etc.
 * Does NOT append it (done in addCatToGrid)
 * @param startingX - number; the starting x value, saved as data-x in HTML. Default is 0
 * @param startingY - number; the starting y value, saved as data-y in HTML. Default is 0
 * @returns HTMLDivElement - DOM element of **the** cat
 */
export function createCat(
  startingX: number = 0,
  startingY: number = 0
): HTMLDivElement {
  const cat = document.createElement('div');

  /** Add id (for container) and classes (for body parts) */
  cat.id = 'cat';
  catClasses.forEach((catClass) => {
    const catElement = document.createElement('div');
    catElement.className += ` ${catClass}`;
    cat.appendChild(catElement);
  });

  /** Add x and y data-attribute */
  cat.dataset.x = startingX.toString();
  cat.dataset.y = startingY.toString();

  return cat;
}

export function addCatToGrid(catDiv: HTMLDivElement) {
  document.getElementById('grid')?.appendChild(catDiv);
}
