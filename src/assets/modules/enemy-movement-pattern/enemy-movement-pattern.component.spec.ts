import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyMovementPatternComponent } from './enemy-movement-pattern.component';

describe('EnemyMovementPatternComponent', () => {
  let component: EnemyMovementPatternComponent;
  let fixture: ComponentFixture<EnemyMovementPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyMovementPatternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnemyMovementPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
