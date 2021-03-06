import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ProductosService } from "../../servicios/productos.service";
import { Producto } from "../../clases/producto";
import { SucursalesService } from "../../servicios/sucursales.service";
import { Sucursal } from "../../clases/sucursal";
import { UsuariosService } from "../../servicios/usuarios.service";
import { Usuario } from '../../clases/usuario';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Movimiento } from '../../clases/movimiento';
import { MovimientosService } from '../../servicios/movimientos.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  public productos: Producto[];
  public sucursales: Sucursal[];
  public usuarios: Usuario[];
  public movimientos: Movimiento[];
  public items: MenuItem[];
  public listaProductos: boolean = true;
  public listaSucursales: boolean = false;
  public listaUsuarios: boolean = false;
  public listaMovimientos: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public authService: AuthService, 
    public productosService: ProductosService, 
    public sucursalesService: SucursalesService,
    public usuariosService: UsuariosService,
    public movimientosService: MovimientosService)
  {
  }

  ngOnInit() 
  {
    this.subscriptions.push(
      this.productosService.getProductos()
      .subscribe((productos) => 
      {
        this.productos = productos;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.productos = this.productos.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.idCollection === test.idCollection
          )
        );
      })
    );

    this.subscriptions.push(
      this.sucursalesService.getSucursales()
      .subscribe((sucursales) => 
      {
        this.sucursales = sucursales;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.sucursales = this.sucursales.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.idCollection === test.idCollection
          )
        );
      })
    );

    this.subscriptions.push(
      this.usuariosService.getUsuarios()
      .subscribe((usuarios) => 
      {
        this.usuarios = usuarios;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.usuarios = this.usuarios.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.uid === test.uid
          )
        );
      })
    );

    this.subscriptions.push(
      this.movimientosService.getMovimientos()
      .subscribe((movimientos) => 
      {
        this.movimientos = movimientos;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.movimientos = this.movimientos.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.idCollection === test.idCollection
          )
        );
      })
    );

    this.items = [
      {label: 'Productos', command: () => {this.mostrarListaProductos(); }},
      {label: 'Sucursales', command: () => {this.mostrarListaSucursales(); }},
      {label: 'Usuarios', command: () => {this.mostrarListaUsuarios(); }},
      {label: 'Movimientos', command: () => {this.mostrarListaMovimientos(); }}
    ]
  }

  ngOnDestroy()
  {
    this.subscriptions.forEach((unaSubscription) => 
    {
      unaSubscription.unsubscribe();
    });
    /*this.usuarios = null;
    this.sucursales = null;
    this.productos = null;*/
  }

  private mostrarListaProductos(): void
  {
    this.listaProductos = true;
    this.listaSucursales = false;
    this.listaUsuarios = false;
    this.listaMovimientos = false;
  }

  private mostrarListaSucursales(): void
  {
    this.listaProductos = false;
    this.listaSucursales = true;
    this.listaUsuarios = false;
    this.listaMovimientos = false;
  }

  private mostrarListaUsuarios(): void
  {
    this.listaProductos = false;
    this.listaSucursales = false;
    this.listaUsuarios = true;
    this.listaMovimientos = false;
  }

  private mostrarListaMovimientos(): void
  {
    this.listaProductos = false;
    this.listaSucursales = false;
    this.listaUsuarios = false;
    this.listaMovimientos = true;
  }
}