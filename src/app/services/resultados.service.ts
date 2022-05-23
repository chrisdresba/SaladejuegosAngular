import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resultados } from '../Entidades/resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  public listado: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.listado = this.firestore.collection('resultados').valueChanges();
  }

  getResultados = (): Observable<any[]> => {
    return this.firestore.collection('resultados').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Resultados[];
      })
    );
  }


  async guardarResultado(res: Resultados) {
    let entidad = { 'usuario': res.usuario, 'puntaje': res.puntaje, 'juego': res.juego, 'fecha': res.fecha }
    return await this.firestore.collection('resultados').add(entidad);
  }

}