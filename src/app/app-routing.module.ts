import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';

// Import canActivate guard services
import { AuthGuard } from "./guard/auth.guard";
import { SecureInnerPagesGuard } from "./guard/secure-inner-pages.guard";

const routes: Routes = 
[
  {path: '', redirectTo: 'Login', pathMatch: 'full', canActivate: [SecureInnerPagesGuard]},
  {path: 'Login' , component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'Principal' , component: PrincipalComponent, canActivate: [AuthGuard]},
  {path: 'Registro' , component: RegistroComponent, canActivate: [SecureInnerPagesGuard]},
  {path: '**' , component: LoginComponent},
  {path: 'error' , component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
