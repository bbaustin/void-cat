import type { Terrain } from './grid';
import { GAME_STATE_OF_TRUTH } from './gameState';
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
      generateThingCoordinatesInStraightRowsOrColumns(5, [0], 'row'),
    ],
    drama: [
      [
        'Hey 👋 !',
        "I heard that you're the going to be the trainer for VOID Cat's weight-loss program 🏋️‍♀️!",
        "Awesome! 😻 It's much appreciated! 😻 Seriously!!!",
        "I'll explain about the game during this first stage 🎓 !",
        'So basically, VOID Cat will burn calories 🥵 whenever you click one of the workout routines cards 💪 on the bottom of the screen 👇.',
        'The three cards in the middle change every turn. The two cards on the edges rotate VOID Cat and are available every turn.',
        'The orange number 🟧 on the card is the number of calories burned.',
        '(You can remember this like Garfield 🐈, the orange cat, is fat 🥧 !)',
        "You want to burn as many calories as possible 🏃💨 ! OK?? That's like your score 🕹️ !",
        'The green number 🟩 is the amount of energy the workout uses.',
        "If you use all your energy, you can't do any more workouts this turn! But don't worry 😉 !! You'll recover your energy at the beginning of the next turn!",
        "The colors 🟧 on the cards 🟩 match the colors 🟧 of the meters 🟩 at the top of the screen ☝️ . It's really good design!!",
        'OK, now try doing some workouts 🤸‍♀️ !!',
      ],
      [
        "By the way, life is really dangerous! If you see a red square 🟥 on the grid, avoid it! It'll hurt you 😿 at the end of the turn!!",
        'Try to move out of the way of the red square using your workout moves 🕺 !',
      ],
      [
        "If you see other stuff 💰 on the grid, try to move on top of it! It'll help you 😺",
        "Basically, yeah, try to grab the things 💰 and avoid the attack squares 🟥 ! That's all you gotta do!",
      ],
      [
        'By the way, VOID Cat is actually an acronym! It stands for Voluminous Ovoid Immobile Dieting Cat! But I just say VOID Cat for short!',
        `Ovoid means "shaped like an oval," if you didn't know 📖 !  I had to look it up 🧠 !`,
      ],
      [
        "Every stage has five turns 🖐️, so this is the last one! Let's make it a good one 🙌!",
      ],
    ],
  },
  /* Trees */
  {
    gridSize: { x: 5, y: 5 },
    attackCoordinates: [
      [
        [0, 0],
        [0, 4],
        [4, 0],
        [0, 4],
        ...generateThingCoordinatesInStraightRowsOrColumns(5, [2], 'column'),
      ],
      generateThingCoordinatesInDiamondShape(5),
      generateThingCoordinatesInStraightRowsOrColumns(5, [1, 3], 'column'),
      generateThingCoordinatesInDiamondShape(5),
      generateThingCoordinatesInStraightRowsOrColumns(5, [0, 2, 4], 'column'),
    ],
    drama: [
      [
        `Nice job yesterday! VOID Cat already burned ${GAME_STATE_OF_TRUTH.caloriesBurned} calories 🏅!`,
        "(Hopefully that number was positive, or else my last statement won't have made sense!)",
        "Let's exercise!",
      ],
      [
        'There are more advanced attack 🟥 patterns this level! Be careful 🙀 !',
        "If you get hit, it'll remove points from your burned calorie score!",
        'The logic of that escapes me a bit, but just be careful, OK 🥺 ?!',
      ],
      [
        'By the way, have you picked up any cards that mention "longcat" 📏 or "defensive nap" 💤 positions?',
        'Let me tell you about those real quick 📝 !',
        "When in longcat position, you take up three 🥉 tiles on the grid, so you're more likely to get hit!",
        "However, you'll burn one ☝️ additional calorie 🟧 per workout card!",
        `It's a real "no pain, no gain" mindset 💪😼 !!`,
        'When in defensive nap position, you only take up one tile on the grid.',
        'However, each workout takes one additional energy 🟩 .',
        `It's like "no pain, no gain," except the opposite 🛌 !!`,
        "Last thing! You always grow or shrink in size based on the position of VOID Cat's head 🐱 ! So strategize 🗺️ accordingly!",
      ],
      [
        "I actually can't see what you're doing, but I bet you're doing a great job!",
      ],
      ["Last turn! Let's do this!"],
    ],
  },
  /* Houses */
  {
    gridSize: { x: 5, y: 5 },
    terrain: 'street',
    attackCoordinates: [
      undefined,
      [
        [0, 0],
        [2, 0],
        [4, 0],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
      [
        [0, 4],
        [1, 3],
        [2, 2],
        [3, 1],
        [4, 0],
      ],
      [
        [0, 0],
        [0, 4],
        [1, 1],
        [1, 3],
        [2, 2],
        [3, 1],
        [3, 3],
        [4, 0],
        [4, 4],
      ],
    ],
    drama: [
      [
        'Hey, thanks for sticking around to day 3! You rule 🎸 !',
        `VOID Cat has burned ${GAME_STATE_OF_TRUTH.caloriesBurned} calories so far!`,
        "VOID Cat needs to be in shape for what's to come!",
        "Let's exercise!",
      ],
      [
        'The collectibles on the grid change from day-to-day. Did you notice 🔎 ?',
        "But don't worry about it! You should still try to grab 'em!",
        "They'll help you! I swear 🤞 !",
      ],
      [
        "If you didn't know, black cats are sometimes called void cats, because they're hard to photograph 🎞️ !",
        "When you photograph them 📷 📸 📷, they look like they're just eyes 👁️👁️ in a vast, endless void!!",
      ],
      [
        'Eyes',
        'in',
        'a',
        'vast',
        'endless',
        'void',
        '⬛️',
        '⬛️',
        '⬛️',
        '⬛️',
        '⬛️',
        '👁️',
        '⬛️',
        '⬛️',
        '⬛️',
        '👁️',
        '⬛️',
        '⬛️',
        '⬛️',
        '⬛️',
        '⬛️',
      ],
      ["Alright! Last turn! Let's do this 💪 !!"],
    ],
  },
  /* Buildings */
  {
    gridSize: { x: 5, y: 5 },
    terrain: 'street',
    attackCoordinates: [
      generateThingCoordinatesInStraightRowsOrColumns(5, [0], 'row'),
      generateThingCoordinatesInStraightRowsOrColumns(5, [1, 3], 'column'),
      generateThingCoordinatesInStraightRowsOrColumns(5, [0, 2, 4], 'row'),
      generateThingCoordinatesInStraightRowsOrColumns(5, [0, 2, 4], 'column'),
      generateThingCoordinatesInStraightRowsOrColumns(5, [1, 2, 3], 'row'),
    ],
    drama: [
      [
        'Hey, so...',
        "You don't remember me... 🥺 do you 🥹 ?",
        "I'm the narrator from the 🏆 award-winning (well, 👕 t-shirt winning) game, 💖 PicoBuddy 💖 !!",
      ],
      [
        'In that game, a really nice person 🧍, not unlike yourself 🧍🧍, helped me bring about ⬛️ THE GREAT UNBECOMING ⬛️ !',
        'It was really awesome!',
        'Everything 🌌 turned into nothingness ⬛️ !',
        'That was actually 72.4 billion years ago ⏳ ⌛️ !! Time flies, huh?',
      ],
      [
        "Even though we achieved nothingness ⬛️, something always seems to wriggle 🪱 its way back into existence 🎇 !! It's super annoying 😡 !",
        "What's kind of weird is that each time this happens, things end up really similar 👯 to how they used to be.",
        "Like, this time around, there's still an Earth 🌍, it's still filled with people 🕴, they all have their routines...",
        "There's probably a parallel to draw here with the repetitive nature of working out! I'll let you work out (no pun intended) a deeper meaning here!!",
      ],
      [
        "But anyway, if you didn't pick up on it yet 👁️👁️, VOID Cat is another harbinger of ⬛️ THE GREAT UNBECOMING ⬛️ !",
        "I also lied to you about what VOID Cat means 🤥 . I'm sorry!! I just didn't want to scare you off 🥺 ..!",
        "VOID Cat doesn't really mean Voluminous Ovoid Immobile Dieting Cat.",
        'It really means for... Voracious Omnivorous Indestructible Death Cat!!',
      ],
      [
        "Also... those red attack squares 🟥 are actually coordinates of missile strikes! That's why they were making exploding 🤯 noises, you know!",
        'Your planet is trying to stop the inevitable 🥹 !!',
        'But VOID Cat is growing 📈 at an superexponential rate.',
        "After you finish helping it absorb this city 🏙️ , its mass will start to surpass Earth's.",
        'So tomorrow VOID Cat can absorb the entire world!',
        'Tomorrow might be kind of weird.',
      ],
    ],
  },
  /* Space */
  {
    gridSize: { x: 13, y: 13 },
    attackCoordinates: [undefined, undefined, undefined, undefined, undefined],
    drama: [
      [
        'Woah, this last stage looks kind of messed up.',
        "It doesn't even fit in the screen correctly on my monitor 🖥️ ! Bad design 🔥 !",
        'I guess things tend to fall apart as you get closer to ⬛️ THE GREAT UNBECOMING ⬛️ .',
      ],
      [
        "The collectibles in this level are planets 🪐, if you couldn't tell.",
        'To be honest, I lied 🤥 about the collectibles, too 😔 ...',
        'I just needed you to help VOID Cat absorb stuff, to increase its mass.',
        "You can't actually buy anything 💸 with all the money you collected.",
        "I mean... at this point, there's nothing left to buy, anyway...",
        "So let's just roll around and have fun burning some more calories 💪 !",
      ],
      [
        'Actually, I guess keeping track of the burned calories was a little pointless, too...',
        "Like, it was really nice of you to help 😻 , don't get me wrong!",
        'But, OK, let me do some quick calculating 🧐 ...',
        `VOID Cat burned ${GAME_STATE_OF_TRUTH.caloriesBurned} calories. That's cool!`,
        'To lose one kilogram, you need to burn about 7700 calories (even for a cat 🙀 ! I think!).',
        `So that means with your help, VOID Cat lost ~${
          Math.floor((GAME_STATE_OF_TRUTH.caloriesBurned / 7700) * 10000) /
          10000
        } kg!`,
        'However, on the other hand, VOID Cat is well on its way to absorbing the entire mass-energy of the universe.',
        'That comes out to 3x10^54 kg.',
        "Written out, it's 3,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000 kg",
        'So, overall... I think you did a really good job 👍 !',
      ],
      ['Anyway...'],
      ["I guess it's almost the end..."],
      [
        'Thanks for your making it to the end!',
        'And see you in another 72.4 billion years! ',
      ],
    ],
  },
];
