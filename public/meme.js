/**
 *Andy J Shaw
 *2/23/2022
 *AF Ludvig Liljenberg
 *This is the meme.js for CP4. This script is ran on meme.html. It calls the memegenerator API to
 *generate memes dynamically on the page. The captions are randomly generated from the arrays of
 *random things about my significant other and I.
 */

"use strict";
(function() {
  const memeAmount = 100;
  const boxes = 2;
  const firstText = ["Trinh making a \"Hi I'm Trinh\" joke",
  "Trinh eating a burger with a fork", "Trinh eating an arepa with a fork and knife",
  "Trinh being sad I won't date her if she didn't exist", "Trinh napping for the third time today",
  "Trinh being a goof ball", "Trinh saying \"oh naurr\"", "Trinh hating on Oreos",
  "Trinh not wanting to eat at Red Robin", "Trinh lying about not being ticklish",
  "Trinh stealing Hop Smoke", "Trinh starting to like cats over dogs",
  "Trinh smoking a cigarette on accident", "Trinh losing her phone",
  "Trinh randomly dancing in her room", "When she asks if I want Meraki",
  "Trinh thinking her taste buds are superior", "When she thinks she can beat me in basketball",
  "When she is certain she can outwrestle me", "You running away from me because I have bad cardio",
  "Us practicing our dance moves in front of Tre",
  "Chase figuring out that we are dating before anyone else knows",
  "you gassing me for my smooth brain", "you reexplaining a memory to me",
  "us having a minor conflict", "your taste buds", "you generating body heat like a volcano",
  "you trying to convince me not to get a dog", "you trying to be on top when holding hands",
  "trinh starting to get cramps", "trinh bleeding profusely",
  "you claiming to be a better parent for our frog children", "\"Red Robin sucks\"",
  "Pegging kids at a trampoline park", "\"We're the same height\"",
  "\"I thought the Rock and Dwayne Johnson were different people\"", "claiming to be alpha",
  "you thinking the window wipers can only be pressed for a second", "*starts twitching*",
  "*drools*", "*starts tickling me", "\"I wear the pants\"", "Loan looking banger"];
  const secondText = ["Me crying in the club", "Me saying \"BANGARANG\"",
  "Me looking for gold", "Me not understanding female anatomy", "Me being swaggy af",
  "Me playing video games for the whole day", "When I create a webpage for her",
  "Me telling her I like her for the tenth time in the past two minutes",
  "Me driving to her because I like her so much", "sewiouswy?",
  "Me saying boy what the hell boy", "Me dominating in bouldering", "Me clapping you in pool",
  "Me clapping you in IOS games", "Bussin' down", "Having a party in your room", "Uyen *exists*",
  "Khang saying facts facts", "Tre and Loan going crazy and Khang knocking on the door",
  "Me being Alpha", "Us finally riding the ferris wheel and making a vlog (:",
  "Us having the same thought", "*climbs gasworks*", "*complains about team in capstone*",
  "*gassing the PI*", "says don't stay up too late then does homework until 6am",
  "*trying to be silent in the pp house*", "hiding our relationship status from pp party",
  "*gives you all my love and affection*", "*proceeds to continue to care very deeply about you*",
  "me eating a red robin burger without shame", "me sk8ing into ur heart", "*smooth brain moment*",
  "cuddling", "us having a fun day despite not doing much", "me truly enjoying your company",
  "*acts of service*", "*buys you snacks*",
  "proceeds to watch a movie for 5 minutes and then deciding to sleep",
  "me flicking her chin after i make you look down", "bruh", "*barking noises*", "*acts sussy*",
  "\"sheesh\"", "*silence*", "\"They see a bathroom, but I see potential\""];
  window.addEventListener("load", init);

  /**
   * Initializes code after the windows has loaded
   */
  function init() {
    let button = qs("button");
    button.addEventListener("click", function() {
      makeRequest();
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
   * Iterates over each template id from the intial response of the get_memes API call
   * Randomly selects an index for caption choices for each meme generated on the page
   * @param {object} data - the response object of get_memes
   */
  function getJSON(data) {
    for (let i = 0; i < memeAmount; i++) {
      if (data.data.memes[i].box_count === boxes) {
        captionImage(
          data.data.memes[i].id,
          firstText[Math.floor(Math.random() * firstText.length)],
          secondText[Math.floor(Math.random() * secondText.length)]
        );
      }
    }
  }

  /**
   * Requests for the url of the memegenerator, checking its status and converting
   * the response to a .json
   * @param {string} memeid - the template id of of one meme from the array given from get_memes
   * @param {string} text0 - the first caption
   * @param {string} text1 - the secont caption
   */
  async function captionImage(memeid, text0, text1) {
    try {
      let response = await fetch("https://api.imgflip.com/caption_image?username=andyjshaw000&password=Awsome12345&template_id=" + memeid + "&text0=" + text0 + "&text1=" + text1);
      let check = await statusCheck(response);
      let data = await check.json();
      let img = document.createElement("img");
      img.src = data.data.url;
      img.alt = "A meme about Trinh and I";
      img.classList.add("meme");
      qs("section").appendChild(img);
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Requests for the url of the memegenerator, checking its status and converting
   * the response to a .json
   */
  async function makeRequest() {
    qs("section").innerHTML = "";
    try {
      let response = await fetch("https://api.imgflip.com/get_memes");
      let check = await statusCheck(response);
      let data = await check.json();
      getJSON(data);
    } catch (error) {
      errorHandler(error);
    }
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

  /**
   * Handles errors and displays them to the page
   * @param {string} error - an error message
   */
  function errorHandler(error) {
    let errorMessage = document.createElement("h1");
    errorMessage.textContent = error;
    qs("section").appendChild(errorMessage);
  }
})();