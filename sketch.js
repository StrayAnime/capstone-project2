var ninja,ninjaImg;
var bg,bgImg;
var invGround;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var ninjaStar, starScore, ninjaStarImg, ninjaStarsGroup;
var score;
var gameState = "play";

function preload(){
ninjaImg=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
bgImg=loadImage("landscape1.jpg");
ninjaStarImg = loadImage("ninjastar.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
}

function setup(){
  createCanvas(1000,600);
  bg=createSprite(500,300,1000,600);
  bg.addImage(bgImg);
  bg.scale=2.8;
  ninjaImg.frameDelay=10;
  ninja=createSprite(80,500);
  ninja.addAnimation("running",ninjaImg);
ninja.setCollider("rectangle", 0,0,200,200);
  ninja.scale=0.4;
  bg.velocityX=-20;

  invGround = createSprite(500,580,1000,20);
  invGround.visible = false;
  
  obstaclesGroup = new Group();
  ninjaStarsGroup = new Group();

  score = 0;
  starScore = 0;
}

function draw(){
background(100);

if(gameState === "play"){

  score = score + Math.round(getFrameRate()/60);

  if(bg.x<=200){
    bg.x=500;
  }
  if(keyDown("space") &&ninja.y >= 500){
    ninja.velocityY = -17;
  }

  ninja.velocityY = ninja.velocityY + 1.1

spawnObstacles();
spawnNinjaStars();
for(var i = 0; i<ninjaStarsGroup.length; i++){
if(ninjaStarsGroup.get(i).isTouching(ninja)){
  ninjaStarsGroup.get(i).destroy();
  starScore = starScore + 1;
}
}

if(obstaclesGroup.isTouching(ninja)){
  gameState = "end";
 }
 drawSprites();
}
else if(gameState === "end") {

  stroke("red");
  fill ("red");
  textSize(56);
  text("GAME OVER", 320,330);
}
textSize(20);
fill("black");
text("Score: "+ score, 750,60);
text("Ninja stars: "+starScore, 750,30);
ninja.collide(invGround);
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(1000,550,10,40);
    obstacle.velocityX = -14;
    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       default: break;
     }
              
     obstacle.scale = 0.35;
     obstacle.lifetime = 300;
    
     obstaclesGroup.add(obstacle);
  }
 }
 function spawnNinjaStars() {
   if (frameCount % 100=== 0) {
     ninjaStar = createSprite(600,565,40,10);
     ninjaStarsGroup.x = obstaclesGroup.x;
    ninjaStar.addImage(ninjaStarImg);
    ninjaStar.scale = 0.3;
    ninjaStar.velocityX = -9;
    ninjaStar.y = Math.round(random(350,550))
    ninjaStar.lifetime = 300;

   ninjaStarsGroup.add(ninjaStar);
    }
}
