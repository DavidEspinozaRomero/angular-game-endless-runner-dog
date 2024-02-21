import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  SpriteAnimacionTecniqueComponent,
  ParallaxBackgroundComponent,
  EnemyMovementPatternComponent,
  AnimationTriggerComponent,
  PointAndShootComponent,
  EnemiesVarietyComponent,
  SideScrollerComponent,
  StateManagementComponent,
} from './modules';
import { EndlessRunnerComponent } from './endless-runner/endless-runner.component';

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
    PointAndShootComponent,
    EnemiesVarietyComponent,
    SideScrollerComponent,
    StateManagementComponent,
    EndlessRunnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
