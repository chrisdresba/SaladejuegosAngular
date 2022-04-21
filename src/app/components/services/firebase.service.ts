import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ServiceFirebase {

  constructor(private firestore: AngularFirestore) { }
 
  async createLog(collection:any,item:any){
    console.log("envio log con usuario y fecha");
    return await this.firestore.collection(collection).add(item);
  }
}
