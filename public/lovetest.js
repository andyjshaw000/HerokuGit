/**
 *Andy J Shaw
 *2/23/2022
 *AF Ludvig Liljenberg
 *This is the lovetest.js for CP4. This script is ran on lovetest.html. It calls the app.js API to
 *generate numbers and names dynamically on the page. The numbers are randomly generated and ship
 *names are chosen based on shared characters
 */

"use strict";
(function() {
  const LOVE_API_URL = "http://localhost:8000/lovetester";
  const NAME_API_URL = "http://localhost:8000/shipname";
  window.addEventListener("load", init);

  /**
   * Initializes code after the windows has loaded
   * Overrides the default submission behavior for the form's submit event
   */
  function init() {
    id("input-form").addEventListener("submit", function(formSubmit) {
      formSubmit.preventDefault();
      submitRequest();
      submitNameRequest();
      id("results").innerHTML = "";
    });
  }

  /**
   * Sends form data to the app.js. printing a compatibility percentage based on
   * names chosen
   */
  async function submitRequest() {
    try {
      let params = new FormData(id("input-form"));
      let response = await fetch(LOVE_API_URL, {method: "POST", body: params});
      let check = await statusCheck(response);
      let data = await check.json();
      let chance = document.createElement("p");
      chance.textContent = "Your chance of love is " + data.probability;
      id("results").appendChild(chance);
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Sends form data to the app.js. printing a cute couple name based on
   * names chosen
   */
  async function submitNameRequest() {
    try {
      let params = new FormData(id("input-form"));
      let response = await fetch(NAME_API_URL, {method: "POST", body: params});
      let check = await statusCheck(response);
      let data = await check.text();
      let shipName = document.createElement("p");
      shipName.textContent = data;
      id("results").appendChild(shipName);
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Handles errors and displays them to the page
   * @param {string} error - an error message
   */
  function errorHandler(error) {
    id("results").textContent = error;
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
   * Checks if the the promise is in the 200 range/ "ok"
   * Throws an error if the response is not "ok"
   * @param {promise} response - the response from the url
   * @return {promise} the response from the url
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }
})();