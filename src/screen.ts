const screenIds = ['screen-game', 'screen-intermission'] as const;

export type ScreenId = (typeof screenIds)[number];

// Could be improved or thought more about.
// Show the screen you pass in, then hide the others
export function showScreen(screen: ScreenId) {
  const screenToShow = document.getElementById(screen);
  if (!screenToShow) return;
  screenToShow.style.display = 'auto';

  const remainingScreenIds = screenIds.filter(
    (screenId) => screenId !== screen
  );

  remainingScreenIds.forEach((screenId) => {
    const elementWithID = document.getElementById(screenId);
    if (!elementWithID) return;
    elementWithID.style.display = 'none';
  });
}

// we want the top to always be visible.
// we can re-use the next turn button to be start next level
