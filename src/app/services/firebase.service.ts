import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }
 
  async crearDatos(collection:any,item:any){
    return await this.firestore.collection(collection).add(item);
  }

}
