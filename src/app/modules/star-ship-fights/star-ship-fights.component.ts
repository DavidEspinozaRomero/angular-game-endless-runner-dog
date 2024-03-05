import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InputHandler } from './models/input-handler.model';

@Component({
  selector: 'app-star-ship-fights',
  standalone: true,
  imports: [],
  templateUrl: './star-ship-fights.component.html',
  styleUrl: './star-ship-fights.component.scss',
})
export class StarShipFightsComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  game!: Game;

  ngOnInit(): void {
    this.canvas = this.canvas1.nativeElement;
    this.canvas.width = 500; // window.innerWidth;
    this.canvas.height = 500; // window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.game = new Game(this.canvas.width, this.canvas.height);
    if (this.ctx) {
      this.animate(this.ctx);
    }
  }

  animate(
    ctx: CanvasRenderingContext2D,
    timestamp: number = performance.now()
  ) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game.update();
    this.game.draw(ctx);
    requestAnimationFrame(() => this.animate(ctx, timestamp));
  }
}

class Bot {
  maxHealth: number = 100;
  health: number = this.maxHealth;
  damage: number = 10;
  // img: HTMLImageElement;
  width: number = 50;
  height: number = 50;
  speed: number = 0;
  x: number = this.game.width - this.width;
  y: number = this.game.height - this.height;

  constructor(private game: Game) {}

  update(input: string[], deltaTime: number) {}
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  shoot() {}
}

class Player {
  // maxHealth: number = 100;
  // health: number = this.maxHealth;
  // damage: number = 10;
  // img: HTMLImageElement;
  width: number = 30;
  height: number = 50;
  speed: number = 0;
  angle: number = 90;
  // friction: number = 0.95;
  x: number = this.game.width * 0.5 - this.width;
  y: number = this.game.height * 0.5 - this.height;

  directionX = Math.cos((this.angle * Math.PI) / 180);
  directionY = Math.sin((this.angle * Math.PI) / 180) * -1;

  constructor(private game: Game) {}

  update(input: string[]) {
    if (input.includes(' ')) {
      this.shoot();
    }
    if (input.includes('ArrowDown')) {
      this.speed = 0;
    }
    if (input.includes('ArrowUp')) {
      this.speed = 3;
    }

    if (input.includes('ArrowLeft')) {
      this.angle += 30;
    }
    if (input.includes('ArrowRight')) {
      this.angle -= 30;
    }

    // movement horizontal
    this.directionX = Math.cos((this.angle * Math.PI) / 180);
    this.x += this.directionX * this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    // movement vertical
    this.directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
    this.y += this.directionY * this.speed;
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }

    // this.speed *= this.friction;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = `red`;
    ctx.fillRect(this.x + this.width - 30, this.y, 30, 10);
    ctx.restore();
  }

  shoot() {
    this.game.shoots.push(
      new Shoot(this.game, this.x + this.width * 0.5, this.y, this.angle)
    );
  }
}

class Shoot {
  markedForDeletion = false;
  directionX = Math.cos((this.angle * Math.PI) / 180);
  directionY = Math.sin((this.angle * Math.PI) / 180) * -1;
  speed = 3;

  constructor(
    private game: Game,
    private x: number,
    private y: number,
    private angle: number
  ) {}

  update() {
    // move shoot by angle
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
    if (this.x < 0) this.markedForDeletion = true;
    if (this.x > this.game.width) this.markedForDeletion = true;
    if (this.y < 0) this.markedForDeletion = true;
    if (this.y > this.game.height) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

class Game {
  inputHandler = new InputHandler();
  player = new Player(this);
  // bot = new Bot(this);
  shoots: Shoot[] = [];
  constructor(public readonly width: number, public readonly height: number) {}

  update() {
    // console.log(this.shoots);

    this.player.update(this.inputHandler.keys);
    this.shoots.forEach((shoot) => {
      shoot.update();
    });
    this.shoots = this.shoots.filter((shoot) => !shoot.markedForDeletion);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.player.draw(ctx);
    this.shoots.forEach((shoot) => {
      shoot.draw(ctx);
    });
  }
}
