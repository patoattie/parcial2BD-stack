import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
//import { ESucursal } from '../../enums/esucursal.enum';
import { EPerfil } from '../../enums/eperfil.enum';
import { SucursalesService } from "../../servicios/sucursales.service";
import { Sucursal } from "../../clases/sucursal";

import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';

import * as $ from "jquery";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public formRegistro: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner
  //public sucursales: SelectItem[];
  public perfiles: SelectItem[];
  @Input() sucursales: Sucursal[];
  @Input() usuario: Usuario;
  //private usuarios: Usuario[];
  @Input() usuarios: Usuario[];
  public listaSucursales: any[] = [];

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private location: Location,
    private cd: ChangeDetectorRef,
    private usuariosService: UsuariosService,
    public sucursalesService: SucursalesService,
    public messageService: MessageService
    )
  {
    this.formRegistro = this.miConstructor.group(
    {
      usuario: ['', Validators.compose([Validators.email, Validators.required])],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaClave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      sucursal: ['', Validators.compose([Validators.required])],
      perfil: ['', Validators.compose([Validators.required])],
      imagen: ['', Validators.compose([])],
      habilitaAdmin: ['', Validators.compose([])]
    });

    /*this.sucursales = [
      {label: ESucursal.Almagro, value: ESucursal.Almagro},
      {label: ESucursal.Caballito, value: ESucursal.Caballito},
      {label: ESucursal.Flores, value: ESucursal.Flores}
    ];*/

    this.perfiles = [
      {label: EPerfil.Operador, value: EPerfil.Operador},
      {label: EPerfil.Admin, value: EPerfil.Admin}
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

    if(this.usuario != null)
    {
      this.formRegistro.setValue({
        usuario: this.usuario.email,
        clave: '', 
        confirmaClave: '', 
        sucursal: this.usuario.sucursal,
        perfil: this.usuario.perfil,
        imagen: '',
        habilitaAdmin: ''
      });
    }
    else
    {
      this.formRegistro.setValue({usuario: '', clave: '', confirmaClave: '', sucursal: '', perfil: '', imagen: '', habilitaAdmin: ''});
    }

    if(this.sucursales != undefined)
    {
      this.sucursales.forEach((unaSucursal) =>
      {
        this.listaSucursales.push({label: unaSucursal.sucursal, value: unaSucursal.sucursal});
      });
    }

    //this.usuariosService.getUsuarios()
    //.subscribe(usuarios => this.usuarios = usuarios);
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formRegistro.controls['usuario'].invalid)
    {
      if(this.formRegistro.controls['usuario'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un E-Mail para identificarte'});
      }
      else if(this.formRegistro.controls['usuario'].hasError('email'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'El E-Mail que ingresaste no es válido'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Usuario'});
      }
    }

    if(this.formRegistro.controls['clave'].invalid)
    {
      if(this.formRegistro.controls['clave'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Clave'});
      }
      else if(this.formRegistro.controls['clave'].hasError('minlength'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La Clave debe tener como mínimo 6 caracteres'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Clave'});
      }
    }

    if(this.formRegistro.controls['sucursal'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Sucursal'});
    }
    
    if(this.formRegistro.controls['perfil'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Perfil'});
    }
  }

  private mostrarMsjErrorClave(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La confirmación de la clave no coincide con la clave ingresada'});
  }

  private mostrarMsjErrorAuth(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.authService.getError()});
  }

  private mostrarMsjErrorAdmin(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.usuariosService.getMsjErrorAdmin()});
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public eligeAdmin(): boolean
  {
    return this.formRegistro.value.perfil == EPerfil.Admin;
  }

  public async registrar(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      if(this.formRegistro.value.clave === this.formRegistro.value.confirmaClave)
      {
        if(this.formRegistro.value.perfil == EPerfil.Admin && this.formRegistro.value.habilitaAdmin != this.usuariosService.getPswAdmin())
        {
          this.mostrarMsjErrorAdmin();
        }
        else
        {
          let file = (<HTMLInputElement>document.getElementById("img-file")).files[0];

          await this.authService.SignUp(this.formRegistro.value.usuario, this.formRegistro.value.clave, null, file);

          usuarioValido = this.authService.isLoggedIn();
          if(usuarioValido)
          {
            if(this.usuario != null)
            {
              this.usuario.perfil = this.formRegistro.value.perfil;
              this.usuario.sucursal = this.formRegistro.value.sucursal;
              await this.usuariosService.updateUsuario(this.usuario);
            }
            else
            {
              let usuarioNuevo: Usuario = new Usuario(this.formRegistro.value.perfil, this.formRegistro.value.sucursal, this.authService.getUserData());
              //await this.usuariosService.addUsuario(new Usuario(this.formRegistro.value.perfil, this.formRegistro.value.sucursal), this.usuarios, this.sucursales);
              await this.usuariosService.updateUsuario(usuarioNuevo);
            }
          }
          else
          {
            this.mostrarMsjErrorAuth();
          }
        }
      }
      else //El usuario no confirmó bien la clave
      {
        this.mostrarMsjErrorClave();
      }
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
  }

  /*public mostrarLog(): void
  {
    //console.log(this.formRegistro.value.sucursal);
    console.log(this.sucursalesService.getSucursal(this.formRegistro.value.sucursal, this.sucursales));
  }*/
}