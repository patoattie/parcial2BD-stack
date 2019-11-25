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

  constructor() { }

}