import { RGBColor, getRandomInt } from "./util.js";
export { RenderRule, ruleRandom, ruleCircular, userRule };

/**
 *  Rules are excpected to return a value for each pixel on the canvas
 *  rgba values all should be in range 0-255
 *
 * @interface RenderRule - Interface for rules used to color the canvas
 */
interface RenderRule {
  apply_rule(
    x: number,
    y: number,
    canvasW: number,
    canvasH: number,
    counter: number
  ): RGBColor;
}

/**
 * Draws random colors on the canvas.
 *
 * @class ruleRandom
 * @implements {RenderRule}
 */
class ruleRandom implements RenderRule {
  apply_rule(
    x: number,
    y: number,
    canvasW: number,
    canvasH: number,
    counter: number
  ): RGBColor {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    return new RGBColor(r, g, b);
  }
}

/**
 * Draws a circle on the canvas with random colors for each pixel on it.
 *
 * @class ruleCircular
 * @implements {RenderRule}
 */
class ruleCircular implements RenderRule {
  radius: number;
  tolerance: number;

  constructor(radius: number, tolerance: number) {
    this.radius = radius;
    this.tolerance = tolerance;
  }

  apply_rule(
    x: number,
    y: number,
    canvasW: number,
    canvasH: number,
    counter: number
  ): RGBColor {
    let _x = x - canvasW / 2;
    let _y = y - canvasH / 2;
    if (
      Math.pow(_x, 2) + Math.pow(_y, 2) <=
        Math.pow(this.radius * (1 + counter), 2) * (1 + this.tolerance) &&
      Math.pow(_x, 2) + Math.pow(_y, 2) >=
        Math.pow(this.radius * (1 + counter), 2) * (1 - this.tolerance)
    ) {
      const r = getRandomInt(0, 255);
      const g = getRandomInt(0, 255);
      const b = getRandomInt(0, 255);
      return new RGBColor(r, g, b);
    } else {
      return new RGBColor(0, 0, 0, 255);
    }
  }
}

/**
 * User defined rules for testing purposes
 *
 * @class userRule
 * @implements {RenderRule}
 */
class userRule implements RenderRule {
  selector: number = 0;
  constructor(selector: number) {
    this.selector = selector;
  }
  apply_rule(
    x: number,
    y: number,
    canvasW: number,
    canvasH: number,
    counter: number
  ): RGBColor {
    let normX = (x - canvasW / 2) / (canvasW / 2);
    let normY = (y - canvasH / 2) / (canvasH / 2);
    switch (this.selector) {
      case 0:
        // Static colors
        return new RGBColor(x % 500, y % 500, ((x + y) / 2) % 250);
      case 1:
        // Static colors without borders
        return new RGBColor(x % (canvasW / 2), 100, y % (canvasW / 4));
      case 2:
        // Dynamıc colors without borders
        return new RGBColor(
          x % (canvasW / 2),
          counter * (canvasW / 3),
          y % (canvasW / 2)
        );
      case 3:
        // Static blue shapes
        return new RGBColor(0, 0, (x * y) % (canvasW / 4));
      case 4:
        // Static blue shapes
        return new RGBColor(0, 0, (x ^ y) % (canvasW / 4));
      case 5:
        // Normalization
        return new RGBColor(0, 0, Math.abs((normX + normY) / 2) * 255);
      case 6:
        // Maths
        return new RGBColor(0, ((normY / normX) % 0.1) * 255, ((normX * normY) % 0.22) * 255);
      default:
        return new RGBColor(0, 0, 0);
    }
  }
}
