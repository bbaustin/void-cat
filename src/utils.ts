import type { Effect } from './card';

/**
 * Util to create a delay.
 * @param ms number of ms to wait
 * @returns Promise, which delays stuff
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *
 * @param effects Array of effects, written like this: handleEffectsSequentially([ () => func1(), () => func2() ])
 * @param delayInMs Default is 500 ms, but if you need longer you can overwrite
 */
export async function handleEffectsSequentially(
  effects: Effect[],
  delayInMs: number = 500
) {
  for (const effect of effects) {
    effect();
    await delay(delayInMs);
  }
}
