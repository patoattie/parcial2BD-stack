import { Component, OnInit, Input } from '@angular/core';
import { Producto } from "../../clases/producto";
import { ProductosService } from '../../servicios/productos.service';
import { Sucursal } from '../../clases/sucursal';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {
  @Input() productos: Producto[];
  @Input() sucursales: Sucursal[];
  @Input() esLov: boolean;
  public productoSeleccionado: Producto = null;
  public cols: any[];
  public verStock: boolean = false;
  public verMov: boolean = false;

  constructor(public productosService: ProductosService, public usuariosService: UsuariosService) { }

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

  public habilitaMov(): void
  {
    this.productosService.muestraMov = true;
  }

  public muestraStock(muestra: boolean): void
  {
    this.verStock = muestra;
  }

  public muestraMov(muestra: boolean): void
  {
    this.verMov = muestra;
  }
}
