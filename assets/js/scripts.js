
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let snake = [];
snake [0]={
    x:7 * box,
    y:7 * box
}

let direction = "ArrowUp";
let gameOver = false;

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0, 16*box, 16*box);
}

function criarCobrinha(){
    for(let i=0; i<snake.length; i++){
        context.fillStyle="green";
        context.fillRect(snake[i].x,snake[i].y,box,box)
    }
   
}

function clearSnakeLastElement(){
    context.fillStyle= "lightgreen";
    context.fillRect(snake[0].x,snake[0].y,box,box)
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