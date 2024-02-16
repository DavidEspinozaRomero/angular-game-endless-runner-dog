import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-enemies-variety',
  standalone: true,
  imports: [],
  templateUrl: './enemies-variety.component.html',
  styleUrl: './enemies-variety.component.scss',
})
export class EnemiesVarietyComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  game!: Game;
  lastTime = 1;

  ghost = new Image();
  spider = new Image();
  worm = new Image();

  enemiesAssets = {
    ghost: this.ghost,
    spider: this.spider,
    worm: this.worm,
  };

  ngOnInit(): void {
    this.worm.src = 'assets/enemy_worm.png';
    this.ghost.src = 'assets/enemy_ghost.png';
    this.spider.src = 'assets/enemy_spider.png';

    this.canvas = this.canvas1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 500;
    this.canvas.height = 800;
    if (this.ctx) {
      const gameConfig: GameProps = {
        ctx: this.ctx,
        width: this.canvas.width,
        height: this.canvas.height,
        assets: {
          enemies: this.enemiesAssets,
        },
      };
      this.game = new Game(gameConfig);
      this.animate(this.ctx);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    timestamp: number = performance.now()
  ) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const deltaTime = timestamp - this.lastTime;

    this.lastTime = timestamp;
    this.game.update(deltaTime);
    this.game.draw();
    requestAnimationFrame(() => this.animate(ctx));
  }
}

interface GameProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  assets: Assets;
}

interface Assets {
  enemies: {
    ghost: HTMLImageElement;
    spider: HTMLImageElement;
    worm: HTMLImageElement;
  };
}
class Game {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  enemies: Enemy[] = [];
  enemyInterval = 100;
  enemyTimer = 0;
  assets: Assets;

  constructor(gameProps: GameProps) {
    const { ctx, width, height, assets } = gameProps;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.assets = assets;
  }

  update(deltaTime: number) {
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval) {
      this.enemyTimer = 0;
      this.#addNewEnemy();
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime));
  }
  draw() {
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
  }

  #addNewEnemy() {
    // random enemy
    const enemyType = Math.floor(Math.random() * 3);
    if (enemyType === 0) this.enemies.push(new Worm(this));
    if (enemyType === 1) this.enemies.push(new Spider(this));
    if (enemyType === 2) this.enemies.push(new Ghost(this));
    this.enemies.sort((a, b) => a.y - b.y);
  }
}

// interface EnemyProps {
//   game: Game;
//   baseParams: {
//     spriteWidth: number;
//     spriteHeight: number;
//     x: number;
//     y: number;
//   }
// }
class Enemy {
  x = this.game.width;
  y = Math.random() * this.game.height;
  width = 100;
  height = 100;
  markedForDeletion = false;
  vx = Math.random() * 0.1 + 0.2;
  constructor(public readonly game: Game) {
    // console.log(game);
  }

  update(deltaTime: number) {
    this.x -= this.vx * deltaTime;

    //remove from enemies
    if (this.x < 0 - this.width) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Worm extends Enemy {
  spriteWidth = 229;
  spriteHeight = 171;
  override width = this.spriteWidth * 0.5;
  override height = this.spriteHeight * 0.5;
  override x = this.game.width;
  override y = this.game.height - this.height;
  frame = 0;
  maxFrame = 4;
  // speed = Math.random() * 0.1 + 0.1;

  constructor(game: Game) {
    super(game);
  }

  override update(deltaTime: number) {
    super.update(deltaTime);
    // this.y += Math.random() * 5;
    // this.width = this.spriteWidth * 0.5;
    // this.height = this.spriteHeight * 0.5;
    if (this.frame > this.maxFrame) this.frame = 0;
    else this.frame++;
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.game.assets.enemies.worm,
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

class Ghost extends Enemy {
  override x = this.game.width;
  override y = Math.random() * this.game.height * 0.6;
  spriteWidth = 259;
  spriteHeight = 209;
  override width = this.spriteWidth * 0.5;
  override height = this.spriteHeight * 0.5;
  frame = 0;
  maxFrame = 4;
  // speed = Math.random() * 0.1 + 0.1;

  constructor(game: Game) {
    super(game);
  }

  override update(deltaTime: number) {
    super.update(deltaTime);
    // this.y += Math.random() * 5;
    // this.width = this.spriteWidth * 0.5;
    // this.height = this.spriteHeight * 0.5;
    if (this.frame > this.maxFrame) this.frame = 0;
    else this.frame++;
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.drawImage(
      this.game.assets.enemies.ghost,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
class Spider extends Enemy {
  spriteWidth = 310;
  spriteHeight = 175;
  override width = this.spriteWidth * 0.5;
  override height = this.spriteHeight * 0.5;
  override x = Math.random() * this.game.width;
  override y = -this.height;
  frame = 0;
  maxFrame = 4;
  override vx = 0;
  vy = Math.random() * 0.1 + 0.1;
  maxLength = Math.random() * this.game.height - this.height * 0.5;

  constructor(game: Game) {
    super(game);
  }

  override update(deltaTime: number) {
    super.update(deltaTime);
    if (this.y > this.maxLength) {
      this.vy = -this.vy;
    }
    this.y += this.vy * deltaTime;

    //remove from enemies
    if (this.y < 0 - this.height) this.markedForDeletion = true;

    if (this.frame > this.maxFrame) this.frame = 0;
    else this.frame++;
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x + this.width * 0.5, 0);
    ctx.lineTo(this.x + this.width * 0.5, this.y + 10);
    ctx.stroke();
    ctx.drawImage(
      this.game.assets.enemies.spider,
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
