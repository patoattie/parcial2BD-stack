import {ETipo} from '../enums/etipo.enum';

export class Movimiento 
{
  public idCollection: string;
  public uid: string;
  public tipo: ETipo;
  public sucursal: string;
  public fecha: string;
  public cantidad: number;
  public detalle: string;
  public codigoProducto: string;
  public emailUsuario: string;

  constructor(
    tipo?: ETipo,
    sucursal?: string,
    fecha?: string,
    cantidad?: number,
    detalle?: string,
    codigoProducto?: string,
    emailUsuario?: string,
    idCollection?: string,
    uid?: string
  )
  {
    this.tipo = tipo;
    this.sucursal = sucursal;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.detalle = detalle;
    this.codigoProducto = codigoProducto;
    this.emailUsuario = emailUsuario;
    this.idCollection = idCollection;
    this.uid = uid;
  }
}
