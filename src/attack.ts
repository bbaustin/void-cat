import { playExplosion1, playExplosion2 } from './sounds';
import { delay, handleEffectsSequentially } from './utils';

export function disableAllButtons() {
  const buttons = document.getElementsByTagName('button');
  Array.from(buttons ?? []).forEach((button) => {
    button.disabled = true;
    button.classList.add('disabled');
  });
}

export function enableAllButtons() {
  const buttons = document.getElementsByTagName('button');
  Array.from(buttons ?? []).forEach((button) => {
    button.disabled = false;
    button.classList.remove('disabled');
  });
}

export function triggerAttacksVisually() {
  const attackTiles = document
    .getElementById('grid')
    ?.getElementsByClassName('attack');

  Array.from(attackTiles ?? []).forEach((tile) => {
    handleEffectsSequentially(
      [
        () => disableAllButtons(),
        () => delay(300),
        () => tile.classList.add('attacking'),
        () => delay(1000),
        () => tile.classList.remove('attacking'),
        () => enableAllButtons(),
      ],
      300
    );
  });

  /* Only play sound once, in time with opacity change */
  handleEffectsSequentially([() => delay(300), () => playExplosion2()]);
}
