import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-enemy-movement-pattern',
  standalone: true,
  imports: [],
  templateUrl: './enemy-movement-pattern.component.html',
  styleUrl: './enemy-movement-pattern.component.scss',
})
export class EnemyMovementPatternComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  CANVAS_WIDTH: number = 500;
  CANVAS_HEIGHT: number = 1000;
  gameFrame = 0;
  numberOfEnemies: number = 30;
  enemiesArr: Enemy[] = [];

  enemy1Image = new Image();
  enemy2Image = new Image();
  enemy3Image = new Image();
  enemy4Image = new Image();

  ngOnInit(): void {
    try {
      this.canvas = this.canvas1.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = this.CANVAS_WIDTH = 500;
      this.canvas.height = this.CANVAS_HEIGHT = 1000;

      this.enemy1Image.src = 'assets/enemy1.png';
      this.enemy2Image.src = 'assets/enemy2.png';
      this.enemy3Image.src = 'assets/enemy3.png';
      this.enemy4Image.src = 'assets/enemy4.png';

      this.createEnemies();
      if (this.ctx) {
        this.animate(this.ctx);
      }
    } catch (err) {
      console.log(err);
    }
  }

  animate(ctx: CanvasRenderingContext2D) {
    try {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (const enemy of this.enemiesArr) {
        enemy.update(this.gameFrame);
        enemy.draw(ctx);
      }
      this.gameFrame++;
      requestAnimationFrame(() => this.animate(ctx));
    } catch (err) {
      console.log(err);
    }
  }

  createEnemies() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      this.enemiesArr.push(
        new Enemy(
          this.enemy4Image,
          { width: this.CANVAS_WIDTH, height: this.CANVAS_HEIGHT }
          // speed: 5,
        )
      );
    }
  }
}

class Enemy {
  // speed = Math.random() * 4 - 2;
  spriteWidth = 213; // enemy1: 293 // enemy2: 266 // enemy3: 218
  spriteHeight = 213; // enemy1: 155 // enemy2: 188 // enemy3: 177
  speed = Math.random() * 4 + 1; // enemy2
  width = this.spriteWidth / 2.5;
  height = this.spriteHeight / 2.5;
  x = Math.random() * (this.canvas.width - this.width);
  y = Math.random() * (this.canvas.height - this.height);
  nextX = Math.random() * this.canvas.width;
  nextY = Math.random() * this.canvas.height;
  frame = 0;
  flapSpeed = Math.floor(Math.random() * 3 + 1);
  interval = Math.floor(Math.random() * 200 + 50);
  constructor(
    private img: HTMLImageElement,
    private canvas: { width: number; height: number }
  ) {}

  /*
  Update and draw enemy // for enemy1
  @param gameFrame
  */
  // update(gameFrame: number) {
  //   this.x += Math.random() * 4 - 2;
  //   this.y += Math.random() * 4 - 2;
  //   if (gameFrame % this.flapSpeed == 0) {
  //     this.frame > 4 ? (this.frame = 0) : this.frame++;
  //   }
  // }

  /*
  Update and draw enemy // for enemy2
  @param gameFrame
  */
  // update(gameFrame: number) {
  //   this.x -= this.speed;
  //   this.y += this.curve * Math.sin(this.angle);
  //   this.angle += this.angleSpeed;
  //   if (this.x + this.width < 0) this.x = this.canvas.width;
  //   // animate sprite
  //   if (gameFrame % this.flapSpeed == 0) {
  //     this.frame > 4 ? (this.frame = 0) : this.frame++;
  //   }
  // }
  /*
  Update and draw enemy // for enemy3
  @param gameFrame
  */
  // update(gameFrame: number) {
  //   this.x =
  //     (this.canvas.width / 2) * Math.sin((this.angle * Math.PI) / 45) +
  //     this.canvas.width / 2 -
  //     this.width / 2;
  //   this.y =
  //     (this.canvas.height / 2) * Math.cos((this.angle * Math.PI) / 180) +
  //     this.canvas.height / 2 -
  //     this.height / 2;
  //   this.angle += this.angleSpeed;
  //   if (this.x + this.width < 0) this.x = this.canvas.width;
  //   // animate sprite
  //   if (gameFrame % this.flapSpeed == 0) {
  //     this.frame > 4 ? (this.frame = 0) : this.frame++;
  //   }
  // }
  /*
  Update and draw enemy // for enemy4
  @param gameFrame
  */
  update(gameFrame: number) {
    if (gameFrame % this.interval == 0) {
      this.nextX = Math.random() * this.canvas.width;
      this.nextY = Math.random() * this.canvas.height;
    }

    let dx = this.x - this.nextX;
    let dy = this.y - this.nextY;
    this.x -= dx / 70;
    this.y -= dy / 70;

    if (this.x + this.width < 0) this.x = this.canvas.width;
    // animate sprite
    if (gameFrame % this.flapSpeed == 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
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
