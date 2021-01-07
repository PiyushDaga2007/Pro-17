var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var Bell,pinkCG,redCG,yellowCG;
var pink1,redCyclist,yellow1;
var pinkG,redG,yellowG;
var END =0;
var PLAY =1;
var gameState = PLAY;
var rand;
var distance=0;
var pinkCg,red1Cg,yellowCg;
var gameOver,OverImage;

var Iobstacle1,Iobstacle2,Iobstacle3,obstaclesG;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
pink1 =loadAnimation("opponent1.png","opponent2.png");
  pinkG=loadAnimation("opponent3.png");
yellow1 =loadAnimation("opponent4.png","opponent5.png");
  yellowG=loadAnimation("opponent6.png");
  redCyclist=loadAnimation("opponent7.png","opponent8.png");
  redG=loadAnimation("opponent9.png");
OverImage=loadAnimation("gameOver.png");
  Bell=loadSound("bell.mp3");
  Iobstacle1=loadAnimation("obstacle1.png");
  Iobstacle2=loadAnimation("obstacle2.png");
  Iobstacle3=loadAnimation("obstacle3.png");
}

function setup(){
  
createCanvas(500,300);


// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(5+2*distance/150);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("Running",mainRacerImg1);
  mainCyclist.addAnimation
("collided",mainRacerImg2);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",0,0,20,20);
  gameOver = createSprite(250,100,200,100);
    gameOver.addAnimation("running",OverImage);
  gameOver.scale = 0.5;

  yellowCg =new Group();
  pinkCg =new Group();
  red1Cg =new Group();
  obstaclesG =new Group();
}

function draw() {
  background(0);
     drawSprites();
  textSize(20);
  fill(255);
 text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    gameOver.visible=false;
  obs();
    if(obstaclesG.isTouching(mainCyclist)){
      gameState=END;
          }
    if(keyDown("space")){
     Bell.play();
    }

  mainCyclist.changeAnimation("Running",mainRacerImg1)
  rand=Math.round(random(1,3));
  if(frameCount%150===0){
    if(rand===1){
      pink();
    }
    if(rand===2){
      yellow();
    }
    if(rand===3){
      red1();
    }
  }

   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    distance=distance+Math.round(getFrameRate()/50);
 if(red1Cg.isTouching(mainCyclist)){
   gameState=END;
   redCG.addAnimation("running",redG);
   red1Cg.setVelocityXEach(0);
   } 
    if(yellowCg.isTouching(mainCyclist)){
   gameState=END;
  yellowCG.addAnimation("running",yellowG);
  yellowCg.setVelocityXEach(0);

 }   
 if(pinkCg.isTouching(mainCyclist)){
   gameState=END;
pinkCG.addAnimation("running",pinkG);
pinkCg.setVelocityXEach(0);

 }   
 
    }
  if(gameState===END){
    over();
  textSize(22);
text('Press up Arrow to restart!',100,200);
fill(255,255,255);
    mainCyclist.changeAnimation("collided",mainRacerImg2);
    
           red1Cg.setLifetimeEach(-1);

     pinkCg.setLifetimeEach(-1);
    yellowCg.setLifetimeEach(-1);
    path.velocityX=0;
    obstaclesG.setVelocityXEach(0);
      obstaclesG.setLifetimeEach(-1);
    if(keyDown("UP_ARROW")){
      reset();
  }}
 
}
function red1(){
  redCG=createSprite(0,Math.round(random(50,250)),10,10);
  
  redCG.scale=0.06;
    redCG.addAnimation("running",redCyclist);

  redCG.setLifetime=170;
  red1Cg.add(redCG);
  redCG.velocityX=(5+2*distance/150);
}
function yellow(){
  yellowCG=createSprite(0,Math.round(random(50,250)),10,10);
  yellowCG.scale=0.06;
  yellowCG.addAnimation("running",yellow1);
  yellowCG.setLifetime=170;
  yellowCg.add(yellowCG);
   yellowCG.velocityX=(5+2*distance/150);
}
function pink(){
  pinkCG=createSprite(0,Math.round(random(50,250)),10,10);
  pinkCG.scale=0.06;
    pinkCG.addAnimation("running",pink1);
  pinkCG.setLifetime=170;
  pinkCg.add(pinkCG);
   pinkCG.velocityX=(5+2*distance/150);
}
function over(){
  gameOver.visible=true;
    }
function reset(){
  gameState=PLAY;
gameOver.visible = false;
  pinkCg.destroyEach();
  yellowCg.destroyEach();
  red1Cg.destroyEach();
  distance=0;
  path.velocityX=-(5+2*distance/150);
  obstaclesG.destroyEach();
}
function obs(){
    if(frameCount%100===0){
    var obstacle=createSprite(500,100,60,60);
      obstacle.y=Math.round(random(30,270));
     
      obstacle.depth=mainCyclist.depth;
      mainCyclist.depth=mainCyclist.depth+1;
    var rum=Math.round(random(1,3));
      obstacle.lifetime=500/3;
      obstacle.scale=0.1;
var y=Math.random(3,6);
    if(rum===1){
      obstacle.addAnimation("running",Iobstacle1);
      obstacle.velocityX=-(y+distance/75);
      obstaclesG.add(obstacle);
    }
     if(rum===2){
      obstacle.addAnimation("running",Iobstacle2);
      obstacle.velocityX=-(y+distance/75);
      obstaclesG.add(obstacle);
    }
 if(rum===3){
      obstacle.addAnimation("running",Iobstacle1);
      obstacle.velocityX=-(y+distance/75);
      obstaclesG.add(obstacle);
   
    }

  }
}