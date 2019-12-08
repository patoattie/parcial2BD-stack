import { Usuario } from "./usuario";
import { Movimiento } from "./movimiento";

export class Sucursal 
{
    public idCollection: string;
    public uid: string;
    public sucursal: string;
    public photoURL: string;
    public usuariosSucursal: Usuario[];
    public movimientosSucursal: Movimiento[];

    constructor(sucursal?: string, idCollection?: string, uid?: string, photoURL?: string, usuariosSucursal?: Usuario[], movimientosSucursal?: Movimiento[])
	{
        this.sucursal = sucursal;
        this.idCollection = idCollection;
        this.uid = uid;
        this.photoURL = photoURL;
        this.usuariosSucursal = usuariosSucursal;
        this.movimientosSucursal = movimientosSucursal;
	}
}
