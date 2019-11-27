import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Producto } from '../clases/producto';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService 
{
  private productos: Observable<Producto[]>;
  private productoCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private authService: AuthService)
  {
    this.productoCollection = this.afs.collection<any>('productos');
    this.productos = this.productoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
  }

  public getProductos(): Observable<Producto[]>
  {
    return this.productos;
  }

  public getProducto(codigo: string): Producto
  {
    let retorno: Producto = JSON.parse(localStorage.getItem('producto'));

    if(retorno == null)
    {
      this.productos.forEach(arrProductos =>
        {
          arrProductos.forEach(unProducto =>
            {
              if(unProducto.codigo == codigo)
              {
                retorno = unProducto;
                localStorage.setItem('producto', JSON.stringify(retorno));
              }
            });
        });
        //this.poblarLocal(uid);
      retorno = JSON.parse(localStorage.getItem('producto'));
    }

    return retorno;
  }

  public getProductoPorId(idCollection: string): Observable<Producto> 
  {
    return this.productoCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(producto => {
        producto.idCollection = idCollection;
        return producto
      })
    );
  }

  public addProducto(producto: Producto): Promise<void | DocumentReference> 
  {
    return this.productoCollection.add({
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      costo: producto.costo,
      observaciones: producto.observaciones,
      stock: producto.stock,
      fechaCreacion: producto.fechaCreacion
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateProducto(producto: Producto): Promise<void> 
  {
    return this.productoCollection.doc(producto.idCollection).update({ codigo: producto.codigo, nombre: producto.nombre, descripcion: producto.descripcion, costo: producto.costo, observaciones: producto.observaciones, stock: producto.stock, fechaCreacion: producto.fechaCreacion });
  }
 
  public deleteProducto(idCollection: string): Promise<void> 
  {
    return this.productoCollection.doc(idCollection).delete();
  }

  public SetData(producto: DocumentReference)
  {
    const productoRef: AngularFirestoreDocument<any> = this.afs.doc(`productos/${producto.id}`);
    const productoData = {
      idCollection: producto.id,
      uid: this.authService.getUid()
    }
    return productoRef.set(productoData, {
      merge: true
    })
  }

  public SignOut(): void 
  {
    localStorage.removeItem('producto');
  }
}