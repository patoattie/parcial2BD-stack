import { Component, OnInit, Input} from '@angular/core';
import { Sucursal } from "../../clases/sucursal";
import { SucursalesService } from '../../servicios/sucursales.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-listado-sucursales',
  templateUrl: './listado-sucursales.component.html',
  styleUrls: ['./listado-sucursales.component.css']
})
export class ListadoSucursalesComponent implements OnInit 
{
  @Input() sucursales: Sucursal[];
  public sucursalSeleccionada: Sucursal = null;
  public cols: any[];
  public verUsuarios: boolean = false;

  constructor(public sucursalesService: SucursalesService, public usuariosService: UsuariosService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'photoURL', header: 'Foto' },
      { field: 'sucursal', header: 'Sucursal' }
    ];
  }

  public eligeSucursal(event, unaSucursal: Sucursal): void
  {
    if(event.ctrlKey)
    {
      this.sucursalSeleccionada = null;
    }
    else
    {
      this.sucursalSeleccionada = unaSucursal;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.sucursalSeleccionada = null;
    }

    this.sucursalesService.muestraAbm = true;
  }

  public muestraUsuarios(muestra: boolean): void
  {
    this.verUsuarios = muestra;
  }
}
