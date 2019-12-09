import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Movimiento } from '../../clases/movimiento';
import { MovimientosService } from "../../servicios/movimientos.service";

@Component({
  selector: 'app-listado-movimientos',
  templateUrl: './listado-movimientos.component.html',
  styleUrls: ['./listado-movimientos.component.css']
})
export class ListadoMovimientosComponent implements OnInit 
{
  @Input() esLov: boolean;
  public movimientoSeleccionado: Movimiento = null;
  public cols: any[];

  constructor(public movimientosService: MovimientosService, public usuariosService: UsuariosService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'codigoProducto', header: 'Código Producto' },
      { field: 'tipo', header: 'Tipo Movimiento' },
      { field: 'sucursal', header: 'Sucursal' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'detalle', header: 'Detalle' },
      { field: 'emailUsuario', header: 'Usuario' }
    ];
  }

  public transformaFecha(timestamp: string): string
  {
    let año: string = timestamp.substr(0, 4);
    let mes: string = timestamp.substr(4, 2);
    let dia: string = timestamp.substr(6, 2);
    let hora: string = timestamp.substr(8, 2);
    let minuto: string = timestamp.substr(10, 2);
    let segundo: string = timestamp.substr(12, 2);
    const sepFecha: string = '/';
    const sepHora: string = ':';

    return dia + sepFecha + mes + sepFecha + año + ' ' + hora + sepHora + minuto + sepHora + segundo;
  }

  public eligeUsuario(event, unMovimiento: Movimiento): void
  {
    if(event.ctrlKey)
    {
      this.movimientoSeleccionado = null;
    }
    else
    {
      this.movimientoSeleccionado = unMovimiento;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.movimientoSeleccionado = null;
    }

    this.movimientosService.muestraAbm = true;
  }
}
