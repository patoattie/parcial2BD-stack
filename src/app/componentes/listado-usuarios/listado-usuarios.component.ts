import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from "../../clases/usuario";
import { UsuariosService } from '../../servicios/usuarios.service';
import { Sucursal } from '../../clases/sucursal';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit 
{
  @Input() usuarios: Usuario[];
  @Input() sucursales: Sucursal[];
  public usuarioSeleccionado: Usuario = null;
  public cols: any[];

  constructor(public usuariosService: UsuariosService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'user.photoURL', header: 'Avatar' },
      { field: 'user.email', header: 'Email' },
      { field: 'perfil', header: 'Perfil' },
      { field: 'sucursal', header: 'Sucursal' }
    ];
  }

  public eligeUsuario(event, unUsuario: Usuario): void
  {
    if(event.ctrlKey)
    {
      this.usuarioSeleccionado = null;
    }
    else
    {
      this.usuarioSeleccionado = unUsuario;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.usuarioSeleccionado = null;
    }

    this.usuariosService.muestraAbm = true;
  }
}
