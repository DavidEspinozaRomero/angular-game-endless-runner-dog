import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sprite-animacion-tecnique',
  standalone: true,
  imports: [],
  templateUrl: './sprite-animacion-tecnique.component.html',
  styleUrl: './sprite-animacion-tecnique.component.scss',
})
export class SpriteAnimacionTecniqueComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  playerState = 'idle';
  CANVAS_WIDTH: number = 600;
  CANVAS_HEIGHT: number = 600;
  playerImage = new Image();

  spriteWidth = 575;
  spriteHeight = 523;

  gameFrame = 0;
  staggerFrame = 5;
  animationStates: AnimationStatesProps[] = [
    {
      name: 'idle',
      frames: 7,
    },
    {
      name: 'jump',
      frames: 7,
    },
    {
      name: 'fall',
      frames: 7,
    },
    {
      name: 'run',
      frames: 9,
    },
    {
      name: 'dizzy',
      frames: 11,
    },
    {
      name: 'sit',
      frames: 5,
    },
    {
      name: 'roll',
      frames: 7,
    },
    {
      name: 'bite',
      frames: 7,
    },
    {
      name: 'ko',
      frames: 12,
    },
    {
      name: 'getHit',
      frames: 4,
    },
  ];
  spriteAnimations: any = [];

  constructor() {}
  ngOnInit(): void {
    this.canvas = this.canvas1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.playerImage.src = 'assets/shadow_dog.png';
    this.CANVAS_WIDTH = this.canvas.width = 600;
    this.CANVAS_HEIGHT = this.canvas.height = 600;
    this.animationStates.forEach((state, index) => {
      let frames: FramesProps = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.spriteWidth;
        let positionY = index * this.spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
    if (this.ctx) {
      this.animate(this.ctx);
    }
  }
  animate(ctx: CanvasRenderingContext2D) {
    try {
      ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      let position =
        Math.floor(this.gameFrame / this.staggerFrame) %
        this.spriteAnimations[this.playerState].loc.length;
      let frameX = position * this.spriteWidth;
      let frameY = this.spriteAnimations[this.playerState].loc[position].y;
      ctx.drawImage(
        this.playerImage,
        frameX,
        frameY,
        this.spriteWidth,
        this.spriteHeight,
        0,
        0,
        this.spriteWidth,
        this.spriteHeight
      );

      this.gameFrame++;
      requestAnimationFrame(() => this.animate(ctx));
    } catch (err) {
      console.log(err);
    }
  }

  selectAnimation(e: any) {
    this.playerState = e.target.value ?? 'idle';
  }
}

interface AnimationStatesProps {
  name: string;
  frames: number;
}

interface SpriteAnimationsProps {
  string: FramesProps;
}

interface FramesProps {
  loc: LocProps[];
}
interface LocProps {
  x: number;
  y: number;
}
