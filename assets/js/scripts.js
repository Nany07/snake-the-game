
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let pointCount = 0;

let snake = [];
snake [0]={
    x:7 * box,
    y:7 * box
}

let xFoodPosition = 0;
let yFoodPosition = 0;

let direction = "ArrowRight";
let lastDirection = direction;
let gameOver = false;

function createBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0, 16*box, 16*box);
}

function createSneak(){
    for(let i=0; i<snake.length; i++){
        context.fillStyle="green";
        context.fillRect(snake[i].x,snake[i].y,box,box);
    }
   
}

function clearLastElement(){
    context.fillStyle= "lightgreen";
    context.fillRect(snake[snake.length-1].x,snake[snake.length-1].y,box,box);
}

function moveSnake(){

    for(let i=snake.length-1; i>0;i--){
        snake[i].x=snake[i-1].x;
        snake[i].y=snake[i-1].y;
    }

    if(direction=="ArrowRight"){
        snake[0].x+=box; 
        lastDirection=direction;
    }else if(direction=="ArrowLeft"){
        snake[0].x-=box; 
        lastDirection=direction;
    }else if(direction=="ArrowUp"){
        snake[0].y-=box; 
        lastDirection=direction;
    }else if(direction=="ArrowDown"){
        snake[0].y+=box;  
        lastDirection=direction;
    }
}

function getDirection(){
    document.addEventListener("keydown",function(event){
        switch(event.key){
            case "ArrowRight": direction = "ArrowRight"; break;
            case "ArrowLeft": direction = "ArrowLeft"; break;
            case "ArrowUp": direction = "ArrowUp"; break;
            case "ArrowDown": direction = "ArrowDown"; break;
        }
    }) 

    // Impede que a cobra ande para "trás"
    if(direction === "ArrowRight" && lastDirection === "ArrowLeft" || direction ==="ArrowLeft" && lastDirection === "ArrowRight"||direction ==="ArrowUp" && lastDirection === "ArrowDown" || direction ==="ArrowDown" && lastDirection === "ArrowUp")
        direction = lastDirection;

}

function checkGameOver(){
    // Caso a cobrinha ultrapassar os limites do canva
    // for(let i=0; i<snake.length; i++){
    //     if(snake[i].x<0 || snake[i].x>=512 || snake[i].y<0 || snake[i].y>=512)
    //         gameOver=true;
    // }
    for(let i=1; i<snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y)
            gameOver=true;
    }
}

function waitTime() {
    return new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 0,5 segundos
}

function createFood(){
    let findEmptySpace = true;
    

    do{
        findEmptySpace = true;
        xFoodPosition = Math.floor(Math.random()*(16))*box;
        yFoodPosition = Math.floor(Math.random()*(16))*box;
        // Math.floor(Math.random() * (max - min + 1)) + min;
        
        for(let i=0; i<snake.length; i++){
            if(snake[i].x === xFoodPosition && snake[i].y === yFoodPosition){
                findEmptySpace=false;
            }       
        }
        }while(!findEmptySpace);

    context.fillStyle="red";
    context.fillRect(xFoodPosition, yFoodPosition,box,box);
}

function getFood(){
    if (snake[0].x === xFoodPosition && snake[0].y === yFoodPosition){
        snake [snake.length] = {
            x: xFoodPosition-32,
            y: yFoodPosition-32
        } 
        return true;
    }
    return false;
}

async function snakeGame() {

    createBG();  
    createFood(); // teste

    do{
        createSneak();
        await waitTime(); // pausa de  0,5 segundos
        getDirection();

        if (!getFood()){
            clearLastElement();
        }else{
            pointCount++;
            createFood();
        }

        moveSnake();
        checkGameOver();    
    }while(!gameOver);
    
    context.font="80px Arial";
    context.fillStyle="red";
    context.fillText("Game Over", 2*box, 9*box);

    context.font= "80px Times New Roman";
    context.fillStyle="blue";
    context.fillText(`Pontos: ${pointCount}`,4*box,3*box);
}

snakeGame();