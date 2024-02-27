import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';

import {
  Game,
  assetsCharacter,
  assetsLayers,
  assetsEnemies,
  assetsParticles,
  assetsUI,
} from './models';

@Component({
  selector: 'app-endless-runner',
  standalone: true,
  imports: [],
  templateUrl: './endless-runner.component.html',
  styleUrl: './endless-runner.component.scss',
})
export class EndlessRunnerComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvasEl!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  assets: { [key: string]: HTMLImageElement } = {};

  game!: Game;
  gameOver = signal(false);
  lastTime = 1;
  score = signal(0);
  ngOnInit(): void {
    try {
      this.canvas = this.canvasEl.nativeElement;
      // this.canvas.width = window.innerWidth;
      // this.canvas.height = window.innerHeight;
      this.canvas.width = 600;
      this.canvas.height = 500;
      this.ctx = this.canvas.getContext('2d');

      this.loadAssets();

      this.game = new Game(
        this.canvas.width,
        this.canvas.height,
        this.assets,
        this.score,
        this.gameOver
      );

      if (this.ctx) {
        this.animate(this.ctx);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  loadAssets() {
    try {
      for (const [key, value] of Object.entries({
        ...assetsCharacter,
        ...assetsLayers,
        ...assetsEnemies,
        ...assetsParticles,
        ...assetsUI,
      })) {
        this.assets[key] = new Image();
        this.assets[key].src = value;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    timestamp: number = performance.now()
  ) {
    try {
      const deltaTime = timestamp - this.lastTime;
      this.lastTime = timestamp;
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.game.update(deltaTime);
      this.game.draw(ctx);
      if (!this.gameOver()) {
        requestAnimationFrame(() => this.animate(ctx));
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err: any) {
    console.error(err);
  }
}
