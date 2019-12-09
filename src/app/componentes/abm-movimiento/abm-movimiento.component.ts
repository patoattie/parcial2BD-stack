import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../clases/producto';
import { Stock } from '../../clases/stock';
import { ETipo } from '../../enums/etipo.enum';
import { SucursalesService } from "../../servicios/sucursales.service";
import { Sucursal } from "../../clases/sucursal";
import { MovimientosService } from '../../servicios/movimientos.service';
import { Movimiento } from '../../clases/movimiento';
import { UsuariosService } from '../../servicios/usuarios.service';

import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-abm-movimiento',
  templateUrl: './abm-movimiento.component.html',
  styleUrls: ['./abm-movimiento.component.css']
})
export class AbmMovimientoComponent implements OnInit 
{
  public formRegistro: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner
  public tipos: SelectItem[];
  @Input() movimiento: Movimiento;

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private cd: ChangeDetectorRef,
    public productosService: ProductosService,
    public movimientosService: MovimientosService,
    private sucursalesService: SucursalesService,
    private usuariosService: UsuariosService,
    public messageService: MessageService
  ) 
  {
    this.formRegistro = this.miConstructor.group(
    {
      codigoProducto: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      cantidad: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+([,.][0-9]+)?$')])], //expresion regular para validar importes numericos que pueden o no ser decimales
      detalle: ['', Validators.compose([Validators.required])]
    });

    this.tipos = [
      {label: ETipo.Alta, value: ETipo.Alta},
      {label: ETipo.Baja, value: ETipo.Baja}
    ]
  }

  onFileChange(event) 
  {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) 
    {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => 
      {
        this.formRegistro.patchValue(
        {
          file: reader.result
        });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  ngOnInit() 
  {
    this.enEspera = false;

    if(this.movimiento != null)
    {
      this.formRegistro.setValue({
        codigoProducto: this.movimiento.codigoProducto, 
        tipo: this.movimiento.tipo,
        cantidad: this.movimiento.cantidad.toString(),
        detalle: this.movimiento.detalle
      });
    }
    else
    {
      this.formRegistro.setValue({codigoProducto: '', tipo: '', cantidad: '', detalle: ''});
    }
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formRegistro.controls['codigoProducto'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Código de producto'});
    }

    if(this.formRegistro.controls['tipo'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Tipo de movimiento'});
    }

    if(this.formRegistro.controls['cantidad'].invalid)
    {
      if(this.formRegistro.controls['cantidad'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Cantidad'});
      }
      else if(this.formRegistro.controls['cantidad'].hasError('pattern'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un importe numérico válido para la Cantidad'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Cantidad'});
      }
    }

    if(this.formRegistro.controls['detalle'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Detalle'});
    }
  }

  private mostrarMsjOk(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'success', summary: 'Actualización Exitosa', detail: 'Se registró correctamente el movimiento'});
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async registrar(): Promise<void>
  {
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      if(this.movimiento != null)
      {
        await this.movimientosService.updateMovimiento(new Movimiento(this.formRegistro.value.tipo, this.movimiento.sucursal, this.movimiento.fecha, this.convertirEnNumero(this.formRegistro.value.cantidad), this.formRegistro.value.detalle, this.formRegistro.value.codigoProducto, this.movimiento.emailUsuario, this.movimiento.idCollection, this.movimiento.uid));
      }
      else
      {
        await this.movimientosService.addMovimiento(new Movimiento(this.formRegistro.value.tipo, this.usuariosService.getSucursal(), this.movimientosService.getFecha(), this.convertirEnNumero(this.formRegistro.value.cantidad), this.formRegistro.value.detalle, this.formRegistro.value.codigoProducto, this.usuariosService.getEmail()));
      }

      this.mostrarMsjOk();
      this.formRegistro.reset();
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
    //this.productosService.muestraAbm = false;
  }

  private convertirEnNumero(cadena: string): number
  {
    let retorno: number;

    cadena = cadena.replace(',', '.');

    retorno = parseFloat(cadena);

    if(Number.isNaN(retorno))
    {
      retorno = 0;
    }

    return retorno;
  }

  /*private guardarStockInicial(): Stock[]
  {
    let retorno: Stock[] = [];
    //retorno.push(new Stock(ESucursal.Almagro, this.stockInicial), new Stock(ESucursal.Caballito, this.stockInicial), new Stock(ESucursal.Flores, this.stockInicial))
    this.sucursales.forEach((unaSucursal) => 
    {
      retorno.push(new Stock(unaSucursal.sucursal, 0));
    });

    return retorno;
  }*/
}
