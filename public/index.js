/**
 *Andy J Shaw
 *2/23/2022
 *AF Ludvig Liljenberg
 *This is the index.js for CP4. This script is ran on every page. It tracks how many times a
 *button is clicked and appends an image after. Any time an image is clicked on a page,
 *it is changed to a cute cartoon image.
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Initializes code after the windows has loaded
   */
  function init() {
    let images = qsa("img");
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", imageClicked);
    }
  }

  /**
   * Selects queries and returns all of them
   * @param {string} selector - the elements being selected
   * @return {array} the elements on the document with the specified selector in an array
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Changes the img source and alt when clicked on
   * Image found at https://i.pinimg.com/474x/08/76/65/0876651904c43274bd2cc1635dc4f7d6.jpg
   * @param {object} image - the image being clicked on
   */
  function imageClicked(image) {
    image.currentTarget.src = "imagestrinh/cute.jpg";
    image.currentTarget.alt = "secret hugging cartoon people";
  }
})();