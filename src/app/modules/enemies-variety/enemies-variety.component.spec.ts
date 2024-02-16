import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesVarietyComponent } from './enemies-variety.component';

describe('EnemiesVarietyComponent', () => {
  let component: EnemiesVarietyComponent;
  let fixture: ComponentFixture<EnemiesVarietyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemiesVarietyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnemiesVarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
