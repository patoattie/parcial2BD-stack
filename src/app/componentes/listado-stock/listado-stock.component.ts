import { Component, OnInit, Input } from '@angular/core';
import { Stock } from "../../clases/stock";
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-listado-stock',
  templateUrl: './listado-stock.component.html',
  styleUrls: ['./listado-stock.component.css']
})
export class ListadoStockComponent implements OnInit 
{
  @Input() stock: Stock[];
  public cols: any[];

  constructor(public usuariosService: UsuariosService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'sucursal', header: 'Sucursal' },
      { field: 'cantidad', header: 'Cantidad' }
    ];
  }

}
