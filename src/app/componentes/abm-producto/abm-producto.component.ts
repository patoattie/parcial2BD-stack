import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../clases/producto';

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
      costo: ['', Validators.compose([Validators.required, Validators.pattern('/^([0-9])*$/')])],
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
    this.formRegistro.setValue({codigo: '', nombre: '', descripcion: '', costo: '', observaciones: '', imagen: ''});
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
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Costo para el producto'});
    }
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async registrar(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      let file = (<HTMLInputElement>document.getElementById("img-file")).files[0];

      await this.productosService.addProducto(new Producto(this.formRegistro.value.codigo, this.formRegistro.value.nombre, this.formRegistro.value.descripcion, this.formRegistro.value.costo, this.formRegistro.value.observaciones, this.stockInicial, this.productosService.getFecha()));
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
  }

  public goBack(): void 
  {
    this.location.back();
    //console.log(this.productosService.getFecha());
  }
}