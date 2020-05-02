const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg4.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world; 

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700+200,320,70,70);
    box2 = new Box(920+200,320,70,70);
    pig1 = new Pig(810+200, 350);
    pig2 = new Pig(600,350);
    log1 = new Log(810+200,260,300, PI/2);

    box3 = new Box(700+200,240,70,70);
    box4 = new Box(920+200,240,70,70);
    pig3 = new Pig(810+200, 220);

    log3 =  new Log(810+200,180,300, PI/2);

    box5 = new Box(810+200,160,70,70);
    log4 = new Log(760+200,120,150, PI/7);
    log5 = new Log(870+200,120,150, -PI/7);
    box6 = new Box(700,320,70,70);
    box7 = new Box(700,280,70,70);    
    box9 = new Box(700 - 200,240,70,70);
    box10 = new Box(700 - 200,220,70,70);    
    log7= new Log(600,180,300, PI/2);
    box12 = new Box(600,150,70,70);
    log8 = new Log(570,130,110, PI/7);
    log9 = new Log(630,130,110, -PI/7);


    

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)   {
        background(backgroundImg);
    
        noStroke();
                
        fill("white")
        text("Score  " + score, width-300, 50)
    }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    box6.display();
    box7.display();
    //box8.display();
    box9.display();
    box10.display();
    //box11.display();
    box12.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    log7.display();
    log8.display();
    log9.display();
    pig2.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
   // }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<1 || bird.body.position.x>1200+10 || bird.body.position.x<0){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body, {x: 200, y: 50});
        slingshot.attach(bird.body);       
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg3.png";
    }
    else{
        bg = "sprites/bg4.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
