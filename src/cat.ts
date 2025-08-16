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

export function createCat() {
  const cat = document.createElement('div');
  cat.id = 'cat';
  catClasses.forEach((catClass) => {
    const catElement = document.createElement('div');
    catElement.className += ` ${catClass}`;
    cat.appendChild(catElement);
  });
  document.getElementById('grid')?.appendChild(cat);
  return cat;
}

export function addCatToGrid(catDiv: HTMLDivElement) {
  document.getElementById('grid')?.appendChild(catDiv);
}
