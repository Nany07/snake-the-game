
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let snake = [];
snake [0]={
    x:7 * box,
    y:7 * box
}

// testando novo elemento no canva
let newGoal = [];
newGoal [0]={
    x:4 * box,
    y:4 * box
}

let direction = "ArrowRight";
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
        snake[0].x= snake[0].x+box; 
    }else if(direction=="ArrowLeft"){
        snake[0].x= snake[0].x-box; 
    }else if(direction=="ArrowUp"){
        snake[0].y= snake[0].y-box; 
    }else if(direction=="ArrowDown"){
        snake[0].y= snake[0].y+box;  
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
}

function checkGameOver(){
    // Caso a cobrinha ultrapassar os limites do canva
    for(let i=0; i<snake.length; i++){
        if(snake[i].x<0 || snake[i].x>=512 || snake[i].y<0 || snake[i].y>=512)
            gameOver=true;
    }
}

function waitTime() {
    return new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 0,5 segundos
}

function createGoal(){
    context.fillStyle="red";
    context.fillRect(newGoal[0].x, newGoal[0].y,box,box)
}

function addElement(){
    if (snake[0].x === newGoal[0].x && snake[0].y === newGoal[0].y){
        snake [snake.length] = {
            x: newGoal[0].x-32,
            y: newGoal[0].y-32
        } 
        return true;
    }
    return false;
}

async function snakeGame() {

    createBG();  
    createGoal(); // teste

    do{
        createGoal(); //teste
        createSneak();
        await waitTime(); // pausa de  0,5 segundos
        getDirection();

        if (!addElement())
            clearLastElement();

        moveSnake();
        checkGameOver();    
    }while(!gameOver);
    
    context.font="80px Arial";
    context.fillStyle="red";
    context.fillText("Game Over", 2*box, 7*box);
}

snakeGame();