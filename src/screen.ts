import { miniScreenIds, type MiniScreenId } from './stageIntermission';

const screenIds = ['screen-game', 'screen-intermission'] as const;

export type ScreenId = (typeof screenIds)[number];

export type AnyScreen = ScreenId | MiniScreenId;

// Could be improved or thought more about.
// Show the screen you pass in, then hide the others
export function showScreen(screen: AnyScreen) {
  /* Figure out if we're dealing with Screens
   * or Intermission MiniScreens */
  const isMini = miniScreenIds.includes(screen as MiniScreenId);
  const ids = isMini ? miniScreenIds : screenIds;

  /* Show the chosen screen */
  const screenToShow = document.getElementById(screen);
  if (!screenToShow) return;
  screenToShow.style.display = 'flex';

  /* Hide the others in that group */
  ids.forEach((id) => {
    if (id === screen) return;
    const elementWithID = document.getElementById(id);
    if (!elementWithID) return;
    elementWithID.style.display = 'none';
  });
}

// we can re-use the next turn button to be start next level
