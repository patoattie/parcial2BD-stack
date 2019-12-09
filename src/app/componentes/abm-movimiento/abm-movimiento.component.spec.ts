import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMovimientoComponent } from './abm-movimiento.component';

describe('AbmMovimientoComponent', () => {
  let component: AbmMovimientoComponent;
  let fixture: ComponentFixture<AbmMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
