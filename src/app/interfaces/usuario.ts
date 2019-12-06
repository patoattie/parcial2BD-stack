import { User } from "../interfaces/user";
import { EPerfil } from '../enums/eperfil.enum';

export interface Usuario extends User 
{
    perfil: EPerfil;
    sucursal: string;
}
