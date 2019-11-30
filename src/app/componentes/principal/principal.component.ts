import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  public productos: Producto[] = [];
  public productoSeleccionada: Producto;

  constructor(public authService: AuthService,private productosService: ProductosService)
  {
    this.productos = this.productosService.getProductos();
console.log(this.productos);
  }

  ngOnInit() {
  }
}