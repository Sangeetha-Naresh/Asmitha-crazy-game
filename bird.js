class Bird {
  constructor(x, y, width, height) {
   
    this.speed = 0.05;
    this.body = Bodies.rectangle(x, y, width, height, {isStatic:true});
    this.width = width;
    this.height = height;
    this.birdPosition = 100;
    World.add(world, this.body);
  }
  animate() {
    this.birdPosition += 0.5;
  }

  remove(index) {
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    setTimeout(() => {
      Matter.World.remove(world, bird[index].body);
      bird.splice(index, 1);
    }, 2000);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    this.animate();
    imageMode(CENTER);
    image(birdImg, this.birdPosition, 0, this.width, this.height);
    noTint();
    pop();
  }
}


