import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { ESucursal } from '../../enums/esucursal.enum';
import { EPerfil } from '../../enums/eperfil.enum';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private ok: boolean; //Login OK
  private error: boolean; //Login fallido
  public formRegistro: FormGroup;
  private errorDatos: boolean; //Error en el formato de datos de correo o clave
  private errorClave: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner
  public sucursales: SelectItem[];
  public unaSucursal: ESucursal;

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private location: Location,
    private cd: ChangeDetectorRef,
    private usuariosService: UsuariosService
    //private jugadoresService: JugadoresService
    )
  {
    //email = new FormControl('', [Validators.email, Validators.required]);
    this.formRegistro = this.miConstructor.group(
    {
      usuario: ['', Validators.compose([Validators.email, Validators.required])],//this.email
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaClave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      sucursal: ['', Validators.compose([Validators.required])],
      imagen: ['', Validators.compose([])]/*,
      sexo: ['', Validators.compose([])],
    cuit: ['', Validators.compose([Validators.maxLength(11), Validators.minLength(11)])]*/
    });

    this.sucursales = [
      {label: ESucursal.Almagro, value: ESucursal.Almagro},
      {label: ESucursal.Caballito, value: ESucursal.Caballito},
      {label: ESucursal.Flores, value: ESucursal.Flores}
    ];
  }

  //constructor( ) { }

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
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.errorClave = false;
    this.enEspera = false;
    this.formRegistro.setValue({usuario: '', clave: '', confirmaClave: '', sucursal: '', imagen: ''});
  }

  public getOk(): boolean
  {
    return this.ok;
  }

  public getError(): boolean
  {
    return this.error;
  }

  public getErrorDatos(): boolean
  {
    return this.errorDatos;
  }

  public getErrorClave(): boolean
  {
    return this.errorClave;
  }

  public getMsjErrorDatos(): string
  {
    return 'Por favor verificá que hayas ingresado un E-Mail válido, una Clave de al menos 6 caracteres, y una Sucursal';
  }

  public getMsjErrorClave(): string
  {
    return 'La confirmación de la clave no coincide con la clave ingresada.';
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
      if(this.formRegistro.value.clave === this.formRegistro.value.confirmaClave)
      {
        let file = $("#img-file").get(0).files[0];
        await this.authService.SignUp(this.formRegistro.value.usuario, this.formRegistro.value.clave, null, file);
        usuarioValido = this.authService.isLoggedIn();
        this.error = !usuarioValido;
        this.ok = usuarioValido;
        this.errorDatos = false;
        this.errorClave = false;
        if(usuarioValido)
        {
          await this.usuariosService.addUsuario(new Usuario(EPerfil.Operador, this.formRegistro.value.sucursal));
        }
      }
      else //El usuario no confirmó bien la clave
      {
        this.error = false;
        this.ok = false;
        this.errorClave = true;
        this.errorDatos = false;
      }
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorClave = false;
      this.errorDatos = true;
    }

    this.enEspera = false; //Oculto el spinner
  }

  public goBack(): void 
  {
    this.location.back();
  }
}