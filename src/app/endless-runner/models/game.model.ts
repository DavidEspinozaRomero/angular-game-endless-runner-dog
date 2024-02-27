import { WritableSignal } from '@angular/core';
import { Player, Asset } from './';
import { Background } from './background.model';
import {
  ClimbingEnemy,
  FlyingEnemy,
  GroundEnemy,
  IEnemy,
} from './enemies.model';
import { InputHandler } from './input-hander.model';
import { UI } from './UI.model';
import { Dust, Fire, Splash } from './particles.model';
import { CollisionAnimation } from './collision-animation.model';
import { FloatingMessage } from './floating-message.model';

export class Game {
  groundMargin = 80;
  speed = 0;
  maxSpeed = 5;
  inputHandler = new InputHandler(this);
  player = new Player(this, this.assets[Asset.PLAYER]);
  background = new Background(this);
  ui = new UI(this);
  enemyTimer = 0;
  enemyInterval = Math.random() * 2000 + 1000;
  enemies: IEnemy[] = [];
  particles: (Dust | Fire | Splash)[] = [];
  collitions: CollisionAnimation[] = [];
  floatingMessages: FloatingMessage[] = [];
  maxParticles = 100;
  debug = false;
  time = 0;
  maxTime = 300;
  lives = 5;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly assets: { [key: string]: HTMLImageElement },
    public readonly score: WritableSignal<number>,
    public readonly gameOver: WritableSignal<boolean>
  ) {
    this.timer();
  }

  update(deltaTime: number) {
    // this.time += deltaTime;
    if (this.time > this.maxTime) this.gameOver.set(true);

    this.background.update();
    this.player.update(this.inputHandler.keys, deltaTime);

    if (this.enemyTimer > this.enemyInterval) {
      this.enemyTimer = 0;
      this.addEnemy();
    } else {
      this.enemyTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
    if (this.particles.length > this.maxParticles)
      this.particles.length = this.maxParticles;

    this.particles.forEach((particle) => {
      particle.update(deltaTime);
    });
    this.collitions.forEach((collision) => {
      collision.update(deltaTime);
    });
    this.floatingMessages.forEach((message) => {
      message.update();
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
    this.collitions = this.collitions.filter(
      (collition) => !collition.markedForDeletion
    );
    this.floatingMessages = this.floatingMessages.filter(
      (message) => !message.markedForDeletion
    );
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.background.draw(ctx);
    this.particles.forEach((particle) => {
      particle.draw(ctx);
    });
    this.floatingMessages.forEach((message) => {
      message.draw(ctx);
    });
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.player.draw(ctx);
    this.collitions.forEach((collision) => {
      collision.draw(ctx);
    });
    this.ui.draw(ctx);
  }

  addEnemy() {
    const random = Math.random();
    if (this.speed <= 0) return;
    if (random > 0.66) {
      const enemy = new FlyingEnemy(this) as IEnemy;
      this.enemies.push(enemy);
    } else if (random > 0.33) {
      const enemy = new GroundEnemy(this) as IEnemy;
      this.enemies.push(enemy);
    } else {
      const enemy = new ClimbingEnemy(this) as IEnemy;
      this.enemies.push(enemy);
    }

    this.enemies.sort((a, b) => a.y - b.y); // sort enemies by y position
  }

  timer() {
    const timeout = this.maxTime * 1000;
    const interval = setInterval(() => {
      this.time++;
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, timeout);
  }
}
