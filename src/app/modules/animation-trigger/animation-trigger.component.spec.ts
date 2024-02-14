import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationTriggerComponent } from './animation-trigger.component';

describe('AnimationTriggerComponent', () => {
  let component: AnimationTriggerComponent;
  let fixture: ComponentFixture<AnimationTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationTriggerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
