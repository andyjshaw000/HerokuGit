/**
 *Andy J Shaw
 *2/24/2022
 *AF Ludvig Liljenberg
 *This is the app.js for CP4. This script is a server that has data on couples and names and
 *sends back specific responses depending on the endpoints and parameters/body
 */
"use strict";

const express = require("express");
const app = express();
const multer = require("multer");
const COUPLES = {
  "andy": "trinh",
  "trinh": "andy",
  "victor": "rosie",
  "rosie": "victor",
  "chase": "caylie",
  "caylie": "chase",
  "ethan": "hannah",
  "hannah": "ethan",
  "minh": "JP",
  "JP": "minh",
  "eugene": "erin",
  "erin": "eugene",
  "raymond": "mari",
  "mari": "raymond",
  "ryan": "adam",
  "adam": "ryan"
};
const CUTE_NAME = ["boogers", "honeybunches", "sugarplums", "pumpkins",
"cuties", "kissies", "honeys", "bunnys", "doggies", "kitties", "monkeys",
"goofies", "sillies"];
const GOOD_REQ = 200;
const BAD_REQ = 400;
const PORT_DEF = 8000;
const HUNDRED = 100;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * Given a POST request with two names through the body, will check if
 * both names are matches in the file. If they are, function will make their compatibility
 * probability 100, otherwise a number will be randomized
 * @param {object} req - the HTTP request
 * @param {object} res - the HTTP response
 * @return {JSON} the compatibility of the couple
 */
app.post("/lovetester", function(req, res) {
  let name1 = req.body.name1.toLowerCase();
  let name2 = req.body.name2.toLowerCase();
  res.status(GOOD_REQ);
  if (name1 && name2) {
    let cutePair = COUPLES[name1];
    if (cutePair === name2) {
      res.json({
        "probability": HUNDRED + "%",
        "truecouple": "You guys are meant to be"
      });
    } else {
      let probability = Math.round(Math.random() * HUNDRED);
      res.json({
        "probability": probability + "%",
        "truecouple": "The stars are unsure if you guys are meant to be"
      });
    }
  } else {
    res.type("text");
    res.status(BAD_REQ);
    res.send("missing one of required body params, name1 and/or name2");
  }
});

/**
 * Given a POST request with two names through the body, will write a ship name
 * to the HTML
 * @param {object} req - the HTTP request
 * @param {object} res - the HTTP response
 * @return {text} the ship name of the couple
 */
app.post("/shipname", function(req, res) {
  let name1 = req.body.name1.toLowerCase();
  let name2 = req.body.name2.toLowerCase();
  if (name1 && name2) {
    res.type("text");
    res.status(GOOD_REQ);
    let shipName = sendShip(name1, name2);
    res.send(shipName);
  } else {
    res.type("text");
    res.status(BAD_REQ);
    res.send("missing one of required body params, name1 and/or name2");
  }
});

/**
 * Looks at two strings and determines if their names can be combined in some way,
 * choosing the longest ship name
 * @param {string} name1 - the first name
 * @param {string} name2 - the second name
 * @return {string} the ship name with extra information
 */
function sendShip(name1, name2) {
  let shipName = "";
  for (let i = 0; i < name1.length; i++) {
    for (let j = 0; j < name2.length; j++) {
      if (name1.charAt(i) === name2.charAt(j)) {
        let nameLength1 = name1.substring(0, i) + name2.substring(j, name2.length);
        let nameLength2 = name2.substring(0, j) + name1.substring(i, name1.length);
        if (nameLength1.length > nameLength2.length) {
          shipName = nameLength1.charAt(0).toUpperCase() + nameLength1.slice(1);
        } else {
          shipName = nameLength2.charAt(0).toUpperCase() + nameLength2.slice(1);
        }
        return "Your ship name is " + shipName;
      }
    }
  }
  return "Your names don't match well, so you guys are " +
  CUTE_NAME[Math.floor(Math.random() * CUTE_NAME.length)];
}

app.use(express.static("public"));
const PORT = process.env.PORT || PORT_DEF;
app.listen(PORT);