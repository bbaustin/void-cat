export type Direction = 'n' | 's' | 'e' | 'w';

export type Player = {
  headX: number;
  headY: number;
  length: number;
  facing: Direction;
};
