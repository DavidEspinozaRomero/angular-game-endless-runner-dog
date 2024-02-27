import { Game, Keys } from './';
import { Dust, Fire, Splash } from './particles.model';

export const enum PlayerStates {
  SITTING = 0,
  RUNNING = 1,
  JUMPING = 2,
  FALLING = 3,
  STANDING = 4,
  ROLLING = 5,
  DIVING = 6,
  HIT = 7,
}

export const enum PlayerState {
  SITTING = 'SITTING',
  RUNNING = 'RUNNING',
  JUMPING = 'JUMPING',
  FALLING = 'FALLING',
  STANDING = 'STANDING',
  ROLLING = 'ROLLING',
  DIVING = 'DIVING',
  HIT = 'HIT',
}

// type PlayerStateType = 'SITTING' | 'RUNNING' | 'JUMPING' | 'FALLING' | 'STANDING';

class State {
  constructor(public name: string) {}
}

export class Sitting {
  state: State = new State(PlayerState.SITTING);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 3;
  }

  handleInput(input: string[]) {
    if (input.includes(Keys.RIGHT) || input.includes(Keys.LEFT))
      this.game.player.setState(PlayerStates.RUNNING, 1);
    else if (input.includes(Keys.UP))
      this.game.player.setState(PlayerStates.STANDING, 0);
    else if (input.includes(Keys.SPACE))
      this.game.player.setState(PlayerStates.ROLLING, 2);
  }
}

export class Running {
  state: State = new State(PlayerState.RUNNING);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 7;
  }
  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes(Keys.DOWN))
      this.game.player.setState(PlayerStates.SITTING, 0);
    else if (input.includes(Keys.UP))
      this.game.player.setState(PlayerStates.JUMPING, 1);
    else if (input.includes(Keys.SPACE))
      this.game.player.setState(PlayerStates.ROLLING, 2);
  }
}

export class Jumping {
  state: State = new State(PlayerState.JUMPING);
  constructor(private readonly game: Game) {}
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
    this.game.player.maxFrame = 5;
  }
  handleInput(input: string[]) {
    if (this.game.player.vy > 0)
      this.game.player.setState(PlayerStates.FALLING, 1);
    else if (input.includes(Keys.SPACE))
      this.game.player.setState(PlayerStates.ROLLING, 2);
    else if (input.includes(Keys.DOWN))
      this.game.player.setState(PlayerStates.DIVING, 0);
    // if (this.game.player.onGround())
    //   this.game.player.setState(PlayerStates.STANDING);
  }
}

export class Falling {
  state: State = new State(PlayerState.FALLING);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 5;
  }
  handleInput(input: string[]) {
    if (this.game.player.onGround())
      this.game.player.setState(PlayerStates.RUNNING, 1);
    else if (input.includes(Keys.SPACE))
      this.game.player.setState(PlayerStates.ROLLING, 2);
    else if (input.includes(Keys.DOWN))
      this.game.player.setState(PlayerStates.DIVING, 0);
  }
}

export class Standing {
  state: State = new State(PlayerState.STANDING);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 0;
    this.game.player.maxFrame = 5;
  }

  handleInput(input: string[]) {
    if (input.includes(Keys.RIGHT) || input.includes(Keys.LEFT))
      this.game.player.setState(PlayerStates.RUNNING, 1);
    else if (input.includes(Keys.UP))
      this.game.player.setState(PlayerStates.JUMPING, 1);
    else if (input.includes(Keys.DOWN))
      this.game.player.setState(PlayerStates.SITTING, 0);
    else if (input.includes(Keys.SPACE))
      this.game.player.setState(PlayerStates.ROLLING, 2);
  }
}

export class Rolling {
  state: State = new State(PlayerState.ROLLING);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 5;
  }

  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Fire(this.game, this.game.player.x, this.game.player.y)
    );

    if (!input.includes(Keys.SPACE) && this.game.player.onGround())
      this.game.player.setState(PlayerStates.RUNNING, 1);
    else if (!input.includes(Keys.SPACE) && !this.game.player.onGround())
      this.game.player.setState(PlayerStates.FALLING, 1);
    else if (
      input.includes(Keys.SPACE) &&
      input.includes(Keys.UP) &&
      this.game.player.onGround()
    )
      this.game.player.vy -= 10;
  }
}

export class Diving {
  state: State = new State(PlayerState.DIVING);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 5;
    this.game.player.vy = 15;
  }

  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Fire(this.game, this.game.player.x, this.game.player.y)
    );

    if (this.game.player.onGround()) {
      this.game.player.setState(PlayerStates.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(this.game, this.game.player.x, this.game.player.y)
        );
      }
    } else if (input.includes(Keys.SPACE) && this.game.player.onGround())
      this.game.player.setState(PlayerStates.ROLLING, 2);
  }
}
export class Hit {
  state: State = new State(PlayerState.HIT);
  constructor(private readonly game: Game) {}

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 10;
  }

  handleInput(input: string[]) {
    if (this.game.player.maxFrame >= 10 && this.game.player.onGround()) {
      this.game.player.setState(PlayerStates.RUNNING, 1);
    } else if (this.game.player.maxFrame >= 10 && !this.game.player.onGround())
      this.game.player.setState(PlayerStates.FALLING, 1);
  }
}
