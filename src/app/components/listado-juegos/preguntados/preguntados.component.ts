import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PaisService } from 'src/app/services/apiservice.service';
import { Pais } from 'src/app/Entidades/pais';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { Resultados } from 'src/app/Entidades/resultados';
import { ResultadosService } from 'src/app/services/resultados.service';



@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  base_preguntasJson: any[] = [{
    "pregunta": "¿Cual es la capital de Peru?",
    "respuesta": "Lima",
    "incorrecta1": "Cusco",
    "incorrecta2": "Trujillo",
    "incorrecta3": "Arequipa",
    "imagen": "Peru",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Brasil?",
    "respuesta": "Brasilia",
    "incorrecta1": "San Pablo",
    "incorrecta2": "Rio de Janeiro",
    "incorrecta3": "Fortaleza\r",
    "imagen": "Brazil",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Ecuador?",
    "respuesta": "Quito",
    "incorrecta1": "Guayaquil",
    "incorrecta2": "Ambato",
    "incorrecta3": "Cuzco\r",
    "imagen": "Ecuador",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Colombia?",
    "respuesta": "Bogotá",
    "incorrecta1": "Medellin",
    "incorrecta2": "Cali",
    "incorrecta3": "Cartagena\r",
    "imagen": "Colombia",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de España?",
    "respuesta": "Madrid",
    "incorrecta1": "Sevilla",
    "incorrecta2": "Barcelona",
    "incorrecta3": "La Coruña\r",
    "imagen": "Spain",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Venezuela?",
    "respuesta": "Caracas",
    "incorrecta1": "Amazonas",
    "incorrecta2": "Cali",
    "incorrecta3": "Lara\r",
    "imagen": "Venezuela",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Costa Rica?",
    "respuesta": "San José",
    "incorrecta1": "Liberia",
    "incorrecta2": "Jacó",
    "incorrecta3": "Puntarenas\r",
    "imagen": "Costa Rica",
    "objectFit": "cover"
  },
  {
    "pregunta": "¿Cual es la capital de Chile?",
    "respuesta": "Santiago de Chile",
    "incorrecta1": "Valparaiso",
    "incorrecta2": "Viña del Mar",
    "incorrecta3": "Valdivia\r",
    "imagen": "Chile",
    "objectFit": "cover"
  },
  ];

  pregunta = "";
  categoria = "";
  respuesta = "";
  incorrecta1 = "";
  incorrecta2 = "";
  incorrecta3 = "";
  imagen?: any = "";
  objectFit = "";

  opcion1 = "";
  opcion2 = "";
  opcion3 = "";
  opcion4 = "";

  style = {
    background: ""
  }
  npreguntas = []

  posibles_respuestas: any[] = [];
  public auth2: boolean = false;
  public paises?: Pais[];
  jugadores: any | [];
  usuario: any;
  email: string = '';
  juego: string = 'preguntados';
  fecha: any;
  puntaje: number = 0;
  intentos: number = 5;


  constructor(public serv: ResultadosService, private service: PaisService, public afAuth: AngularFireAuth, private router: Router) {
    this.service.traerPaises().subscribe((paises: any) => {
      this.paises = paises.slice(0, 249);
    })
  }


  comenzar() {
    this.escogerPreguntaAleatoria();
    this.auth2 = true;
  }

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

  elegirPregunta(n: number) {
    const { pregunta, respuesta, incorrecta1, incorrecta2, incorrecta3, imagen, objectFit } = this.base_preguntasJson[n];

    this.devolverImagen(imagen);
    this.pregunta = pregunta;
    this.respuesta = respuesta;
    this.incorrecta1 = incorrecta1;
    this.incorrecta2 = incorrecta2;
    this.incorrecta3 = incorrecta3;
    this.objectFit = objectFit;

  }

  devolverImagen(nombre: any) {
    this.paises?.forEach((value) => {
      if (value.pais == nombre) {
        this.imagen = value.imagen;
      }
    });

  }
  escogerPreguntaAleatoria() {
    const n = Math.floor(Math.random() * this.base_preguntasJson.length)

    this.elegirPregunta(n)
    this.desordenarRespuestas()
  }


  select_id(id: string) {
    return document.getElementById(id)
  }

  desordenarRespuestas() {
    this.posibles_respuestas = [
      this.respuesta,
      this.incorrecta1,
      this.incorrecta2,
      this.incorrecta3
    ]
    this.posibles_respuestas.sort(() => Math.random() - 0.5)

    this.opcion1 = this.posibles_respuestas[0]
    this.opcion2 = this.posibles_respuestas[1]
    this.opcion3 = this.posibles_respuestas[2]
    this.opcion4 = this.posibles_respuestas[3]
  }

  oprimirBtn(res: number) {

    if (this.posibles_respuestas[res] == this.respuesta) {

      Swal.fire({
        icon: 'success',
        title: 'EXCELENTE +20',
        showConfirmButton: false,
        timer: 1000
      })
      this.puntaje = this.puntaje + 20;

      this.escogerPreguntaAleatoria()
    } else {

      this.intentos--;
      if (this.intentos != 0) {
        Swal.fire({
          icon: 'warning',
          title: 'INCORRECTO',
          showConfirmButton: false,
          timer: 1000
        })
      } else {
        this.finDePartida();
      }


      this.escogerPreguntaAleatoria()
    }
  }

  finDePartida() {
    this.guardarResultado();
    this.puntaje = 0;
    this.intentos = 5;
    Swal.fire({
      icon: 'error',
      title: 'Perdiste, vuelve a intentarlo',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  guardarResultado() {
    let pipe = new DatePipe('en-US');
    this.fecha = String(pipe.transform(Date.now(), 'dd/MM/yyyy'));
    let resultado = new Resultados();
    resultado.crearResultado(this.email, this.puntaje, this.juego, this.fecha);
    this.serv.guardarResultado(resultado);
  }
}