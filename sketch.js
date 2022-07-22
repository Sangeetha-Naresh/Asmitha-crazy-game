const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg, birdImg;
var canvas, angle, blast, bird;
var soccer = [];
var birds;
var soccerBall;
var isGameOver = false;



function preload() {
  backgroundImg = loadImage("field.webp");
  birdImg = loadImage("bird.png");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 1


  blast = new Blast(80, 550, 300, 100, angle);

  bird = new Bird(20, 80, 80, 80,);




}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  for (var i = 0; i < soccer.length; i++) {
    showSoccerBalls(soccer[i], i);
    collisionWithBird(i);
  }



  
  blast.display();     
  bird.display();               
                                       

  
}

function collisionWithBird(index) {
  
  if (bird.body!==undefined && soccer[index]!==undefined)
  {
    var collision = Matter.SAT.collides(bird.body, soccer[index].body);
      if (collision.collided) {
        console.log("hi");
          bird.remove(i);

        Matter.World.remove(world, soccer[index].body);
        delete soccer[index];
        isGameOver = true;
      }

  }
  
      
      //if (collision.collided) {
      //
      //  isGameOver = true;
      //  gameOver();
      //}

    }
  


function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    soccerBall = new Soccerball(blast.x, blast.y);
    soccerBall.trajectory = [];
    Matter.Body.setAngle(soccerBall.body, blast.angle);
    soccer.push(soccerBall);
  }
}

function showSoccerBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width + 100 || ball.body.position.y >= height - 50) 
    {
          ball.remove(index);
    }
  }
}



    
     

     
    
  


function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    soccer[soccer.length - 1].shoot();
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


