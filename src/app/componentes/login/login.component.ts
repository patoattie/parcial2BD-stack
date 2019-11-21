import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
//import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  private ok: boolean; //Login OK
  private error: boolean; //Login fallido
  public formLogin: FormGroup;
  private errorDatos: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(private miConstructor: FormBuilder, private route: ActivatedRoute, private router: Router, public authService: AuthService/*, private jugadoresService: JugadoresService*/) 
    {
      this.progreso=0;
      this.ProgresoDeAncho="0%";
      this.formLogin = this.miConstructor.group(
      {
        usuario: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
    }

  ngOnInit() 
  {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.enEspera = false;
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

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formLogin.valid)
    {
      await this.authService.SignIn(this.formLogin.value.usuario, this.formLogin.value.clave);
      usuarioValido = this.authService.isLoggedIn();
      this.error = !usuarioValido;
      this.ok = usuarioValido;
      this.errorDatos = false;
      /*if(usuarioValido)
      {
        //this.completarUsuario('blanquear');
       await this.jugadoresService.getJugador(this.formLogin.value.usuario);
      }*/
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorDatos = true;
    }

    this.enEspera = false; //Oculto el spinner
  }

  public completarUsuario(): void
  {
    //this.formLogin.setValue({usuario: 'admin@admin.com', clave: '111111'});
    this.formLogin.setValue({usuario: 'pepe@pepe.com', clave: '123456'});
  }
}