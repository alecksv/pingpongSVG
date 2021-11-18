const svgNS = "http://www.w3.org/2000/svg";

const playground = document.createElementNS(svgNS, "rect");
const rocket1 = document.createElementNS(svgNS, "rect");
const rocket2 = document.createElementNS(svgNS, "rect");
const butStart = document.createElementNS(svgNS, "rect");
const butStop = document.createElementNS(svgNS, "rect");
const scoreTable = document.createElementNS(svgNS, "rect");
const ball = document.createElementNS(svgNS, "circle");
let ballRadius = 10;
let speedBallX = 3;
let speedBallY = 4;
let rocketSpeedOne = 4;
let rocketSpeedTwo = 4;
let rocketOneState = "stop";
let rocketTwoState = "stop";

// ******************************************************* TEXT ***
let startName = "START";
let stopName = "STOP";
let readySteadyGo = "";
const textStart = document.createElementNS(svgNS, "text");
const textScore = document.createElementNS(svgNS, "text");
let dataStart = document.createTextNode(startName);
let countdownValue = document.createElementNS(svgNS, "text");
let dataCountdownValue = document.createTextNode(readySteadyGo);
let player1 = 0;
let player2 = 0;
let score = `${player1} : ${player2} `;
let dataScore = document.createTextNode(score);
let begin = 3;

let x = 100;
let y = 100;
let widthRock = 10;

let heightRock = 120;
let width = 900;
let height = 600;

let posXball = (x * 2 + width) / 2;
let posYball = (y * 2 + height) / 2;
let stateball = "wait";
let stateWinner = "";

let posYrocketOne = y + height / 2 - heightRock / 2;
let posYrocketTwo = y + height / 2 - heightRock / 2;
let posXrocketOne = x;
let posXrocketTwo = x + width - 10;

playground.setAttributeNS(null, "x", x);
playground.setAttributeNS(null, "y", y);
playground.setAttributeNS(null, "width", width);
playground.setAttributeNS(null, "height", height);
playground.setAttributeNS(null, "fill", "#fcca66");
svg.append(playground);
// *************************************************** DRAW ROCKETS ***
rocket1.setAttributeNS(null, "x", posXrocketOne);
rocket1.setAttributeNS(null, "y", posYrocketOne);
rocket1.setAttributeNS(null, "width", widthRock);
rocket1.setAttributeNS(null, "height", heightRock);
rocket1.setAttributeNS(null, "fill", "#6763db");
svg.append(rocket1);

rocket2.setAttributeNS(null, "x", posXrocketTwo);
rocket2.setAttributeNS(null, "y", posYrocketTwo);
rocket2.setAttributeNS(null, "width", widthRock);
rocket2.setAttributeNS(null, "height", heightRock);
rocket2.setAttributeNS(null, "fill", "#f23333");
svg.append(rocket2);
// ****************************************************** DRAW START STOP SCORETABLE ***
butStart.setAttributeNS(null, "x", x);
butStart.setAttributeNS(null, "y", y / 2);
butStart.setAttributeNS(null, "width", heightRock);
butStart.setAttributeNS(null, "height", heightRock / 3);
butStart.setAttributeNS(null, "fill", "#34eb46");
svg.append(butStart);

scoreTable.setAttributeNS(null, "x", x + width / 2 - heightRock / 2);
scoreTable.setAttributeNS(null, "y", y / 2);
scoreTable.setAttributeNS(null, "width", heightRock);
scoreTable.setAttributeNS(null, "height", heightRock / 3);
scoreTable.setAttributeNS(null, "fill", "grey");
svg.append(scoreTable);
// --------------------------------------------------------------------- CREATE A BALL ---
ball.setAttributeNS(null, "cx", posXball);
ball.setAttributeNS(null, "cy", posYball);
ball.setAttributeNS(null, "r", ballRadius);
ball.setAttributeNS(null, "fill", "#8a0e06");
ball.setAttributeNS(null, "stroke", "none");
svg.append(ball);
// ******************************************************** CREATE  BUTTONS TEXT VALUE **
textStart.setAttributeNS(null, "x", x + heightRock / 2);
textStart.setAttributeNS(null, "y", y / 2 + heightRock / 6);
textStart.setAttributeNS(null, "font-size", "30");
textStart.setAttributeNS(null, "font-weight", "700");
textStart.setAttributeNS(null, "fill", "black");
textStart.setAttributeNS(null, "text-anchor", "middle");
textStart.setAttributeNS(null, "dominant-baseline", "central");
textStart.appendChild(dataStart);
svg.append(textStart);

