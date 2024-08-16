import anime from "animejs";
import { getRandomNumber } from "./utils";

export function moveElement(element, animeType, pixels) {
  anime({
    targets: element,
    [animeType]: `${pixels}px`,
    easing: "easeOutElastic(1, 1)",
    duration: 2300,
  }).play();
}

export function changePosition(button, type) {
  button.addEventListener(type, function () {
    const top = getRandomNumber(0, window.innerHeight - this.offsetHeight - 20);
    const left = getRandomNumber(
      75,
      window.innerWidth - this.offsetWidth - 120
    );

    moveElement(this, "left", left);
    moveElement(this, "top", top);
  });
}
