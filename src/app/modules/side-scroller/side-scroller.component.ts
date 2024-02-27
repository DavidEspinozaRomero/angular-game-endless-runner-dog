import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-side-scroller',
  standalone: true,
  imports: [NgClass],
  templateUrl: './side-scroller.component.html',
  styleUrl: './side-scroller.component.scss',
})
export class SideScrollerComponent implements OnInit {
  @ViewChild('backgroundForest1', { static: true })
  backgroundForest1!: ElementRef<HTMLImageElement>;
  @ViewChild('player1', { static: true })
  player1!: ElementRef<HTMLImageElement>;
  @ViewChild('enemyWorm1', { static: true })
  enemyWorm1!: ElementRef<HTMLImageElement>;
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  backgroundForestImg!: HTMLImageElement;
  playerImg!: HTMLImageElement;
  enemyWormImg!: HTMLImageElement;
  inputhandler = new InputHandler();
  background!: Background;
  player!: Player;
  enemies: Enemy[] = [];

  lastTime = 1;
  enemyTimer = 0;
  enemyInterval = minMax(1000, 2000);
  score = signal(0);

  gameOver = signal(false);

  ngOnInit(): void {
    try {
      this.canvas = this.canvas1.nativeElement;
      this.canvas.width = 800;
      this.canvas.height = 720;
      this.ctx = this.canvas.getContext('2d');
      this.backgroundForestImg = this.backgroundForest1.nativeElement;
      this.playerImg = this.player1.nativeElement;
      this.enemyWormImg = this.enemyWorm1.nativeElement;
      this.background = new Background(
        this.canvas.width,
        this.canvas.height,
        this.backgroundForestImg
      );
      this.player = new Player(
        this.canvas.width,
        this.canvas.height,
        this.playerImg
      );

      if (this.ctx) {
        this.animate(this.ctx);
      }
    } catch (err) {
      handleError(err);
    }
  }
  startGame() {
    try {
      this.gameOver.set(false);
      this.score.set(0);
      this.enemies = [];
      this.player = new Player(
        this.canvas.width,
        this.canvas.height,
        this.playerImg
      );
      this.background = new Background(
        this.canvas.width,
        this.canvas.height,
        this.backgroundForestImg
      );
      if (this.ctx) {
        this.animate(this.ctx);
      }
    } catch (error) {
      handleError(error);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    timestamp: number = performance.now()
  ) {
    try {
      const deltaTime = timestamp - this.lastTime;
      this.lastTime = timestamp;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.background.update();
      this.player.update(
        this.inputhandler,
        deltaTime,
        this.enemies,
        this.gameOver
      );
      this.background.draw(ctx);
      this.player.draw(ctx);
      this.handleEnemies(ctx, deltaTime);
      if (!this.gameOver()) {
        requestAnimationFrame(() => this.animate(ctx));
        return;
      }
    } catch (err) {
      handleError(err);
    }
  }

  handleEnemies(ctx: CanvasRenderingContext2D, deltaTime: number) {
    try {
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else {
        this.enemyTimer += deltaTime;
      }

      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime, this.score);
        enemy.draw(ctx);
      });
    } catch (error) {
      handleError(error);
    }
  }

  addEnemy() {
    const enemy = new Enemy(
      this.canvas.width,
      this.canvas.height,
      this.enemyWormImg
    );
    this.enemies.push(enemy);
    this.enemies.sort((a, b) => a.y - b.y); // sort enemies by y position
  }
  displayStatusText() {}
}

class InputHandler {
  keys: any[] = [];
  touchY: number = 0;
  touchTreshold = 50;
  constructor() {
    document.addEventListener('keydown', (e) => {
      this.addKey(e);
    });
    document.addEventListener('keyup', (e) => {
      this.removeKey(e);
    });
    document.addEventListener('touchstart', (e) => {
      // console.log(e);
      this.touchY = e.changedTouches[0].pageY;
    });
    document.addEventListener('touchmove', (e) => {
      // console.log(e);
      const swipeDistance = e.changedTouches[0].pageY - this.touchY;
      // && this.keys.includes('ArrowDown')
      if (
        swipeDistance < -this.touchTreshold &&
        !this.keys.includes('Swipe up')
      ) {
        this.keys.push('Swipe up');
      }
      if (
        swipeDistance > -this.touchTreshold &&
        !this.keys.includes('Swipe down')
      ) {
        this.keys.push('Swipe down');
      }
      console.log(this.keys);
    });
    document.addEventListener('touchend', (e) => {
      // console.log(e);
      if (this.keys.includes('Swipe up'))
        this.keys.splice(this.keys.indexOf('Swipe up'), 1);

      if (this.keys.includes('Swipe down'))
        this.keys.splice(this.keys.indexOf('Swipe down'), 1);
    });
  }
  addKey(e: KeyboardEvent) {
    if (this.keys.includes(e.key)) return;
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      this.keys.push(e.key);
    }
    console.log(e.key, this.keys);
  }
  removeKey(e: KeyboardEvent) {
    if (!this.keys.includes(e.key)) return;
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
    console.log(e.key, this.keys);
  }
}

