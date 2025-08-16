// NOTE: Make all cards use "right/left", but run it through a helper which

import type { Card } from './card';
import { changeStance, move } from './cardEffects';

// when cat is rotated, will change that to "up/down"
export const ALL_CARDS: Card[] = [
  {
    text: ['Roll 1 space right', 'Roll 2 spaces right'],
    effect: [() => move(1), () => move(2)], // Figure out how to do this
  },
  {
    text: ['Assume defensive nap position'],
    effect: [() => changeStance('nap')],
    description:
      'Curl into a ball. You only take up one tile (where your head is). You cannot move or burn calories. Once you are hit, you will enter standard position.',
  },
  {
    text: ['Assume longcat position'],
    effect: [() => changeStance('longcat')],
    description:
      'Stretch out, taking up three tiles. You burn double calories while in longcat position.',
  },
  {
    text: ['Assume standard position'],
    effect: [() => changeStance('standard')],
    description: 'Take the default position. You take up two tiles.',
  },
  {
    text: [
      'Roll 1 space right, then 1 space left',
      'Roll 2 spaces right, then 2 spaces left',
      'Roll 3 spaces right, then 3 spaces left',
    ],
    effect: [
      () => {
        move(1);
        move(1, 'left');
      },
      () => {
        move(2);
        move(2, 'left');
      },
      () => {
        move(3);
        move(3, 'left');
      },
    ],
  },
  {
    text: ['Roll 1 space right, then assume defensive nap position'],
    effect: [
      () => {
        move(1);
        changeStance('nap');
      },
    ],
  },
  {
    text: ['Roll 1 space right, then assume longcat position'],
    effect: [
      () => {
        move(1);
        changeStance('longcat');
      },
    ],
  },
  {
    text: [
      'Assume longcat position, roll 1 space right, then assume defensive nap position',
    ],
    effect: [
      () => {
        changeStance('longcat');
        move(1);
        changeStance('nap');
      },
    ],
  },
  {
    text: ['Void warp to a random tile'],
    effect: [
      // TODO!
    ],
    description:
      'Immediately transport yourself to a random tile. Burn as many calories as you would have moving there physically.',
  },
  {
    text: ['Send a void tendril to snatch an enemy to the right'],
    effect: [
      // TODO!
    ],
    description:
      'Shoot out a tentacle to the right, until it hits an enemy. That enemy will be eliminated from the grid',
  },
  {
    text: ['Assume offensive nap position'],
    effect: [
      // TODO!
    ],
    description:
      'Curl into a ball. You only take up one tile (where your head is). You cannot move or burn calories. Pull in and consume all objects or enemies in a square shape around you. Once you are hit, you will enter standard position.',
  },
];
