/**
 * Util to create a delay.
 * @param ms number of ms to wait
 * @returns Promise, which delays stuff
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
