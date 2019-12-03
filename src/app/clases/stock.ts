export class Stock 
{
  public sucursal: string;
  public cantidad: number;

  constructor(sucursal: string, cantidad: number)
  {
    this.sucursal = sucursal;
    this.cantidad = cantidad;
  }
}