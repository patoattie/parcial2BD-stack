import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Movimiento } from '../clases/movimiento';
import { Usuario } from '../clases/usuario';
import {AuthService} from './auth.service';
import {UsuariosService} from './usuarios.service';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService 
{
  private movimientos: Observable<Movimiento[]>;
  private movimientoCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(
    private afs: AngularFirestore, 
    private authService: AuthService, 
    private usuariosService: UsuariosService, 
    public storage: AngularFireStorage, 
    public pipe: DatePipe)
  {
    this.movimientoCollection = this.afs.collection<any>('movimientos');
    this.movimientos = this.movimientoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
    this.muestraAbm = false;
  }

  public getMovimientos(): Observable<Movimiento[]>
  {
    return this.movimientos;
  }

  /*public getMovimiento(codigo: string): Movimiento
  {
    let retorno: Movimiento = null;

    this.getMovimientos().forEach((arrMovimientos) =>
    {
      arrMovimientos.forEach(unMovimiento =>
      {
        if(unMovimiento.codigo == codigo)
        {
          retorno = unMovimiento;
        }
      });
    });

    return retorno;
  }*/

  public getMovimientoPorId(idCollection: string): Observable<Movimiento> 
  {
    return this.movimientoCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(movimiento => {
        movimiento.idCollection = idCollection;
        return movimiento
      })
    );
  }

  public addMovimiento(movimiento: Movimiento): Promise<void | DocumentReference> 
  {
    return this.movimientoCollection.add(
    {
      tipo: movimiento.tipo,
      sucursal: movimiento.sucursal,
      fecha: movimiento.fecha,
      cantidad: movimiento.cantidad,
      detalle: movimiento.detalle,
      idProducto: movimiento.idProducto,
      codigoProducto: movimiento.codigoProducto,
      nombreProducto: movimiento.nombreProducto,
      descripcionProducto: movimiento.descripcionProducto,
      costoProducto: movimiento.costoProducto
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateMovimiento(movimiento: Movimiento): Promise<void> 
  {
    return this.movimientoCollection.doc(movimiento.idCollection).update(
    {
      tipo: movimiento.tipo,
      sucursal: movimiento.sucursal,
      fecha: movimiento.fecha,
      cantidad: movimiento.cantidad,
      detalle: movimiento.detalle,
      idProducto: movimiento.idProducto,
      codigoProducto: movimiento.codigoProducto,
      nombreProducto: movimiento.nombreProducto,
      descripcionProducto: movimiento.descripcionProducto,
      costoProducto: movimiento.costoProducto
    });
  }
 
  public deleteMovimiento(idCollection: string): Promise<void> 
  {
    return this.movimientoCollection.doc(idCollection).delete();
  }

  public SetData(movimiento: DocumentReference)
  {
    let usuarioUID: string = this.authService.getUid();
    let usuario: Usuario = this.usuariosService.getUsuario(usuarioUID);
    const movimientoRef: AngularFirestoreDocument<any> = this.afs.doc(`movimientos/${movimiento.id}`);
    const movimientoData = {
      idCollection: movimiento.id,
      uid: usuarioUID,
      email: usuario.email,
      perfilUsuario: usuario.perfil,
      sucursalUsuario: usuario.sucursal
    };
    return movimientoRef.set(movimientoData, {
      merge: true
    });
  }

  /*public SetURL(movimiento: DocumentReference, fotoURL: string)
  {
    const movimientoRef: AngularFirestoreDocument<any> = this.afs.doc(`movimientos/${movimiento.id}`);
    const movimientoData = {
      photoURL: fotoURL
    };
    return movimientoRef.set(movimientoData, {
      merge: true
    });
  }*/

  public getFecha(): string
  {
    return new DatePipe('en-US').transform(Date.now(), 'yyyyMMddHHmmssSSS', '-0300');
  }
}
