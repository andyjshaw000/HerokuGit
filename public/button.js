/**
 *Andy J Shaw
 *2/23/2022
 *AF Ludvig Liljenberg
 *This is the button.js for CP4. This script is ran on the why.html. It tracks how many times a
 *button is clicked and appends an image after.
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Initializes code after the windows has loaded
   */
  function init() {
    let button = qs("button");
    let heartcounter = 0;
    button.addEventListener("click", function() {
      heartcounter += 1;
      buttonClicked(heartcounter);
    });
  }

  /**
   * Selects a query and returns it
   * @param {string} selector - the element being selected
   * @return {object} the first element on the document with the specified selector
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Counts how many times a button was clicked and appends a gif of hearts to the main
   * Image found at https://www.pinterest.com/pin/1115555770168060040/
   * @param {int} counter - the amount of time the button was clicked
   */
  function buttonClicked(counter) {
    let img = document.createElement("img");
    img.src = "imagestrinh/a31.gif";
    img.alt = "heart cartoon gif";
    img.classList.add("image2");
    qs("main").append(img);
    qs("#counter").textContent = "Heart counter: " + counter;
  }
})();