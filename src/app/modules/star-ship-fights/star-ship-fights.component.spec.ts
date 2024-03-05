import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipFightsComponent } from './star-ship-fights.component';

describe('StarShipFightsComponent', () => {
  let component: StarShipFightsComponent;
  let fixture: ComponentFixture<StarShipFightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarShipFightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarShipFightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
