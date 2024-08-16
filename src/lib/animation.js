import anime from "animejs";
import { getRandomNumber } from "./utils";

export function moveElement(element, animeType, pixels) {
    anime({
        targets: element,
        [animeType]: `${pixels}px`,
        easing: "easeOutElastic(1, .5)",
        duration: 1000,
    }).play();
};

export function changePosition (button, type) {
    button.addEventListener(type, function () {
      const top = getRandomNumber(0, window.innerHeight - this.offsetHeight);
      const left = getRandomNumber(0, window.innerWidth - this.offsetWidth);

      moveElement(this, "left", left);
      moveElement(this, "top", top);
    });
  }