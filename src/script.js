const canvas = document.getElementById('canvas');
const ct = canvas.getContext('2d');


canvas.height = 800;
canvas.width = 1000;

let possibleXPositions = [420, 530, 640];
let playerCarPositionX=530;
let playerCarPositionY=700;
let score = 0;
let speed = 5;
let gamePaused = true;

let c=canvas.height-playerCarPositionY-50;


const start = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const restart= document.getElementById('restart');
const endScreen= document.getElementById('end-screen');
const strong = document.querySelectorAll('strong');  
let yourscore = document.getElementById('your-score')

function gameOver() {
  endScreen.style.display = 'initial';

  strong.forEach((element) => {
    element.innerText = score;
  });
      yourscore.style.display = 'block';
  
}


function getRandomElement(arr) {
    let randomIndex = Math.floor(arr.length * Math.random());
    return arr[randomIndex];
  }

class ObstacleCar{
    constructor(y){
        this.x = getRandomElement(possibleXPositions);
        this.y = y;
        this.prevY = this.y;
        this.speed = speed / 2;
    }

    detectCollision = () => {
        if (
          this.x === playerCarPositionX &&
          Math.abs(playerCarPositionY - this.y) <= c
        ) {
          console.log("CRASHED!!!")
          gameOver();
          gamePaused = true;
          return;
        }
      };


    drawObstacle = () => {
        const obstacle = new Image();
        obstacle.src = 'obstacle.png';
        obstacle.onload = () => {
          const moveObstacle = () => {
            ct.drawImage(obstacle, this.x, this.y, 30, 50);
            this.y += speed;
    
            if (this.y > canvas.height) {
              this.y = -400;
              this.x = getRandomElement(possibleXPositions);
               score++;
               let gameScore = document.querySelector('#game-score h4');
                gameScore.innerText = score;
                gameScore.style.display="none";
              if (speed < 50) {
                speed += 0.3;
                this.speed = speed / 2;
              }
            }
            this.detectCollision();

    
            if (gamePaused) return;
            requestAnimationFrame(moveObstacle);
          };
    
          moveObstacle();
        };
      };
}    
function drawRoad(){

    const road = new Image();
    road.src = 'road.jpg';
    road.onload = () => {


       let y = 0;
    const moveRoad = () => {
        ct.drawImage(road,300,0,500,900);
      y += speed;
      if (y >= canvas.height) y = 0;
      if (gamePaused) return;
      requestAnimationFrame(moveRoad);
    };
    moveRoad();
    };
}

function drawPlayer(){
    
    const player = new Image();
    player.src = 'player.png';
    const drawCar = () =>{
        ct.drawImage(player,playerCarPositionX,playerCarPositionY,30,50)
    
        if (gamePaused) return;
        requestAnimationFrame(drawCar);
    };
        player.onload = () => {
            drawCar();

        }
}

function drawRoadnPlayer(){
    drawRoad();
    drawPlayer();
}



document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' && playerCarPositionX>420){
        console.log("ArrowLeft");
        playerCarPositionX -= 110;
        console.log(playerCarPositionX);
        
        
        
    }   
  if (e.code === 'ArrowRight' && playerCarPositionX<640){
        playerCarPositionX += 110;
        console.log(playerCarPositionX);
        
    }
})


function init() {
    drawRoadnPlayer();
  
    const obstacle1 = new ObstacleCar(-100);
    const obstacle2 = new ObstacleCar(-550);
    const obstacle3 = new ObstacleCar(-1000);
  
    obstacle1.drawObstacle();
    obstacle2.drawObstacle();
    obstacle3.drawObstacle();
  }

  
  start.addEventListener('click', () => {
    gamePaused = false;
    init();
    startScreen.style.display = 'none';
    

  });

  

  restart.addEventListener('click', () => {
    gamePaused = false;
    speed = 5;
    playerCarPositionX = 530;
    score=0;
  
    init();
    endScreen.style.display = 'none';

    
  });

  



