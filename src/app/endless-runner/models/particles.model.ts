import { Asset } from './assets.enum';
import { Game } from './game.model';

// export class Particle {
//   markedForDeletion = false;
//   size = Math.random() * 10 + 10;
//   speedX = Math.random();
//   speedY = Math.random();
//   color = 'black';
//   constructor(
//     private readonly game: Game,
//     private x: number,
//     private y: number
//   ) {}

//   update(deltaTime: number) {
//     this.x -= this.speedX + this.game.speed;
//     this.y -= this.speedY;
//     this.size *= 0.95;
//     if (this.size < 0.5) this.markedForDeletion = true;
//   }
//   draw(ctx: CanvasRenderingContext2D) {
//     ctx.save();
//     ctx.fillStyle = this.color;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.restore();
//   }
// }

export class Dust {
  markedForDeletion = false;
  size = Math.random() * 10 + 10;
  speedX = Math.random();
  speedY = Math.random();
  color = 'rgba(0, 0, 0, 0.3)';
  constructor(
    private readonly game: Game,
    private x: number,
    private y: number
  ) {}

  update(deltaTime: number) {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

export class Fire {
  markedForDeletion = false;
  size = Math.random() * 100 + 50;
  speedX = 1;
  speedY = 1;
  img = this.game.assets[Asset.FIRE];
  angle = 0;
  va = Math.random() * 0.2 - 0.1;

  constructor(
    private readonly game: Game,
    private x: number,
    private y: number
  ) {}

  update(deltaTime: number) {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
    this.angle += this.va;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, 0, 0, this.size, this.size);
    ctx.restore();
  }
}

export class Splash {
  markedForDeletion = false;
  size = Math.random() * 100 + 100;
  speedX = Math.random() * 6 - 4;
  speedY = Math.random() * 2 + 2;
  gravity = 0;
  img = this.game.assets[Asset.FIRE];
  color = 'black';

  constructor(
    private readonly game: Game,
    private x: number,
    private y: number
  ) {}

  update(deltaTime: number) {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }
}

// export interface IParticles {
//   update(deltaTime: number): void;
//   draw(ctx: CanvasRenderingContext2D): void;
// }
