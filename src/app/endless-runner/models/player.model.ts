import {
  Falling,
  Game,
  Jumping,
  Keys,
  Running,
  Sitting,
  Standing,
  Rolling,
  Diving,
  Hit,
  PlayerState,
  PlayerStates,
} from './';
import { CollisionAnimation } from './collision-animation.model';
import { FloatingMessage } from './floating-message.model';

export class Player {
  spriteWidth = 575;
  spriteHeight = 523;
  width = 100;
  height = 100;
  x = 100;
  y = this.game.height - this.height - this.game.groundMargin;
  frameX = 0;
  frameY = 0;
  maxFrame = 5;
  speed = 0;
  vy = 0;
  weigth = 1;
  fps = 20;
  frameTimer = 0;
  frameInterval = 1000 / this.fps;

  states = [
    new Sitting(this.game),
    new Running(this.game),
    new Jumping(this.game),
    new Falling(this.game),
    new Standing(this.game),
    new Rolling(this.game),
    new Diving(this.game),
    new Hit(this.game),
  ];
  currentState = this.states[4];

  constructor(
    private readonly game: Game,
    private readonly img: HTMLImageElement
  ) {}

  update(input: string[], deltaTime: number) {
    this.checkCollision();
    this.currentState.handleInput(input);

    // horizontal movement
    this.x += this.speed;
    if (this.currentState.state.name !== PlayerState.HIT) this.move(input);

    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weigth;
    } else {
      this.vy = 0;
    }

    // vertical boundaries
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;

    // sprite animation
    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      this.frameX > this.maxFrame ? (this.frameX = 0) : this.frameX++;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debug) {
      ctx.strokeStyle = 'white';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.beginPath();
      ctx.arc(
        this.x + this.width * 0.5,
        this.y + this.height * 0.5 + 10,
        this.width * 0.5 - 20,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
    ctx.drawImage(
      this.img,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  setState(stateIndex: number, speed: number) {
    this.currentState = this.states[stateIndex];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  move(input: string[]) {
    if (!input.includes(Keys.RIGHT) || !input.includes(Keys.LEFT))
      this.speed = 0;
    if (input.includes(Keys.RIGHT)) this.speed = 5;
    if (input.includes(Keys.LEFT)) this.speed = -5;
    if (input.includes(Keys.UP) && this.onGround()) this.vy -= 25;
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  checkCollision() {
    try {
      this.game.enemies.forEach((enemy) => {
        if (
          enemy.x < this.x + this.width &&
          enemy.x + enemy.width > this.x &&
          enemy.y < this.y + this.height &&
          enemy.height + enemy.y > this.y
        ) {
          enemy.markedForDeletion = true;
          this.game.collitions.push(
            new CollisionAnimation(this.game, enemy.x, enemy.y)
          );
          if (
            this.currentState.state.name === PlayerState.ROLLING ||
            this.currentState.state.name === PlayerState.DIVING
          ) {
            this.game.score.set(this.game.score() + 1);
            this.game.floatingMessages.push(
              new FloatingMessage('+1', enemy.x, enemy.y, 150, 50)
            );
          } else {
            this.setState(PlayerStates.HIT, 0);
            this.game.lives--;
            if (this.game.lives <= 0) this.game.gameOver.set(true);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
