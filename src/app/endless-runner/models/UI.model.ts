import { Asset } from './assets.enum';
import { Game } from './game.model';

export class UI {
  fontSize = 32;
  fontFamily = 'Freckle Face';
  livesImg = this.game.assets[Asset.LIVES];
  constructor(public game: Game) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText(`Score: ${this.game.score()}`, 20, 50);
    ctx.fillText(`Timer: ${this.game.maxTime - this.game.time}`, 20, 100);
    for (let i = 0; i < this.game.lives; i++) {
      ctx.drawImage(this.livesImg, 20 * i + 20, 120, 20, 20);
    }
    if (this.game.gameOver()) {
      ctx.textAlign = 'center';
      ctx.fillText(`Boo-yah!`, this.game.width * 0.5, this.game.height * 0.5);
    }
  }
}
