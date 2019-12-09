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
import { Usuario } from '../../clases/usuario';

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
  @Input() sucursales: Sucursal[];
  @Input() productos: Producto[];
  @Input() producto: Producto;

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

    /*if(this.movimiento != null)
    {
      this.formRegistro.setValue({
        codigoProducto: this.movimiento.codigoProducto, 
        tipo: this.movimiento.tipo,
        cantidad: this.movimiento.cantidad.toString(),
        detalle: this.movimiento.detalle
      });
    }
    else
    {*/
      this.formRegistro.setValue({codigoProducto: this.producto.codigo, tipo: '', cantidad: '', detalle: ''});
    //}
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

  private mostrarMsjErrorStock(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'No hay stock suficiente para realizar la baja'});
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
      /*if(this.movimiento != null)
      {
        await this.movimientosService.updateMovimiento(new Movimiento(this.formRegistro.value.tipo, this.movimiento.sucursal, this.movimiento.fecha, this.convertirEnNumero(this.formRegistro.value.cantidad), this.formRegistro.value.detalle, this.formRegistro.value.codigoProducto, this.movimiento.emailUsuario, this.movimiento.idCollection, this.movimiento.uid));
      }
      else
      {*/
        let movimiento: Movimiento = new Movimiento(this.formRegistro.value.tipo, this.usuariosService.getSucursal(), this.movimientosService.getFecha(), this.convertirEnNumero(this.formRegistro.value.cantidad), this.formRegistro.value.detalle, this.formRegistro.value.codigoProducto, this.usuariosService.getEmail());
        let stock: Stock = new Stock('', 0);
        let okStock: boolean = true;
        
        //Controlo stock si es baja
        this.productosService.getProducto(movimiento.codigoProducto, this.productos).stock.forEach((unStock) => 
        {
          if(unStock.sucursal == movimiento.sucursal)
          {
            if(movimiento.tipo == ETipo.Baja && unStock.cantidad - movimiento.cantidad < 0)
            {
              okStock = false; //No hay stock suficiente para realizar el movimiento de baja
            }
            else
            {
              stock.sucursal = unStock.sucursal;
              stock.cantidad = (movimiento.tipo == ETipo.Baja) ? (unStock.cantidad - movimiento.cantidad) : (unStock.cantidad + movimiento.cantidad);
            }
          }
        });
        
        if(okStock) //Hay stock suficiente
        {
          this.movimientosService.addMovimiento(movimiento)
          .then((doc) =>
          {
            this.movimientosService.SetData(doc)
            .then(() => 
            {
              let sucursal: Sucursal;
              let producto: Producto;
              let usuario: Usuario;
              //let movimiento: Movimiento = this.movimientosService.getMovimiento(doc.id)
              movimiento.idCollection = doc.id;
              movimiento.uid = this.authService.getUid();

              //Asigno el movimiento a la sucursal
              sucursal = this.sucursalesService.getSucursal(movimiento.sucursal, this.sucursales);
      
              if(sucursal.movimientosSucursal == undefined)
              {
                sucursal.movimientosSucursal = [];
              }
      
              sucursal.movimientosSucursal.push(movimiento);
    //console.info('sucursal', sucursal);
              this.sucursalesService.updateSucursal(sucursal);
      
              //Asigno el movimiento al producto
              producto = this.productosService.getProducto(movimiento.codigoProducto, this.productos);
      
              if(producto.movimientosProducto == undefined)
              {
                producto.movimientosProducto = [];
              }
      
              producto.movimientosProducto.push(movimiento);
    
              //Actualizo el stock del producto
              producto.stock.forEach((unStock, indice) =>
              {
                if(unStock.sucursal == stock.sucursal)
                {
                  //unStock = stock;
                  producto.stock[indice] = stock;
                }
              });
    //console.info('producto', producto);
              this.productosService.updateProducto(producto);
      
              //Asigno el movimiento al producto
              usuario = this.usuariosService.getUsuario(this.authService.getUid());
      
              if(usuario.movimientosUsuario == undefined)
              {
                usuario.movimientosUsuario = [];
              }
      
              usuario.movimientosUsuario.push(movimiento);
    //console.info('usuario', usuario);
              this.usuariosService.updateUsuario(usuario);
    
              this.mostrarMsjOk();
              this.formRegistro.reset();
            });

          });

        }
        else //No hay stock
        {
          this.mostrarMsjErrorStock();
        }
      //}

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
