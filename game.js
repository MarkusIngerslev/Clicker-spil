"use strict";

window.addEventListener("load", initGame);

let points = 0;

function initGame() {
  console.log("start");
  document.querySelector("#duck1_container").classList.add("duck_move");
  document.querySelector("#dog1_container").classList.add("dog_move");
  document
    .querySelector("#duck1_container")
    .addEventListener("click", duckClick);
  document.querySelector("#dog1_container").addEventListener("click", dogClick);
}

// Scoreboard

function displayNumber() {
  console.log("displayNumber");
  document.querySelector("#point_count").textContent = points;
}

// Clicking on a good element

function duckClick() {
  console.log("duckClick");
  document
    .querySelector("#duck1_container")
    .removeEventListener("click", duckClick);
  document.querySelector("#duck1_container").classList.add("paused");
  document.querySelector("#duck1_sprite").classList.add("zoom_out");

  // Tilføjer nummer til variablen points
  console.log("plusNumber");
  points++;
  displayNumber();

  //når forsvind animationen er færdig, duckGone

  document
    .querySelector("#duck1_container")
    .addEventListener("animationend", duckGone);
}

function duckGone() {
  //Fjerner evnet der startede functionen
  document
    .querySelector("#duck1_container")
    .removeEventListener("animationend", duckGone);

  //Fjerner class med forsvind animation
  document.querySelector("#duck1_sprite").classList.remove("zoom_out");

  //Fjerner pause fra container
  document.querySelector("#duck1_container").classList.remove("paused");

  //Genstarter bevægelse fra venstre mod højre
  document.querySelector("#duck1_container").classList.remove("duck_move");
  document.querySelector("#duck1_container").offsetWidth;
  document.querySelector("#duck1_container").classList.add("duck_move");

  // Tilføjer event så anden kan klikkes på igen
  document
    .querySelector("#duck1_container")
    .addEventListener("click", duckClick);
}

// Clicking on a bad element
function dogClick() {
  console.log("dogClick");

  //Fjerner event så hun ikke kan klikkes på igen
  document
    .querySelector("#dog1_container")
    .removeEventListener("click", dogClick);

  // pauser move animationen for hund-container
  document.querySelector("#dog1_container").classList.add("paused");
  // laver zoom_out animation på selve spriten af hunden
  document.querySelector("#dog1_sprite").classList.add("zoom_in");

  //erstater classen active heart med broken heart i scoreboard
  document.querySelector("#heart1_sprite").classList.remove("active_heart");
  document.querySelector("#heart1_sprite").classList.add("broken_heart");

  //når forsvind animationen er færdig så kør dogGone event
  document
    .querySelector("#dog1_container")
    .addEventListener("animationend", dogGone);
}

function dogGone() {
  //Fjerner evnet der startede functionen
  document
    .querySelector("#dog1_container")
    .removeEventListener("animationend", dogGone);

  //Fjerner class med forsvind animation
  document.querySelector("#dog1_sprite").classList.remove("zoom_in");

  //Fjerner pause fra container
  document.querySelector("#dog1_container").classList.remove("paused");

  //Genstarter bevægelse fra venstre mod højre
  document.querySelector("#dog1_container").classList.remove("dog_move");
  document.querySelector("#dog1_container").offsetWidth;
  document.querySelector("#dog1_container").classList.add("dog_move");

  // Tilføjer event så anden kan klikkes på igen
  document.querySelector("#dog1_container").addEventListener("click", dogClick);
}
