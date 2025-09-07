import { playBoop } from './sounds';
import { delay } from './utils';

/**
 * Renders text character-by-character
 */
async function renderEachLetter(text: string) {
  const dramaBox = document.querySelector('.drama');
  if (!dramaBox) return;
  const newTextContainer = document.createElement('div');
  dramaBox.prepend(newTextContainer);
  let temp = '';
  for (const character of text) {
    playBoop();
    temp += character;
    newTextContainer.innerHTML = temp;
    await delay(25);
  }
}

/**
 * This will take an array of messages; it will render the first one,
 * look at the number of characters in the previous one, and
 * render the next one based on the total time it takes to render the previous one
 */
export async function handleScriptEventsSequentially(lines: string[]) {
  /* Calculate delay based on message length */
  const baseDelay = 600; // Base delay in ms for short messages
  const lengthFactor = 25; // Additional ms per character in the message

  for (const line of lines) {
    await renderEachLetter(line);
    const messageDelay = baseDelay + line.length * lengthFactor;
    await delay(messageDelay);
  }
}
