//
// SCSS
//

// scss imports
import "/src/scss/main.scss";

//
// COLOR GRADIENT ANIMATION
//

// initialize color gradient variables
const gradientWindowPositions = ["0% 0%", "100% 100%"];
let currentPositionIndex = 1;
const classBgGradient = "bg-gradient";
const classAnimate = "bg-gradient-animate";
const classButtonAndId = "header-title-gradient-toggle-button";
const classSelected = "selected";

export function colorGradientAnimation() {
  // determine new position index (flips between 0 and 1)
  const newPositionIndex = 1 - currentPositionIndex;

  // set starting position
  document.documentElement.style.setProperty("--gradient-animation-position-start", `${gradientWindowPositions[currentPositionIndex]}`);

  // set ending (new current) position
  document.documentElement.style.setProperty("--gradient-animation-position-end", `${gradientWindowPositions[newPositionIndex]}`);

  // get elements and buttons
  const buttons = document.querySelectorAll(`.${classButtonAndId}`);
  const currentButton = document.getElementById(`${classButtonAndId}-${currentPositionIndex}`);

  // toggle animation class for all elements to trigger animation
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove(`${classButtonAndId}-${classSelected}`, classBgGradient);
  });

  // set current button to active
  currentButton.classList.add(`${classButtonAndId}-${classSelected}`, classBgGradient);

  // select all elements that will have background gradient animation
  const elements = document.querySelectorAll(`.${classBgGradient}`);

  // toggle animation class for all elements to trigger animation
  elements.forEach((element) => {
    element.classList.add(classAnimate);
  });

  // wait till animation ends
  elements.forEach((element) => {
    element?.addEventListener(
      "animationend",
      () => {
        // remove animation
        element.classList.remove(classAnimate);

        // enable buttons
        buttons.forEach((button) => {
          button.disabled = false;
        });
      },
      { once: true }
    );
  });

  currentPositionIndex = newPositionIndex;
}

// scope function to window for html button onclick
window.colorGradientAnimation = colorGradientAnimation;
