import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation-trigger',
  standalone: true,
  imports: [],
  templateUrl: './animation-trigger.component.html',
  styleUrl: './animation-trigger.component.scss',
})
export class AnimationTriggerComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  CANVAS_WIDTH: number = 500;
  CANVAS_HEIGHT: number = 700;
  canvasPosition!: DOMRect;

  explosions: Explosion[] = [];

  ngOnInit(): void {
    try {
      this.canvas = this.canvas1.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.canvasPosition = this.canvas.getBoundingClientRect();
      this.CANVAS_WIDTH = this.canvas.width = 500;
      this.CANVAS_HEIGHT = this.canvas.height = 700;

      if (this.ctx) {
        this.animate();
      }
    } catch (err) {
      console.log(err);
    }
  }

  // startAnimation(e: MouseEvent) {
  startAnimation(e: MouseEvent) {
    const posX = e.x - this.canvasPosition.left;
    const posY = e.y - this.canvasPosition.top;

    this.explosions.push(new Explosion(posX, posY));
  }
  animate() {
    try {
      this.ctx?.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      for (const explosion of this.explosions) {
        explosion.update();
        explosion.draw(this.ctx!);
        if (explosion.frame > 5) this.explosions.shift();
      }
      requestAnimationFrame(() => this.animate());
    } catch (err) {
      console.log(err);
    }
  }
}

class Explosion {
  spriteWidth = 200;
  spriteHeight = 179;
  width = this.spriteWidth * 0.5;
  height = this.spriteHeight * 0.5;
  image = new Image();
  frame = 0;
  timer = 0;
  angle = Math.random() * 6.25;

  constructor(private x: number, private y: number) {
    this.image.src = 'assets/boom.png';
    // center explosion in mouse position in basic drawing
    // this.x = x - this.width / 2;
    // this.y = y - this.height / 2;
  }

  update() {
    this.timer++;
    if (this.timer % 10 == 0) {
      this.frame++;
    }
    // this.frame > 5 ? (this.frame = 0) : this.frame++;
  }

  // draw(ctx: CanvasRenderingContext2D) {
  //   ctx.drawImage(
  //     this.image,
  //     this.frame * this.spriteWidth,
  //     0,
  //     this.spriteWidth,
  //     this.spriteHeight,
  //     this.x,
  //     this.y,
  //     this.width,
  //     this.height
  //   );
  // }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
