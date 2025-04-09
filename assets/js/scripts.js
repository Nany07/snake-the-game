
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let point = document.getElementById("point");
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

let isPaused= false;

document.addEventListener("keydown",function(event){
    if(event.key === "p"){
        isPaused = !isPaused;
        alert(isPaused ? "Jogo Pausado - Para voltar precione P":"Jogo Rodando");
    }
})


async function snakeGame() {

    if(gameOver){
        gameOverScreen();
        return;
    }

    if(!isPaused){
        createSneak();
        await waitTime(); // pausa de  0,5 segundos
        getDirection();
        

        if (!getFood()){
            clearLastElement();
        }else{
            point.innerHTML= ++pointCount;
            createFood();
        }
        
         // Move o corpo da cobra 
         for(let i=snake.length-1; i>0;i--){
            snake[i].x=snake[i-1].x;
            snake[i].y=snake[i-1].y;
        }

        // Move a cabeça da cobra
        if(direction=="ArrowRight"){
            snake[0].x+=box; 
        }else if(direction=="ArrowLeft"){
            snake[0].x-=box; 
        }else if(direction=="ArrowUp"){
            snake[0].y-=box; 
        }else if(direction=="ArrowDown"){
            snake[0].y+=box;  
        }
        lastDirection=direction;
    
        // Ultrapassar parede
        if(snake[0].x>=512){
            snake[0].x=0;
        }else if (snake[0].x<0)
            snake[0].x=480;
        if(snake[0].y>=512){
            snake[0].y=0;
        }else if (snake[0].y<0)
            snake[0].y=480;
        
        checkGameOver();  
    }    
    requestAnimationFrame(snakeGame);   
}

function gameOverScreen(){

    context.font="80px Arial";
    context.fillStyle="red";
    context.fillText("Game Over", 2*box, 9*box);
}

createBG();  
createFood(); // teste
snakeGame();