
class Enemy {
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameTimerr = 0;
  frameInterval = 1000 / this.fps;
  markedForDeletion = false;
  constructor() { }

  update(deltaTime) {
    this.x += this.speedX - this.game.speed;
    this.y += this.speedY;

    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      this.frameX > this.maxFrame ? (this.frameX = 0) : this.frameX++;
    } else {
      this.frameTimer += deltaTime;
    }

    // Check if enemy is out of the screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }


}

export class FlyingEnemy extends Enemy {
  x = this.game.width;
  y = Math.random() * this.game.height * 0.5;
  constructor(game) {
    super();
    this.game = game;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }

  // draw() {}
}
class Fly extends FlyingEnemy {
  width = 60;
  height = 44;
  speedX = Math.random() + 1;
  speedY = 0;
  maxFrame = 4;

  angle = 0;
  va = Math.random() * 0.2 - 0.1;

  constructor(game) {
    super(game);
    this.game = game;
    this.img = this.game.assets['fly'];
  }
}


export class GroundEnemy extends Enemy {
  width = 60;
  height = 87;
  x = this.game.width;
  y = this.game.height - this.height - this.game.groundMargin;
  speedX = 0;
  speedY = 0;
  maxFrame = 1;

  constructor(game) {
    super();
    this.game = game;
    this.img = this.game.assets['plant'];
  }
}
export class ClimbingEnemy extends Enemy {
  width = 120;
  height = 144;
  x = this.game.width;
  y = Math.random() * this.game.height * 0.5;
  speedX = 0;
  speedY = Math.random() > 0.5 ? 1 : -1;
  maxFrame = 41;

  constructor(game) {
    super();
    this.game = game;
    this.img = this.game.assets['spiderBig'];

  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }
  draw(ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + 10);
    ctx.stroke();

  }
}
