import { Asset } from './assets.enum';
import { Game } from './game.model';

export class CollisionAnimation {
  img = this.game.assets[Asset.BOOM];
  spriteWidth = 200;
  spriteHeight = 179;
  sizeModifier = Math.random() + 0.5;
  width = this.spriteWidth * 0.5 * this.sizeModifier;
  height = this.spriteHeight * 0.5 * this.sizeModifier;
  frameX = 0;
  maxFrame = 4;

  fps = 20;
  frameTimer = 0;
  frameInterval = 1000 / this.fps;
  markedForDeletion = false;

  constructor(private game: Game, private x: number, private y: number) {}

  update(deltaTime: number) {
    this.x -= this.game.speed;
    if (this.frameX >= this.maxFrame) this.markedForDeletion = true;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.img,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
