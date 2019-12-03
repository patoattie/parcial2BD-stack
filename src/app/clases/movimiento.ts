import {EPerfil} from '../enums/eperfil.enum';
import {ESucursal} from '../enums/esucursal.enum';
import {ETipo} from '../enums/etipo.enum';

export class Movimiento 
{
  public idCollection: string;
  public uid: string;
  public tipo: ETipo;
  public sucursal: ESucursal;
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

  constructor(
    tipo?: ETipo,
    sucursal?: ESucursal,
    fecha?: string,
    cantidad?: number,
    detalle?: string,
    idProducto?: string,
    codigoProducto?: string,
    nombreProducto?: string,
    descripcionProducto?: string,
    costoProducto?: number,
    idUsuario?: string,
    perfilUsuario?: EPerfil,
    sucursalUsuario?: ESucursal,
    idCollection?: string,
    uid?: string
  )
  {
    this.tipo = tipo;
    this.sucursal = sucursal;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.detalle = detalle;
    this.idProducto = idProducto;
    this.codigoProducto = codigoProducto;
    this.nombreProducto = nombreProducto;
    this.descripcionProducto = descripcionProducto;
    this.costoProducto = costoProducto;
    this.idUsuario = idUsuario;
    this.perfilUsuario = perfilUsuario;
    this.sucursalUsuario = sucursalUsuario;
    this.idCollection = idCollection;
    this.uid = uid;
  }
}
