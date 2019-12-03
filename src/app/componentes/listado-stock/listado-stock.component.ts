import { Component, OnInit, Input } from '@angular/core';
import { Stock } from "../../clases/stock";

@Component({
  selector: 'app-listado-stock',
  templateUrl: './listado-stock.component.html',
  styleUrls: ['./listado-stock.component.css']
})
export class ListadoStockComponent implements OnInit 
{
  @Input() stock: Stock[];
  public cols: any[];

  constructor() { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'sucursal', header: 'Sucursal' },
      { field: 'cantidad', header: 'Cantidad' }
    ];
  }

}
