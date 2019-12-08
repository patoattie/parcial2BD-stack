import { Usuario } from "./usuario";

export class Sucursal 
{
    public idCollection: string;
    public uid: string;
    public sucursal: string;
    public photoURL: string;
    public usuariosSucursal: Usuario[];

    constructor(sucursal?: string, idCollection?: string, uid?: string, photoURL?: string, usuariosSucursal?: Usuario[])
	{
        this.sucursal = sucursal;
        this.idCollection = idCollection;
        this.uid = uid;
        this.photoURL = photoURL;
        this.usuariosSucursal = usuariosSucursal;
	}
}
