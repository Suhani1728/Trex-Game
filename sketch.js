var trex_image;
var trex;
var trex_collide
var ground_image,ground
var invisible_ground
var cloudGroup,obstacleGroup
var ob1,ob2,ob3,ob4,ob5,ob6
var score
var PLAY=1
var END=0
var gameState=PLAY 
var reset_image,reset
var gameOver_image,gameOver
var jump_sound,die_sound,checkPoint_sound
function preload(){
  
  trex_image=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image=loadImage("ground2.png");
cloud_image=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
   ob2=loadImage("obstacle2.png");
   ob3=loadImage("obstacle3.png");
   ob4=loadImage("obstacle4.png");
   ob5=loadImage("obstacle5.png");
   ob6=loadImage("obstacle6.png");
  trex_collide=loadAnimation("trex_collided.png")
  reset_image=loadImage("restart.png")
  gameOver_image=loadImage("gameOver.png");
  jump_sound=loadSound("jump.mp3")
  die_sound=loadSound("die.mp3")
  checkPoint_sound=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 300);
  
  trex=createSprite(50,270,10,10);
  trex.addAnimation("run",trex_image);
  trex.addAnimation("collided",trex_collide)
  trex.scale=0.5;
  
  ground=createSprite(0,280,10,10);
  ground.addImage(ground_image);
  
  
  invisible_ground=createSprite(0,290,600,10);
  invisible_ground.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
  reset=createSprite(300,50,10,10);
  reset.addImage(reset_image);
  reset.visible=false;
  
  gameOver=createSprite(300,150,10,10);
  gameOver.addImage(gameOver_image);
  gameOver.visible=false;
  
  score=0;
  
}

function draw() {
  background(255);
  
  text("Score : "+score,200,100);
  
  if(gameState===PLAY){
    
    score=score+Math.round(getFrameRate()/60);
    
   ground.velocityX=-5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  trex.velocityY=trex.velocityY+0.8;
  
  if(keyDown("space")){
    trex.velocityY=-4;
    jump_sound.play();
    
  }
  spawnClouds();
  spawnObstacle();
  
  
  if(trex.isTouching(obstacleGroup)){
     die_sound.play();
    gameState=END;
  }
  
    
  }
else if(gameState===END){
  ground.velocityX=0;
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  
   trex.changeAnimation("collided",trex_collide);
  reset.visible=true;
  gameOver.visible=true;
 

}
 if( mousePressedOver(reset)){
   restart();
 }
  
  trex.collide(invisible_ground);
    
  drawSprites();
}

function spawnClouds(){
  
  if(frameCount%60===0){
       
  var cloud=createSprite(600,200,10,10);
  cloud.addImage(cloud_image);
  cloud.velocityX=-5;
    cloud.y=random(120,200);
    
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;     
    
    cloud.lifetime=200;
    
    cloudGroup.add(cloud);
}
}

function spawnObstacle(){
  
  if(frameCount%100===0){
  var obstacle=createSprite(600,270,10,10);
  var rand=Math.round(random(1,6));
  
  switch(rand){
    case 1:obstacle.addImage(ob1);
      break;
      
      case 2:obstacle.addImage(ob2);
      break;
      
      case 3:obstacle.addImage(ob3);
      break;
      
      case 4:obstacle.addImage(ob4);
      break;
      
      case 5:obstacle.addImage(ob5);
      break;
      
      case 6:obstacle.addImage(ob6);
      break;
      
      default:break;
      
  }
    
  obstacle.velocityX=-5;
  obstacle.lifetime=200;
  
  obstacleGroup.add(obstacle);
  obstacle.scale=0.5;
}
}
function restart(){
   gameState=PLAY;
  score=0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("run",trex_image);
  reset.visible=false;
  gameOver.visible=false;
  
}
