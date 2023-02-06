let lastPaintTime = 0;
const SNAKE_SPEED = 1;
let inputDirection = {X : 0, Y : 0}
let lastInputDirection = inputDirection;

let food = {x : 11, y : 11}
const EXPENTION_AMOUNT = 1;

const snakeBody = [
    {X : 7, Y : 8},
    //{X : 8, Y : 8},
    //{X : 9, Y : 8},
   //{X : 10, Y : 8},
    //{X : 11, Y : 8},
];

const gameBoard = document.querySelector(".game-board");

function paint(currentTime){
    let TimeSeconds = (currentTime - lastPaintTime) / 1000;
    requestAnimationFrame(paint);
    if ( TimeSeconds< 1 / SNAKE_SPEED ) return;
    lastPaintTime = currentTime;
    
     draw();
     update();

}
window.requestAnimationFrame(paint);

function draw() {
    drawSnake();
    drawFood();

}

function update() {
    gameBoard.innerHTML = "";
    snakeMove();
    snakeEatFood();

}

function drawSnake() {
    snakeBody.forEach((segment, index) =>{
        var snakeElement = document.createElement("div");
            snakeElement.style.gridColumnStart = segment.X;
            snakeElement.style.gridRowStart = segment.Y;
            snakeElement.innerHTML = index;
            snakeElement.style.transform = "rotate(0deg)";
        

        if (index == 0) {
            snakeElement.classList.add("head");
            if(inputDirection.X == 1){
                snakeElement.style.transform = "rotate(-90deg)";
            }else if (inputDirection.X == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }else if (inputDirection.Y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }else if(inputDirection.Y == 1){
                snakeElement.style.transform = "rotate(0deg)";
            }
            
        }else {
            snakeElement.classList.add("snake");
        }

        gameBoard.appendChild(snakeElement);
    });
}

function drawFood(){
var foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.X;
    foodElement.style.gridRowStart = food.Y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);

}

function snakeMove() {
    inputDirection = getInputDirection();

     for(i = snakeBody.length -2; i >= 0; i--){
        snakeBody[i+1] = {...snakeMove[i]}
     }

    snakeBody[0].X += inputDirection.X;
    snakeBody[0].Y += inputDirection.Y;
    
}

function getInputDirection(){
    window.addEventListener("keydown", e=> {
       
        switch(e.key){
            case "arrowUp" : 
            if(lastInputDirection.Y == 1)return;
            inputDirection = {X : 0, Y : -1}
            break;
            case "arrowDown" : 
            if(lastInputDirection.Y == -1)return;
            inputDirection = {X : 0, Y : 1}
            break;
            case "arrowRight" :
            if(lastInputDirection.X == 1)return;
            inputDirection = {X : -1, Y : 0}
            break;
            case "arrowLeft" :
            if(lastInputDirection.X == -1)return;   
            inputDirection = {X : 1, Y : 0}
            break;
            default : inputDirection = {X : 0, y : 0}
        }         

    });
    lastInputDirection = inputDirection;
    return inputDirection;
}

function snakeEatFood() {

    if(isEat()){
        food = getFoodRandomPosition();
        expendSnake();
    }
}
function isEat(){ 
        return snakeBody[0] === food.x && snakeBody[0].Y === food.Y;
         
}
function getFoodRandomPosition() {
    // Math code from javascript W3Scool //
    return { X : Math.ceil(Math.random()*22),
        Y : Math.ceil(Math.random()*22)};
}
function expendSnake(){
    for(i=0; i<EXPENTION_AMOUNT; i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }
}
