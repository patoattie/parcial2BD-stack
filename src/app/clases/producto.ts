import { Stock } from './stock';
import { Movimiento } from './movimiento';

export class Producto 
{
  public idCollection: string;
  public uid: string;
  public codigo: string;
  public nombre: string;
  public descripcion: string;
  public costo: number;
  public observaciones: string;
  public stock: Stock[];
  public fechaCreacion: string;
  public photoURL: string;
  public movimientosProducto: Movimiento[];

  constructor(codigo?: string, nombre?: string, descripcion?: string, costo?: number, observaciones?: string, stock?: Stock[], fechaCreacion?: string, idCollection?: string, uid?: string, photoURL?: string, movimientosProducto?: Movimiento[])
	{
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.costo = costo;
    this.observaciones = observaciones;
    this.stock = stock;
    this.fechaCreacion = fechaCreacion;
		this.idCollection = idCollection;
		this.uid = uid;
    this.photoURL = photoURL;
    this.movimientosProducto = movimientosProducto;
	}
}