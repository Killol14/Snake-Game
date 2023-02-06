let lastPaintTime = 0;
const SNAKE_SPEED = 1;
let inputDirection = {X : 0, Y : 0}

const snakeBody = [
    {X : 7, Y : 8}
]
function paint(currentTime){
    let TimeSeconds = (currentTime - lastPaintTime) / 1000;
    requestAnimationFrame(paint);
    if ( TimeSeconds< 1 / SNAKE_SPEED ) return;
    lastPaintTime = currentTime;
    
     draw();
     update();

}
window.requestAnimationFrame(paint);

const gameBoard = document.querySelector(".game-board");

function draw() {
    drawSnake()

}

function update() {
    gameBoard.innerHTML = "";
    snakeMove();

}

function drawSnake() {
    snakeBody.forEach(segment =>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.X;
        snakeElement.style.gridRowStart = segment.Y;

        snakeElement.classList.add("snake");

        gameBoard.appendChild(snakeElement);
    });
}

function snakeMove() {
    inputDirection = getInputDirection();

    snakeBody[0].X += inputDirection.X;
    snakeBody[0].Y += inputDirection.Y;
    
}

function getInputDirection(){
    window.addEventListener("keydown", e=> {
       
        switch(e.key){
            case "arrowUp" : inputDirection = {X : 0, Y : -1}
            break;
            case "arrowDown" : inputDirection = {X : 0, Y : 1}
            break;
            case "arrowRight" : inputDirection = {X : 0, Y : 0}
            break;
            case "arrowLeft" : inputDirection = {X : 0, Y : 0}
            break;
            default : inputDirection = {X : 0, y : 0}
        }         

    })
    return inputDirection;
}