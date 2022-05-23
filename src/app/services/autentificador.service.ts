import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuario } from '../Entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificadorService {

  public estaLogueado:boolean = false;
  public listado: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.listado = this.firestore.collection('usuarios').valueChanges();
  }

  public loguearse(){
    this.estaLogueado = true;
  }


  public desloguearse(){
    this.estaLogueado = false;
  }

  getUsuarios = (): Observable<any[]> =>{
    return this.firestore.collection('usuarios').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Usuario[];
      })
    );
  }




}
