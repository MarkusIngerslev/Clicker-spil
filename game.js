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
  document.querySelector("#duck1_sprite").classList.add("goodClick");

  console.log("plusNumber");
  points++;
  displayNumber();
}

function normalDuck() {
  console.log("normalDuck");
  document.querySelector("#duck1_container").removeEventListener("paused");
  document.querySelector("#duck1_sprite").removeEventListener("goodclick");
}

// Clicking on a bad element
function dogClick() {
  console.log("dogClick");
  document
    .querySelector("#dog1_container")
    .removeEventListener("click", dogClick);
  document.querySelector("#dog1_container").classList.add("paused");
  document.querySelector("#dog1_sprite").classList.add("goodClick");
  document.querySelector("#heart1_sprite").classList.remove("active_heart");
  document.querySelector("#heart1_sprite").classList.add("broken_heart");
}