textScore.setAttributeNS(null, "x", x + width / 2);
textScore.setAttributeNS(null, "y", y / 2 + heightRock / 6);
textScore.setAttributeNS(null, "font-size", "30");
textScore.setAttributeNS(null, "font-weight", "700");
textScore.setAttributeNS(null, "fill", "black");
textScore.setAttributeNS(null, "text-anchor", "middle");
textScore.setAttributeNS(null, "dominant-baseline", "central");
textScore.appendChild(dataScore);
svg.append(textScore);

countdownValue.setAttributeNS(null, "x", x + width / 2);
countdownValue.setAttributeNS(null, "y", y + height / 2.5);
countdownValue.setAttributeNS(null, "font-size", "70");
countdownValue.setAttributeNS(null, "font-weight", "900");
countdownValue.setAttributeNS(null, "fill", "red");
countdownValue.setAttributeNS(null, "text-anchor", "middle");
countdownValue.setAttributeNS(null, "dominant-baseline", "central");
countdownValue.append(dataCountdownValue);
svg.append(countdownValue);

// ********************* Flags for Rockets ***********
document.addEventListener("keydown", function (e) {
  if (e.key === "Shift") {
    rocketOneState = "up";
  }
  if (e.key === "Control") {
    rocketOneState = "down";
  }
  if (e.key === "ArrowUp") {
    rocketTwoState = "up";
  }
  if (e.key === "ArrowDown") {
    rocketTwoState = "down";
  }
});
document.addEventListener("keyup", function (e) {
  if (e.key === "Shift" || e.key === "Control") {
    rocketOneState = "stop";
  }
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    rocketTwoState = "stop";
  }
});

document.addEventListener("click", startBallTick);

