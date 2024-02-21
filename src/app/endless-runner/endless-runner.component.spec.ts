import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndlessRunnerComponent } from './endless-runner.component';

describe('EndlessRunnerComponent', () => {
  let component: EndlessRunnerComponent;
  let fixture: ComponentFixture<EndlessRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndlessRunnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndlessRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
