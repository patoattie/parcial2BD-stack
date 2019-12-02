import {EPerfil} from '../enums/eperfil.enum';
import {ESucursal} from '../enums/esucursal.enum';
import {ETipo} from '../enums/etipo.enum';

export class Movimiento 
{
    public idCollection: string;
    public uid: string;
    public tipo: ETipo;
    public fecha: string;
    public cantidad: number;
    public detalle: string;
    public idProducto: string;
    public codigoProducto: string;
    public nombreProducto: string;
    public descripcionProducto: string;
    public costoProducto: number;
    public idUsuario: string;
    public perfilUsuario: EPerfil;
    public sucursalUsuario: ESucursal;
  }