function startBallTick(event) {
  let target = event.target;
  console.log(event);
  if (target === butStart || target === textStart) {
    document.removeEventListener("click", startBallTick);
    document.addEventListener("click", stopBallTick);
    textStart.innerHTML = `${stopName}`;
    butStart.setAttributeNS(null, "fill", "#e64239");
    stateWinner = "";
    countdown();
  }
}
function stopBallTick(event) {
  let target = event.target;
  console.log(event);
  if (target === butStart || target === textStart) {
    document.addEventListener("click", startBallTick);
    document.removeEventListener("click", stopBallTick);
    textStart.innerHTML = `${startName}`;
    butStart.setAttributeNS(null, "fill", "#34eb46");

    stateball = "wait";
  }
}
function countdown(player) {
  let timer;
  if (player1 === 2) {
    stateWinner = "winOne";
    stateball = "wait";
    clearTimeout(timer);
    player1 = 0;
    player2 = 0;
    dataScore.textContent = `${player1} : ${player2} `;
    document.addEventListener("click", startBallTick);
    document.removeEventListener("click", stopBallTick);
    textStart.innerHTML = `${startName}`;
    butStart.setAttributeNS(null, "fill", "#34eb46");

    return player1;
  }
  if (player2 === 2) {
    stateWinner = "winTwo";
    stateball = "wait";
    clearTimeout(timer);
    player1 = 0;
    player2 = 0;
    dataScore.textContent = `${player1} : ${player2} `;
    document.addEventListener("click", startBallTick);
    document.removeEventListener("click", stopBallTick);
    textStart.innerHTML = `${startName}`;
    butStart.setAttributeNS(null, "fill", "#34eb46");

    return player2;
  } else {
    readySteadyGo = begin;
    countdownValue.textContent = readySteadyGo;
    begin--;
    if (begin <= -1) {
      randomStartball();
      stateball = "go";
      readySteadyGo = "";
      countdownValue.textContent = readySteadyGo;
      document.addEventListener("click", stopBallTick);
      clearTimeout(timer);
      return (begin = 3);
    } else {
      timer = setTimeout(countdown, 1000);
      document.removeEventListener("click", stopBallTick);
    }
  }
}
function randomStartball() {
  let randomValue = Math.random();
  if (randomValue <= 0.25) {
    speedBallX = -speedBallX;
    speedBallY = -speedBallY;
  }
  if (0.25 < randomValue < 0.5) {
    speedBallX = speedBallX;
    speedBallY = -speedBallY;
  }
  if (0.5 <= randomValue <= 0.75) {
    speedBallX = -speedBallX;
    speedBallY = speedBallY;
  }
  if (0.75 < randomValue <= 1) {
    speedBallX = speedBallX;
    speedBallY = speedBallY;
  }
}
// ======= ANIMATION FUNCTIONS === ANIMATION FUNCTIONS === ANIMATION FUNCTIONS ===
function moveBall() {
  if (stateball === "go") {
    posXball += speedBallX;
    posYball += speedBallY;
    ball.setAttributeNS(null, "cx", posXball);
    ball.setAttributeNS(null, "cy", posYball);

    if (posYball - ballRadius < y) {
      speedBallY = -speedBallY;
    }
    if (posYball + ballRadius > y + height) {
      speedBallY = -speedBallY;
    }
    if (
      posXball - ballRadius < posXrocketOne + widthRock &&
      posYball > posYrocketOne &&
      posYball < posYrocketOne + heightRock
    ) {
      speedBallX = -speedBallX;
    }
    if (
      posXball + ballRadius > posXrocketTwo &&
      posYball > posYrocketTwo &&
      posYball < posYrocketTwo + heightRock
    ) {
      speedBallX = -speedBallX;
    }

    if (posXball - ballRadius < x) {
      // *********************************** CHANGE SCORE ****
      player2 += 1;
      dataScore.textContent = `${player1} : ${player2} `;
      stateball = "wait";
      posXball = (x * 2 + width) / 2;
      posYball = (y * 2 + height) / 2;
      ball.setAttributeNS(null, "cx", posXball);
      ball.setAttributeNS(null, "cy", posYball);
      countdown(player2);
    }
    if (posXball + ballRadius > x + width) {
      player1 += 1;
      dataScore.textContent = `${player1} : ${player2} `;
      stateball = "wait";
      posXball = (x * 2 + width) / 2;
      posYball = (y * 2 + height) / 2;
      ball.setAttributeNS(null, "cx", posXball);
      ball.setAttributeNS(null, "cy", posYball);
      countdown(player1);
    }
    if (stateWinner === "winOne") {
      countdownValue.textContent = "PLAYER 1 WIN";
      stateball = "wait";
    }
    if (stateWinner === "winTwo") {
      countdownValue.textContent = "PLAYER 2 WIN";
      stateball = "wait";
    }
  }
}
function rocketMove() {
  if (posYrocketOne > y && rocketOneState === "up") {
    posYrocketOne -= rocketSpeedOne;
    rocket1.setAttributeNS(null, "y", posYrocketOne);
  }
  if (posYrocketOne < y + height - heightRock && rocketOneState === "down") {
    posYrocketOne += rocketSpeedOne;
    rocket1.setAttributeNS(null, "y", posYrocketOne);
  }
  if (posYrocketTwo > y && rocketTwoState === "up") {
    posYrocketTwo -= rocketSpeedTwo;
    rocket2.setAttributeNS(null, "y", posYrocketTwo);
  }
  if (posYrocketTwo < y + height - heightRock && rocketTwoState === "down") {
    posYrocketTwo += rocketSpeedTwo;
    rocket2.setAttributeNS(null, "y", posYrocketTwo);
  }
}

// **********************************************CREATE ANIMATION ***
requestAnimationFrame(animation);
function animation() {
  moveBall();
  rocketMove(); 

  requestAnimationFrame(animation);
}
