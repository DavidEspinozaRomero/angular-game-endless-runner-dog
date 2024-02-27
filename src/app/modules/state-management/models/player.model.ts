import {
  StatesPlayer,
  StandingLeft,
  StandingRight,
  SittingLeft,
  SittingRight,
  RunningLeft,
  RunningRight,
  JumpingLeft,
  JumpingRight,
  FallingLeft,
  FallingRight,
} from './states.model';

export interface PlayerProps {
  gameWidth: number;
  gameHeight: number;
  img: HTMLImageElement;
  draw(ctx: CanvasRenderingContext2D): void;
  update(input: string, deltaTime: number): void;
}

export class Player implements PlayerProps {
  states = [
    new StandingLeft(this),
    new StandingRight(this),
    new SittingLeft(this),
    new SittingRight(this),
    new RunningLeft(this),
    new RunningRight(this),
    new JumpingLeft(this),
    new JumpingRight(this),
    new FallingLeft(this),
    new FallingRight(this),
  ];
  currentState = this.states[1];
  spriteWidth = 200;
  spriteHeight = 181.83;
  width = this.spriteWidth * 0.5;
  height = this.spriteHeight * 0.5;
  x = 100;
  y = this.gameHeight - this.height;
  frameX = 0;
  maxFrame = 5;
  frameY = 0;
  speed = 0;
  maxSpeed = 5;
  vy = 0;
  weight = 1;
  fps = 20;
  frameTimer = 0;
  frameInterval = 1000 / this.fps;
  constructor(
    public readonly gameWidth: number,
    public readonly gameHeight: number,
    public readonly img: HTMLImageElement
  ) {}
  update(input: string, deltaTime: number) {
    this.currentState.handleInput(input);
    this.move();

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  move() {
    // horizontal movement
    this.x += this.speed;
    if (this.x <= 0) this.x = 0;
    if (this.x >= this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
    if (this.y <= 0) this.y = 0;
    if (this.y >= this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.spriteWidth * this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  setState(state: StatesPlayer) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
