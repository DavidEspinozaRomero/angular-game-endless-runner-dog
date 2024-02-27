import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-point-and-shoot',
  standalone: true,
  imports: [],
  templateUrl: './point-and-shoot.component.html',
  styleUrl: './point-and-shoot.component.scss',
})
export class PointAndShootComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('collitionCanvas', { static: true })
  collitionCanvas1!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  collitionCanvas!: HTMLCanvasElement;
  collitionCtx!: CanvasRenderingContext2D | null;

  ravens: Raven[] = [];
  // particles: Particles[] = [];
  explosions: Explosion[] = [];
  timeToNextRaven = 0;
  ravenInterval = 100;
  lastTime = 0;
  ravensCaught = 0;
  timestamp = 0;
  gameOver = false;

  sound = new Audio();

  ngOnInit(): void {
    try {
      this.canvas = this.canvas1.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.collitionCanvas = this.collitionCanvas1.nativeElement;
      this.collitionCtx = this.collitionCanvas.getContext('2d');

      this.canvas.width = this.collitionCanvas.width = window.innerWidth;
      this.canvas.height = this.collitionCanvas.height = window.innerHeight;
      this.sound.src = 'assets/rumble.flac';

      if (this.ctx && this.collitionCtx) {
        this.animate(this.ctx, this.collitionCtx);
      }
    } catch (err) {
      console.log(err);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    collitionCtx: CanvasRenderingContext2D
  ) {
    try {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      collitionCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let deltaTime = this.timestamp - this.lastTime;

      this.lastTime = this.timestamp;
      this.timeToNextRaven += deltaTime;
      if (this.timeToNextRaven > this.ravenInterval) {
        this.ravens.push(new Raven(this.canvas));
        this.timeToNextRaven = 0;
        this.ravens.sort((a, b) => a.width - b.width);
      }
      this.drawScore(ctx);
      // this.particles = this.ravens.map((raven) => raven.particles).flat();
      [...this.ravens, ...this.explosions].forEach(
        (object) => (this.gameOver = object.update(deltaTime) ?? this.gameOver)
      );
      [...this.ravens, ...this.explosions].forEach((object) =>
        object.draw(ctx, collitionCtx)
      );
      this.ravens = this.ravens.filter((raven) => !raven.markedForDeletion);
      // this.particles = this.particles.filter(
      //   (particles) => !particles.markedForDeletion
      // );

      if (!this.gameOver)
        this.timestamp = requestAnimationFrame(() => {
          this.animate(ctx, collitionCtx);
        });
      else {
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '30px Helvetica';
        ctx.fillText(
          'GAME OVER',
          this.canvas.width / 2,
          this.canvas.height / 2
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  shoot(e: MouseEvent) {
    const detectPixelColor = this.collitionCtx!.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    const posX = e.x;
    const posY = e.y;

    this.explosions.push(new Explosion(posX, posY, this.sound));

    this.ravens.forEach((raven) => {
      if (pc[0] !== raven.randomColor[0]) return;
      if (pc[1] !== raven.randomColor[1]) return;
      if (pc[2] !== raven.randomColor[2]) return;
      raven.markedForDeletion = true;
      this.ravensCaught++;
    });
  }

  drawScore(ctx: CanvasRenderingContext2D) {
    ctx.textBaseline = 'top';
    ctx.font = '20px Helvetica';
    ctx.fillStyle = 'black';
    ctx.fillText(`Ravens caught: ${this.ravensCaught}`, 21, 21);
    ctx.font = '20px Helvetica';
    ctx.fillStyle = 'white';
    ctx.fillText(`Ravens caught: ${this.ravensCaught}`, 20, 20);
  }
}

class Raven {
  x = 0;
  y = 0;
  directionX = Math.random() * 5 + 3;
  directionY = Math.random() * 5 - 2.5;
  markedForDeletion = false;
  img = new Image();
  spriteWidth = 271;
  spriteHeight = 194;
  sizeModifier = Math.random() * 0.6 + 0.4;
  width = this.spriteWidth * this.sizeModifier;
  height = this.spriteHeight * this.sizeModifier;
  frame = 0;
  timeSinceFlap = 0;
  flapInterval = Math.random() * 5 + 5;
  randomColor = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
  color = `rgb(${this.randomColor[0]}, ${this.randomColor[1]}, ${this.randomColor[2]})`;
  particles: Particles[] = [];

  constructor(private canvas: { width: number; height: number }) {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.img.src = 'assets/raven.png';
  }

  update(deltaTime: number) {
    if (this.y < 0 || this.y > this.canvas.height - this.height) {
      this.directionY = this.directionY * -1;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < -this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
      this.timeSinceFlap = 0;
      this.particles.push(
        new Particles(this.x, this.y, this.width, this.color)
      );
    }
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
    if (this.x < 0 - this.width) return true;
    return;
  }

  draw(ctx: CanvasRenderingContext2D, collitionCtx: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => particle.draw(ctx));
    collitionCtx.fillStyle = this.color;
    collitionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.frame * this.spriteWidth,
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

class Explosion {
  spriteWidth = 200;
  spriteHeight = 179;
  width = this.spriteWidth * 0.5;
  height = this.spriteHeight * 0.5;
  image = new Image();
  frame = 0;
  timer = 0;
  angle = Math.random() * 6.25;

  constructor(
    private x: number,
    private y: number,
    private sound: HTMLAudioElement
  ) {
    this.image.src = 'assets/boom.png';
    // center explosion in mouse position in basic drawing
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }

  update() {
    if (this.frame === 0) this.sound.play();

    this.timer++;
    if (this.timer % 10 == 0) {
      this.frame++;
    }
    // this.frame > 5 ? (this.frame = 0) : this.frame++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  // draw(ctx: CanvasRenderingContext2D) {
  //   ctx.save();
  //   ctx.translate(this.x, this.y);
  //   ctx.rotate(this.angle);
  //   ctx.drawImage(
  //     this.image,
  //     this.frame * this.spriteWidth,
  //     0,
  //     this.spriteWidth,
  //     this.spriteHeight,
  //     0 - this.width / 2,
  //     0 - this.height / 2,
  //     this.width,
  //     this.height
  //   );
  //   ctx.restore();
  // }
}

class Particles {
  radius = (Math.random() * this.size) / 12;
  maxRadius = Math.random() * 20 + 15;
  markedForDeletion = false;
  speedX = Math.random() * 1 + 0.5;
  constructor(
    private x: number,
    private y: number,
    private size: number,
    private color: string
  ) {}

  update() {
    this.x += this.speedX;
    this.radius += this.maxRadius * 0.02;
    if (this.radius > this.maxRadius) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    const posX = this.x + this.size * 0.5;
    const posY = this.y + this.size * 0.5;
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(posX, posY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}
