type Intermission = {
  text: string;
  buttonText: string;
  isButtonDisabled?: boolean;
  isGlitchy?: boolean;
};

// Last turn of NextButton should +1 the stage and switch screens
// Intermission button should just switch screens

export const STAGE_INTERMISSION: Intermission[] = [
  {
    text: 'VOID Cat',
    buttonText: 'Start',
    isGlitchy: true,
  },
  {
    text: 'Nice job!',
    buttonText: 'Continue to Day 2',
  },
  {
    text: "Don't give up!",
    buttonText: 'Continue to Day 3',
  },
  {
    text: '...vast endless void...',
    buttonText: 'Continue to Day 4',
    isGlitchy: true,
  },
  {
    text: 'soon...',
    buttonText: 'Continue to last day',
    isGlitchy: true,
  },
  {
    text: 'END',
    buttonText: 'thank you for playing',
    isButtonDisabled: true,
    isGlitchy: true,
  },
];

export function updateTextAndButtonText(currentStage: number) {
  const p = document.querySelector('#intermission-text');
  const button: HTMLButtonElement | null = document.querySelector(
    '#intermission-button'
  );

  if (!p || !button) return;

  const { text, buttonText, isButtonDisabled } =
    STAGE_INTERMISSION[currentStage];

  p.innerHTML = text;
  button.innerHTML = buttonText;
  button.disabled = !!isButtonDisabled;
}
