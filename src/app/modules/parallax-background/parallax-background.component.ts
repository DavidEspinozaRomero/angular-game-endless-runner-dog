import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parallax-background',
  standalone: true,
  imports: [],
  templateUrl: './parallax-background.component.html',
  styleUrl: './parallax-background.component.scss',
})
export class ParallaxBackgroundComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  CANVAS_WIDTH: number = 800;
  CANVAS_HEIGHT: number = 700;
  gameSpeed = 5;

  ngOnInit(): void {
    try {
      this.canvas = this.canvas1.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.CANVAS_WIDTH = this.canvas.width = 800;
      this.CANVAS_HEIGHT = this.canvas.height = 700;
    } catch (err) {
      console.log(err);
    }
  }
}
