import { updateTurnViaButton } from './meterUtils';

export function initNextTurnButton() {
  document
    .getElementById('next')
    ?.addEventListener('click', () => updateTurnViaButton());
}
