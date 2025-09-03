import type { Terrain } from './grid';
import { GAME_STATE_OF_TRUTH } from './main';
import {
  generateThingCoordinatesInDiamondShape,
  generateThingCoordinatesInStraightRowsOrColumns,
  type ThingCoordinates,
} from './thing';

/** This is the current stage you are playing.
 * It's just a number, so access it by using STAGES[CURRENT_STAGE] */
export const CURRENT_STAGE = 2;

// TODO: If you have a map of terrains, you might not need gridSize, only array row/col
export interface Stage {
  gridSize: { x: number; y: number };
  attackCoordinates: (ThingCoordinates | undefined)[];
  terrain?: Terrain;
  turns?: number;
  drama: string[][];
}

export const STAGES: Stage[] = [
  /* Vague */
  {
    gridSize: { x: 5, y: 5 },
    attackCoordinates: [
      undefined,
      [[0, 0]],
      [[0, 1]],
      [[1, 0]],
      generateThingCoordinatesInStraightRowsOrColumns(3, [0], 'row'),
    ],
    drama: [
      [
        'Hey 👋 !',
        "Thanks for much for helping with VOID Cat's weight-loss 🏋️‍♀️!",
        "It's much appreciated! 😻 Seriously!!!",
        "I'll explain about the game during this first stage 🎓 !",
        'So basically, VOID Cat will burn calories 🥵 whenever you click one of the workout routines 💪 on the bottom of the screen 👇.',
        'The three routines in the middle change every turn. The two on the edges rotate VOID Cat and are available every turn.',
        'The orange number 🟧 is the number of cals burned.',
        '(You can remember this like Garfield, the orange cat, is fat!)',
        "You want to burn as many calories as possible 🏃💨 ! That's like your score 🕹️ !",
        'The green number 🟩 is the amount of energy it uses.',
        "If you use all your energy, you can't do any more workouts! But you'll recover some energy at the beginning of the next turn!",
        "These colors on the cards match the colors of the meters at the top of the screen 👈 , so it'll be easy for you to keep track of. It's really good design 🎨 !!",
        'OK, now try doing some workouts 🤸‍♀️ !!',
      ],
      [
        "By the way, life is really dangerous! If you see a red square 🟥 on the grid, avoid it! That'll hurt you 😿",
        'Try to move out of the way of the red square using your workout moves!',
      ],
      [
        "If you see other stuff 💰 on the grid, try to move to it! It'll help you 😺",
        'Try to grab the shiny thing 💸 and avoid the attack square 🟥 !',
      ],
      [
        "I actually can't see what you're doing, but I bet you're doing a great job!",
      ],
      [
        "Every stage has five turns 🖐️, so this is the last one! Let's make it a good one 🙌!",
      ],
    ],
  },
  /* Trees */
  {
    gridSize: { x: 5, y: 5 },
    attackCoordinates: [undefined, [[0, 0]], [[0, 1]], [[1, 0]], undefined],
    drama: [
      [
        // `Nice job yesterday! VOID Cat already burned ${GAME_STATE_OF_TRUTH.caloriesBurned} calories 🏅!`,
        "(Hopefully that number was positive, or else that last line won't have made sense!)",
        "Let's exercise!",
      ],
      [
        'There are more advanced attack 🟥 patterns this level! Be careful 🙀 !',
        "If you get hit, it'll remove points from your burned calorie score 🙀 !",
        "Yeah, I don't get it either!!",
      ],
      [
        'By the way, have you picked up any cards that mention "longcat" 📏 or "defensive nap" 💤 positions?',
        'Let me tell you about those real quick!',
        "When in longcat position, you take up three 🥉 tiles on the grid, so you're more likely to get hit!",
        "However, you'll burn one ☝️ additional calorie 🟧 per workout!",
        `It's a real "no pain, no gain" mindset 💪😼 !!`,
        'When in defensive nap position, you only take up one tile on the grid.',
        'However, each workout takes one additional energy 🟩 .',
        `It's like "no pain, no gain," but the opposite 🛌 !!`,
        "Last thing! You always grow or shrink in size based on the position of VOID Cat's head 🐱 ! So strategize 🗺️ accordingly!",
      ],
      ['Alright, just two more turns!'],
      ["Last turn! Let's do this!"],
    ],
  },
  /* Houses */
  {
    gridSize: { x: 5, y: 5 },
    terrain: 'street',
    attackCoordinates: [
      undefined,
      [[0, 0]],
      [[0, 1]],
      [[1, 0]],
      generateThingCoordinatesInDiamondShape(5),
    ],
    drama: [
      [
        'Hey, thanks for sticking around!',
        // `VOID Cat has burned ${GAME_STATE_OF_TRUTH.caloriesBurned} calories!`,
        "VOID Cat needs to be in shape for what's to come!",
        "Let's exercise!",
      ],
      [
        'The collectibles on the grid change from day-to-day. Did you notice 🔎 ?',
        "But don't worry about it! You should still try to grab 'em!",
      ],
      [
        "If you didn't know, black cats are sometimes called void cats, because they're hard to photograph, and look like they're just eyes in a vast, endless void!",
      ],
      [
        'In this case, VOID Cat is actually a really long acronym, though! It stands for Voluminous Ovoid Immobile Dieting Cat! Or VOID Cat for short!',
      ],
      [
        "Alright! Last turn! There are only two more levels after this! We're getting close to the end!",
      ],
    ],
  },
  /* Buildings */
  {
    gridSize: { x: 5, y: 5 },
    terrain: 'street',
    attackCoordinates: [
      undefined,
      [[0, 0]],
      [[0, 1]],
      [[1, 0]],
      generateThingCoordinatesInDiamondShape(5),
    ],
    drama: [
      [
        'Hey, so...',
        "You don't remember me... do you?",
        'No... I guess that would be impossible.',
        "Well, you don't know me, but I know you.",
      ],
      [
        "I'm the narrator from the 🏆 award-winning (OK, 👕 t-shirt winning) game, 💖 PicoBuddy 💖 !",
        'In that game, a really nice person, not unlike yourself, helped me bring about ⚫️ THE GREAT UNBECOMING ⚫️ !',
        'It was really awesome!',
        'Everything 🌌 turned into nothingness ⬛️ ! But...',
        'But... that was 72.4 billion years ago...',
        "So it can't be the same you from last time...",
      ],
      [
        'These things are kind of cyclical.',
        'Even though we achieved nothingness together, something always seems to wriggle its way back into existence.',
        "It's kind of weird, too, because every time this happens, things end up really similar to how they used to be.",
        "Like, there's still an Earth, it's still filled with people, they all have their routines...",
        'So... maybe it is you...',
      ],
      [
        "Well, I guess it doesn't matter much, anyway.",
        "Because if you didn't pick up on it yet, VOID Cat is another harbinger of THE GREAT UNBECOMING.",
        "I also lied to you about what VOID Cat means. I'm sorry. I just didn't want to scare you off.",
        "VOID Cat doesn't really mean Voluminous Ovoid Immobile Dieting Cat.",
        'Well, the "V" is correct, I guess.',
        'But its real name is Voluminous Omniscient Indestructible Death Cat.',
      ],
      [
        'Those red attack squares were coordinates of intercontinental missiles.',
        'Mankind again is trying to stop the inevitable.',
        'But VOID Cat is growing at an superexponential rate.',
        "After you finish helping it absorb this city, its mass will start to surpass Earth's.",
        'So the world will be gone after today.',
        'Tomorrow might be kind of weird.',
      ],
    ],
  },
  /* Space */
  {
    gridSize: { x: 15, y: 15 },
    attackCoordinates: [undefined, undefined, undefined, undefined, undefined],
    drama: [
      [
        'Woah, this last stage looks kind of weird.',
        "It doesn't even fit in the screen correctly.",
        'I guess things tend to fall apart as you get closer to THE GREAT UNBECOMING.',
        "The collectibles in this level are planets, if you couldn't tell.",
        "They're all uninhabited, though. No one left to attack us.",
        "So let's just roll around and have fun burning some more calories!",
      ],
      [
        'Actually, I guess keeping track of the burned calories was a little pointless.',
        "Like, it was really nice of you to help, don't get me wrong!",
        'But, OK, let me do some quick calculating...',
        // `VOID Cat burned ${GAME_STATE_OF_TRUTH.caloriesBurned} calories. That's cool!`,
        'To lose one kilogram, you need to burn about 7700 calories.',
        `So that means with your help, VOID Cat lost ~${
          // Math.floor((GAME_STATE_OF_TRUTH.caloriesBurned / 7700) * 10000) /
          10000
        } kg!`,
        'However, on the other hand, VOID Cat is well on its way to absorbing the entire mass-energy of the universe.',
        'That comes out to 3x10^54 kg.',
        'So, overall... I think you did a really good job!',
      ],
      [
        'Yeah, all we really needed was for someone to get VOID Cat moving.',
        'Then its momentum would allow it to roll around and absorb a bunch of stuff.',
      ],
      [
        "Anyway... I guess it's almost the end...",
        "There's only one ending this time. VOID Cat consumes all.",
        'So...',
      ],
      ['Thanks for your help!', 'And see you in another 72.4 billion years! '],
    ],
  },
];
