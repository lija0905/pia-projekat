import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkipniComponent } from './ekipni.component';

describe('EkipniComponent', () => {
  let component: EkipniComponent;
  let fixture: ComponentFixture<EkipniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkipniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkipniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
