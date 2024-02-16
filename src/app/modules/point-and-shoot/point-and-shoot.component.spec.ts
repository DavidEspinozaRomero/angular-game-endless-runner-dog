import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointAndShootComponent } from './point-and-shoot.component';

describe('PointAndShootComponent', () => {
  let component: PointAndShootComponent;
  let fixture: ComponentFixture<PointAndShootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointAndShootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointAndShootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
