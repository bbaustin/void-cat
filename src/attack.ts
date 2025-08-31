import { getOccupiedTileCoordinates } from './cat';
import { getTile } from './grid';
import { updateCaloriesBurned } from './meterUtils';
import { playExplosion2 } from './sounds';
import { delay, handleEffectsSequentially } from './utils';

export function disableAllButtons() {
  const buttons = document.getElementsByTagName('button');
  Array.from(buttons ?? []).forEach((button) => {
    button.disabled = true;
  });
}

export function enableAllButtons() {
  const buttons = document.getElementsByTagName('button');
  Array.from(buttons ?? []).forEach((button) => {
    button.disabled = false;
  });
}

export function triggerAttackAudiovisually() {
  const attackTiles = document
    .getElementById('grid')
    ?.getElementsByClassName('attack');

  Array.from(attackTiles ?? []).forEach((tile) => {
    handleEffectsSequentially([
      () => disableAllButtons(),
      () => tile.classList.add('attacking'),
      () => tile.classList.remove('attacking'),
      () => enableAllButtons(),
    ]);
  });
  /* Only play sound once, in time with opacity change */
  handleEffectsSequentially([() => delay(300), () => playExplosion2()]);
}

export function triggerAttackOnCat() {
  getOccupiedTileCoordinates().forEach(({ x, y }) => {
    const tile = getTile(x, y);
    if (tile?.classList.contains('attack')) {
      updateCaloriesBurned(-1);
      // play some sound
    }
  });
}

export function triggerAttack() {
  console.log('triigger atack');
  triggerAttackAudiovisually();
  triggerAttackOnCat();
}
