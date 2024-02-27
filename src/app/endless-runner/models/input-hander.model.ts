import { Game } from './game.model';

export class InputHandler {
  keys: string[] = [];
  constructor(private game: Game) {
    document.addEventListener('keydown', (e) => {
      this.addKey(e);
    });
    document.addEventListener('keyup', (e) => {
      this.removeKey(e);
    });
  }
  addKey(e: KeyboardEvent) {
    if (e.key === 'd') this.game.debug = !this.game.debug;
    if (this.keys.includes(e.key)) return;
    this.keys.push(e.key);
  }
  removeKey(e: KeyboardEvent) {
    if (!this.keys.includes(e.key)) return;
    const index = this.keys.indexOf(e.key);
    this.keys.splice(index, 1);
  }
}

export const enum Keys {
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  SPACE = ' ',
}
