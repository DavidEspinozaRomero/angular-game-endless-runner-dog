import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parallax-background',
  standalone: true,
  imports: [],
  templateUrl: './parallax-background.component.html',
  styleUrl: './parallax-background.component.scss',
})
export class ParallaxBackgroundComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  CANVAS_WIDTH: number = 800;
  CANVAS_HEIGHT: number = 700;
  gameSpeed = 5;
  x = 0;
  x2 = 2400;

  bgLayer1 = new Image();
  bgLayer2 = new Image();
  bgLayer3 = new Image();
  bgLayer4 = new Image();
  bgLayer5 = new Image();

  layer1 = new Layer(this.bgLayer1, 0.2, this.gameSpeed);
  layer2 = new Layer(this.bgLayer2, 0.4, this.gameSpeed);
  layer3 = new Layer(this.bgLayer3, 0.6, this.gameSpeed);
  layer4 = new Layer(this.bgLayer4, 0.8, this.gameSpeed);
  layer5 = new Layer(this.bgLayer5, 1, this.gameSpeed);

  gameObjects = [
    this.layer1,
    this.layer2,
    this.layer3,
    this.layer4,
    this.layer5,
  ];

  ngOnInit(): void {
    try {
      this.bgLayer1.src = 'assets/layer-1.png';
      this.bgLayer2.src = 'assets/layer-2.png';
      this.bgLayer3.src = 'assets/layer-3.png';
      this.bgLayer4.src = 'assets/layer-4.png';
      this.bgLayer5.src = 'assets/layer-5.png';
      this.canvas = this.canvas1.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.CANVAS_WIDTH = this.canvas.width = 800;
      this.CANVAS_HEIGHT = this.canvas.height = 700;
      if (this.ctx) {
        this.animate(this.ctx);
      }
    } catch (err) {
      console.log(err);
    }
  }

  animate(ctx: CanvasRenderingContext2D) {
    try {
      ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      for (const layer of this.gameObjects) {
        layer.update(this.gameSpeed);
        layer.draw(ctx);
      }
      requestAnimationFrame(() => this.animate(ctx));
    } catch (err) {
      console.log(err);
    }
  }

  setGameSpeed(event: Event) {
    this.gameSpeed = +(event.target as HTMLInputElement).value;
  }
}

class Layer {
  x = 0;
  y = 0;
  width = 2400;
  height = 700;
  speed: number;
  constructor(
    private img: HTMLImageElement,
    private speedModifier: number,
    gameSpeed: number
  ) {
    this.speed = gameSpeed * this.speedModifier;
  }
  update(gameSpeed: number) {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
