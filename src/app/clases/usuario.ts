import {EPerfil} from '../enums/eperfil.enum';
//import {ESucursal} from '../enums/esucursal.enum';
import { User } from "../interfaces/user";

export class Usuario 
{
  public idCollection: string;
  public uid: string;
  public perfil: EPerfil;
  public sucursal: string;
  public user: User;

  constructor(perfil?: EPerfil, sucursal?: string, idCollection?: string, uid?: string, user?: User)
	{
    this.perfil = perfil;
    this.sucursal = sucursal;
		this.idCollection = idCollection;
    this.uid = uid;
    this.user = user;
	}
}