import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";
import { SucursalesService } from "../../servicios/sucursales.service";
import { Sucursal } from "../../clases/sucursal";
import { UsuariosService } from "../../servicios/usuarios.service";
import { Usuario } from '../../clases/usuario';
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
  public usuarios: Usuario[];
  public items: MenuItem[];
  public listaProductos: boolean = true;
  public listaSucursales: boolean = false;
  public listaUsuarios: boolean = false;

  constructor(
    public authService: AuthService, 
    public productosService: ProductosService, 
    public sucursalesService: SucursalesService,
    public usuariosService: UsuariosService)
  {
  }

  ngOnInit() 
  {
    this.productosService.getProductos()
    .subscribe(productos => this.productos = productos);

    this.sucursalesService.getSucursales()
    .subscribe(sucursales => this.sucursales = sucursales);

    this.usuariosService.getUsuarios()
    .subscribe(usuarios => this.usuarios = usuarios);
console.log(this.sucursales);
console.log(this.usuarios);
console.log(this.productos);
    this.items = [
      {label: 'Productos', command: () => {this.mostrarListaProductos(); }},
      {label: 'Sucursales', command: () => {this.mostrarListaSucursales(); }},
      {label: 'Usuarios', command: () => {this.mostrarListaUsuarios(); }}
    ]
  }

  private mostrarListaProductos(): void
  {
    this.listaProductos = true;
    this.listaSucursales = false;
    this.listaUsuarios = false;
  }

  private mostrarListaSucursales(): void
  {
    this.listaProductos = false;
    this.listaSucursales = true;
    this.listaUsuarios = false;
  }

  private mostrarListaUsuarios(): void
  {
    this.listaProductos = false;
    this.listaSucursales = false;
    this.listaUsuarios = true;
  }
}