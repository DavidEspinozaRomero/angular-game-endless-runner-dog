import { Player } from './player.model';

export const enum StatesPlayer {
  STANDING_LEFT = 0,
  STANDING_RIGHT = 1,
  SITTING_LEFT = 2,
  SITTING_RIGHT = 3,
  RUNNING_LEFT = 4,
  RUNNING_RIGHT = 5,
  JUMPING_LEFT = 6,
  JUMPING_RIGHT = 7,
  FALLING_LEFT = 8,
  FALLING_RIGHT = 9,
}

export class State {
  constructor(public state: string) {}
}

export class StandingLeft extends State {
  constructor(public readonly player: Player) {
    super('STANDING_LEFT');
  }

  enter() {
    this.player.frameY = 1;
    this.player.speed = 0;
  }
  handleInput(input: string) {
    if (input === 'release left')
      this.player.setState(StatesPlayer.STANDING_LEFT);
    else if (input === 'press left')
      this.player.setState(StatesPlayer.RUNNING_LEFT);
    else if (input === 'press down')
      this.player.setState(StatesPlayer.SITTING_LEFT);
    else if (input === 'press right')
      this.player.setState(StatesPlayer.RUNNING_RIGHT);
    else if (input === 'press up')
      this.player.setState(StatesPlayer.JUMPING_LEFT);
  }
}
export class StandingRight extends State {
  constructor(public readonly player: Player) {
    super('STANDING_RIGHT');
  }

  enter() {
    this.player.frameY = 0;
    this.player.speed = 0;
  }
  handleInput(input: string) {
    if (input === 'release right')
      this.player.setState(StatesPlayer.STANDING_RIGHT);
    else if (input === 'press right')
      this.player.setState(StatesPlayer.RUNNING_RIGHT);
    else if (input === 'press down')
      this.player.setState(StatesPlayer.SITTING_RIGHT);
    else if (input === 'press left')
      this.player.setState(StatesPlayer.RUNNING_LEFT);
    else if (input === 'press up')
      this.player.setState(StatesPlayer.JUMPING_RIGHT);
  }
}
export class SittingLeft extends State {
  constructor(public readonly player: Player) {
    super('SITTING_LEFT');
  }

  enter() {
    this.player.frameY = 9;
  }
  handleInput(input: string) {
    if (input === 'press down') this.player.setState(StatesPlayer.SITTING_LEFT);
    else if (input === 'press up')
      this.player.setState(StatesPlayer.STANDING_LEFT);
    else if (input === 'press right')
      this.player.setState(StatesPlayer.SITTING_RIGHT);
  }
}
export class SittingRight extends State {
  constructor(public readonly player: Player) {
    super('SITTING_RIGHT');
  }

  enter() {
    this.player.frameY = 8;
  }
  handleInput(input: string) {
    if (input === 'press down')
      this.player.setState(StatesPlayer.SITTING_RIGHT);
    else if (input === 'press up')
      this.player.setState(StatesPlayer.STANDING_RIGHT);
    else if (input === 'press left')
      this.player.setState(StatesPlayer.SITTING_LEFT);
  }
}

export class RunningLeft extends State {
  constructor(public readonly player: Player) {
    super('RUNNING_LEFT');
  }

  enter() {
    this.player.frameY = 7;
    this.player.speed = -this.player.maxSpeed;
  }
  handleInput(input: string) {
    if (input === 'press left') this.player.setState(StatesPlayer.RUNNING_LEFT);
    else if (input === 'release left')
      this.player.setState(StatesPlayer.STANDING_LEFT);
  }
}

export class RunningRight extends State {
  constructor(public readonly player: Player) {
    super('RUNNING_RIGHT');
  }

  enter() {
    this.player.frameY = 6;
    this.player.speed = this.player.maxSpeed;
  }
  handleInput(input: string) {
    if (input === 'press right')
      this.player.setState(StatesPlayer.RUNNING_RIGHT);
    else if (input === 'release right')
      this.player.setState(StatesPlayer.STANDING_RIGHT);
  }
}

export class JumpingLeft extends State {
  constructor(public readonly player: Player) {
    super('JUMPING_LEFT');
  }

  enter() {
    this.player.frameY = 3;
    if (this.player.onGround()) {
      this.player.vy = -20;
      this.player.speed = -this.player.maxSpeed * 0.5;
    }
  }
  handleInput(input: string) {
    if (input === 'press up') this.player.setState(StatesPlayer.JUMPING_LEFT);
    else if (this.player.vy > 0)
      this.player.setState(StatesPlayer.FALLING_LEFT);
    else if (this.player.onGround())
      this.player.setState(StatesPlayer.STANDING_LEFT);
  }
}

export class JumpingRight extends State {
  constructor(public readonly player: Player) {
    super('JUMPING_RIGHT');
  }

  enter() {
    this.player.frameY = 2;
    if (this.player.onGround()) {
      this.player.vy = -20;
      this.player.speed = this.player.maxSpeed * 0.5;
    }
  }
  handleInput(input: string) {
    if (input === 'press up') this.player.setState(StatesPlayer.JUMPING_RIGHT);
    else if (this.player.vy > 0)
      this.player.setState(StatesPlayer.FALLING_RIGHT);
    else if (this.player.onGround())
      this.player.setState(StatesPlayer.STANDING_RIGHT);
  }
}

export class FallingLeft extends State {
  constructor(public readonly player: Player) {
    super('FALLING_LEFT');
  }

  enter() {
    this.player.frameY = 5;
    if (!this.player.onGround()) {
      this.player.speed = -this.player.maxSpeed * 0.5;
    }
  }
  handleInput(input: string) {
    if (this.player.vy > 0) this.player.setState(StatesPlayer.FALLING_LEFT);
    else if (this.player.onGround())
      this.player.setState(StatesPlayer.STANDING_LEFT);
  }
}

export class FallingRight extends State {
  constructor(public readonly player: Player) {
    super('FALLING_RIGHT');
  }

  enter() {
    this.player.frameY = 4;
    if (!this.player.onGround()) {
      this.player.speed = this.player.maxSpeed * 0.5;
    }
  }
  handleInput(input: string) {
    if (this.player.vy > 0) this.player.setState(StatesPlayer.FALLING_RIGHT);
    else if (this.player.onGround())
      this.player.setState(StatesPlayer.STANDING_RIGHT);
  }
}
