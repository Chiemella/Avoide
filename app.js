const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const blockColor = "navy";
const blockSize = {
  width: 200,
  height: 200,
};
let block;

const ballRadius = 20;
const ballColor = "orangered";
const ballSpeed = 2;
let ball;

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  block = new Box(
    canvas.width / 2 - blockSize.width / 2,
    canvas.height / 2 - blockSize.height / 2,
    blockSize.width,
    blockSize.height,
    blockColor
  );

  const initialX = block.pos.x + ballRadius;
  const initialY = block.pos.y + ballRadius;
  ball = new Ball(initialX, initialY, ballRadius, ballColor, ballSpeed);
  ball.setRandomVelocity();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  block.draw();
  ball.update();
  ball.checkCollision(block);
  ball.draw();

  requestAnimationFrame(draw);
}

class Box {
  constructor(x, y, width, height, color) {
    this.pos = { x, y };
    this.size = { width, height };
    this.color = color || "white";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
  }
}

class Ball {
  constructor(x, y, radius, color, speed) {
    this.pos = { x, y };
    this.radius = radius;
    this.color = color || "white";
    this.speed = speed;
    this.velocity = { x: 0, y: 0 };
  }

  setRandomVelocity() {
    this.velocity.x = (Math.random() - 0.5) * this.speed;
    this.velocity.y = (Math.random() - 0.5) * this.speed;
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    const minX = block.pos.x + this.radius;
    const maxX = block.pos.x + block.size.width - this.radius;
    const minY = block.pos.y + this.radius;
    const maxY = block.pos.y + block.size.height - this.radius;

    if (this.pos.x < minX || this.pos.x > maxX) {
      this.velocity.x *= -1;
    }

    if (this.pos.y < minY || this.pos.y > maxY) {
      this.velocity.y *= -1;
    }
  }

  checkCollision(block) {
    const minX = block.pos.x + this.radius;
    const maxX = block.pos.x + block.size.width - this.radius;
    const minY = block.pos.y + this.radius;
    const maxY = block.pos.y + block.size.height - this.radius;

    if (this.pos.x < minX) {
      this.pos.x = minX;
      this.velocity.x *= -1;
    } else if (this.pos.x > maxX) {
      this.pos.x = maxX;
      this.velocity.x *= -1;
    }

    if (this.pos.y < minY) {
      this.pos.y = minY;
      this.velocity.y *= -1;
    } else if (this.pos.y > maxY) {
      this.pos.y = maxY;
      this.velocity.y *= -1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

setup();
draw();
