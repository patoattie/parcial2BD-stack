import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from "../../clases/usuario";
import { UsuariosService } from '../../servicios/usuarios.service';
import { Sucursal } from '../../clases/sucursal';
import { Producto } from '../../clases/producto';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit 
{
  @Input() usuarios: Usuario[];
  @Input() sucursales: Sucursal[];
  @Input() productos: Producto[];
  @Input() esLov: boolean;
  public usuarioSeleccionado: Usuario = null;
  public cols: any[];
  public verMov: boolean = false;

  constructor(public usuariosService: UsuariosService) { }

  ngOnInit() 
  {
    if(this.esLov)
    {
      this.cols = [
        { field: 'photoURL', header: 'Avatar' },
        { field: 'email', header: 'Email' },
        { field: 'perfil', header: 'Perfil' }
      ];
    }
    else
    {
      this.cols = [
        { field: 'photoURL', header: 'Avatar' },
        { field: 'email', header: 'Email' },
        { field: 'perfil', header: 'Perfil' },
        { field: 'sucursal', header: 'Sucursal' }
      ];
    }
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

  public muestraMov(muestra: boolean): void
  {
    this.verMov = muestra;
  }
}
