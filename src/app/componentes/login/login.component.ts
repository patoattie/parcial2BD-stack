import { Component, OnInit } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { UsuariosService } from '../../servicios/usuarios.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;*/
  public formLogin: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner

  //clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private miConstructor: FormBuilder, 
    //private route: ActivatedRoute, 
    //private router: Router, 
    public authService: AuthService, 
    private usuariosService: UsuariosService,
    public messageService: MessageService
    ) 
    {
      //this.progreso=0;
      //this.ProgresoDeAncho="0%";
      this.formLogin = this.miConstructor.group(
      {
        usuario: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
    }

  ngOnInit() 
  {
    this.enEspera = false;
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  private mostrarMsjErrorDatos(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Por favor verificá que hayas ingresado un E-Mail válido y una Clave'});
    if(this.formLogin.controls['usuario'].invalid)
    {
      if(this.formLogin.controls['usuario'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un E-Mail para identificarte'});
      }
      else if(this.formLogin.controls['usuario'].hasError('email'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'El E-Mail que ingresaste no es válido'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Usuario'});
      }
    }

    if(this.formLogin.controls['clave'].invalid)
    {
      if(this.formLogin.controls['clave'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Clave'});
      }
      else if(this.formLogin.controls['clave'].hasError('minLength'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La Clave debe tener como mínimo 6 caracteres'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Clave'});
      }
    }
  }

  private mostrarMsjErrorAuth(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.authService.getError()});
  }

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formLogin.valid)
    {
      await this.authService.SignIn(this.formLogin.value.usuario, this.formLogin.value.clave);
      usuarioValido = this.authService.isLoggedIn();
      if(usuarioValido)
      {
        //this.completarUsuario('blanquear');
       await this.usuariosService.getUsuario(this.authService.getUid());
      }
      else
      {
        this.mostrarMsjErrorAuth();
      }
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
  }

  public completarUsuario(): void
  {
    //this.formLogin.setValue({usuario: 'admin@admin.com', clave: '111111'});
    this.formLogin.setValue({usuario: 'pepe@pepe.com', clave: '123456'});
  }
}