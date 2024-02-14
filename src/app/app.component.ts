import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  SpriteAnimacionTecniqueComponent,
  ParallaxBackgroundComponent,
  EnemyMovementPatternComponent,
  AnimationTriggerComponent,
} from './modules';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SpriteAnimacionTecniqueComponent,
    ParallaxBackgroundComponent,
    EnemyMovementPatternComponent,
    AnimationTriggerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
