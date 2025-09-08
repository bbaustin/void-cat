import type { Card } from './card';
import { changeStance, move } from './cardEffects';
import { handleEffectsSequentially } from './utils';

export const CARD_LIBRARY: Card[] = [
  {
    text: ['Roll 1 space right', 'Roll 2 spaces right'],
    effect: [() => move(1), () => move(2)],
    cost: [1, 1],
    caloriesBurned: [1, 2],
  },
  {
    text: ['Roll 1 space left', 'Roll 2 spaces left'],
    effect: [() => move(1, 'left'), () => move(2, 'left')],
    cost: [1, 1],
    caloriesBurned: [1, 2],
  },
  {
    text: ['Assume defensive nap position'],
    effect: [() => changeStance('nap')],
    cost: [0],
    caloriesBurned: [0],
    description:
      'Curl into a ball. You only take up one tile (where your head is). You cannot move or burn calories. Once you are hit, you will enter standard position.',
  },
  {
    text: ['Assume longcat position'],
    effect: [() => changeStance('longcat')],
    cost: [0],
    caloriesBurned: [0],
    description:
      'Stretch out, taking up three tiles. You burn double calories while in longcat position.',
  },
  {
    text: ['Assume standard position'],
    effect: [() => changeStance('standard')],
    cost: [0],
    caloriesBurned: [0],
    description: 'Take the default position. You take up two tiles.',
  },
  {
    text: [
      'Roll 1 space right, then 1 space left',
      'Roll 2 spaces right, then 2 spaces left',
      'Roll 3 spaces right, then 3 spaces left',
    ],
    cost: [2, 2, 2],
    caloriesBurned: [2, 4, 6],
    effect: [
      () => {
        handleEffectsSequentially([() => move(1), () => move(1, 'left')]);
      },
      () => {
        handleEffectsSequentially([() => move(2), () => move(2, 'left')]);
      },
      () => {
        handleEffectsSequentially([() => move(3), () => move(3, 'left')]);
      },
    ],
  },
  {
    text: ['Roll back and forth'],
    cost: [2],
    caloriesBurned: [3],
    effect: [
      () => {
        handleEffectsSequentially([
          () => move(1),
          () => move(2, 'left'),
          () => move(1),
        ]);
      },
    ],
  },
  {
    text: ['Roll 1 space right, then assume defensive nap position'],
    cost: [2],
    caloriesBurned: [1],
    effect: [
      () => {
        handleEffectsSequentially([() => move(1), () => changeStance('nap')]);
      },
    ],
  },
  {
    text: ['Roll 1 space right, then assume longcat position'],
    cost: [2],
    caloriesBurned: [1],
    effect: [
      () => {
        handleEffectsSequentially([
          () => move(1),
          () => changeStance('longcat'),
        ]);
      },
    ],
  },
  {
    text: ['Longcat, then roll 1 space right, then nap'],
    caloriesBurned: [1],
    cost: [2],
    effect: [
      () => {
        handleEffectsSequentially([
          () => changeStance('longcat'),
          () => move(1),
          () => changeStance('nap'),
        ]);
      },
    ],
  },
  // {
  //   text: ['Void warp to a random tile'],
  //   cost: [1],
  //   caloriesBurned: [0],
  //   effect: [
  //     // TODO!
  //   ],
  //   description:
  //     'Immediately transport yourself to a random tile. Burn as many calories as you would have moving there physically.',
  // },
  // {
  //   text: ['Send a void tendril to snatch an enemy to the right'],
  //   cost: [1],
  //   caloriesBurned: [0],
  //   effect: [
  //     // TODO!
  //   ],
  //   description:
  //     'Shoot out a tentacle to the right, until it hits an enemy. That enemy will be eliminated from the grid',
  // },
  // {
  //   text: ['Assume offensive nap position'],
  //   cost: [3],
  //   caloriesBurned: [0],
  //   effect: [
  //     // TODO!
  //   ],
  //   description:
  //     'Curl into a ball. You only take up one tile (where your head is). You cannot move or burn calories. Pull in and consume all objects or enemies in a square shape around you. Once you are hit, you will enter standard position.',
  // },
];
