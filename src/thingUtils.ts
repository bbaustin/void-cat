import { CAT_OF_TRUTH, getOccupiedTiles } from './cat';
import { getTile } from './grid';
import { updateMoney } from './meterUtils';
import { playPickup1 } from './sounds';
import { generateCoin, type ThingCoordinates, type Thing } from './thing';

type ThingOrClass =
  | { thing: Thing; className?: never }
  | { thing?: never; className: string };

/**
 * This does the actual appending on stuff to the board.
 * Stuff refers to either Things (like coins) or CSS classes (like 'attack')
 * @param coordinates these are [x, y][] coordinates, but most likely come from a function like generateThingsInDiamondShape, which generate these for you
 * @param thingOrClass you should pass either {className: 'whatever'} OR {thing: 'coin'}, but not both
 */
export function addThingsToGrid(
  coordinates: ThingCoordinates,
  thingOrClass: ThingOrClass
) {
  coordinates.forEach((thingLocation) => {
    const [x, y] = thingLocation;
    const { thing, className } = thingOrClass;

    const tileToAppendTo = getTile(x, y);
    if (!tileToAppendTo) {
      return;
    }

    if (thing) {
      // NOTE: Clear out div first
      // You might not want/need to do this
      tileToAppendTo.innerHTML = '';

      if (thing === 'coin') {
        return tileToAppendTo.appendChild(generateCoin());
      }
    }

    if (className) {
      return tileToAppendTo.classList.add(className);
    }
  });
}

/**
 *
 */
export function absorbThing(spaceToAbsorbFrom?: ThingCoordinates) {
  const tilesOccupiedByCat = getOccupiedTiles(
    CAT_OF_TRUTH.headX,
    CAT_OF_TRUTH.headY,
    CAT_OF_TRUTH.headFacing,
    CAT_OF_TRUTH.length
  );

  tilesOccupiedByCat.forEach((occupiedTile) => {
    const tile = getTile(occupiedTile.x, occupiedTile.y);
    if (!tile) return;
    // NOTE: Right now only absorbing coin of course
    const coinTile = tile?.querySelector('.coin');
    if (coinTile) {
      // This is always only 1 now; please never put non-numbers in here :>
      updateMoney(Number(coinTile.innerHTML));
      tile?.removeChild(coinTile);
      playPickup1();
    }
  });
}
