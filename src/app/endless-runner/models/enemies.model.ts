import { Game } from './game.model';
import { Asset } from './assets.enum';

// classes of enemies
// Class Enemy
// * Class FlyingEnemy
//   - Class FlyEnemy
//   - Class BirdEnemy
// * Class GroundEnemy
//   - Class PlantEnemy
// * Class ClimbingEnemy
//   - Class SpiderEnemy
//   - Class SpiderBigEnemy

// interface enemy

export interface IEnemy {
  img: HTMLImageElement;
  game: Game;
  // spriteWidth: number;
  // spriteHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;

  fps: number;
  frameTimer: number;
  frameInterval: number;

  maxFrame: number;
  frameX: number;
  frameY: number;
  // vy: number;

  markedForDeletion: boolean;
  speedX: number;

  update(deltaTime: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export class FlyingEnemy {
  x = this.game.width;
  y = Math.random() * this.game.height * 0.5;
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameTimerr = 0;
  frameInterval = 1000 / this.fps;
  markedForDeletion = false;
  width = 60;
  height = 44;
  speedX = Math.random() + 1;
  speedY = 0;
  frameTimer = 0;
  maxFrame = 4;

  angle = 0;
  va = Math.random() * 0.2 - 0.1;

  img = this.game.assets[Asset.ENEMY_FLY];

  constructor(public game: Game) {
    this.game = game;
  }
  update(deltaTime: number) {
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

    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      // ctx.beginPath();
      // ctx.arc(
      //   this.x + this.width * 0.5,
      //   this.y + this.height * 0.5 + 10,
      //   this.width * 0.5 - 20,
      //   0,
      //   2 * Math.PI
      // );
      // ctx.stroke();
    }
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

export class GroundEnemy {
  width = 60;
  height = 87;
  x = this.game.width;
  y = this.game.height - this.height - this.game.groundMargin;
  speedX = 0;
  speedY = 0;
  maxFrame = 0;
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameTimer = 0;
  frameInterval = 1000 / this.fps;
  markedForDeletion = false;
  img = this.game.assets[Asset.ENEMY_PLANT];
  constructor(public game: Game) {}

  update(deltaTime: number) {
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
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
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
export class ClimbingEnemy {
  width = 120;
  height = 144;
  x = this.game.width;
  y = Math.random() * this.game.height * 0.5;
  speedX = 0;
  speedY = Math.random() > 0.5 ? 1 : -1;
  maxFrame = 4;
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameTimer = 0;

  frameInterval = 1000 / this.fps;
  markedForDeletion = false;
  img = this.game.assets[Asset.ENEMY_SPIDER_BIG];
  constructor(public game: Game) {}

  update(deltaTime: number) {
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

    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
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
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + 10);
    ctx.stroke();
  }
}
