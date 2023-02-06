var lastPaintTime = 0;
let SNAKE_SPEED = 0;
let inputDirection = {x : 0, y : 0}
let lastInputDirection = inputDirection;


const EXPENTION_AMOUNT = 1;
var score = 0;
const snakeBody = [
    {x : 7, y : 8},
    //{x : 8, y : 8},
    //{x : 9, y : 8},
    //{x : 10, y : 8},
    //{x : 11, y : 8},
];

let food = getFoodRandomPosition();
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");

function paint(currentTime){
    var TimeSeconds = (currentTime - lastPaintTime) / 1000;
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
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.innerHTML = index;
            snakeElement.style.transform = "rotate(0deg)";
        

        if (index == 0) {
            snakeElement.classList.add("head");
            if(inputDirection.x == 1){
                snakeElement.style.transform = "rotate(-90deg)";
            }else if (inputDirection.x == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }else if (inputDirection.y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }else if(inputDirection.y == 1){
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
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        foodElement.classList.add("food");
         gameBoard.appendChild(foodElement);

}

function snakeMove() {
    inputDirection = getInputDirection();

     for(i = snakeBody.length -2; i >= 0; i--){
        snakeBody[i+1] = {...snakeMove[i]}
     }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    checkGameOver();
}

function getInputDirection(){
    window.addEventListener("keydown", e=> {
       
        switch(e.key){
            case "arrowUp" : 
            if(lastInputDirection.y == 1)return;
            inputDirection = {x : 0, y : -1}
            break;
            case "arrowDown" : 
            if(lastInputDirection.y == -1)return;
            inputDirection = {x : 0, y : 1}
            break;
            case "arrowRight" :
            if(lastInputDirection.x == 1)return;
            inputDirection = {x : -1, y : 0}
            break;
            case "arrowLeft" :
            if(lastInputDirection.x == -1)return;   
            inputDirection = {x : 1, y : 0}
            break;
            default : inputDirection = {x : 0, y : 0}
        }         

    });
    lastInputDirection = inputDirection;
        return inputDirection;
}

function snakeEatFood() {

    if(isEat()){
        score += 10;
        scoreBox.innerHTML = score +=10;
        food = getFoodRandomPosition();
        expendSnake();
        SNAKE_SPEED ++;
    }
}
function isEat(){ 
        return snakeBody[0] === food.x && snakeBody[0].y === food.y;
         
}
function getFoodRandomPosition() {
    let a,b, myCondition = true;
    while(myCondition){

        // Math code from javascript W3Scool //
         a = Math.ceil(Math.random()*22);
         b = Math.ceil(Math.random()*22);

        myCondition = snakeBody.some(segment => {
            return segment.x === a && segment.y === b;
        })
    }
    
    return { x : a ,
        y : b};
}
function expendSnake(){
    for(i=0; i<EXPENTION_AMOUNT; i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }
}
function checkGameOver(){
    if(snakeOutOfGrid() || snakeIntersection() ){
        location.reload();
        alert("Game Over : You Loose");
    }
}

function snakeOutOfGrid(){
    return snakeBody[0].x > 0 || snakeBody[0].x > 22 || snakeBody[0].y < 0 || snakeBody[0].y > 22;

}
function snakeIntersection(){
    for(i=1; i,snakeBody.length; i++){
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y){
            return true;
        }
    }

}
