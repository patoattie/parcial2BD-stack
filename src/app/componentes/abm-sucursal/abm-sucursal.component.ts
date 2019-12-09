import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { SucursalesService } from '../../servicios/sucursales.service';
import { Sucursal } from '../../clases/sucursal';

import {MessageService} from 'primeng/api';
import { Usuario } from '../../clases/usuario';
//import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-abm-sucursal',
  templateUrl: './abm-sucursal.component.html',
  styleUrls: ['./abm-sucursal.component.css']
})
export class AbmSucursalComponent implements OnInit 
{
  public formRegistro: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner
  @Input() sucursal: Sucursal;
  @Input() usuarios: Usuario[];

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private cd: ChangeDetectorRef,
    public sucursalesService: SucursalesService,
    //private usuariosService: UsuariosService,
    public messageService: MessageService
  ) 
  {
    this.formRegistro = this.miConstructor.group(
      {
        sucursal: ['', Validators.compose([Validators.required])],
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

    if(this.sucursal != null)
    {
      this.formRegistro.setValue({
        sucursal: this.sucursal.sucursal, 
        imagen: ''
      });
    }
    else
    {
      this.formRegistro.setValue({sucursal: '', imagen: ''});
    }
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formRegistro.controls['sucursal'].invalid)
    {
      if(this.formRegistro.controls['sucursal'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Sucursal'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Sucursal'});
      }
    }
  }

  private mostrarMsjErrorBD(mensaje: string): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: mensaje});
  }

  private mostrarMsjOk(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'success', summary: 'Actualización Exitosa', detail: 'Se registró correctamente la sucursal'});
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

      if(this.sucursal != null)
      {
        await this.sucursalesService.updateSucursal(new Sucursal(this.formRegistro.value.sucursal, this.sucursal.idCollection, this.sucursal.uid, this.sucursal.photoURL, this.sucursal.usuariosSucursal));
      }
      else
      {
        await this.sucursalesService.addSucursal(new Sucursal(this.formRegistro.value.sucursal), file);
      }

      this.mostrarMsjOk();
      this.formRegistro.reset();
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
    //this.sucursalesService.muestraAbm = false;
  }

  private guardarUsuarioInicial(): Usuario[]
  {
    let retorno: Usuario[] = [];

    this.usuarios.forEach((unUsuario) => 
    {
      retorno.push(new Usuario(unUsuario.perfil, unUsuario.sucursal, null, unUsuario.uid, unUsuario.email, unUsuario.displayName, unUsuario.photoURL, unUsuario.emailVerified));
    });

    return retorno;
  }
}
