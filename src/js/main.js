//
// SCSS
//

// scss imports
import "/src/scss/main.scss";

//
// COLOR GRADIENT ANIMATION
//

// initialize color gradient variables
const gradientWindowPositions = ["0% 0%", "33% 33%", "67% 67%", "100% 100%"];
let currentPositionIndex = 0;
const classBgGradient = "bg-gradient";
const classAnimate = "bg-gradient-animate";
const classButtonAndId = "header-title-gradient-toggle-button";
const classSelected = "selected";

export function colorGradientAnimation(newPositionIndex) {
  // reset position to loop end to end
  if (currentPositionIndex === 2 && newPositionIndex === 0) {
    newPositionIndex = 3;
  } else if (currentPositionIndex === 0 && newPositionIndex === 2) {
    currentPositionIndex = 3;
  }

  // set starting position
  document.documentElement.style.setProperty("--gradient-animation-position-start", `${gradientWindowPositions[currentPositionIndex]}`);

  // set ending (new current) position
  document.documentElement.style.setProperty("--gradient-animation-position-end", `${gradientWindowPositions[newPositionIndex]}`);

  // set new current position
  if (newPositionIndex === 3) {
    currentPositionIndex = 0;
  } else {
    currentPositionIndex = newPositionIndex;
  }

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

        // enable buttons (except for current position)
        [0, 1, 2]
          .filter((n) => n !== currentPositionIndex)
          .forEach((n) => {
            document.getElementById(`${classButtonAndId}-${n}`).disabled = false;
          });
      },
      { once: true }
    );
  });
}

// scope function to window for html button onclick
window.colorGradientAnimation = colorGradientAnimation;
