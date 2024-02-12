import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpriteAnimacionTecniqueComponent } from './modules/sprite-animacion-tecnique/sprite-animacion-tecnique.component';
import { ParallaxBackgroundComponent } from './modules/parallax-background/parallax-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SpriteAnimacionTecniqueComponent,
    ParallaxBackgroundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
