import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ProductosService } from "../../servicios/productos.service";
import { MenuItem } from 'primeng/api';
//import { Jugador } from '../../clases/jugador';
//import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  //public jugadores: Jugador[] = [];
  //public jugador: Jugador;
  items: MenuItem[];

  constructor(public authService: AuthService, public usuariosService: UsuariosService, private productosService: ProductosService) { }

  ngOnInit()  
  {
    this.items = [
      { label: 'Producto', icon: 'pi pi-plus', routerLink: '/Abm-Producto' },
      { separator: true },
      { label: 'Salir', icon: 'pi pi-sign-out', command: () => {this.salir() } }
    ];
  }

  public async salir(): Promise<void>
  {
    await this.productosService.SignOut();
    await this.usuariosService.SignOut();
    await this.authService.SignOut();
  }

  public getUrlFoto(): string
  {
    let urlFoto: string = this.authService.getUserData().photoURL;

    if(urlFoto == undefined)
    {
      urlFoto = 'https://stackblitz.com/files/parcial2bd-stack/github/patoattie/parcial2BD-stack/master/src/assets/avatares/avatardefault.png';
    }

    return urlFoto;
  }
}