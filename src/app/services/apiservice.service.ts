import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pais } from '../Entidades/pais';

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  
  constructor(public http: HttpClient) { 
  }

  traerPaises() {
    return this.http.get("https://restcountries.com/v3.1/all?fields=name,flags").pipe(     
      map( (paises : any) => paises.map( ( pais : any ) => new Pais( pais.name.common, pais.flags.png ) ) ) 
    )
  }

}

