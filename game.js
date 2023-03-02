"use strict";
window.addEventListener("load", ready);

//globale variabler
let points = 0;
let lives = 4;

function ready() {
  console.log("JavaScript is ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
}

function startGame() {
  console.log("Game is starting");

  // Sætter liv og points til start værdier
  resetLives();
  resetPoints();
  showGameScreen();

  // skjuler start skærmen efter spillet starter
  document.querySelector("#start").classList.add("hidden");

  // Til føjer bevægelse til hver container
  startAnimationer();

  // start timer
  startTimer();

  // Tilføjer start positioner til containerne
  startPositioner();

  // Tilføjer click event til hver container
  startClick();

  // Tilføjer event så containerne har en ny position når der er kørt over skærmen.
  positionRestart();
}

// ========================== \\
// ===== Start elements ===== \\
// ========================== \\

function startAnimationer() {
  document.querySelector("#duck1_container").classList.add("duck_move");
  document.querySelector("#duck2_container").classList.add("duck_move");
  document.querySelector("#duck3_container").classList.add("duck_move");
  document.querySelector("#goose1_container").classList.add("goose_move");
  document.querySelector("#goose2_container").classList.add("goose_move");
  document.querySelector("#dog1_container").classList.add("dog_move");
  document.querySelector("#dog2_container").classList.add("dog_move");
}

function startPositioner() {
  document.querySelector("#duck1_container").classList.add("position1");
  document.querySelector("#duck2_container").classList.add("position2");
  document.querySelector("#duck3_container").classList.add("position3");
  document.querySelector("#goose1_container").classList.add("position4");
  document.querySelector("#goose2_container").classList.add("position5");
  document.querySelector("#dog1_container").classList.add("position6");
  document.querySelector("#dog2_container").classList.add("position7");

  document.querySelector("#duck1_container").classList.add("speed1");
  document.querySelector("#duck2_container").classList.add("speed2");
  document.querySelector("#duck3_container").classList.add("speed3");
  document.querySelector("#goose1_container").classList.add("speed4");
  document.querySelector("#goose2_container").classList.add("speed5");
  document.querySelector("#dog1_container").classList.add("speed6");
  document.querySelector("#dog2_container").classList.add("speed1");
}

function startClick() {
  document
    .querySelector("#duck1_container")
    .addEventListener("click", duckClick);
  document
    .querySelector("#duck2_container")
    .addEventListener("click", duckClick);
  document
    .querySelector("#duck3_container")
    .addEventListener("click", duckClick);
  document.querySelector("#dog1_container").addEventListener("click", dogClick);
  document.querySelector("#dog2_container").addEventListener("click", dogClick);

  document
    .querySelector("#goose1_container")
    .addEventListener("click", gooseClick);
  document
    .querySelector("#goose2_container")
    .addEventListener("click", gooseClick);
}

function positionRestart() {
  document
    .querySelector("#duck1_container")
    .addEventListener("animationiteration", duckRestart);
  document
    .querySelector("#duck2_container")
    .addEventListener("animationiteration", duckRestart);
  document
    .querySelector("#duck3_container")
    .addEventListener("animationiteration", duckRestart);
  document
    .querySelector("#dog1_container")
    .addEventListener("animationiteration", dogRestart);
  document
    .querySelector("#dog2_container")
    .addEventListener("animationiteration", dogRestart);
  document
    .querySelector("#goose1_container")
    .addEventListener("animationiteration", gooseRestart);
  document
    .querySelector("#goose2_container")
    .addEventListener("animationiteration", gooseRestart);
}

function showStartScreen() {
  // Fjern hidden fra startskærm og tilføjer til game over og level complete.
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showGameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  //Liv bliver sat til 3
  lives = 4;

  // nulstiller alle hearts så de ikke er grå.
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");

  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}

function resetPoints() {
  // nulstiller points
  points = 0;
  //nulstiller antallet af viste points
  displayPoints();
}

function startTimer() {
  // sætter timer-animationen i gang
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføjer en eventlistener der lytter om animationen er færdig.
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 30) {
    levelComplete();
  } else {
    gameOver();
  }
}

