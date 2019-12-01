import { Component, OnInit, Input } from '@angular/core';
//import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";
//import { SortEvent } from 'primeng/api';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {
  @Input() productos: Producto[];
  public cols: any[];

  constructor(public productosService: ProductosService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'photoURL', header: 'Foto' },
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'costo', header: 'Costo' },
      { field: 'fechaCreacion', header: 'Fecha' },
      { field: 'observaciones', header: 'Observaciones' }
    ];
  }

  public transformaFecha(timestamp: string): string
  {
    let año: string = timestamp.substr(0, 4);
    let mes: string = timestamp.substr(4, 2);
    let dia: string = timestamp.substr(6, 2);
    let hora: string = timestamp.substr(8, 2);
    let minuto: string = timestamp.substr(10, 2);
    let segundo: string = timestamp.substr(12, 2);
    const sepFecha: string = '/';
    const sepHora: string = ':';

    return dia + sepFecha + mes + sepFecha + año + ' ' + hora + sepHora + minuto + sepHora + segundo;
  }
}
