import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  public listadoEncuestas: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.listadoEncuestas = this.firestore
      .collection('encuestas')
      .valueChanges();
  }

  async guardarEncuesta(
    usuario: string,
    nombre: string,
    apellido: string,
    edad: number,
    telefono: string,
    resp1: string,
    resp2: string,
    resp3: []
  ) {
    let entidad = {
      'usuario': usuario,
      'nombre': nombre,
      'apellido': apellido,
      'edad': edad,
      'telefono': telefono,
      'RespuestaExperiencia': resp1,
      'RespuestaPreferencias': resp2,
      'RespuestaJuegos': resp3,
    };
    return await this.firestore.collection('encuestas').add(entidad);
  }
}
