import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Mensaje } from '../Entidades/mensaje';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats : Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.chats = this.firestore.collection('chats').valueChanges();
   }
 
  async guardarMensaje(usuario:any,mensaje:any){
    let fecha = new Date();
    let dia = fecha.getFullYear() + '-' + ( fecha.getMonth() + 1 ) + '-' + fecha.getDate();

    let hora = fecha.getHours() + ':' + this.revision(fecha.getMinutes())+ ':' + this.revision(fecha.getSeconds());

    let texto = {'usuario':usuario,'fecha':dia, 'hora':hora,'mensaje':mensaje}
    return await this.firestore.collection('chats').add(texto);
  }

  async getMensajes(){

    return this.firestore.collection('chats').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Mensaje[];
      })
    );
  }

  revision(dato : any){

        if(dato<10){
            return('0'+dato);
        }
        return dato;
  }
}
