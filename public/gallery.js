/**
 *Andy J Shaw
 *2/23/2022
 *AF Ludvig Liljenberg
 *This is the gallery.js for CP4. This script is only ran for the gallery.html and generates
 *images for the page. All images were taken by me.
 */

"use strict";
(function() {
  const picsTrinh = 44;
  window.addEventListener("load", init);

  /**
   * Initializes code after the windows has loaded
   */
  function init() {
    generatePics();
  }

  /**
   * Selects an id and returns it
   * @param {string} id - the element being selected
   * @return {object} the element on the document with the specified id
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Generates 35 images of my significant other and adds them to the trinh class to
   * format and style
   */
  function generatePics() {
    for (let i = 1; i <= picsTrinh; i++) {
      let img = document.createElement("img");
      img.src = "imagestrinh/a" + i + ".jpg";
      img.alt = "Trinh";
      img.classList.add("trinh");
      id("gallery").appendChild(img);
    }
  }
})();