export class Producto 
{
  public idCollection: string;
  public uid: string;
  public codigo: string;
  public nombre: string;
  public descripcion: string;
  public costo: number;
  public observaciones: string;
  public stock: number;
  public fechaCreacion: string;

  constructor(codigo?: string, nombre?: string, descripcion?: string, costo?: number, observaciones?: string, stock?: number, fechaCreacion?: string, idCollection?: string, uid?: string)
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
	}
}