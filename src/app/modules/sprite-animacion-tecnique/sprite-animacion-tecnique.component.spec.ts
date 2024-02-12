import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteAnimacionTecniqueComponent } from './sprite-animacion-tecnique.component';

describe('SpriteAnimacionTecniqueComponent', () => {
  let component: SpriteAnimacionTecniqueComponent;
  let fixture: ComponentFixture<SpriteAnimacionTecniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpriteAnimacionTecniqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpriteAnimacionTecniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
