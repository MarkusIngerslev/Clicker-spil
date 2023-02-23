"use strict";

window.addEventListener("load", initGame);

let points = 0;
let lives = 0;

function initGame() {
  console.log("start");

  // Sætter liv og points til start værdier
  lives = 3;
  points = 0;

  // Til føjer bevægelse til hver container
  document.querySelector("#duck1_container").classList.add("duck_move");
  document.querySelector("#duck2_container").classList.add("duck_move2");
  document.querySelector("#duck3_container").classList.add("duck_move3");
  document.querySelector("#goose1_container").classList.add("goose_move");
  document.querySelector("#goose2_container").classList.add("goose_move3");
  document.querySelector("#dog1_container").classList.add("dog_move");
  document.querySelector("#dog2_container").classList.add("dog_move2");

  // Tilføjer click event til hver container
  document
    .querySelector("#duck1_container")
    .addEventListener("click", duckClick);
  document
    .querySelector("#duck2_container")
    .addEventListener("click", duckClick2);
  document
    .querySelector("#duck3_container")
    .addEventListener("click", duckClick3);
  document
    .querySelector("#goose1_container")
    .addEventListener("click", gooseClick);
  document
    .querySelector("#goose1_container")
    .addEventListener("click", gooseClick2);
  document.querySelector("#dog1_container").addEventListener("click", dogClick);
  document
    .querySelector("#dog2_container")
    .addEventListener("click", dogClick2);
}

//  ====== Scoreboard ====== \\

// Tæller points
function incrementPoints() {
  console.log("incrementPoints");
  points++;
  displayPoints();
}

// Tilføjer points til scoreboard
function displayPoints() {
  console.log("displayNumber");
  document.querySelector("#point_count").textContent = points;
}

// Tæller lives
function decrementLives() {
  console.log("decrementLives");

  if (lives <= 0) {
    gameOver();
  } else {
    displayDecrementedLives();
  }
  lives--;
}

// fjerner lives fra lifeboard
function displayDecrementedLives() {
  console.log("displayDecrementedLives");
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

// ====== Clicking on a good element ====== \\

function duckClick() {
  console.log("duckClick");
  document
    .querySelector("#duck1_container")
    .removeEventListener("click", duckClick);
  document.querySelector("#duck1_container").classList.add("paused");
  document.querySelector("#duck1_sprite").classList.add("zoom_out");

  //når forsvind animationen er færdig, duckGone
  document
    .querySelector("#duck1_container")
    .addEventListener("animationend", duckGone);

  // Tilføjer +1 til points ved click
  incrementPoints();
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

// ====== Clicking on a bad element ====== \\

function dogClick() {
  console.log("dogClick");

  //Fjerner event så hun ikke kan klikkes på igen
  document
    .querySelector("#dog1_container")
    .removeEventListener("click", dogClick);

  // fjern -1 fra lives ved click
  decrementLives();

  // pauser move animationen for hund-container
  document.querySelector("#dog1_container").classList.add("paused");
  // laver zoom_out animation på selve spriten af hunden
  document.querySelector("#dog1_sprite").classList.add("zoom_in");

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

// ====== End of game ====== \\

function gameOver() {
  console.log("gameOver");
  document.querySelector("#game_over").classList.remove("hidden");
  animationEnd();
}
function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hidden");
  animationEnd();
}
function animationEnd() {}
