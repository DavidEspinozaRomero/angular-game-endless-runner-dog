import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { Player } from './models/player.model';
import { InputHandler } from './models/input.model';
import { StatesPlayer } from './models';

@Component({
  selector: 'app-state-management',
  standalone: true,
  imports: [],
  templateUrl: './state-management.component.html',
  styleUrl: './state-management.component.scss',
})
export class StateManagementComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('dogImg', { static: true }) dogImg!: ElementRef<HTMLImageElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  player!: Player;
  inputHandler = new InputHandler();

  lastKey = signal('ArrowRight');
  statusText = signal<string>('STANDING_RIGHT');
  lastTime = 0;

  ngOnInit(): void {
    try {
      this.canvas = this.canvas1.nativeElement;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');

      this.player = new Player(
        this.canvas.width,
        this.canvas.height,
        this.dogImg.nativeElement
      );

      if (this.ctx) {
        this.animate(this.ctx);
      }
    } catch (error) {
      this.handleError(error);
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
      this.player.update(this.inputHandler.lastKey, deltaTime);
      this.setStatusText(this.inputHandler.lastKey);
      this.player.draw(ctx);
      requestAnimationFrame(() => this.animate(ctx));
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err: any) {
    console.error(err);
  }

  setStatusText(text: string) {
    this.lastKey.set(text);
    this.statusText.set(this.player.currentState.state);
  }
}
