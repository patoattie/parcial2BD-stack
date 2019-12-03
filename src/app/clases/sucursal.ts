export class Sucursal 
{
    public idCollection: string;
    public uid: string;
    public sucursal: string;
    public photoURL: string

    constructor(sucursal?: string, idCollection?: string, uid?: string, photoURL?: string)
	{
        this.sucursal = sucursal;
        this.idCollection = idCollection;
        this.uid = uid;
        this.photoURL = photoURL;
	}
}
