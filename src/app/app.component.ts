import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpriteAnimacionTecniqueComponent } from './modules/sprite-animacion-tecnique/sprite-animacion-tecnique.component';
import { ParallaxBackgroundComponent } from './modules/parallax-background/parallax-background.component';
import { EnemyMovementPatternComponent } from './modules/enemy-movement-pattern/enemy-movement-pattern.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SpriteAnimacionTecniqueComponent,
    ParallaxBackgroundComponent,
    EnemyMovementPatternComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
