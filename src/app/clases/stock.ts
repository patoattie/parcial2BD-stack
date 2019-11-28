import { ESucursal } from '../enums/esucursal.enum';

export class Stock 
{
  public sucursal: ESucursal;
  public cantidad: number;

  constructor(sucursal: ESucursal, cantidad: number)
  {
    this.sucursal = sucursal;
    this.cantidad = cantidad;
  }
}