// ======================== \\
// ====== Scoreboard ====== \\
// ======================== \\

// Tæller points for duck
function incrementDuckPoints() {
  console.log("incrementDuckPoints");
  points++;
  displayPoints();

  // Ikke nødvendigt når der er en timer til at holde styr på points
  // if (points >= 2) {
  //   levelComplete();
  // }
}

function incrementGoosePoints() {
  console.log("incrementGoosePoints");
  points = points + 2;
  displayPoints();

  // Ikke nødvendigt når der er en timer til at holde styr på points
  // if (points >= 30) {
  //   levelComplete();
  // }
}

// Tilføjer points til scoreboard
function displayPoints() {
  console.log("displayNumber");
  document.querySelector("#point_count").textContent = points;
}

// Tæller lives
function decrementLives() {
  console.log("decrementLives");
  lives--;

  if (lives <= 1) {
    gameOver();
  } else {
    displayDecrementedLives();
  }
}

// fjerner lives fra lifeboard
function displayDecrementedLives() {
  console.log("displayDecrementedLives");
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

// ========================= \\
// ====== End of game ====== \\
// ========================= \\

function gameOver() {
  console.log("gameOver");
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#sound_gameOver").play();
  animationEnd();
  endClick();
}
function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hidden");
  animationEnd();
  endClick();
}
function animationEnd() {
  console.log("animationEnd");
  document.querySelector("#duck1_container").classList.remove("duck_move");
  document.querySelector("#duck2_container").classList.remove("duck_move");
  document.querySelector("#duck3_container").classList.remove("duck_move");
  document.querySelector("#goose1_container").classList.remove("goose_move");
  document.querySelector("#goose2_container").classList.remove("goose_move2");
  document.querySelector("#dog1_container").classList.remove("dog_move");
  document.querySelector("#dog2_container").classList.remove("dog_move");
}

function endClick() {
  console.log("endClick");
  document
    .querySelector("#duck1_container")
    .removeEventListener("click", duckClick);
  document
    .querySelector("#duck2_container")
    .removeEventListener("click", duckClick);
  document
    .querySelector("#duck3_container")
    .removeEventListener("click", duckClick);
  document
    .querySelector("#dog1_container")
    .removeEventListener("click", dogClick);
  document
    .querySelector("#dog2_container")
    .removeEventListener("click", dogClick);
  document
    .querySelector("#goose1_container")
    .removeEventListener("click", gooseClick);
  document
    .querySelector("#goose2_container")
    .removeEventListener("click", gooseClick);
}

// ======================================== \\
// ====== Clicking on a good element ====== \\
// ======================================== \\

function duckClick() {
  console.log("duckClick");
  // Laver lokal variabel
  let duck = this;
  // forhindre gentagne clicks
  duck.removeEventListener("click", duckClick);

  // stop duck container
  duck.classList.add("paused");

  // sæt forsvind-animation på coin sprite
  duck.querySelector("img").classList.add("zoom_out");

  // når forsvind animationen er færdig, duckGone
  duck.addEventListener("animationend", duckGone);

  // Tilføjer +1 til points ved click
  incrementDuckPoints();
}

function duckGone() {
  console.log("duckGone");
  // Laver lokal variabel
  let duck = this;

  //Fjerner evnet der startede functionen
  duck.removeEventListener("animationend", duckGone);

  //Fjerner class med forsvind animation
  duck.querySelector("img").classList.remove("zoom_out");

  //Fjerner pause fra container
  duck.classList.remove("paused");

  // genstarter animationen for container
  duckRestart.call(this);
  // Tilføjer event så anden kan klikkes på igen
  duck.addEventListener("click", duckClick);
}

function duckRestart() {
  console.log("duckRestart");
  // laver lokal variabel
  let duck = this;

  //Genstarter bevægelse fra venstre mod højre
  duck.classList.remove("duck_move");
  duck.offsetWidth;
  duck.classList.add("duck_move");

  // Sætter nu position for container
  duck.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7"
  );

  let pos = Math.floor(Math.random() * 7) + 1;

  duck.classList.add("position" + pos);

  // sææter nu speed for container
  duck.classList.remove(
    "speed1",
    "speed2",
    "speed3",
    "speed4",
    "speed5",
    "speed6"
  );

  let speed = Math.floor(Math.random() * 6) + 1;
  duck.classList.add("speed" + speed);
  console.log(`speed af ny duck er ${speed}`);
}

