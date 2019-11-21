import { ESucursal } from "../enums/esucursal.enum";

export interface Usuario 
{
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}