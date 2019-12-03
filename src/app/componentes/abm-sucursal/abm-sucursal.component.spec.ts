import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmSucursalComponent } from './abm-sucursal.component';

describe('AbmSucursalComponent', () => {
  let component: AbmSucursalComponent;
  let fixture: ComponentFixture<AbmSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
