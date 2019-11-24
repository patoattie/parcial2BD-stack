import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from './servicios/auth.service';
import {DatePipe} from '@angular/common';

//primeNG
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { InputTextModule } from "primeng/inputtext";
import {ListboxModule} from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosService } from './servicios/usuarios.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    CabeceraComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ListboxModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    AuthService,
    UsuariosService,
    DatePipe,
    MessageService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
