// making new variables and constants 

let snakeDir = {x:0, y:0};
const musicsound = new Audio('music/music.mp3');
const movesound = new Audio('music/move.mp3');
const foodsound = new Audio('music/food.mp3');
const oversound = new Audio('music/gameover.mp3');
let speed = 4;
let lastPaintTime = 0;
let score = 0;

//snake head 
let snakearr = [
    {x:12 , y: 15}
]

food = { x:15, y:12};


// game function

function main(ctime) {

    window.requestAnimationFrame(main);
    // console.log("ctime");
    if ((ctime - lastPaintTime)/1000 < 1/speed ){
        return;      
    }
    lastPaintTime = ctime;
    gameEngine();   
}

function isCollide(sarr) {
    
    //if collide on ourselves 
    for (let i = 1; i < snakearr.length; i++) {
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            return true;
        }       
    }
    // collide with wall
    if (snakearr[0].x >= 25 || snakearr[0].y <=0 || snakearr[0].y >= 25 || snakearr[0].x <=0) {
        return true;
    }

    return false;
    
}

function gameEngine() {
    // Part 1: Updating the snake Array

    if(isCollide(snakearr)){
        oversound.play();
        musicsound.pause();
        snakeDir = {x:0, y:0};
        alert("Game Over, Press any key to play again!!!");
        snakearr =[ {x:12 , y: 15}]
        musicsound.play();
        score = 0;

    }

    // If food eatten by snake :::

    if (snakearr[0].y === food.y && snakearr[0].x=== food.x) {
        foodsound.play();
        score += 1;
        scorebox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + snakeDir.x, y: snakearr[0].y + snakeDir.y})
        let a = 2;
        let b =24;

        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }

    // function for move snake 

    for (let i = snakearr.length-2; i >= 0; i--) {
        snakearr[i+1] = {...snakearr[i]};
        
    }
    snakearr[0].x += snakeDir.x;
    snakearr[0].y += snakeDir.y;

    
    // Part 2: Display the snake 
    board.innerHTML = "";
    snakearr.forEach((e, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')    
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

        // Part 3: Display the  food.

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
        
        
}


// main function,,,,main logic starts here 

// musicsound.play();

window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
    snakeDir = {x: 0, y: 1}   // Start the game.
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            snakeDir.x = 0;
            snakeDir.y = -1;          
            break;
        case "ArrowDown":
            snakeDir.x = 0;
            snakeDir.y = 1;             
            break;
        case "ArrowRight":
            snakeDir.x = 1;
            snakeDir.y = 0;             
            break;
        case "ArrowLeft":
            snakeDir.x = -1;
            snakeDir.y = 0;             
            break;
    
        default:
            break;
    }
})
