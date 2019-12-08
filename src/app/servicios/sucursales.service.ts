import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Sucursal } from '../clases/sucursal';
import {AuthService} from './auth.service';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  private sucursales: Observable<Sucursal[]>;
  private sucursalCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService, public storage: AngularFireStorage) 
  {
    this.sucursalCollection = this.afs.collection<any>('sucursales');
    this.sucursales = this.sucursalCollection.snapshotChanges().pipe(
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

  public getSucursales(): Observable<Sucursal[]>
  {
    return this.sucursales;
  }

  public getSucursal(sucursal: string, sucursales: Sucursal[]): Sucursal
  {
    let retorno: Sucursal = null;

    sucursales.forEach((unSucursal) =>
    {
      if(unSucursal.sucursal == sucursal)
      {
        retorno = unSucursal;
      }
    });

    return retorno;
  }

  public getSucursalPorId(idCollection: string): Observable<Sucursal> 
  {
    return this.sucursalCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(sucursal => {
        sucursal.idCollection = idCollection;
        return sucursal
      })
    );
  }

  public addSucursal(sucursal: Sucursal, archivoFoto?: any): Promise<void | DocumentReference> 
  {
    return this.sucursalCollection.add({
      sucursal: sucursal.sucursal/*,
      usuariosSucursal: sucursal.usuariosSucursal.map((obj)=> {return Object.assign({}, obj)}),*/ //convierte el array sucursal.usuariosSucursal (Usuario[]) a un tipo map para poder guardarlo en la BD.
    })
    .then((doc) =>
    {
      if(archivoFoto != undefined)
      {
        let metadata = 
        {
          contentType: 'image/png',
          customMetadata: 
          {
            'usuario': this.authService.getEmail(),
            'uid': this.authService.getUid(),
            'sucursal': sucursal.sucursal,
            'id': doc.id
          }
        };

        let uploadTask = this.storage.upload('sucursales/' + this.getFecha() + archivoFoto.name, archivoFoto, metadata);

        uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) =>
          {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
          },
          (E) => {},
          () =>
          {
            uploadTask.task.snapshot.ref.getDownloadURL()
            .then((downloadURL) =>
            {
              console.log('File available at', downloadURL);
              this.SetURL(doc, downloadURL);
            });
          });
      }

      this.SetData(doc);
    });
  }
 
  public updateSucursal(sucursal: Sucursal): Promise<void> 
  {
    return this.sucursalCollection.doc(sucursal.idCollection).update({ sucursal: sucursal.sucursal, usuariosSucursal: sucursal.usuariosSucursal });
  }
 
  public deleteSucursal(idCollection: string): Promise<void> 
  {
    return this.sucursalCollection.doc(idCollection).delete();
  }

  public SetData(sucursal: DocumentReference)
  {
    const sucursalRef: AngularFirestoreDocument<any> = this.afs.doc(`sucursales/${sucursal.id}`);
    const sucursalData = {
      idCollection: sucursal.id,
      uid: this.authService.getUid()
    };
    return sucursalRef.set(sucursalData, {
      merge: true
    });
  }

  public SetURL(sucursal: DocumentReference, fotoURL: string)
  {
    const sucursalRef: AngularFirestoreDocument<any> = this.afs.doc(`sucursales/${sucursal.id}`);
    const sucursalData = {
      photoURL: fotoURL
    };
    return sucursalRef.set(sucursalData, {
      merge: true
    });
  }

  public getFecha(): string
  {
    return new DatePipe('en-US').transform(Date.now(), 'yyyyMMddHHmmssSSS', '-0300');
  }

  public getError(sucursal: Sucursal, sucursales: Sucursal[]): string
  {
    let error: string = '';
    if(this.getSucursal(sucursal.sucursal, sucursales) != null)
    {
      error = 'La sucursal ya se encuentra registrada';
    }

    return error;
  }
}
