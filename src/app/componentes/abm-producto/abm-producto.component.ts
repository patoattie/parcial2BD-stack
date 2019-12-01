import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../clases/producto';
import { Stock } from '../../clases/stock';
import { ESucursal } from '../../enums/esucursal.enum';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrls: ['./abm-producto.component.css']
})
export class AbmProductoComponent implements OnInit 
{
  public formRegistro: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner
  private stockInicial: number = 0;
  @Input() producto: Producto;

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private location: Location,
    private cd: ChangeDetectorRef,
    private productosService: ProductosService,
    public messageService: MessageService
  ) 
  {
    this.formRegistro = this.miConstructor.group(
    {
      codigo: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      costo: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+([,.][0-9]+)?$')])], //expresion regular para validar importes numericos que pueden o no ser decimales
      observaciones: ['', Validators.compose([])],
      imagen: ['', Validators.compose([])]
    });
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

    if(this.producto != null)
    {
      this.formRegistro.setValue({
        codigo: this.producto.codigo, 
        nombre: this.producto.nombre, 
        descripcion: this.producto.descripcion, 
        costo: this.producto.costo, 
        observaciones: this.producto.observaciones, 
        imagen: ''
      });
    }
    else
    {
      this.formRegistro.setValue({codigo: '', nombre: '', descripcion: '', costo: '', observaciones: '', imagen: ''});
    }
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formRegistro.controls['codigo'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Código de producto'});
    }

    if(this.formRegistro.controls['nombre'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Nombre para el producto'});
    }

    if(this.formRegistro.controls['descripcion'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Descripción para el producto'});
    }
    
    if(this.formRegistro.controls['costo'].invalid)
    {
      if(this.formRegistro.controls['costo'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Costo para el producto'});
      }
      else if(this.formRegistro.controls['costo'].hasError('pattern'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un importe numérico válido para el Costo del producto'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Costo del producto'});
      }
    }
  }

  private mostrarMsjOk(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'success', summary: 'Actualización Exitosa', detail: 'Se registró correctamente el producto'});
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
      let file = (<HTMLInputElement>document.getElementById("img-file")).files[0];

      await this.productosService.addProducto(new Producto(this.formRegistro.value.codigo, this.formRegistro.value.nombre, this.formRegistro.value.descripcion, this.convertirEnNumero(this.formRegistro.value.costo), this.formRegistro.value.observaciones, this.guardarStockInicial(), this.productosService.getFecha()), file);

      this.mostrarMsjOk();
      this.formRegistro.reset();
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
    this.productosService.muestraAbm = false;
  }

  public goBack(): void 
  {
    this.location.back();
    //console.log(this.productosService.getFecha());
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

  private guardarStockInicial(): Stock[]
  {
    let retorno: Stock[] = [];
    retorno.push(new Stock(ESucursal.Almagro, this.stockInicial), new Stock(ESucursal.Caballito, this.stockInicial), new Stock(ESucursal.Flores, this.stockInicial))

    return retorno;
  }
}