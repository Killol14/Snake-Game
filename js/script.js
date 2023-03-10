let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let gameOverMenu = document.querySelector(".gameover");
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 2;
let intervalTime = 0;
let interval = 0;

window.onload = function () {
  createBoard();
  startGame();
  playAgain.addEventListener("click", replay);
};

// Creating CreateBoard function
function createBoard() {
  popup.style.display = "none";
  for (let i = 0; i < 400; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

// Start of the game

function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);

  //random apple

  direction = 1;
  scoreDisplay.innerHTML = score;
  intervalTime = 500;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    alert("Oops!! it's game Over!");
    popup.style.display = "flex";
    score = 0;
    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}

function setState(state) {
  gameState = state;
  if (state === "gameover") {
      gameOverTune.play()
      gameOverMenu.style.visibility = "visible";
  } else if (state === "play") {
      gameOverMenu.style.visibility = "hidden";
  } if (state === "start") {
startMenu.style.visibility = "visible"
  } else if (state !== "start") {
      startMenu.style.visibility = "hidden"
  }
}







function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  //movement ends here

  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true;
  } else {
    return false;
  }
}

// eating the food provided

function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple(squares);
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime + speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

//buttons function

function control(e) {
    if(e.keyCode === 39){
        direction = 1;//right
    }else if(e.keyCode === 38){
        direction = -width;//Up
    }else if(e.keyCode === 37){
        direction = -1;//left
    }else if(e.keyCode === 40){
        direction = width;//Down
    }

}

up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

function replay() {
  grid.innerHTML = "";
  createBoard();
  startGame();
  popup.style.display = "none";
}

document.onkeyup = (e) => control(e);


