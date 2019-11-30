import { Component, OnInit, Input } from '@angular/core';
//import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {
  @Input() productos: Producto[];
  //@Input() accionBorrar: boolean;

  constructor(/*private productosService: ProductosService*/) { }

  ngOnInit() {
  }

  /*private leerProductos(): Producto[]
  {
    let retorno: Producto[] = [];
    this.productosService.getProductos().subscribe(
      (productos) => {
          retorno = productos;
        }
    );

    return retorno;
  }

  public procesarBaja(): void
  {
    this.peliculas = this.leerProductos();
  }*/
}
