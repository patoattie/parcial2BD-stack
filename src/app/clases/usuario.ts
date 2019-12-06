import {EPerfil} from '../enums/eperfil.enum';
//import {ESucursal} from '../enums/esucursal.enum';
import { User } from "./user";

export class Usuario extends User
{
  public perfil: EPerfil;
  public sucursal: string;

  constructor(
    perfil?: EPerfil, 
    sucursal?: string,
    user?: User,
    uid?: string,
    email?: string,
    displayName?: string,
    photoURL?: string,
    emailVerified?: boolean)
  {
    if(user == null)
    {
      super(uid, email, displayName, photoURL, emailVerified);
    }
    else
    {
      super(user.uid, user.email, user.displayName, user.photoURL, user.emailVerified);
    }
    
    this.perfil = perfil;
    this.sucursal = sucursal;
	}
}