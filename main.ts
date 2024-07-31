import { calculateAndDrawNextImage } from "./src/render.js";
import { ruleCircular, ruleRandom, userRule } from "./src/rule.js";

export default function main() {
  const canvas: any = document.getElementById("Canvas");
  const ctx: any = canvas.getContext("2d");

  const canvasWidth: number = canvas.width;
  const canvasHeight: number = canvas.height;

  const imageData = ctx.createImageData(canvasWidth, canvasHeight);
  let data = imageData.data;

  // Draw interval in miliseconds
  const interval: number = 100;
  // Possible frame variations for rules
  const variations: number = 50;

  // const rule = new ruleCircular(canvasWidth / 4, 0.2);
  // const rule = new ruleRandom();
  const rule = new userRule(5);

  let counter: number = 0;
  setInterval(() => {
    if (counter >= 1) {
      counter = 0;
    }
    counter += 1 / variations;
    calculateAndDrawNextImage(data, canvasWidth, canvasHeight, rule, counter);
    ctx.putImageData(imageData, 0, 0);
  }, interval);
}

document.addEventListener("DOMContentLoaded", function () {
  main();
});
