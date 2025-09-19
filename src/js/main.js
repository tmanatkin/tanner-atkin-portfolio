//
// SCSS
//

// scss imports
import "/src/scss/main.scss";

// //
// // COLOR GRADIENT ANIMATION
// //

// // initialize color gradient variables
// const gradientWindowPositions = ["0% 0%", "100% 100%"];
// let currentPositionIndex = 0;
// const classBgGradient = "bg-gradient";
// const classAnimate = "bg-gradient-animate";
// const classButtonAndId = "header-title-gradient-toggle-button";
// const classSelected = "selected";

// // set color gradient on load
// function onLoadColorGradient() {
//   const initialButton = document.getElementById(`${classButtonAndId}-${currentPositionIndex}`);
//   console.log(initialButton);
//   initialButton.classList.add(`${classButtonAndId}-${classSelected}`, classBgGradient);
// }

// // trigger color gradient animation
// function colorGradientAnimation() {
//   // determine new position index (flips between 0 and 1)
//   const newPositionIndex = currentPositionIndex ? 0 : 1;

//   // set starting position
//   document.documentElement.style.setProperty("--gradient-animation-position-start", `${gradientWindowPositions[currentPositionIndex]}`);

//   // set ending (new current) position
//   document.documentElement.style.setProperty("--gradient-animation-position-end", `${gradientWindowPositions[newPositionIndex]}`);

//   // get elements and buttons
//   const buttons = document.querySelectorAll(`.${classButtonAndId}`);
//   const newButton = document.getElementById(`${classButtonAndId}-${newPositionIndex}`);

//   // toggle animation class for all elements to trigger animation
//   buttons.forEach((button) => {
//     button.disabled = true;
//     button.classList.remove(`${classButtonAndId}-${classSelected}`, classBgGradient);
//   });

//   // set current button to active
//   newButton.classList.add(`${classButtonAndId}-${classSelected}`, classBgGradient);

//   // select all elements that will have background gradient animation
//   const elements = document.querySelectorAll(`.${classBgGradient}`);

//   // toggle animation class for all elements to trigger animation
//   elements.forEach((element) => {
//     element.classList.add(classAnimate);
//   });

//   // wait till animation ends
//   elements.forEach((element) => {
//     element?.addEventListener(
//       "animationend",
//       () => {
//         // remove animation
//         element.classList.remove(classAnimate);

//         // enable buttons
//         buttons.forEach((button) => {
//           button.disabled = false;
//         });
//       },
//       { once: true }
//     );
//   });

//   currentPositionIndex = newPositionIndex;
// }

//
// GITHUB
//

function onLoadGitHubLastUpdated() {
  const footerGitHubLastUpdated = document.querySelector(".footer p:last-child");

  fetch("https://api.github.com/repos/tmanatkin/tanner-atkin-portfolio/commits?per_page=1")
    .then((response) => response.json())
    .then((data) => {
      // format date
      const lastCommitDate = new Date(data[0].commit.author.date);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long"
      }).format(lastCommitDate);

      footerGitHubLastUpdated.textContent = `Updated ${formattedDate}`;
    });
}

//
// ON LOAD
//

function onLoad() {
  // onLoadColorGradient();
  onLoadGitHubLastUpdated();
}

// scope functions to window for html button onclick
window.onLoad = onLoad;
