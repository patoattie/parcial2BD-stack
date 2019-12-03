import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoStockComponent } from './listado-stock.component';

describe('ListadoStockComponent', () => {
  let component: ListadoStockComponent;
  let fixture: ComponentFixture<ListadoStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
