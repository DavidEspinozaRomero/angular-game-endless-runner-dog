import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-endless-runner',
  standalone: true,
  imports: [],
  templateUrl: './endless-runner.component.html',
  styleUrl: './endless-runner.component.scss',
})
export class EndlessRunnerComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvasEl!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  assets = [
    {
      name: 'player',
      src: 'assets/shadow_dog.png',
      alt: 'player',
    },
    {
      name: 'enemy_bat_1',
      src: 'assets/enemy_bat_1.png',
      alt: 'enemy_bat_1',
    },
  ];
  ngOnInit(): void {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    if (this.ctx) {
      this.animate();
    }
  }

  animate() {
    try {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

      requestAnimationFrame(() => this.animate());
    } catch (err) {}
  }
}