// =========== Goose elements ============ \\

function gooseClick() {
  console.log("gooseClick");
  // Laver lokal variabel
  let goose = this;
  // forhindre gentagne clicks
  goose.removeEventListener("click", gooseClick);

  // stop duck container
  goose.classList.add("paused");

  // sæt forsvind-animation på coin sprite
  goose.querySelector("img").classList.add("zoom_out");

  // når forsvind animationen er færdig, duckGone
  goose.addEventListener("animationend", gooseGone);

  // Tilføjer +1 til points ved click
  incrementGoosePoints();
}

function gooseGone() {
  console.log("gooseGone");
  // Laver lokal variabel
  let goose = this;

  //Fjerner evnet der startede functionen
  goose.removeEventListener("animationend", gooseGone);

  //Fjerner class med forsvind animation
  goose.querySelector("img").classList.remove("zoom_out");

  //Fjerner pause fra container
  goose.classList.remove("paused");

  // genstarter animationen for container
  gooseRestart.call(this);
  // Tilføjer event så anden kan klikkes på igen
  goose.addEventListener("click", gooseClick);
}

function gooseRestart() {
  console.log("gooseRestart");
  // laver lokal variabel
  let goose = this;

  //Genstarter bevægelse fra venstre mod højre
  goose.classList.remove("goose_move");
  goose.offsetWidth;
  goose.classList.add("goose_move");

  // Sætter nu position for container
  goose.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7"
  );

  let pos = Math.floor(Math.random() * 7) + 1;

  goose.classList.add("position" + pos);

  // sææter nu speed for container
  goose.classList.remove(
    "speed1",
    "speed2",
    "speed3",
    "speed4",
    "speed5",
    "speed6"
  );

  let speed = Math.floor(Math.random() * 6) + 1;
  goose.classList.add("speed" + speed);
  console.log(`speed af ny goose er ${speed}`);
}

// ======================================= \\
// ====== Clicking on a bad element ====== \\
// ======================================= \\

// function for når den første hund klikkes på
function dogClick() {
  console.log("dogClick");

  // laver lokal variabel
  let dog = this;
  //Fjerner event så hun ikke kan klikkes på igen
  dog.removeEventListener("click", dogClick);

  // pauser move animationen for hund-container
  dog.classList.add("paused");

  // laver zoom_out animation på selve spriten af hunden
  dog.querySelector("img").classList.add("zoom_out");

  //når forsvind animationen er færdig så kør dogGone event
  dog.addEventListener("animationend", dogGone);

  // fjern -1 fra lives ved click
  decrementLives();
}

// funtion til at få hunden tilbage på skærmen
function dogGone() {
  console.log("dogGone");
  let dog = this;
  //Fjerner evnet der startede functionen
  dog.removeEventListener("animationend", dogGone);

  //Fjerner class med forsvind animation
  dog.querySelector("img").classList.remove("zoom_out");

  //Fjerner pause fra container
  dog.classList.remove("paused");

  //Genstarter bevægelse fra venstre mod højre
  dogRestart.call(this);

  // Tilføjer event så anden kan klikkes på igen
  dog.addEventListener("click", dogClick);
}

function dogRestart() {
  console.log("dogRestart");
  // laver lokal variabel
  let dog = this;

  //Genstarter bevægelse fra venstre mod højre
  dog.classList.remove("dog_move");
  dog.offsetWidth;
  dog.classList.add("dog_move");

  // Sætter nu position for container
  dog.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7"
  );

  let pos = Math.floor(Math.random() * 7) + 1;

  dog.classList.add("position" + pos);

  // sææter nu speed for container
  dog.classList.remove(
    "speed1",
    "speed2",
    "speed3",
    "speed4",
    "speed5",
    "speed6"
  );

  let speed = Math.floor(Math.random() * 6) + 1;
  dog.classList.add("speed" + speed);
  console.log(`speed af ny dog er ${speed}`);
}
