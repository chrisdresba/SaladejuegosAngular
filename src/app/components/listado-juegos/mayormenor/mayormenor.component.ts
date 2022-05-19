import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Resultados } from 'src/app/Entidades/resultados';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.scss']
})
export class MayormenorComponent implements OnInit {

  public carta1: number = 6;
  public carta2: string = "";
  public random: number = 0;
  public puntaje: number = 0;
  public mensaje?: string;
  public oportunidades: number = 5;
  public juego:string = 'Mayor o Menor';
  usuario: any;
  email: string = '';
  fecha?: string = '';


  constructor(public serv: ResultadosService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        this.email = 'anonimo';
      } else {
        this.usuario = user;
        this.email = this.usuario.email;
      }
    })
  }

  partida() {
    this.random = Math.round(Math.random() * 12);
    this.carta2 = this.random.toString();
  }

  reiniciar() {
    if (this.oportunidades == 0) {

      let pipe = new DatePipe('en-US');
      this.fecha = String(pipe.transform(Date.now(), 'dd/MM/yyyy'));
      let resultado = new Resultados();
      resultado.crearResultado(this.email,this.puntaje,this.juego,this.fecha);
      this.serv.guardarResultado(resultado);

      this.puntaje = 0;
      Swal.fire({
        icon: 'warning',
        title: 'Vuelve a intentarlo',
        showConfirmButton: false,
        timer: 1500,
      });
    

      setTimeout(() => {
        this.mensaje = "";
        this.carta1 = this.random;
        this.carta2 = ""
      }, 3000)
    }
  }

  menor() {
    this.partida();

    if (this.carta1 > this.random) {
      this.mensaje = "Excelente";
      this.puntaje++;
    } else {
      this.mensaje = "Fallaste";
      this.oportunidades--;
    }


    setTimeout(() => {
      this.mensaje = "";
      this.carta1 = this.random;
      this.carta2 = ""
    }, 3000)
  }

  mayor() {
    this.partida();

    if (this.carta1 < this.random) {
      this.mensaje = "Excelente";
      this.puntaje++;
    } else {
      this.mensaje = "Fallaste";
      this.oportunidades--;
    }

    setTimeout(() => {
      this.mensaje = "";
      this.carta1 = this.random;
      this.carta2 = ""
    }, 3000)
  }
}
