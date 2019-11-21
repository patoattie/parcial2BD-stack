import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {Usuario} from '../clases/usuario';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService 
{
  private usuarios: Observable<Usuario[]>;
  private usuarioCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private authService: AuthService)
  {
    this.usuarioCollection = this.afs.collection<any>('usuarios');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
  }

  public getUsuarios(): Observable<Usuario[]>
  {
    return this.usuarios;
  }

  public getUsuario(uid: string): Usuario
  {
    let retorno: Usuario = JSON.parse(localStorage.getItem('usuario'));

    if(retorno == null)
    {
      this.usuarios.forEach(arrUsuarios =>
        {
          arrUsuarios.forEach(unUsuario =>
            {
              if(unUsuario.uid == uid)
              {
                retorno = unUsuario;
                localStorage.setItem('usuario', JSON.stringify(retorno));
              }
            });
        });
        //this.poblarLocal(uid);
      retorno = JSON.parse(localStorage.getItem('usuario'));
    }

    return retorno;
  }

  public getUsuarioPorId(idCollection: string): Observable<Usuario> 
  {
    return this.usuarioCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(usuario => {
        usuario.idCollection = idCollection;
        return usuario
      })
    );
  }

  public addUsuario(usuario: Usuario): Promise<void | DocumentReference> 
  {
    return this.usuarioCollection.add({
      perfil: usuario.perfil,
      sucursal: usuario.sucursal
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateUsuario(usuario: Usuario): Promise<void> 
  {
    return this.usuarioCollection.doc(usuario.idCollection).update({ perfil: usuario.perfil, sucursal: usuario.sucursal });
  }
 
  public deleteUsuario(idCollection: string): Promise<void> 
  {
    return this.usuarioCollection.doc(idCollection).delete();
  }

  public SetData(usuario: DocumentReference)
  {
    const usuarioRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuario.id}`);
    const usuarioData = {
      idCollection: usuario.id,
      uid: this.authService.getUid()
    }
    return usuarioRef.set(usuarioData, {
      merge: true
    })
  }

  public SignOut(): void 
  {
    localStorage.removeItem('usuario');
  }
}