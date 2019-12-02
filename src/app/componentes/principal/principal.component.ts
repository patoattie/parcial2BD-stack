import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";
import { MenuItem } from 'primeng/api';


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
  public productos: Producto[];
  public items: MenuItem[];
  public listaProductos: boolean = true;
  public listaMovimientos: boolean = false;

  constructor(public authService: AuthService, public productosService: ProductosService)
  {
  }

  ngOnInit() 
  {
    this.productosService.getProductos()
    .subscribe(productos => this.productos = productos);

    this.items = [
      {label: 'Productos', command: () => {this.mostrarListaProductos(); }},
      {label: 'Movimientos', command: () => {this.mostrarListaMovimientos(); }}
    ]
  }

  private mostrarListaProductos(): void
  {
    this.listaProductos = true;
    this.listaMovimientos = false;
  }

  private mostrarListaMovimientos(): void
  {
    this.listaProductos = false;
    this.listaMovimientos = true;
  }
}