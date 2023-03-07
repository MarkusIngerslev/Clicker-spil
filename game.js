"use strict";
window.addEventListener("load", ready);

//globale variabler
let points = 0;
let lives = 3;

function ready() {
  console.log("JavaScript is ready!");
  document.querySelector("#btn_start").addEventListener("mousedown", startGame);
  document
    .querySelector("#btn_restart")
    .addEventListener("mousedown", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("mousedown", showStartScreen);
}

function startGame() {
  console.log("Game is starting");

  // Sætter liv og points til start værdier
  resetLives();
  resetPoints();
  showGameScreen();

  // starter baggrundsmusik
  document.querySelector("#sound_hunting").volume = 0.1;
  document.querySelector("#sound_hunting").play();

  // skjuler start skærmen efter spillet starter
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_elements").classList.remove("hidden");
  // Fjerner alle bevægelser fra hver container
  restartAnimation();

  // Til føjer bevægelse til hver container
  startAnimationer();

  // start timer
  startTimer();

  // Tilføjer start positioner til containerne
  startPositioner();

  // Tilføjer mousedown event til hver container
  startClick();

  // Tilføjer event så containerne har en ny position når der er kørt over skærmen.
  positionRestart();
}

// ========================== \\
// ===== Start elements ===== \\
// ========================== \\

function startAnimationer() {
  // kalder funtion for at fjerne paused fra container
  document.querySelector("#duck1_container").classList.add("duck_move1");
  document.querySelector("#duck2_container").classList.add("duck_move2");
  document.querySelector("#duck3_container").classList.add("duck_move3");
  document.querySelector("#goose1_container").classList.add("goose_move1");
  document.querySelector("#goose2_container").classList.add("goose_move1");
  document.querySelector("#dog1_container").classList.add("dog_move1");
  document.querySelector("#dog2_container").classList.add("dog_move2");
}

function startPositioner() {
  document.querySelector("#duck1_container").classList.add("positionDuck1");
  document.querySelector("#duck2_container").classList.add("positionDuck2");
  document.querySelector("#duck3_container").classList.add("positionDuck3");
  document.querySelector("#goose1_container").classList.add("positionGoose1");
  document.querySelector("#goose2_container").classList.add("positionGoose2");
  document.querySelector("#dog1_container").classList.add("positionDog1");
  document.querySelector("#dog2_container").classList.add("positionDog2");

  document.querySelector("#duck1_container").classList.add("speed1");
  document.querySelector("#duck2_container").classList.add("speed2");
  document.querySelector("#duck3_container").classList.add("speed3");
  document.querySelector("#goose1_container").classList.add("speed4");
  document.querySelector("#goose2_container").classList.add("speed5");
  document.querySelector("#dog1_container").classList.add("speedDog1");
  document.querySelector("#dog2_container").classList.add("speedDog2");
}

function startClick() {
  document
    .querySelector("#duck1_container")
    .addEventListener("mousedown", duckClick);
  document
    .querySelector("#duck2_container")
    .addEventListener("mousedown", duckClick);
  document
    .querySelector("#duck3_container")
    .addEventListener("mousedown", duckClick);
  document
    .querySelector("#dog1_container")
    .addEventListener("mousedown", dogClick);
  document
    .querySelector("#dog2_container")
    .addEventListener("mousedown", dogClick);

  document
    .querySelector("#goose1_container")
    .addEventListener("mousedown", gooseClick);
  document
    .querySelector("#goose2_container")
    .addEventListener("mousedown", gooseClick);
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
  // Fjern hidden  class fra startskærm og tilføjer til game over og level complete.
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
  //Liv bliver sat til 4
  lives = 3;

  // nulstiller alle hearts så de ikke er grå.
  document.querySelector("#heart0").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");

  document.querySelector("#heart0").classList.add("active_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
}

function resetPoints() {
  // nulstiller points
  points = 0;
  //nulstiller antallet af viste points
  displayPoints();
}

function restartAnimation() {
  document
    .querySelector("#duck1_container")
    .classList.remove("duck_move1", "duck_move2", "duck_move3");
  document
    .querySelector("#duck2_container")
    .classList.remove("duck_move1", "duck_move2", "duck_move3");
  document
    .querySelector("#duck3_container")
    .classList.remove("duck_move1", "duck_move2", "duck_move3");
  document
    .querySelector("#goose1_container")
    .classList.remove("goose_move1", "goose_move2");
  document
    .querySelector("#goose2_container")
    .classList.remove("goose_move1", "goose_move2");
  document
    .querySelector("#dog1_container")
    .classList.remove("dog_move1", "dog_move2");
  document
    .querySelector("#dog2_container")
    .classList.remove("dog_move1", "dog_move2");
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

  // hvis ens score er 30 eller mere efter tid så skal man gå videre til level complete.
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
}

function incrementGoosePoints() {
  console.log("incrementGoosePoints");
  points = points + 2;
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
  lives--;

  if (lives <= 0 && points < 30) {
    gameOver();
    document.querySelector(
      "#gameOverText"
    ).textContent = `Du nået at få : ${points} points.`;
  } else if (lives <= 0 && points >= 30) {
    levelComplete();
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
  document.querySelector("#sound_gameOver").volume = 0.25;
  document.querySelector("#sound_gameOver").play();
  stopGame();
}
function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hidden");

  document.querySelector("#sound_levelComplete").volume = 0.2;
  document.querySelector("#sound_levelComplete").play();
  stopGame();
  document.querySelector(
    "#endText"
  ).textContent = `Du nået át få en score af: ${points} points🥳`;
}

function stopGame() {
  // Stopper musik
  document.querySelector("#sound_hunting").pause();
  document.querySelector("#sound_dogshot").pause();
  document.querySelector("#sound_hunting").currentTime = 0;
  // fjerner mousedown
  document
    .querySelector("#duck1_container")
    .removeEventListener("mousedown", duckClick);
  document
    .querySelector("#duck2_container")
    .removeEventListener("mousedown", duckClick);
  document
    .querySelector("#duck3_container")
    .removeEventListener("mousedown", duckClick);
  document
    .querySelector("#dog1_container")
    .removeEventListener("mousedown", dogClick);
  document
    .querySelector("#dog2_container")
    .removeEventListener("mousedown", dogClick);
  document
    .querySelector("#goose1_container")
    .removeEventListener("mousedown", gooseClick);
  document
    .querySelector("#goose2_container")
    .removeEventListener("mousedown", gooseClick);

  // Stopper animation
  restartAnimation();

  // Fjerner timer
  document.querySelector("#time_sprite").classList.remove("shrink");
}

// ======================================== \\
// ====== Clicking on a good element ====== \\
// ======================================== \\

function duckClick() {
  console.log("duckClick");
  // Laver lokal variabel
  let duck = this;
  // forhindre gentagne clicks
  duck.removeEventListener("mousedown", duckClick);

  // stop duck container
  duck.classList.add("paused");

  // sæt forsvind-animation på coin sprite
  duck.querySelector("img").classList.add("zoom_out");

  // når forsvind animationen er færdig, duckGone
  duck.addEventListener("animationend", duckGone);

  // Afspillet duck-lyd
  document.querySelector("#sound_gunshot").currentTime = 0;
  document.querySelector("#sound_gunshot").volume = 0.05;
  document.querySelector("#sound_gunshot").play();

  // Tilføjer +1 til points ved mousedown
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

  // genstarter alle elementer for duck
  duckRestart.call(this);

  // Tilføjer event så anden kan klikkes på igen
  duck.addEventListener("mousedown", duckClick);
}

function duckRestart() {
  console.log("duckRestart");
  // genstarter animationen for container
  duckPosition.call(this);

  // sætter en ny bevægelse på container
  duckMove.call(this);

  // sætter en ny speed på container
  speedClass.call(this);
}

function duckPosition() {
  // laver lokal variabel
  let duck = this;

  // Sætter nu position for container
  duck.classList.remove("positionDuck1", "positionDuck2", "positionDuck3");
  let pos = Math.floor(Math.random() * 3) + 1;
  duck.classList.add("positionDuck" + pos);
}

function duckMove() {
  let duck = this;

  // Genstarter bevægelsen fra venstre mod højre
  duck.classList.remove("duck_move1", "duck_move2", "duck_move3");
  duck.offsetWidth;
  let move = Math.floor(Math.random() * 3) + 1;
  duck.classList.add("duck_move" + move);
}

// =========== Goose elements ============ \\

function gooseClick() {
  console.log("gooseClick");
  // Laver lokal variabel
  let goose = this;
  // forhindre gentagne clicks
  goose.removeEventListener("mousedown", gooseClick);

  // stop goose container
  goose.classList.add("paused");

  // sæt forsvind-animation på goose sprite
  goose.querySelector("img").classList.add("zoom_out");

  // når forsvind animationen er færdig, gooseGone
  goose.addEventListener("animationend", gooseGone);

  // Afspillet goose-lyd
  document.querySelector("#sound_gunshot").currentTime = 0;
  document.querySelector("#sound_gunshot").volume = 0.05;
  document.querySelector("#sound_gunshot").play();

  // Tilføjer +2 til points ved mousedown
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

  // genstarter alle classer på goose element
  gooseRestart.call(this);

  // Tilføjer event så anden kan klikkes på igen
  goose.addEventListener("mousedown", gooseClick);
}

function gooseRestart() {
  console.log("gooseRestart");
  // genstarter animationen for container
  goosePosition.call(this);

  // sætter en ny bevægelse for container
  gooseMove.call(this);

  // sætter nu speed for container
  speedClass.call(this);
}

function goosePosition() {
  // laver lokal variabel
  let goose = this;

  // Sætter nu position for container
  goose.classList.remove("positionGoose1", "positionGoose2");
  let pos = Math.floor(Math.random() * 2) + 1;
  goose.classList.add("positionGoose" + pos);
}

function gooseMove() {
  let goose = this;

  //Genstarter bevægelse fra venstre mod højre
  goose.classList.remove("goose_move1", "goose_move2");
  goose.offsetWidth;
  let move = Math.floor(Math.random() * 2) + 1;
  goose.classList.add("goose_move" + move);
}

// enkelt funktion for at tilføje et speed element til de 3 dyr
function speedClass() {
  let genstand = this;

  genstand.classList.remove("speed1", "speed2", "speed3", "speed4", "speed5");
  let speed = Math.floor(Math.random() * 5) + 1;
  genstand.classList.add("speed" + speed);
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
  dog.removeEventListener("mousedown", dogClick);

  // pauser move animationen for hund-container
  dog.classList.add("paused");

  // laver zoom_out animation på selve spriten af hunden
  dog.querySelector("img").classList.add("zoom_in");

  //når forsvind animationen er færdig så kør dogGone event
  dog.addEventListener("animationend", dogGone);

  // Afspillet dog-lyd
  document.querySelector("#sound_gunshot").currentTime = 0;
  document.querySelector("#sound_gunshot").volume = 0.05;
  document.querySelector("#sound_gunshot").play();

  document.querySelector("#sound_dogshot").currentTime = 0;
  document.querySelector("#sound_dogshot").volume = 0.1;
  document.querySelector("#sound_dogshot").play();

  // fjern -1 fra lives ved mousedown
  decrementLives();
}

// funtion til at få hunden tilbage på skærmen
function dogGone() {
  console.log("dogGone");
  let dog = this;
  //Fjerner evnet der startede functionen
  dog.removeEventListener("animationend", dogGone);

  //Fjerner class med forsvind animation
  dog.querySelector("img").classList.remove("zoom_in");

  //Fjerner pause fra container
  dog.classList.remove("paused");

  // genstarter alle classes for dog element
  dogRestart.call(this);

  // Tilføjer event så anden kan klikkes på igen
  dog.addEventListener("mousedown", dogClick);
}

function dogRestart() {
  console.log("dogRestart");
  //Genstarter bevægelse fra venstre mod højre
  dogPosition.call(this);

  // sætter ny bevægelse på container
  dogMove.call(this);

  // sætter nu speed for container
  speedClass.call(this);
}
function dogPosition() {
  // laver lokal variabel
  let dog = this;

  // Sætter nu position for container
  dog.classList.remove("positionDog1", "positionDog2");

  let pos = Math.floor(Math.random() * 2) + 1;

  dog.classList.add("positionDog" + pos);
}

function dogMove() {
  // laver lokal variabel
  let dog = this;

  //Genstarter bevægelse fra venstre mod højre
  dog.classList.remove("dog_move1", "dog_move2");
  let move = Math.floor(Math.random() * 2) + 1;
  dog.classList.add("dog_move" + move);
}
