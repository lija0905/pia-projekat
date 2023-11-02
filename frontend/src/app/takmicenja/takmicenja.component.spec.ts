import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakmicenjaComponent } from './takmicenja.component';

describe('TakmicenjaComponent', () => {
  let component: TakmicenjaComponent;
  let fixture: ComponentFixture<TakmicenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakmicenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakmicenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
