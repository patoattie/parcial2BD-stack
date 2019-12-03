import { Component, OnInit, Input } from '@angular/core';
import { Producto } from "../../clases/producto";
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {
  @Input() productos: Producto[];
  public productoSeleccionado: Producto = null;
  public cols: any[];
  public colStock: any[];
  public display: boolean = false;

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

    this.colStock = [
      { field: 'sucursal', header: 'Sucursal' },
      { field: 'cantidad', header: 'Cantidad' }
    ]
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

  public eligeProducto(event, unProducto: Producto): void
  {
    if(event.ctrlKey)
    {
      this.productoSeleccionado = null;
    }
    else
    {
      this.productoSeleccionado = unProducto;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.productoSeleccionado = null;
    }

    this.productosService.muestraAbm = true;
  }

  public muestraStock(muestra: boolean): void
  {
    this.display = muestra;
  }
}