class Player {
  width = 200;
  height = 200;
  x = 100;
  y = this.gameHeight - this.height;
  frameX = 0;
  frameY = 0;
  speed = 0;
  vy = 0;
  maxFrameX = 7;
  weight = 1;

  fps = 20;
  frameTimer = 0;
  frameInterval = 1000 / this.fps;
  constructor(
    private readonly gameWidth: number,
    private readonly gameHeight: number,
    private readonly img: HTMLImageElement // private readonly maxFrame: number
  ) {}

  update(
    inputHandler: InputHandler,
    deltaTime: number,
    enemies: Enemy[],
    gameOver: WritableSignal<boolean>
  ) {
    const playerPosition: CirculoProps = {
      x: this.x + this.width * 0.5,
      y: this.y + this.width * 0.5 + 20,
      radius: this.width / 3,
    };
    for (let index = 0; index < enemies.length; index++) {
      const enemy = enemies[index];
      const enemyPosition: CirculoProps = {
        x: enemy.x + enemy.width * 0.5 - 20,
        y: enemy.y + enemy.height * 0.5,
        radius: enemy.width * 0.4,
      };

      if (isCollidingCircles(playerPosition, enemyPosition))
        return gameOver.set(true);
    }

    if (
      !inputHandler.keys.includes('ArrowRight') ||
      !inputHandler.keys.includes('ArrowLeft')
    )
      this.speed = 0;
    if (inputHandler.keys.includes('ArrowRight')) this.speed = 5;
    if (inputHandler.keys.includes('ArrowLeft')) this.speed = -5;
    if (inputHandler.keys.includes('ArrowUp') && this.onGround()) this.vy = -32;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX > this.maxFrameX ? (this.frameX = 0) : this.frameX++;
    } else {
      this.frameTimer += deltaTime;
    }
    // horizontal movement
    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
      this.frameY = 1;
      this.maxFrameX = 5;
    } else {
      this.vy = 0;
      this.frameY = 0;
      this.maxFrameX = 7;
    }
    if (this.y < 0) this.y = 0;
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }
  draw(ctx: CanvasRenderingContext2D) {
    try {
      ctx.strokeStyle = 'white';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.width / 2 + 20,
        this.width / 3,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.drawImage(
        this.img,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        200,
        200
      );
    } catch (err) {
      handleError(err);
    }
  }
  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
class Background {
  width = 2400;
  height = 720;
  x = 0;
  y = 0;
  speed = 10;

  constructor(
    private readonly gameWidth: number,
    private readonly gameHeight: number,
    private readonly img: HTMLImageElement
  ) {}

  update() {
    try {
      if (this.x <= -this.width) this.x = 0;
      this.x -= this.speed;
    } catch (error) {
      handleError(error);
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.img,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    } catch (err) {
      handleError(err);
    }
  }
}
class Enemy {
  width = 229;
  height = 171;
  tempAsRatio = 140;
  x = this.gameWidth;
  // y = minMax(0, this.gameHeight - this.height);
  y = this.gameHeight - this.tempAsRatio;
  frame = 0;
  maxFrame = 4;
  speed = minMax(1, 5);
  markedForDeletion = false;
  fps = 20;
  frameTimer = 0;
  frameInterval = 1000 / this.fps;

  constructor(
    private readonly gameWidth: number,
    private readonly gameHeight: number,
    private readonly img: HTMLImageElement
  ) {}

  update(deltaTime: number, score: WritableSignal<number>) {
    try {
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        this.frame > this.maxFrame ? (this.frame = 0) : this.frame++;
      } else {
        this.frameTimer += deltaTime;
      }
      this.x -= this.speed;
      if (this.x <= -this.width) {
        this.markedForDeletion = true;
        score.set(score() + 1);
      }
    } catch (error) {
      handleError(error);
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    try {
      ctx.strokeStyle = 'white';
      ctx.strokeRect(this.x, this.y, this.tempAsRatio, this.tempAsRatio);
      ctx.beginPath();
      ctx.arc(
        this.x + this.tempAsRatio * 0.5 - 20,
        this.y + this.tempAsRatio * 0.5,
        this.tempAsRatio * 0.4,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.drawImage(
        this.img,
        this.frame * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.tempAsRatio,
        this.tempAsRatio
      );
    } catch (err) {
      handleError(err);
    }
  }
}

// class Game {
//   constructor(
//     private readonly ctx: CanvasRenderingContext2D,
//     private readonly width: number,
//     private readonly height: number
//   ) {}

//   update() {}
//   draw() {}
// }

function handleError(err: any) {
  console.log(err);
}

function minMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isCollidingCircles(circle1: CirculoProps, circle2: CirculoProps) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.hypot(dx, dy);
  return distance < circle1.radius + circle2.radius;
}

interface CirculoProps {
  x: number;
  y: number;
  radius: number;
}
