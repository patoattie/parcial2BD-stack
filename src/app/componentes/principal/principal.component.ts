import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";
import { SucursalesService } from "../../servicios/sucursales.service";
import { Sucursal } from "../../clases/sucursal";
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
  public sucursales: Sucursal[];
  public items: MenuItem[];
  public listaProductos: boolean = true;
  public listaSucursales: boolean = false;

  constructor(public authService: AuthService, public productosService: ProductosService, public sucursalesService: SucursalesService)
  {
  }

  ngOnInit() 
  {
    this.productosService.getProductos()
    .subscribe(productos => this.productos = productos);

    this.sucursalesService.getSucursales()
    .subscribe(sucursales => this.sucursales = sucursales);

    this.items = [
      {label: 'Productos', command: () => {this.mostrarListaProductos(); }},
      {label: 'Sucursales', command: () => {this.mostrarListaSucursales(); }}
    ]
  }

  private mostrarListaProductos(): void
  {
    this.listaProductos = true;
    this.listaSucursales = false;
  }

  private mostrarListaSucursales(): void
  {
    this.listaProductos = false;
    this.listaSucursales = true;
  }
}