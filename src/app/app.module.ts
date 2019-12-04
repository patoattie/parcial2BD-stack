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
import {PasswordModule} from 'primeng/password';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ListboxModule} from 'primeng/listbox';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuModule} from 'primeng/menu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosService } from './servicios/usuarios.service';
import { AbmProductoComponent } from './componentes/abm-producto/abm-producto.component';
import { ProductosService } from './servicios/productos.service';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';
import { ListadoMovimientosComponent } from './componentes/listado-movimientos/listado-movimientos.component';
import { ListadoStockComponent } from './componentes/listado-stock/listado-stock.component';
import { AbmSucursalComponent } from './componentes/abm-sucursal/abm-sucursal.component';
import { ListadoSucursalesComponent } from './componentes/listado-sucursales/listado-sucursales.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    CabeceraComponent,
    RegistroComponent,
    AbmProductoComponent,
    ListadoProductosComponent,
    ListadoMovimientosComponent,
    ListadoStockComponent,
    AbmSucursalComponent,
    ListadoSucursalesComponent,
    ListadoUsuariosComponent
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
    PasswordModule,
    InputTextareaModule,
    ListboxModule,
    ToastModule,
    TabMenuModule,
    MenuModule,
    TieredMenuModule,
    TableModule,
    DialogModule,
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    AuthService,
    UsuariosService,
    ProductosService,
    DatePipe,
    MessageService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
