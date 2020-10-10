var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;
var score=0;

function preload(){
  
  
  monkey_running = loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  survivalTime=0;
  score=0;
}


function draw() {
  background(255);
  
  spawnObstacles();
  spawnBananas();
  
  if(keyDown("space")  && monkey.y >= 159){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50); 
  
  if(FoodGroup.isTouching(monkey)){
    score=score+1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
    else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    }
  
  drawSprites();  
}


function spawnBananas(){
  if (frameCount % 70 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(250,130));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);
  }
}


