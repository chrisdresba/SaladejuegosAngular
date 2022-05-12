import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  public random: number = 0;
  public letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public palabras = ['ANGULAR', 'TYPESCRIPT', 'EXCELENTE', 'METODOS', 'LOCALIZAR', 'AVELLANEDA', 'FACULTAD', 'INVERSION', 'CAPACIDAD', 'MIERCOLES'];
  public palabra: any;
  public palabraAuxiliar: any;
  public letrasAuxiliar: any;
  public espacios: number = 0;
  public intentos: number = 0;
  public url: string = "assets/img/ahorcado" + this.intentos + ".jpg";
  public unidad: string = "";
  public auth: boolean;
  public auth2: boolean;

  constructor() {
    this.iniciar();
    this.auth = false;
    this.auth2 = true;
  }

  ngOnInit(): void {
  }

  iniciar() {
    this.random = Math.round(Math.random() * 9);
    this.palabra = Array.from(this.palabras[this.random]);
    this.palabraAuxiliar = new Array(this.palabra.length - 1);
    for (let i = 0; i < this.palabra.length; i++) {
      this.palabraAuxiliar[i] = '';
    }
    this.letrasAuxiliar = new Array();
    this.auth = false;
    this.auth2 = true;
  }

  letrasIngresadas(letra: any) {

    for (let i = 0; i < this.letrasAuxiliar.length; i++) {
      if (this.letrasAuxiliar[i] == letra) {
        return false;
      }
    }
    return true;
  }

  buscar(letra: any) {

    if (this.intentos < 6 && this.letrasIngresadas(letra)) {
      let auxiliar = 0;
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] == letra) {
          this.palabraAuxiliar[i] = letra;
          auxiliar++;
        }

      }

      //guardo la letra que ingreso para que no se repitan
      this.letrasAuxiliar.push(letra);

      if (auxiliar == 0) {
        this.intentos++;
        this.url = "assets/img/ahorcado" + this.intentos + ".jpg";
      }

      if (this.arrayEquals(this.palabra, this.palabraAuxiliar)) {
        setTimeout(() => {
          this.recargar();
        }, 4000)
      }
    }
    if (this.intentos == 6) {
      this.palabraAuxiliar = this.palabra;
      this.auth2 = false;
      this.auth = true;
    }

  }

  recargar() {
    this.auth = false;
    this.auth2 = true;
    this.intentos = 0;
    this.url = "assets/img/ahorcado" + this.intentos + ".jpg";
    this.iniciar();

  }

  arrayEquals(a: any, b: any) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

}