export class InputHandler {
  keys: string[] = [];
  lastKey: string = '';
  constructor() {
    document.addEventListener('keydown', (e) => {
      this.addKey(e);
    });
    document.addEventListener('keyup', (e) => {
      this.removeKey(e);
    });
  }

  addKey(e: KeyboardEvent) {
    // if (this.keys.includes(e.key)) return;
    if (e.key === 'ArrowRight') this.lastKey = 'press right';
    if (e.key === 'ArrowLeft') this.lastKey = 'press left';
    if (e.key === 'ArrowUp') this.lastKey = 'press up';
    if (e.key === 'ArrowDown') this.lastKey = 'press down';

    // this.keys.push(e.key);
  }
  removeKey(e: KeyboardEvent) {
    // if (!this.keys.includes(e.key)) return;
    if (e.key === 'ArrowRight') this.lastKey = 'release right';
    if (e.key === 'ArrowLeft') this.lastKey = 'release left';
    if (e.key === 'ArrowUp') this.lastKey = 'release up';
    if (e.key === 'ArrowDown') this.lastKey = 'release down';
    // const index = this.keys.indexOf(e.key);
    // this.keys.splice(index, 1);
  }
}
